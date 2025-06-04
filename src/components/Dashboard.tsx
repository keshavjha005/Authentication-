
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { LogOut, User, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out. See you soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-20 left-40 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 animate-fade-in">Welcome back!</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Account Settings Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-in-left">
              <div className="flex items-center space-x-4 mb-6">
                <Settings className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User size={24} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing 
                Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut 
                Labore Et Dolore Magna Aliquyam Erat, Sed Diam
              </p>
            </div>

            {/* Stats/Features Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-in-right">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Dashboard Stats</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Total Projects</span>
                  <span className="font-bold text-purple-600">12</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Active Sessions</span>
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Completed Tasks</span>
                  <span className="font-bold text-green-600">45</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105">
                View Full Dashboard
              </Button>
            </div>
          </div>

          {/* Additional Content */}
          <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Logged in successfully</span>
                <span className="text-gray-500 text-sm ml-auto">Just now</span>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Profile updated</span>
                <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">New project created</span>
                <span className="text-gray-500 text-sm ml-auto">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
