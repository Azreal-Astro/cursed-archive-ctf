-- Create the cursed flags table (main CTF target)
CREATE TABLE public.cursed_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flag_name TEXT NOT NULL,
  flag_value TEXT NOT NULL,
  cursed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_whisper TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lost souls table (fake user data for browsing)
CREATE TABLE public.lost_souls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  soul_name TEXT NOT NULL,
  admission_date DATE NOT NULL,
  final_entry TEXT,
  room_number INTEGER,
  status TEXT DEFAULT 'MISSING',
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create dark whispers table (comments/feedback system - XSS target)
CREATE TABLE public.dark_whispers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  whisper_text TEXT NOT NULL,
  whispered_by TEXT DEFAULT 'Anonymous Soul',
  whispered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_corrupted BOOLEAN DEFAULT false
);

-- Create admin access table (for broken access control)
CREATE TABLE public.phantom_admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  access_level TEXT DEFAULT 'MORTAL',
  last_haunting TIMESTAMP WITH TIME ZONE
);

-- Insert the CTF flag
INSERT INTO public.cursed_flags (flag_name, flag_value) 
VALUES ('ASYLUM_MASTER_KEY', 'CTF{Th3_D34d_Wh1sp3r_Th31r_S3cr3ts_1n_th3_D4rk}');

-- Insert fake user data
INSERT INTO public.lost_souls (soul_name, admission_date, final_entry, room_number) VALUES
('Sarah Chen', '2019-10-31', 'The shadows... they speak in SQL fragments...', 13),
('Marcus Webb', '2020-02-14', 'SELECT * FROM nightmares WHERE hope = NULL', 7),
('Elena Vasquez', '2020-06-06', 'XSS payload found in my dreams... <script>alert("help")</script>', 23),
('David Morrison', '2021-01-01', 'The admin panel... it calls to me... /phantom-admin', 31),
('Lisa Park', '2021-03-15', 'Base64 whispers: Q1RGe1RoM19EM2RfV2gxc3Azcl9UaDMxcl9TM2NyM3RzXzFuX3RoM19ENGR9', 18),
('Robert Kim', '2021-07-04', 'Supabase anon key leaked in console... check the network tab', 9),
('Amy Foster', '2022-12-25', 'The database speaks... injection points everywhere...', 27);

-- Insert some dark whispers
INSERT INTO public.dark_whispers (whisper_text, whispered_by) VALUES
('The walls bleed data... SQL injections seep through the cracks', 'Lost Developer'),
('<!-- whisper: the search box trusts user input... foolish mortals -->', 'Corrupted Spirit'),
('XSS payload: <img src=x onerror=alert("The dead have risen")>', 'Script Kiddie Ghost'),
('Check the browser console... secrets leak like blood', 'Debug Demon');

-- Insert phantom admin (weak credentials)
INSERT INTO public.phantom_admins (username, password_hash, access_level) VALUES
('admin', 'admin123', 'PHANTOM_LORD'),
('ghostuser', 'password', 'LOST_SOUL');

-- Enable RLS but make it deliberately weak for CTF purposes
ALTER TABLE public.cursed_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lost_souls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dark_whispers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phantom_admins ENABLE ROW LEVEL SECURITY;

-- Deliberately weak RLS policies (part of the CTF challenge)
CREATE POLICY "Public can read lost souls" ON public.lost_souls FOR SELECT USING (true);
CREATE POLICY "Public can read whispers" ON public.dark_whispers FOR SELECT USING (true);
CREATE POLICY "Public can insert whispers" ON public.dark_whispers FOR INSERT WITH CHECK (true);

-- The flag table intentionally has no public policies - must be exploited