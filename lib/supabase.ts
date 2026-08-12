import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://weuausmthbnfqmowtjoc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldWF1c210aGJuZnFtb3d0am9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzU0NTMsImV4cCI6MjEwMTUxMTQ1M30.SASFROP-ib89aEA8-pXO3u4VQUVy6jXI6_hX_SNNkuM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Registro = {
  id: number;
  created_at: string;
  nombre: string;
  pais: string;
  empresa: string;
  email: string;
  telefono: string;
  necesidad?: string;
  ofrecimiento?: string;
  mesa_numero: number;
  mesa_pais: string;
  mesa_bandera: string;
};
