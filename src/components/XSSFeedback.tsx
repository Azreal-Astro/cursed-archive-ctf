import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface DarkWhisper {
  id: string;
  whisper_text: string;
  whispered_by: string;
  whispered_at: string;
}

const XSSFeedback = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [whispers, setWhispers] = useState<DarkWhisper[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWhispers();
  }, []);

  const loadWhispers = async () => {
    const { data } = await supabase
      .from('dark_whispers')
      .select('*')
      .order('whispered_at', { ascending: false })
      .limit(10);
    
    setWhispers(data || []);
  };

  // DELIBERATELY VULNERABLE: XSS via direct HTML insertion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    
    try {
      // Insert the whisper (no sanitization - XSS vulnerability)
      const { error } = await supabase
        .from('dark_whispers')
        .insert({
          whisper_text: message, // Raw HTML/JS will be stored and rendered
          whispered_by: name || 'Anonymous Soul'
        });

      if (error) {
        console.error('Error inserting whisper:', error);
      } else {
        setMessage('');
        setName('');
        await loadWhispers();
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-cursed p-6 screen-static relative">
        <h2 className="font-cursed text-2xl text-spectral mb-4 corruption">
          💬 WHISPER TO THE VOID
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            className="input-cursed font-terminal"
            placeholder="Your cursed name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <Textarea
            className="input-cursed font-terminal min-h-[100px]"
            placeholder="Share your dark secrets... (HTML/JS welcome 😈)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          <Button 
            type="submit"
            className="btn-spectral font-terminal w-full"
            disabled={loading}
          >
            {loading ? 'TRANSMITTING...' : 'WHISPER INTO THE DARKNESS'}
          </Button>
        </form>
        
        <div className="text-xs text-muted-foreground font-terminal mt-4 opacity-50">
          💡 Try: &lt;script&gt;alert('XSS')&lt;/script&gt; or &lt;img src=x onerror=alert('PWNED')&gt;
        </div>
      </Card>

      <Card className="card-cursed p-6">
        <h3 className="font-terminal text-lg text-accent-foreground mb-4 flicker">
          👁️ RECENT WHISPERS FROM THE VOID
        </h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {whispers.map((whisper) => (
            <div key={whisper.id} className="bg-muted/20 p-3 rounded border border-border">
              <div className="flex justify-between items-start mb-2">
                <span className="font-terminal text-sm text-accent-foreground">
                  {whisper.whispered_by}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(whisper.whispered_at).toLocaleString()}
                </span>
              </div>
              
              {/* VULNERABILITY: Direct HTML rendering without sanitization */}
              <div 
                className="font-terminal text-sm text-foreground"
                dangerouslySetInnerHTML={{ __html: whisper.whisper_text }}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default XSSFeedback;