import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (isSignUp: boolean) => {
    try {
      setLoading(true);
      const { error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      toast({
        title: isSignUp ? "Account created" : "Welcome back!",
        description: isSignUp 
          ? "Please check your email to verify your account" 
          : "You have been successfully logged in",
      });

      if (!isSignUp) navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <span className="text-brand-purple font-bold text-lg">Sparklight</span>
          <h1 className="text-2xl font-bold text-brand-black mt-2">
            Authentication Required
          </h1>
          <p className="text-sm text-brand-black/80 mt-2">
            Please sign in to upload discount codes
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-4">
            <Button 
              className="flex-1"
              onClick={() => handleAuth(false)} 
              disabled={loading}
            >
              Sign In
            </Button>
            <Button 
              className="flex-1"
              variant="outline"
              onClick={() => handleAuth(true)}
              disabled={loading}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;