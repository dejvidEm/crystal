-- Spusti celé v Supabase → SQL Editor → Run.
-- Opraví ukladanie dovolenky (text[] namiesto date[]) a verejné čítanie.

create table if not exists public.closed_dates (
  closed_date date primary key,
  created_at timestamptz not null default now()
);

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

drop function if exists public.admin_replace_closed_dates(text[]);
create or replace function public.admin_replace_closed_dates(p_dates text[])
returns table (closed_date date)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not_admin';
  end if;

  if coalesce(cardinality(p_dates), 0) > 400 then
    raise exception 'too_many_dates';
  end if;

  delete from public.closed_dates;

  insert into public.closed_dates (closed_date)
  select distinct d::date
  from unnest(coalesce(p_dates, '{}')) as d
  where d ~ '^\d{4}-\d{2}-\d{2}$';

  return query
    select c.closed_date
    from public.closed_dates c
    order by c.closed_date;
end;
$$;

grant execute on function public.list_closed_dates(date, date) to anon, authenticated;
grant execute on function public.admin_replace_closed_dates(text[]) to authenticated;
