
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
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
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
        <h3 className="mb-2 text-xl font-semibold">Thanks for signing up!</h3>
        <p className="text-muted-foreground">
          Your request has been sent to our admins for review. 
          Please wait for approval before logging in.
        </p>
        <div className="mt-6 space-y-2">
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Return to Login
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupSuccessPage;
