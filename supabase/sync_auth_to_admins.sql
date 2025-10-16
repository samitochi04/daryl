-- Function to automatically add auth users to admins table
-- This function will be triggered whenever a new user signs up via Supabase Auth

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admins (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to execute function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Optional: Sync existing auth users to admins table (run this once)
-- INSERT INTO public.admins (id, email, name)
-- SELECT 
--   id, 
--   email, 
--   COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)) as name
-- FROM auth.users
-- ON CONFLICT (id) DO NOTHING;
