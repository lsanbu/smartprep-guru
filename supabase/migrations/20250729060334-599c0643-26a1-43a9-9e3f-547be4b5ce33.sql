
-- Add a mandatory referral_details column to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN referral_details TEXT NOT NULL DEFAULT '';

-- Update the referral_details column to remove the default after adding it
ALTER TABLE public.profiles 
ALTER COLUMN referral_details DROP DEFAULT;

-- Add a comment to explain the column
COMMENT ON COLUMN public.profiles.referral_details IS 'Mandatory free text field for specific referral source details (e.g., person name, specific website, etc.)';
