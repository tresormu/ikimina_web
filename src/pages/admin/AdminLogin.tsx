import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Shield, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface AdminLoginFormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Default admin credentials
  const DEFAULT_ADMIN_EMAIL = 'admin@ikimina.rw';
  const DEFAULT_ADMIN_PASSWORD = 'Admin@2024';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AdminLoginFormData>();

  const email = watch('email', '');
  const password = watch('password', '');
  
  // Debug: Log form values and errors
  console.log('Current form values:', { email, password });
  console.log('Form errors:', errors);

  const onSubmit = async (data: AdminLoginFormData) => {
    console.log('Form submitted with data:', data);
    console.log('Expected email:', DEFAULT_ADMIN_EMAIL);
    console.log('Expected password:', DEFAULT_ADMIN_PASSWORD);
    
    setIsLoading(true);
    try {
      // Validate admin credentials
      if (data.email !== DEFAULT_ADMIN_EMAIL || data.password !== DEFAULT_ADMIN_PASSWORD) {
        console.log('Credential mismatch');
        throw new Error('Invalid admin credentials');
      }

      // Create admin user object
      const adminUser = {
        id: 'admin-1',
        phone: '+250788123456',
        nationalId: '1199080012345678',
        fullName: 'System Administrator',
        role: 'admin' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const accessToken = 'admin-access-token-' + Date.now();
      const refreshToken = 'admin-refresh-token-' + Date.now();

      // Use auth store to login
      login(adminUser, accessToken, refreshToken);
      
      toast.success('Admin login successful');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message || 'Invalid admin credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="mt-2 text-gray-600">
            Sign in to access platform administration
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <Input
                type="email"
                label="Email Address"
                placeholder="admin@ikimina.rw"
                className="pl-10"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
                error={errors.email?.message}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-800">{errors.root.message}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button type="button" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Not an admin?{' '}
            <a href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Return to main login
            </a>
          </p>
        </div>

        {/* Default Credentials */}
        <div className="mt-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-green-800">
                <p className="font-semibold mb-2">Default Admin Credentials:</p>
                <div className="bg-white rounded p-2 space-y-1">
                  <p><strong>Email:</strong> {DEFAULT_ADMIN_EMAIL}</p>
                  <p><strong>Password:</strong> {DEFAULT_ADMIN_PASSWORD}</p>
                </div>
                <p className="mt-2 text-xs text-green-700">
                  Use these credentials to access the admin portal for development/testing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Admin Access Security:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Admin accounts have elevated system privileges</li>
                  <li>All admin actions are logged and audited</li>
                  <li>Multi-factor authentication required for production</li>
                  <li>Session timeout: 30 minutes of inactivity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
