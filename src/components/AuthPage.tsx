
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';

type AuthMode = 'welcome' | 'login' | 'signup';

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('welcome');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    isAgency: false
  });

  const { login, signup, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData.name, formData.email, formData.password, formData.phone, formData.company, formData.isAgency);
      toast({
        title: "Account created!",
        description: "Welcome to PopX! Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again with different credentials.",
        variant: "destructive"
      });
    }
  };

  const renderWelcome = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to PopX</h1>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit.
        </p>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={() => setMode('signup')}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Create Account
        </Button>
        <Button 
          onClick={() => setMode('login')}
          variant="outline"
          className="w-full py-3 rounded-lg border-2 border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-300"
        >
          Already Registered? Login
        </Button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="animate-slide-in-right">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Signin to your<br />PopX account
        </h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-purple-600 font-medium">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-purple-600 font-medium">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setMode('welcome')}
          className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
        >
          Back to welcome
        </button>
      </div>
    </div>
  );

  const renderSignup = () => (
    <div className="animate-slide-in-left">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create your<br />PopX account
        </h2>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-purple-600 font-medium">Full Name*</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Marry Doe"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-purple-600 font-medium">Phone number*</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Marry Doe"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-purple-600 font-medium">Email address*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Marry Doe"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-purple-600 font-medium">Password *</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Marry Doe"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="company" className="text-purple-600 font-medium">Company name</Label>
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Marry Doe"
            value={formData.company}
            onChange={handleInputChange}
            className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2 py-2">
          <span className="text-gray-700">Are you an Agency?*</span>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="isAgency"
                checked={formData.isAgency === true}
                onChange={() => setFormData(prev => ({ ...prev, isAgency: true }))}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isAgency"
                checked={formData.isAgency === false}
                onChange={() => setFormData(prev => ({ ...prev, isAgency: false }))}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 mt-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setMode('welcome')}
          className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
        >
          Back to welcome
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-20 left-40 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-scale-in">
          {mode === 'welcome' && renderWelcome()}
          {mode === 'login' && renderLogin()}
          {mode === 'signup' && renderSignup()}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
