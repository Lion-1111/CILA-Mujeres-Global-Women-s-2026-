import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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
  mesa_numero: number | string;
  mesa_pais: string;
  mesa_bandera: string;
};
