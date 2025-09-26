import React, { useState } from 'react';
import { X, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddNewUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (userData: UserFormData) => void;
}

interface UserFormData {
  employeeName: string;
  permissionLevel: string;
  designation: string;
  yearsOfExperience: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AddNewUser: React.FC<AddNewUserProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<UserFormData>({
    employeeName: '',
    permissionLevel: '',
    designation: '',
    yearsOfExperience: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required';
    }

    if (!formData.permissionLevel) {
      newErrors.permissionLevel = 'Permission level is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit?.(formData);
      // Reset form
      setFormData({
        employeeName: '',
        permissionLevel: '',
        designation: '',
        yearsOfExperience: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      employeeName: '',
      permissionLevel: '',
      designation: '',
      yearsOfExperience: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[632px] p-0 bg-[#f2f2f2] rounded-[24px] border-0">
        <div className="relative">
          {/* Header */}
          <div className="bg-[#f2f2f2] h-[96px] rounded-t-[24px] border-b border-[rgba(103,144,155,0.16)] relative">
            <div className="absolute right-6 top-8 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0 hover:bg-transparent"
              >
                <X className="h-4 w-4 text-[#252525]" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 bg-[#67909b] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#252525]">Add new user</h2>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 max-h-[600px] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Employee Name */}
              <div className="space-y-4">
                <label className="text-base font-medium text-[#666666]">
                  Employee Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter employee name"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange('employeeName', e.target.value)}
                  className={`h-16 px-6 text-sm bg-white border-0 rounded-lg ${
                    errors.employeeName ? 'border-red-500' : ''
                  }`}
                />
                {errors.employeeName && (
                  <p className="text-red-500 text-sm">{errors.employeeName}</p>
                )}
              </div>

              {/* Permission Level */}
              <div className="space-y-4">
                <label className="text-base font-medium text-[#666666]">
                  Permission level
                </label>
                <Select
                  value={formData.permissionLevel}
                  onValueChange={(value) => handleInputChange('permissionLevel', value)}
                >
                  <SelectTrigger className={`h-16 px-6 text-sm bg-white border-0 rounded-lg ${
                    errors.permissionLevel ? 'border-red-500' : ''
                  }`}>
                    <SelectValue placeholder="Select Permission level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                {errors.permissionLevel && (
                  <p className="text-red-500 text-sm">{errors.permissionLevel}</p>
                )}
              </div>

              {/* Designation */}
              <div className="space-y-4">
                <label className="text-base font-medium text-[#666666]">
                  Designation
                </label>
                <Input
                  type="text"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className={`h-16 px-6 text-sm bg-white border-0 rounded-lg ${
                    errors.designation ? 'border-red-500' : ''
                  }`}
                />
                {errors.designation && (
                  <p className="text-red-500 text-sm">{errors.designation}</p>
                )}
              </div>

              {/* Years of Experience */}
              <div className="space-y-4">
                <label className="text-base font-medium text-[#666666]">
                  Year's of experience
                </label>
                <Select
                  value={formData.yearsOfExperience}
                  onValueChange={(value) => handleInputChange('yearsOfExperience', value)}
                >
                  <SelectTrigger className={`h-16 px-6 text-sm bg-white border-0 rounded-lg ${
                    errors.yearsOfExperience ? 'border-red-500' : ''
                  }`}>
                    <SelectValue placeholder="Select Year's of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.yearsOfExperience && (
                  <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-4">
                <label className="text-base font-medium text-[#666666]">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter email id"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`h-16 px-6 text-sm bg-white border-0 rounded-lg ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-4">
                <label className="text-base font-medium text-[#666666]">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`h-16 px-6 pr-12 text-sm bg-white border-0 rounded-lg ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 text-[#666666]" />
                    ) : (
                      <Eye className="h-6 w-6 text-[#666666]" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-4">
                <label className="text-base font-medium text-[#666666]">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`h-16 px-6 pr-12 text-sm bg-white border-0 rounded-lg ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-6 w-6 text-[#666666]" />
                    ) : (
                      <Eye className="h-6 w-6 text-[#666666]" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            </form>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-10 pb-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="h-10 px-6 border-[#67909b] text-[#67909b] hover:bg-[#67909b] hover:text-white rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="h-10 px-6 bg-[#67909b] hover:bg-[#5a7a85] text-white rounded-lg"
            >
              Create new user
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewUser;
