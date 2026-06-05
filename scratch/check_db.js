const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rhwelwvqmpiwicaryfbm.supabase.co';
const supabaseAnonKey = 'sb_publishable_IbvBttiuglm8pOgXiIfayg_zbywa13K';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log('--- Fetching catalogos ---');
  const { data: catalogos, error: catErr } = await supabase.from('catalogos').select('id, nombre');
  if (catErr) {
    console.error('Error fetching catalogos:', catErr);
  } else {
    console.log(catalogos);
  }

  console.log('\n--- Fetching descuentos_visuales ---');
  const { data: descuentos, error: descErr } = await supabase.from('descuentos_visuales').select('*');
  if (descErr) {
    console.error('Error fetching descuentos_visuales:', descErr);
  } else {
    console.log(descuentos);
  }
}

run();
