import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAuthStore } from '../../stores/authStore';
import { LoginFormData } from '../../types';
import { Users, Building2, Shield } from 'lucide-react';

const Login: React.FC = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'treasurer' | 'lender' | 'admin'>('treasurer');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>();

  const phone = watch('phone', '');

  const onSubmitPhone = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      if (selectedRole === 'lender') {
        // Redirect to lender login page
        navigate('/lender/login');
        return;
      } else if (selectedRole === 'admin') {
        // Redirect to admin login page
        navigate('/admin/login');
        return;
      }
      
      // TODO: Replace with actual API call for treasurer
      // await apiService.post('/auth/send-otp', { phone: data.phone });
      
      toast.success('OTP sent to your phone');
      setShowOtp(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitOtp = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await apiService.post('/auth/verify-otp', {
      //   phone: data.phone,
      //   otp: data.otp,
      // });

      // Mock response for development
      const mockUser = {
        id: '1',
        phone: data.phone,
        fullName: 'John Doe',
        nationalId: '1234567890123456',
        role: 'treasurer' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockAccessToken = 'mock-access-token';
      const mockRefreshToken = 'mock-refresh-token';

      login(mockUser, mockAccessToken, mockRefreshToken);
      
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = showOtp ? onSubmitOtp : onSubmitPhone;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {showOtp ? 'Enter OTP' : 'Sign in to your account'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {showOtp
            ? `Enter 6-digit code sent to ${phone}`
            : 'Select your role and enter your credentials'}
        </p>
      </div>

      {/* Role Selection */}
      {!showOtp && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="h-4 w-4 inline mr-2" />
            Select Your Role
          </label>
          <Select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value as 'treasurer' | 'lender' | 'admin')}
          >
            <option value="treasurer">Treasurer - Manage group contributions</option>
            <option value="lender">Lender - Access credit reports</option>
            <option value="admin">Platform Admin - System administration</option>
          </Select>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+250 7xx xxx xxx"
          {...register('phone')}
          error={errors.phone?.message}
          disabled={showOtp}
          helperText={showOtp ? phone : undefined}
        />

        {showOtp && (
          <Input
            label="OTP Code"
            type="text"
            placeholder="Enter 6-digit code"
            maxLength={6}
            {...register('otp')}
            error={errors.otp?.message}
          />
        )}

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {showOtp ? 'Verify OTP' : 'Send OTP'}
        </Button>

        {showOtp && (
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500"
              onClick={() => {
                setShowOtp(false);
                setValue('otp', '');
              }}
            >
              Use different phone number
            </button>
          </div>
        )}
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Demo Access</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            For demo: Use any Rwandan phone number (+2507xxxxxxx) and OTP "123456"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
