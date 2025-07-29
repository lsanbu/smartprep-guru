
-- Drop the existing trigger and function completely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a simpler, more reliable trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Log that we're trying to insert
  RAISE LOG 'Attempting to create profile for user: %', NEW.id;
  
  -- Insert into profiles table
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
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'student_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'father_mother_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'contact_number', ''),
    NEW.raw_user_meta_data->>'alternate_contact_number',
    COALESCE(NEW.raw_user_meta_data->>'class_studying', ''),
    COALESCE(NEW.raw_user_meta_data->>'school_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'school_place', ''),
    NEW.raw_user_meta_data->>'state',
    COALESCE(NEW.raw_user_meta_data->>'district', ''),
    NEW.raw_user_meta_data->>'referral_source',
    COALESCE(NEW.raw_user_meta_data->>'referral_details', '')
  );
  
  RAISE LOG 'Profile created successfully for user: %', NEW.id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in trigger: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Check if trigger exists
SELECT 
  trigger_name,
  event_manipulation,
  action_statement,
  action_timing
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';
