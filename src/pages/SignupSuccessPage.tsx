
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/AuthLayout';

const SignupSuccessPage: React.FC = () => {
  return (
    <AuthLayout
      title="Signup Request Submitted"
      description="Your account is pending approval"
    >
      <div className="text-center animate-fade-in">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/30 border border-green-400/30">
          <svg
            className="h-8 w-8 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">Thanks for signing up!</h3>
        <p className="text-gray-300">
          Your request has been sent to our admins for review. 
          Please wait for approval before logging in.
        </p>
        <div className="mt-6 space-y-2">
          <Link to="/login">
            <Button 
              variant="outline" 
              className="w-full border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
            >
              Return to Login
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupSuccessPage;
