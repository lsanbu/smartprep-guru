
-- First, let's make sure we have the trigger properly set up
-- Drop the existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Debug: Log that the trigger fired
  RAISE LOG 'Trigger fired for user: %', NEW.id;
  RAISE LOG 'Raw user metadata received: %', NEW.raw_user_meta_data;
  
  -- Insert the profile with proper error handling
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
    (NEW.raw_user_meta_data ->> 'state')::text,
    COALESCE(NEW.raw_user_meta_data ->> 'district', ''),
    (NEW.raw_user_meta_data ->> 'referral_source')::text,
    COALESCE(NEW.raw_user_meta_data ->> 'referral_details', '')
  );
  
  -- Debug: Log successful insertion
  RAISE LOG 'Profile created successfully for user: % with state: % and referral_source: %', 
    NEW.id, 
    NEW.raw_user_meta_data ->> 'state',
    NEW.raw_user_meta_data ->> 'referral_source';
    
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't block user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$function$;

-- Create the trigger to fire after user insertion
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable logging to see if the trigger fires (optional, for debugging)
-- You can check these logs in the Supabase dashboard
