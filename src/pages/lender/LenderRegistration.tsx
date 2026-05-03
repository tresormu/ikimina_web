import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Building2, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { FormField } from '../../components/form/FormField';
import { TextAreaField } from '../../components/form/TextAreaField';

interface LenderRegistrationData {
  institutionName: string;
  licenseNumber: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  contactTitle: string;
  website?: string;
  description?: string;
}

const LenderRegistration: React.FC = () => {
  const [formData, setFormData] = useState<LenderRegistrationData>({
    institutionName: '',
    licenseNumber: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    contactTitle: '',
    website: '',
    description: ''
  });
  
  const [errors, setErrors] = useState<Partial<LenderRegistrationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LenderRegistrationData> = {};
    
    if (!formData.institutionName.trim()) {
      newErrors.institutionName = 'Institution name is required';
    }
    
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    } else if (!/^[A-Z0-9]{8,20}$/i.test(formData.licenseNumber)) {
      newErrors.licenseNumber = 'License number must be 8-20 alphanumeric characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person name is required';
    }
    
    if (!formData.contactTitle.trim()) {
      newErrors.contactTitle = 'Contact title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof LenderRegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                Registration Submitted!
              </CardTitle>
              <CardDescription className="text-gray-600 mb-6">
                Your lender registration has been submitted successfully. Our team will review your application within 2-3 business days.
              </CardDescription>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Registration Details:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Institution:</span> {formData.institutionName}</p>
                  <p><span className="font-medium">License Number:</span> {formData.licenseNumber}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Next Steps:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>You'll receive an email with your application reference number</li>
                      <li>Our compliance team will verify your license and credentials</li>
                      <li>Once approved, you'll receive login credentials via email</li>
                      <li>You can check your application status using your email</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => window.location.href = '/lender/login'}
                className="w-full"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Building2 className="mx-auto h-12 w-12 text-primary-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Lender Registration</h1>
          <p className="mt-2 text-gray-600">
            Register your financial institution to access member credit reports
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Institution Information</CardTitle>
            <CardDescription>
              Please provide accurate information about your financial institution. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Institution Name"
                name="institutionName"
                value={formData.institutionName}
                onChange={(value) => handleInputChange('institutionName', value)}
                error={errors.institutionName}
                placeholder="e.g., ABC Finance Ltd"
                required
              />

              <FormField
                label="Financial License Number"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={(value) => handleInputChange('licenseNumber', value)}
                error={errors.licenseNumber}
                placeholder="e.g., FL2024001234"
                required
              />

              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                error={errors.email}
                placeholder="contact@institution.com"
                required
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                error={errors.phone}
                placeholder="+250 788 123 456"
                required
              />

              <FormField
                label="Physical Address"
                name="address"
                value={formData.address}
                onChange={(value) => handleInputChange('address', value)}
                error={errors.address}
                placeholder="KG 123 Ave, Kigali, Rwanda"
                required
              />

              <FormField
                label="Contact Person Name"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={(value) => handleInputChange('contactPerson', value)}
                error={errors.contactPerson}
                placeholder="John Doe"
                required
              />

              <FormField
                label="Contact Person Title"
                name="contactTitle"
                value={formData.contactTitle}
                onChange={(value) => handleInputChange('contactTitle', value)}
                error={errors.contactTitle}
                placeholder="Compliance Officer"
                required
              />

              <FormField
                label="Website"
                name="website"
                type="url"
                value={formData.website}
                onChange={(value) => handleInputChange('website', value)}
                placeholder="https://www.institution.com"
              />

              <TextAreaField
                label="Institution Description"
                name="description"
                value={formData.description}
                onChange={(value) => handleInputChange('description', value)}
                placeholder="Brief description of your financial institution and services..."
                rows={3}
              />

              {/* Terms and Conditions */}
              <div className="border-t pt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold mb-2">Important Information:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Your license will be verified with the National Bank of Rwanda</li>
                        <li>All information provided will be kept confidential</li>
                        <li>You must comply with data protection regulations</li>
                        <li>Approval typically takes 2-3 business days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LenderRegistration;
