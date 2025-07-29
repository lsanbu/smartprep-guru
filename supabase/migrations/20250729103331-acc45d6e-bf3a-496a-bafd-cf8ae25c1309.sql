
-- Update the existing trigger function to use the actual user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    student_name, 
    father_mother_name, 
    contact_number, 
    alternate_contact_number,
    class_studying,
    school_name,
    school_place,
    state,
    district,
    referral_source,
    referral_details
  )
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'student_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'father_mother_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'contact_number', ''),
    NEW.raw_user_meta_data ->> 'alternate_contact_number',
    COALESCE(NEW.raw_user_meta_data ->> 'class_studying', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'school_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'school_place', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'state', 'Delhi'),
    COALESCE(NEW.raw_user_meta_data ->> 'district', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'referral_source', 'Other'),
    COALESCE(NEW.raw_user_meta_data ->> 'referral_details', '')
  );
  RETURN NEW;
END;
$$;

-- Create the trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END;
$$;
