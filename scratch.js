const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://weuausmthbnfqmowtjoc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldWF1c210aGJuZnFtb3d0am9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzU0NTMsImV4cCI6MjEwMTUxMTQ1M30.SASFROP-ib89aEA8-pXO3u4VQUVy6jXI6_hX_SNNkuM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDuplicados() {
  const { data, error } = await supabase
    .from('registros')
    .select('id, nombre, email, created_at')
    .order('email', { ascending: true });

  if (error) { console.error(error); return; }

  // Agrupar por email
  const grupos = {};
  for (const r of data) {
    if (!grupos[r.email]) grupos[r.email] = [];
    grupos[r.email].push(r);
  }

  // Filtrar solo los que tienen más de 1 registro
  const duplicados = Object.entries(grupos).filter(([_, lista]) => lista.length > 1);

  console.log(`\n=== TOTAL REGISTROS EN LA BD: ${data.length} ===`);
  console.log(`=== EMAILS CON MÁS DE 1 REGISTRO: ${duplicados.length} ===\n`);

  for (const [email, lista] of duplicados) {
    console.log(`📧 ${email}  →  ${lista.length} veces registrado`);
    for (const r of lista) {
      console.log(`   - ID ${r.id} | ${r.nombre} | ${new Date(r.created_at).toLocaleString('es-MX')}`);
    }
    console.log('');
  }
}

checkDuplicados();
