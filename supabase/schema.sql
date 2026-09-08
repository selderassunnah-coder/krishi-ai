-- Krishi AI Phase 2 schema
-- Run in Supabase → SQL Editor

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  district text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Farms
create table if not exists public.farms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  district text,
  area_acres numeric(10, 2),
  sectors text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists farms_owner_id_idx on public.farms (owner_id);

alter table public.farms enable row level security;

create policy "Owners can select own farms"
  on public.farms for select
  using (auth.uid() = owner_id);

create policy "Owners can insert own farms"
  on public.farms for insert
  with check (auth.uid() = owner_id);

create policy "Owners can update own farms"
  on public.farms for update
  using (auth.uid() = owner_id);

create policy "Owners can delete own farms"
  on public.farms for delete
  using (auth.uid() = owner_id);
