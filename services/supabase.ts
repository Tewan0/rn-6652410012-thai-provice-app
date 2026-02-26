import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://verqfyvhfhmojlstilxa.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcnFmeXZoZmhtb2psc3RpbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODkxMjAsImV4cCI6MjA4NzU2NTEyMH0.1BK-A3_qsuD-wLgOd61JM6BfcgexVAme30WEH14DsIE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
