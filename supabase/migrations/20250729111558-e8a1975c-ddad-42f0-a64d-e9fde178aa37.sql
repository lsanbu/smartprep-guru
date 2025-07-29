
-- Fix the handle_new_user() function to properly extract metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Debug: Log the raw metadata being received
  RAISE LOG 'Raw user metadata: %', NEW.raw_user_meta_data;
  
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
    -- Remove the default 'Delhi' and let it use the actual state value
    (NEW.raw_user_meta_data ->> 'state')::text,
    COALESCE(NEW.raw_user_meta_data ->> 'district', ''),
    -- Remove the default 'Other' and let it use the actual referral_source value
    (NEW.raw_user_meta_data ->> 'referral_source')::text,
    COALESCE(NEW.raw_user_meta_data ->> 'referral_details', '')
  );
  
  -- Debug: Log what was inserted
  RAISE LOG 'Profile created for user: % with state: % and referral_source: %', 
    NEW.id, 
    NEW.raw_user_meta_data ->> 'state',
    NEW.raw_user_meta_data ->> 'referral_source';
    
  RETURN NEW;
END;
$function$;
