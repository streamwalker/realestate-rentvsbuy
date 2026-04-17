create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  persona text,
  budget text,
  message text,
  source_page text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Anyone can submit leads"
on public.leads for insert
to anon, authenticated
with check (true);

create index leads_created_at_idx on public.leads (created_at desc);