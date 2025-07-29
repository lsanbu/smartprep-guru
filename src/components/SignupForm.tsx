
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserPlus, Mail, Phone, School, MapPin, Users } from "lucide-react";

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
] as const;

const referralSources = [
  'Social Media', 'Google Search', 'Friend/Family Reference', 'School Teacher',
  'Coaching Institute', 'YouTube', 'Educational Website', 'Advertisement', 'Other'
] as const;

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  fatherMotherName: z.string().min(2, "Parent name must be at least 2 characters"),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  alternateContactNumber: z.string().optional(),
  classStudying: z.string().min(1, "Please select your class"),
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  schoolPlace: z.string().min(2, "School place must be at least 2 characters"),
  state: z.enum(indianStates, { errorMap: () => ({ message: "Please select your state" }) }),
  district: z.string().min(2, "District name must be at least 2 characters"),
  referralSource: z.enum(referralSources, { errorMap: () => ({ message: "Please select how you heard about us" }) }),
  referralDetails: z.string().min(2, "Please provide specific details about your referral source"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => !data.alternateContactNumber || /^[6-9]\d{9}$/.test(data.alternateContactNumber), {
  message: "Please enter a valid 10-digit mobile number",
  path: ["alternateContactNumber"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      studentName: "",
      fatherMotherName: "",
      contactNumber: "",
      alternateContactNumber: "",
      classStudying: "",
      schoolName: "",
      schoolPlace: "",
      state: undefined,
      district: "",
      referralSource: undefined,
      referralDetails: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    console.log('=== SIGNUP DEBUG START ===');
    console.log('Form data received:', { ...data, password: '[REDACTED]', confirmPassword: '[REDACTED]' });

    try {
      // Clean up any existing session first
      await supabase.auth.signOut();
      
      const userMetadata = {
        student_name: data.studentName,
        father_mother_name: data.fatherMotherName,
        contact_number: data.contactNumber,
        alternate_contact_number: data.alternateContactNumber || null,
        class_studying: data.classStudying,
        school_name: data.schoolName,
        school_place: data.schoolPlace,
        state: data.state,
        district: data.district,
        referral_source: data.referralSource,
        referral_details: data.referralDetails,
      };

      console.log('🔵 Metadata being sent to Supabase:', userMetadata);
      console.log('🔵 State value being sent:', data.state);
      console.log('🔵 Referral source being sent:', data.referralSource);
      
      // Sign up the user with user metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/student`,
          data: userMetadata
        },
      });

      console.log('🟢 Signup API response:', { 
        user: authData.user ? {
          id: authData.user.id,
          email: authData.user.email,
          user_metadata: authData.user.user_metadata
        } : null,
        error: authError 
      });

      if (authError) {
        console.error('🔴 Auth error:', authError);
        
        if (authError.message.includes('User already registered')) {
          toast.error("This email is already registered. Please use the login page to sign in.");
          return;
        } else {
          toast.error(`Signup failed: ${authError.message}`);
          return;
        }
      }

      if (!authData.user) {
        console.error('🔴 No user returned from signup');
        toast.error("Signup failed: No user data returned");
        return;
      }

      console.log('🟢 User signed up successfully:', authData.user.id);
      console.log('🟢 User metadata stored:', authData.user.user_metadata);

      // Wait 3 seconds for the trigger to execute, then check if profile was created
      console.log('⏳ Waiting 3 seconds for trigger to execute...');
      setTimeout(async () => {
        try {
          console.log('🔍 Checking if profile was created...');
          const { data: profile, error: profileCheckError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

          if (profileCheckError) {
            console.error('🔴 Error checking profile:', profileCheckError);
            console.log('❌ Profile was not created by trigger. Manual intervention may be needed.');
          } else {
            console.log('✅ Profile successfully created by trigger:', profile);
            console.log('✅ Profile state value:', profile.state);
            console.log('✅ Profile referral_source value:', profile.referral_source);
          }
        } catch (checkError) {
          console.error('🔴 Error during profile verification:', checkError);
        }
        console.log('=== SIGNUP DEBUG END ===');
      }, 3000);
      
      toast.success("🎉 Account created successfully! Please check your email to verify your account before logging in.");
      form.reset();

    } catch (error) {
      console.error('🔴 Unexpected error during signup:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-green rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold font-brand-primary text-brand-dark-gray">
              Join XmPrep<sup className="text-lg text-brand-purple">NEET</sup>
            </CardTitle>
            <CardDescription className="text-lg text-brand-light-gray font-poppins mt-2">
              Create your account to start your NEET preparation journey
            </CardDescription>
            
            {/* Beta Notice moved up */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 font-medium font-poppins">
                🎉 <strong>Beta Launch Special:</strong> AI Tutor access completely FREE for early users!
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information - moved to top */}
                <div className="grid md:grid-cols-2 gap-6 p-6 bg-blue-50 rounded-xl">
                  <h3 className="md:col-span-2 text-lg font-semibold text-brand-purple mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="studentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">Student Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter your full name"
                            className="border-brand-purple/30 focus:border-brand-purple"
                            autoFocus
                            onFocus={scrollToTop}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fatherMotherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">Father/Mother Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter parent's full name"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Account Information */}
                <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
                  <h3 className="md:col-span-2 text-lg font-semibold text-brand-purple mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Account Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            placeholder="your.email@example.com"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="Enter a strong password"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-brand-dark-gray font-medium">Confirm Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="Re-enter your password"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6 p-6 bg-green-50 rounded-xl">
                  <h3 className="md:col-span-2 text-lg font-semibold text-brand-purple mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">Contact Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter 10-digit mobile number"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="alternateContactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">Alternate Contact (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter alternate mobile number"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Academic Information */}
                <div className="grid md:grid-cols-2 gap-6 p-6 bg-purple-50 rounded-xl">
                  <h3 className="md:col-span-2 text-lg font-semibold text-brand-purple mb-4 flex items-center">
                    <School className="w-5 h-5 mr-2" />
                    Academic Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="classStudying"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">Class Currently Studying</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-brand-purple/30 focus:border-brand-purple">
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="11th">11th Standard</SelectItem>
                            <SelectItem value="12th">12th Standard</SelectItem>
                            <SelectItem value="12th-passed">12th Passed (Dropper)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schoolName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">School Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter your school name"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schoolPlace"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-brand-dark-gray font-medium">School Location</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter school city/town"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location Information */}
                <div className="grid md:grid-cols-2 gap-6 p-6 bg-yellow-50 rounded-xl">
                  <h3 className="md:col-span-2 text-lg font-semibold text-brand-purple mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Location Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-brand-purple/30 focus:border-brand-purple">
                              <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">District</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter your district"
                            className="border-brand-purple/30 focus:border-brand-purple"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Referral Information */}
                <div className="grid md:grid-cols-1 gap-6 p-6 bg-orange-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-brand-purple mb-4">
                    How did you hear about XmPrep<sup className="text-sm">NEET</sup>?
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="referralSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">Referral Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-brand-purple/30 focus:border-brand-purple">
                              <SelectValue placeholder="Select how you found us" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {referralSources.map((source) => (
                              <SelectItem key={source} value={source}>{source}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referralDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brand-dark-gray font-medium">
                          Referral Details <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Please provide specific details (e.g., friend's name, teacher's name, specific website/channel name, etc.)"
                            className="border-brand-purple/30 focus:border-brand-purple min-h-[80px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-green hover:from-brand-purple/90 hover:to-brand-green/90 text-white py-3 text-lg font-semibold shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create My Account
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupForm;
