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

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in",
      });

      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
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
    <div className="min-h-screen bg-[#f6f1f7] flex items-center justify-center">
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
          <Button 
            className="w-full"
            onClick={handleSignIn} 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;