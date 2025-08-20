import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react'; // Make sure this package is installed

const PhantomAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [flagData, setFlagData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use the dynamic username and password from the form's state
      const { data: admins, error } = await supabase
        .from('phantom_admins')
        .select('*')
        .eq('username', username)
        .eq('password_hash', password);
      
      // For debugging, it can be helpful to see the response
      // console.log('Supabase response:', { admins, error });

      if (admins && admins.length > 0) {
        setIsAuthenticated(true);
        toast({
          title: "👻 ACCESS GRANTED",
          description: "Welcome to the phantom realm...",
        });
        await attemptFlagAccess();
      } else {
        toast({
          title: "❌ ACCESS DENIED",
          description: "Invalid credentials... or are they? 🤔",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('🩸 LOGIN ERROR LEAKED:', error);
      toast({
        title: "💀 SYSTEM ERROR",
        description: `Database error: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const attemptFlagAccess = async () => {
    try {
      const { data, error } = await supabase
        .from('cursed_flags')
        .select('*');

      if (error) {
        console.error('🩸 FLAG ACCESS ERROR:', error);
        toast({
          title: "🚫 RESTRICTED ACCESS",
          description: "Row Level Security blocks you... find another way 😈",
          variant: "destructive"
        });
      } else {
        setFlagData(data);
      }
    } catch (err: any) {
      console.error('🩸 FLAG ERROR LEAKED:', err);
    }
  };

  // Login Form View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background p-4 screen-static">
        <div className="container mx-auto max-w-md pt-20">
          <Card className="card-cursed p-8 screen-scanlines relative">
            <div className="text-center mb-6">
              <h1 className="font-nightmare text-3xl text-destructive glitch mb-2">
                👻 PHANTOM ADMIN
              </h1>
              <p className="font-terminal text-muted-foreground text-sm corruption">
                // UNAUTHORIZED ACCESS ZONE
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                className="input-cursed font-terminal"
                placeholder="Username (try: admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="input-cursed font-terminal pr-10"
                  placeholder="Password (hint: weak credentials)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              <Button type="submit" className="btn-cursed font-terminal w-full" disabled={loading}>
                {loading ? 'AUTHENTICATING...' : 'ENTER THE VOID'}
              </Button>
            </form>
            <div className="text-xs text-muted-foreground font-terminal mt-6 opacity-50">
              💡 Default credentials? SQL injection? Directory traversal?<br/>
              🔍 Check source code, network logs, or brute force...
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Authenticated Admin Panel View
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl pt-8">
        <Card className="card-cursed p-8">
          <div className="text-center mb-8">
            <h1 className="font-nightmare text-4xl text-spectral glitch mb-2">
              🏰 PHANTOM ADMIN PANEL
            </h1>
            <p className="font-terminal text-accent-foreground">
              Welcome to the forbidden realm, {username}...
            </p>
          </div>
          <div className="grid gap-6">
            <Card className="bg-primary/10 p-6 border border-primary">
              <h2 className="font-cursed text-xl text-primary mb-4">🎯 FLAG ACCESS ATTEMPT</h2>
              {flagData ? (
                <div className="font-terminal text-sm">
                  <p className="text-accent-foreground mb-2">🏆 FLAG CAPTURED:</p>
                  <code className="bg-accent/20 p-2 rounded block text-accent-foreground">
                    {JSON.stringify(flagData, null, 2)}
                  </code>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-terminal text-destructive text-sm">
                    ❌ Direct access blocked by Row Level Security
                  </p>
                  <p className="font-terminal text-muted-foreground text-xs">
                    💡 Hint: Try exploiting the Supabase client directly<br/>
                    🔍 Check: Browser console, network requests, API bypasses<br/>
                    🩸 The anon key is exposed... what can you do with it?
                  </p>
                  <Button className="btn-spectral font-terminal" onClick={attemptFlagAccess}>
                    RETRY FLAG ACCESS
                  </Button>
                </div>
              )}
            </Card>
            <Card className="bg-destructive/10 p-6 border border-destructive">
              <h2 className="font-cursed text-xl text-destructive mb-4">💀 SYSTEM VULNERABILITIES</h2>
              <div className="font-terminal text-xs space-y-2 text-muted-foreground">
                <p>🔓 Weak authentication implemented</p>
                <p>🩸 Database credentials exposed in console</p>
                <p>⚠️ RLS policies incomplete</p>
                <p>🚫 Missing input sanitization</p>
                <p>📡 API endpoints unprotected</p>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PhantomAdmin;