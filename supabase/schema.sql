-- Crystal Detailing booking system
-- Run once in Supabase SQL Editor (Dashboard → SQL → New query).

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.weekly_availability (
  weekday smallint primary key check (weekday between 1 and 7),
  enabled boolean not null default false,
  slots text[] not null default '{}',
  updated_at timestamptz not null default now(),
  constraint weekly_availability_slots_max check (cardinality(slots) <= 10)
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'rejected', 'cancelled')),
  vehicle_size text not null
    check (vehicle_size in ('small', 'medium', 'large')),
  service text not null
    check (service in ('refresh', 'essential', 'exterior', 'premium', 'tepovanie')),
  extras text[] not null default '{}',
  address text not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  notes text,
  booking_date date not null,
  booking_time time not null,
  estimated_price_eur numeric(8, 2),
  locale text not null default 'sk',
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  confirmed_at timestamptz,
  constraint bookings_address_len check (char_length(address) between 8 and 400),
  constraint bookings_name_len check (char_length(customer_name) between 2 and 80),
  constraint bookings_phone_len check (char_length(customer_phone) between 9 and 32),
  constraint bookings_email_len check (char_length(customer_email) between 5 and 160),
  constraint bookings_notes_len check (notes is null or char_length(notes) <= 500),
  constraint bookings_price_range check (
    estimated_price_eur is null
    or (estimated_price_eur >= 0 and estimated_price_eur <= 5000)
  )
);

create unique index if not exists bookings_active_slot_unique
  on public.bookings (booking_date, booking_time)
  where status in ('pending', 'confirmed');

create index if not exists bookings_date_idx on public.bookings (booking_date, booking_time);
create index if not exists bookings_status_idx on public.bookings (status, created_at desc);
create index if not exists bookings_email_created_idx on public.bookings (lower(customer_email), created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

drop trigger if exists weekly_availability_set_updated_at on public.weekly_availability;
create trigger weekly_availability_set_updated_at
  before update on public.weekly_availability
  for each row execute function public.set_updated_at();

create or replace function public.validate_weekly_slots()
returns trigger
language plpgsql
as $$
begin
  if exists (
    select 1
    from unnest(coalesce(new.slots, '{}')) as slot
    where slot !~ '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'
  ) then
    raise exception 'invalid_slot_format';
  end if;
  return new;
end;
$$;

drop trigger if exists weekly_availability_validate_slots on public.weekly_availability;
create trigger weekly_availability_validate_slots
  before insert or update on public.weekly_availability
  for each row execute function public.validate_weekly_slots();

insert into public.weekly_availability (weekday, enabled, slots)
values
  (1, true,  array['09:00', '11:00', '13:00', '15:00']),
  (2, true,  array['09:00', '11:00', '13:00', '15:00']),
  (3, true,  array['09:00', '11:00', '13:00', '15:00']),
  (4, true,  array['09:00', '11:00', '13:00', '15:00']),
  (5, true,  array['09:00', '11:00', '13:00', '15:00']),
  (6, true,  array['09:00', '11:00']),
  (7, false, array[]::text[])
on conflict (weekday) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create or replace function public.has_any_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users);
$$;

create or replace function public.claim_first_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin();
$$;

create or replace function public.list_occupied_slots(p_from date, p_to date)
returns table (booking_date date, booking_time time)
language sql
stable
security definer
set search_path = public
as $$
  select b.booking_date, b.booking_time
  from public.bookings b
  where b.status in ('pending', 'confirmed')
    and b.booking_date between p_from and p_to;
$$;

create or replace function public.admin_update_availability(
  p_weekday smallint,
  p_enabled boolean,
  p_slots text[]
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slots text[];
begin
  if not public.is_admin() then
    raise exception 'not_admin';
  end if;

  if p_weekday < 1 or p_weekday > 7 then
    raise exception 'invalid_weekday';
  end if;

  select array(
    select distinct slot
    from unnest(coalesce(p_slots, '{}')) as slot
    where slot ~ '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'
    order by slot
  ) into v_slots;

  if cardinality(v_slots) > 10 then
    raise exception 'too_many_slots';
  end if;

  if not p_enabled or cardinality(v_slots) = 0 then
    update public.weekly_availability
    set enabled = false, slots = '{}'
    where weekday = p_weekday;
  else
    update public.weekly_availability
    set enabled = true, slots = v_slots
    where weekday = p_weekday;
  end if;
end;
$$;

create or replace function public.submit_booking(
  p_vehicle_size text,
  p_service text,
  p_extras text[],
  p_address text,
  p_customer_name text,
  p_customer_phone text,
  p_customer_email text,
  p_notes text,
  p_booking_date date,
  p_booking_time time,
  p_estimated_price_eur numeric,
  p_locale text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_weekday int;
  v_enabled boolean;
  v_slots text[];
  v_time text;
  v_extras text[];
  v_recent int;
begin
  if p_vehicle_size not in ('small', 'medium', 'large') then
    raise exception 'invalid_vehicle';
  end if;
  if p_service not in ('refresh', 'essential', 'exterior', 'premium', 'tepovanie') then
    raise exception 'invalid_service';
  end if;

  select array(
    select distinct extra
    from unnest(coalesce(p_extras, '{}')) as extra
    where extra in (
      'tepovanie',
      'climate',
      'plastics',
      'leather',
      'headlights',
      'engine'
    )
  ) into v_extras;

  if p_service = 'tepovanie' then
    select array(
      select extra from unnest(v_extras) as extra where extra <> 'tepovanie'
    ) into v_extras;
  end if;

  if char_length(trim(p_address)) < 8 or char_length(p_address) > 400 then
    raise exception 'invalid_address';
  end if;
  if char_length(trim(p_customer_name)) < 2 or char_length(p_customer_name) > 80 then
    raise exception 'invalid_name';
  end if;
  if char_length(trim(p_customer_phone)) < 9 or char_length(p_customer_phone) > 32 then
    raise exception 'invalid_phone';
  end if;
  if p_customer_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then
    raise exception 'invalid_email';
  end if;
  if p_notes is not null and char_length(p_notes) > 500 then
    raise exception 'invalid_notes';
  end if;
  if p_booking_date < ((timezone('Europe/Bratislava', now()))::date) then
    raise exception 'date_in_past';
  end if;
  if (p_booking_date + p_booking_time)
     < (timezone('Europe/Bratislava', now()) + interval '120 minutes') then
    raise exception 'too_soon';
  end if;
  if p_locale not in ('sk', 'en', 'de') then
    p_locale := 'sk';
  end if;

  v_weekday := extract(isodow from p_booking_date)::int;
  v_time := to_char(p_booking_time, 'HH24:MI');

  select enabled, slots
    into v_enabled, v_slots
  from public.weekly_availability
  where weekday = v_weekday;

  if v_enabled is not true or v_slots is null or not (v_time = any (v_slots)) then
    raise exception 'slot_unavailable';
  end if;

  if exists (
    select 1
    from public.bookings
    where booking_date = p_booking_date
      and booking_time = p_booking_time
      and status in ('pending', 'confirmed')
  ) then
    raise exception 'slot_taken';
  end if;

  select count(*)
    into v_recent
  from public.bookings
  where created_at > now() - interval '60 minutes'
    and (
      lower(customer_email) = lower(trim(p_customer_email))
      or regexp_replace(customer_phone, '\D', '', 'g')
         = regexp_replace(p_customer_phone, '\D', '', 'g')
    );

  if v_recent >= 3 then
    raise exception 'rate_limited';
  end if;

  insert into public.bookings (
    status,
    vehicle_size,
    service,
    extras,
    address,
    customer_name,
    customer_phone,
    customer_email,
    notes,
    booking_date,
    booking_time,
    estimated_price_eur,
    locale
  ) values (
    'pending',
    p_vehicle_size,
    p_service,
    v_extras,
    trim(p_address),
    trim(p_customer_name),
    trim(p_customer_phone),
    lower(trim(p_customer_email)),
    nullif(trim(coalesce(p_notes, '')), ''),
    p_booking_date,
    p_booking_time,
    p_estimated_price_eur,
    p_locale
  )
  returning id into v_id;

  return v_id;
exception
  when unique_violation then
    raise exception 'slot_taken';
end;
$$;

create or replace function public.admin_set_booking_status(
  p_id uuid,
  p_status text,
  p_admin_note text default null
)
returns public.bookings
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.bookings;
begin
  if not public.is_admin() then
    raise exception 'not_admin';
  end if;

  if p_status not in ('pending', 'confirmed', 'rejected', 'cancelled') then
    raise exception 'invalid_status';
  end if;

  if p_status = 'confirmed' then
    if exists (
      select 1
      from public.bookings current_row
      join public.bookings other
        on other.id <> current_row.id
       and other.booking_date = current_row.booking_date
       and other.booking_time = current_row.booking_time
       and other.status = 'confirmed'
      where current_row.id = p_id
    ) then
      raise exception 'slot_taken';
    end if;
  end if;

  update public.bookings
  set
    status = p_status,
    admin_note = coalesce(nullif(trim(coalesce(p_admin_note, '')), ''), admin_note),
    confirmed_at = case
      when p_status = 'confirmed' then coalesce(confirmed_at, now())
      else null
    end
  where id = p_id
  returning * into v_row;

  if v_row.id is null then
    raise exception 'not_found';
  end if;

  return v_row;
end;
$$;

alter table public.admin_users enable row level security;
alter table public.weekly_availability enable row level security;
alter table public.bookings enable row level security;

drop policy if exists admin_users_self_read on public.admin_users;
create policy admin_users_self_read
  on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists weekly_availability_public_read on public.weekly_availability;
create policy weekly_availability_public_read
  on public.weekly_availability
  for select
  to anon, authenticated
  using (true);

drop policy if exists weekly_availability_admin_write on public.weekly_availability;
create policy weekly_availability_admin_write
  on public.weekly_availability
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists bookings_admin_read on public.bookings;
create policy bookings_admin_read
  on public.bookings
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists bookings_admin_update on public.bookings;
create policy bookings_admin_update
  on public.bookings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

revoke all on public.admin_users from anon, authenticated;
revoke all on public.weekly_availability from anon, authenticated;
revoke all on public.bookings from anon, authenticated;

grant select on public.admin_users to authenticated;
grant select on public.weekly_availability to anon, authenticated;
grant select on public.bookings to authenticated;

grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.has_any_admin() to anon, authenticated;
revoke execute on function public.claim_first_admin() from anon, authenticated, public;
grant execute on function public.admin_update_availability(smallint, boolean, text[]) to authenticated;
grant execute on function public.list_occupied_slots(date, date) to anon, authenticated;
grant execute on function public.submit_booking(text, text, text[], text, text, text, text, text, date, time, numeric, text) to anon, authenticated;
grant execute on function public.admin_set_booking_status(uuid, text, text) to authenticated;
