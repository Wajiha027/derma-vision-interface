
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (formData: { email: string; password: string; name?: string }) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {type === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-primary w-full"
            />
          </div>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input-primary w-full"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={type === 'login' ? 'current-password' : 'new-password'}
            required
            value={formData.password}
            onChange={handleChange}
            className="input-primary w-full"
          />
        </div>
      </div>
      
      <div>
        <Button type="submit" className="w-full">
          {type === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
