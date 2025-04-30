import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { signupUser, SignupFormData } from '@/services/database';
import { toast } from "@/components/ui/sonner";
import AuthLayout from '@/components/AuthLayout';

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  fullName: z.string().min(2, { message: "Full name is required" }),
  department: z.string().optional(),
  educationLevel: z.string().optional(),
  githubUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  linkedinUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  age: z.string().transform(val => val ? parseInt(val, 10) : undefined).optional(),
  gender: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const departments = [
  "Engineering", "Design", "Product", "Marketing", "Sales", "Customer Support", "HR", "Finance", "Other"
];

const educationLevels = [
  "High School", "Associate's", "Bachelor's", "Master's", "PhD", "Self-taught", "Bootcamp", "Other"
];

const genders = [
  "Male", "Female", "Non-binary", "Prefer not to say"
];

const SignupPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      department: "",
      educationLevel: "",
      githubUrl: "",
      linkedinUrl: "",
      age: "",
      gender: "",
    },
  });

  const handleSignup = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      await signupUser(data);
      navigate('/signup-success');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Join Builders Arc"
      description="Create your account to start collaborating"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(async (data) => {
            // Remove confirmPassword before sending to API
            const { confirmPassword, ...signupData } = data;
            await handleSignup(signupData);
          })} 
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      {...field} 
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field}
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field}
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Department</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-black/50 border border-arc-accent/30 text-white">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border border-arc-accent/30 text-white">
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Education Level</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-black/50 border border-arc-accent/30 text-white">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border border-arc-accent/30 text-white">
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">GitHub URL (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://github.com/yourusername" 
                      {...field} 
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">LinkedIn URL (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://linkedin.com/in/yourusername" 
                      {...field} 
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Age (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="25" 
                      {...field} 
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Gender (optional)</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-black/50 border border-arc-accent/30 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border border-arc-accent/30 text-white">
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
            transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.02] 
            hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-400">Already have an account?</span>{" "}
        <Link to="/login" className="text-arc-accent hover:text-arc-light transition-colors duration-200">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
