
import React from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/AuthLayout';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { userLogin, isLoading } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await userLogin(values);
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to your Builders Arc account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="you@example.com" 
                      {...field} 
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500 
                      focus:border-arc-accent/70 focus:ring-2 focus:ring-arc-accent/20 transition-all duration-200" 
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-arc-accent opacity-0 transition-opacity duration-200 group-focus-within:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a6 6 0 00-3.757-5.243zM8 7a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-300" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-black/50 border border-arc-accent/30 text-white placeholder:text-gray-500 
                      focus:border-arc-accent/70 focus:ring-2 focus:ring-arc-accent/20 transition-all duration-200" 
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-arc-accent opacity-0 transition-opacity duration-200 group-focus-within:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-300" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
            transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.04] 
            hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-400">Don't have an account?</span>{" "}
        <Link to="/signup" className="text-arc-accent hover:text-arc-light underline underline-offset-4 transition-colors duration-200">
          Sign Up
        </Link>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        <Link to="/admin/login" className="hover:text-gray-400 transition-colors duration-200">
          Admin Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
