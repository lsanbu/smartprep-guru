
-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create updated function that uses user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
