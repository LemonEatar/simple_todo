import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nqtuhhhbfdgvfgdonimz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xdHVoaGhiZmRndmZnZG9uaW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEzNzcyNDYsImV4cCI6MTk5Njk1MzI0Nn0.UOKWse8fTSN5GnNeYbBs9dVDIqrvn9rPz_4pAoDtmK8';

export const supabase = createClient(supabaseUrl, supabaseKey);

