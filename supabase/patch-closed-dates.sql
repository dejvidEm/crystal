-- Spusti v Supabase SQL editore. Bezpečné spustiť aj opakovane.
-- Opraví dovolenku: verejný kalendár uvidí zatvorené dni aj keď RLS na tabuľke nie je nastavené.

create table if not exists public.closed_dates (
  closed_date date primary key,
  created_at timestamptz not null default now()
);

create or replace function public.list_closed_dates(p_from date, p_to date)
returns table (closed_date date)
language sql
stable
security definer
set search_path = public
as $$
  select c.closed_date
  from public.closed_dates c
  where c.closed_date between p_from and p_to
  order by c.closed_date;
$$;

create or replace function public.admin_set_closed_dates(p_dates date[])
returns date[]
language plpgsql
security definer
set search_path = public
as $$
declare
  v_dates date[];
begin
  if not public.is_admin() then
    raise exception 'not_admin';
  end if;

  select array(
    select distinct d
    from unnest(coalesce(p_dates, '{}')) as d
    where d is not null
    order by d
  ) into v_dates;

  if cardinality(v_dates) > 400 then
    raise exception 'too_many_dates';
  end if;

  delete from public.closed_dates;
  if cardinality(v_dates) > 0 then
    insert into public.closed_dates (closed_date)
    select unnest(v_dates);
  end if;

  return v_dates;
end;
$$;

alter table public.closed_dates enable row level security;

drop policy if exists closed_dates_public_read on public.closed_dates;
create policy closed_dates_public_read
  on public.closed_dates
  for select
  to anon, authenticated
  using (true);

drop policy if exists closed_dates_admin_write on public.closed_dates;
create policy closed_dates_admin_write
  on public.closed_dates
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant select on public.closed_dates to anon, authenticated;
grant execute on function public.list_closed_dates(date, date) to anon, authenticated;
grant execute on function public.admin_set_closed_dates(date[]) to authenticated;
