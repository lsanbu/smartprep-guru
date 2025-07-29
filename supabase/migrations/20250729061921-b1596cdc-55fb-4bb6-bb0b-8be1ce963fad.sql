
-- Create enum for Indian states
CREATE TYPE indian_state AS ENUM (
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
);

-- Create enum for how they heard about XmPrepNEET
CREATE TYPE referral_source AS ENUM (
  'Social Media', 'Google Search', 'Friend/Family Reference', 'School Teacher',
  'Coaching Institute', 'YouTube', 'Educational Website', 'Advertisement', 'Other'
);

-- Create enum for pricing plans
CREATE TYPE pricing_plan AS ENUM (
  'Basic Plan', 'Standard Plan', 'Premium Plan', 'Ultimate Plan'
);

-- Create profiles table extending auth.users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  student_name TEXT NOT NULL,
  father_mother_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  alternate_contact_number TEXT,
  class_studying TEXT NOT NULL,
  school_name TEXT NOT NULL,
  school_place TEXT NOT NULL,
  state indian_state NOT NULL,
  district TEXT NOT NULL,
  referral_source referral_source NOT NULL,
  referral_details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to explain the referral_details column
COMMENT ON COLUMN public.profiles.referral_details IS 'Mandatory free text field for specific referral source details (e.g., person name, specific website, etc.)';

-- Create table for user pricing suggestions
CREATE TABLE public.user_pricing_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type pricing_plan NOT NULL,
  suggested_price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for page analytics and usage tracking
CREATE TABLE public.page_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  page_url TEXT NOT NULL,
  is_chargeable BOOLEAN DEFAULT FALSE,
  time_spent_minutes INTEGER DEFAULT 0,
  visit_count INTEGER DEFAULT 1,
  last_visited TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for URL configurations (chargeable/non-chargeable)
CREATE TABLE public.url_configurations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url_pattern TEXT NOT NULL UNIQUE,
  is_chargeable BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_pricing_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.url_configurations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for pricing suggestions
CREATE POLICY "Users can view their own pricing suggestions" ON public.user_pricing_suggestions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own pricing suggestions" ON public.user_pricing_suggestions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for page analytics
CREATE POLICY "Users can view their own analytics" ON public.page_analytics
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own analytics" ON public.page_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own analytics" ON public.page_analytics
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policy for URL configurations (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view URL configurations" ON public.url_configurations
  FOR SELECT TO authenticated USING (true);

-- Insert initial URL configurations
INSERT INTO public.url_configurations (url_pattern, is_chargeable, description) VALUES
  ('/', false, 'Home page - free access'),
  ('/student', true, 'Student dashboard - chargeable'),
  ('/mock-tests', true, 'Mock tests - chargeable'),
  ('/ai-tutor', true, 'AI Tutor - chargeable'),
  ('/study-planner', true, 'Study planner - chargeable'),
  ('/analytics', true, 'Performance analytics - chargeable'),
  ('/pricing', false, 'Pricing page - free access'),
  ('/privacy-policy', false, 'Privacy policy - free access'),
  ('/terms-of-service', false, 'Terms of service - free access');

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, student_name, father_mother_name, contact_number, class_studying, school_name, school_place, state, district, referral_source, referral_details)
  VALUES (NEW.id, '', '', '', '', '', '', 'Delhi', '', 'Other', '');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
