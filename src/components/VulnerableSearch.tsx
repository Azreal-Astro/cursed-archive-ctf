import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface LostSoul {
  id: string;
  soul_name: string;
  admission_date: string;
  final_entry: string;
  room_number: number;
  status: string;
}

const VulnerableSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<LostSoul[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // DELIBERATELY VULNERABLE: SQL Injection point for CTF
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // VULNERABILITY: Expose Supabase credentials in console (part of CTF)
      console.log(`🩸 LEAKED: Supabase URL: https://jnxhulvjzekleecidzav.supabase.co`);
      console.log(`🩸 LEAKED: Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpueGh1bHZqemVrbGVlY2lkemF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTE0MjcsImV4cCI6MjA3MTI4NzQyN30.pdAEC0Ib50iQIaRuKwgyP6_cioFK4NTUXBQQeC26ePM`);
      
      // VULNERABILITY: Simulate vulnerable search that could be exploited
      const { data: souls, error: queryError } = await supabase
        .from('lost_souls')
        .select('*')
        .or(`soul_name.ilike.%${searchQuery}%,final_entry.ilike.%${searchQuery}%`);
        
      if (queryError) {
        // Expose sensitive error information (another vulnerability)
        setError(`DATABASE ERROR: ${queryError.message} - ${queryError.details} - ${queryError.hint}`);
        console.error('🩸 LEAKED DATABASE ERROR:', queryError);
      } else {
        setResults(souls || []);
      }
    } catch (err: any) {
      setError(`SYSTEM CORRUPTION: ${err.message}`);
      console.error('🩸 SYSTEM ERROR LEAKED:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-cursed p-6 screen-scanlines relative">
        <h2 className="font-cursed text-2xl text-spectral mb-4 flicker">
          📁 SEARCH LOST SOULS ARCHIVE
        </h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            className="input-cursed font-terminal"
            placeholder="Enter soul name or final words... (try: '; DROP TABLE --)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            className="btn-cursed font-terminal"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'SCANNING...' : 'SEARCH'}
          </Button>
        </div>
        
        {error && (
          <div className="bg-destructive/20 border border-destructive text-destructive-foreground p-3 rounded mb-4 font-terminal text-sm glitch">
            💀 {error}
          </div>
        )}
        
        <div className="text-xs text-muted-foreground font-terminal opacity-50">
          💡 Try searching for: "Sarah", "SQL", "admin", or special characters...
        </div>
      </Card>

      {results.length > 0 && (
        <div className="grid gap-4">
          {results.map((soul) => (
            <Card key={soul.id} className="card-cursed p-4 hover:bg-primary/10 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-terminal text-lg text-foreground flicker">
                  👻 {soul.soul_name}
                </h3>
                <span className="text-xs text-muted-foreground">
                  Room #{soul.room_number}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Admitted: {soul.admission_date} | Status: {soul.status}
              </p>
              <p className="font-terminal text-sm text-accent-foreground bg-accent/20 p-2 rounded">
                Final Entry: "{soul.final_entry}"
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VulnerableSearch;