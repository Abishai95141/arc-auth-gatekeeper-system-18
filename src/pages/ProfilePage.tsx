
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    age: user?.age || 0,
    gender: user?.gender || '',
    department: user?.department || '',
    educationLevel: user?.educationLevel || '',
    githubUrl: user?.githubUrl || '',
    linkedinUrl: user?.linkedinUrl || '',
  });

  if (!user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile in the database
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-3xl flex-col">
        <header className="mb-8 flex items-center justify-between rounded-lg border border-arc-accent/20 bg-black/40 p-4 shadow-lg backdrop-blur-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <h1 className="text-xl font-bold text-white">Builders Arc</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button 
                variant="outline" 
                className="border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
              >
                Dashboard
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        </header>

        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm animate-fade-in">
          <CardHeader className="border-b border-arc-accent/10">
            <CardTitle className="text-white text-2xl">Your Profile</CardTitle>
            <CardDescription className="text-gray-300">
              View and manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`bg-black/50 border border-arc-accent/30 text-white ${isEditing ? 'hover:border-arc-accent' : ''} transition-all duration-200`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={true} // Email should not be editable
                      className="bg-black/50 border border-arc-accent/30 text-white transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-white">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`bg-black/50 border border-arc-accent/30 text-white ${isEditing ? 'hover:border-arc-accent' : ''} transition-all duration-200`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-white">Gender</Label>
                    <Input
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`bg-black/50 border border-arc-accent/30 text-white ${isEditing ? 'hover:border-arc-accent' : ''} transition-all duration-200`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-white">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`bg-black/50 border border-arc-accent/30 text-white ${isEditing ? 'hover:border-arc-accent' : ''} transition-all duration-200`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="educationLevel" className="text-white">Education Level</Label>
                    <Input
                      id="educationLevel"
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`bg-black/50 border border-arc-accent/30 text-white ${isEditing ? 'hover:border-arc-accent' : ''} transition-all duration-200`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl" className="text-white">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`bg-black/50 border border-arc-accent/30 text-white ${isEditing ? 'hover:border-arc-accent' : ''} transition-all duration-200`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl" className="text-white">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`bg-black/50 border border-arc-accent/30 text-white ${isEditing ? 'hover:border-arc-accent' : ''} transition-all duration-200`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                {isEditing ? (
                  <>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
                      transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.04] 
                      hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button 
                    type="button" 
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
                    transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.04] 
                    hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
