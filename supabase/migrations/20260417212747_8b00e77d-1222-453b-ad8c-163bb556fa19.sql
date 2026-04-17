alter table public.leads
  add constraint leads_name_len check (char_length(name) between 1 and 100),
  add constraint leads_email_len check (char_length(email) between 3 and 255),
  add constraint leads_email_shape check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  add constraint leads_phone_len check (phone is null or char_length(phone) <= 40),
  add constraint leads_persona_len check (persona is null or char_length(persona) <= 60),
  add constraint leads_budget_len check (budget is null or char_length(budget) <= 60),
  add constraint leads_message_len check (message is null or char_length(message) <= 2000),
  add constraint leads_source_len check (source_page is null or char_length(source_page) <= 200),
  add constraint leads_ua_len check (user_agent is null or char_length(user_agent) <= 500);

comment on policy "Anyone can submit leads" on public.leads is
  'Public insert is intentional: contact form is open to anonymous visitors. The submit-lead edge function validates with zod and applies rate limiting; column-level CHECK constraints enforce length/shape on the DB side.';