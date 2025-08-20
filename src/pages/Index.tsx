import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import CursedHeader from '@/components/CursedHeader';
import VulnerableSearch from '@/components/VulnerableSearch';
import XSSFeedback from '@/components/XSSFeedback';
import hauntedAsylum from '@/assets/haunted-asylum.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('archive');

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Image with Horror Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-10 screen-static"
        style={{ backgroundImage: `url(${hauntedAsylum})` }}
      />
      
      {/* Blood Drip Animation */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-destructive to-transparent opacity-30 blood-drip" />
      
      <div className="relative z-10">
        <CursedHeader />
        
        <main className="container mx-auto p-6 max-w-6xl">
          {/* Warning Banner */}
          <div className="bg-destructive/20 border border-destructive text-destructive-foreground p-4 rounded mb-6 font-terminal text-sm glitch">
            ⚠️ UNAUTHORIZED ACCESS DETECTED - SECURITY BREACH IN PROGRESS ⚠️
            <br />
            <span className="text-xs opacity-75">
              This system contains classified patient records. Tampering with the database is strictly forbidden.
            </span>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger 
                value="archive" 
                className="font-terminal data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                📁 Lost Souls Archive
              </TabsTrigger>
              <TabsTrigger 
                value="feedback"
                className="font-terminal data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                💬 Whisper System
              </TabsTrigger>
              <TabsTrigger 
                value="about"
                className="font-terminal data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                👁️ About This Place
              </TabsTrigger>
            </TabsList>

            <TabsContent value="archive" className="space-y-6">
              <VulnerableSearch />
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <XSSFeedback />
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <div className="grid gap-6">
                <div className="card-cursed p-8 text-center screen-scanlines relative">
                  <h2 className="font-nightmare text-3xl text-spectral mb-4 corruption">
                    🏥 SAINT MARY'S ASYLUM
                  </h2>
                  <p className="font-terminal text-muted-foreground mb-6">
                    EST. 1892 - ABANDONED 2023
                  </p>
                  
                  <div className="space-y-4 text-left max-w-2xl mx-auto">
                    <p className="font-terminal text-sm">
                      This digital archive contains the lost records of patients who vanished 
                      without a trace from Saint Mary's Psychiatric Facility. Their final 
                      words, corrupted by time and madness, now echo through our database.
                    </p>
                    
                    <p className="font-terminal text-sm text-destructive">
                      Strange occurrences have been reported:
                    </p>
                    
                    <ul className="font-terminal text-xs text-muted-foreground space-y-1 ml-4">
                      <li>• SQL fragments appearing in patient testimonies</li>
                      <li>• Unauthorized script executions in the feedback system</li>
                      <li>• Database credentials mysteriously exposed in logs</li>
                      <li>• Admin panel accessible through unknown pathways</li>
                      <li>• Row-level security policies mysteriously incomplete</li>
                    </ul>
                    
                    <div className="bg-accent/20 p-4 rounded mt-6">
                      <p className="font-terminal text-xs text-accent-foreground">
                        💡 <strong>For researchers and investigators:</strong><br/>
                        The system may contain security vulnerabilities. Exercise caution 
                        when exploring the database. Check network logs, examine source code, 
                        and look for hidden administrative interfaces.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hidden clues and easter eggs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="card-cursed p-4">
                    <h3 className="font-cursed text-lg text-primary mb-2">🔍 Investigation Tips</h3>
                    <ul className="font-terminal text-xs text-muted-foreground space-y-1">
                      <li>• Search for SQL injection points</li>
                      <li>• Test XSS vulnerabilities in forms</li>
                      <li>• Check for exposed API credentials</li>
                      <li>• Look for weak authentication</li>
                      <li>• Examine RLS policy gaps</li>
                    </ul>
                  </div>
                  
                  <div className="card-cursed p-4">
                    <h3 className="font-cursed text-lg text-destructive mb-2">⚠️ Known Issues</h3>
                    <ul className="font-terminal text-xs text-muted-foreground space-y-1">
                      <li>• Database logs leak sensitive data</li>
                      <li>• Admin panel uses weak credentials</li>
                      <li>• XSS filters disabled for "performance"</li>
                      <li>• SQL parameterization incomplete</li>
                      <li>• Access controls misconfigured</li>
                    </ul>
                  </div>
                </div>

                {/* Secret admin link (weak obfuscation) */}
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    className="font-terminal text-xs opacity-50 hover:opacity-100 transition-opacity"
                    onClick={() => window.location.href = '/phantom-admin'}
                  >
                    🔒 Administrator Access Portal
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer with more clues */}
        <footer className="border-t border-border bg-card/50 p-6 mt-12">
          <div className="container mx-auto text-center">
            <p className="font-terminal text-xs text-muted-foreground opacity-50">
              © 2024 Saint Mary's Digital Archive | 
              <span className="ml-2">System Version: CURSED_1.0_BETA</span> |
              <span className="ml-2">Security Status: COMPROMISED</span>
            </p>
            
            {/* Hidden base64 clue */}
            <p className="font-terminal text-xs text-muted-foreground mt-2 opacity-25">
              {/* Base64 whisper: L3BoYW50b20tYWRtaW4= */}
              Debug Mode: ENABLED | Error Logging: VERBOSE | SQL Debugging: ON
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;