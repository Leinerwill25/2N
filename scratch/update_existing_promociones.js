const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rhwelwvqmpiwicaryfbm.supabase.co';
const supabaseAnonKey = 'sb_publishable_IbvBttiuglm8pOgXiIfayg_zbywa13K';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log('Fetching catalogs...');
  const { data: catalogs, error: catErr } = await supabase.from('catalogos').select('id, nombre');
  if (catErr) {
    console.error('Error fetching catalogs:', catErr);
    return;
  }

  console.log('Catalogs loaded:', catalogs.map(c => c.nombre));

  // Helper to find catalog by name
  const findCatalogId = (name) => {
    const catalog = catalogs.find(c => c.nombre.toLowerCase().includes(name.toLowerCase()));
    return catalog ? catalog.id : null;
  };

  // Find IDs for catalog lines
  const analgesicaId = findCatalogId('Analgésica');
  const antibioticaId = findCatalogId('Antibiótica');
  const vitaminasId = findCatalogId('Vitaminas');
  const respiratoriaId = findCatalogId('Respiratoria');
  const digestivaId = findCatalogId('Gastrointestinal');

  console.log('Mapped IDs:');
  console.log('- Analgésica:', analgesicaId);
  console.log('- Antibiótica:', antibioticaId);
  console.log('- Vitaminas:', vitaminasId);
  console.log('- Respiratoria:', respiratoriaId);

  // Fetch discounts to get their IDs
  const { data: discounts, error: descErr } = await supabase.from('descuentos_visuales').select('id, titulo');
  if (descErr) {
    console.error('Error fetching discounts:', descErr);
    return;
  }

  for (const discount of discounts) {
    let targetCatalogId = null;
    const title = discount.titulo.toLowerCase();

    if (title.includes('analgésicos') || title.includes('analgésica')) {
      targetCatalogId = analgesicaId;
    } else if (title.includes('antibiótico') || title.includes('antibiótica')) {
      targetCatalogId = antibioticaId;
    } else if (title.includes('vitaminas') || title.includes('minerales')) {
      targetCatalogId = vitaminasId;
    } else if (title.includes('equipos médicos') || title.includes('nebulizadores') || title.includes('respiratoria')) {
      targetCatalogId = respiratoriaId;
    } else if (title.includes('cuidado bucal')) {
      // Since there is no dental/bucal line, we can associate it with Vitaminas or Analgésicos for demonstration
      // or map it to a general line. Let's link it to 'Línea Vitaminas y Minerales' so it redirects to a valid catalog!
      targetCatalogId = vitaminasId; 
      console.log(`Mapping "Cuidado Bucal" discount to Vitaminas y Minerales catalog for testing redirect`);
    }

    if (targetCatalogId) {
      console.log(`Updating "${discount.titulo}" to catalog_id: ${targetCatalogId}`);
      const { error: updateErr } = await supabase
        .from('descuentos_visuales')
        .update({ catalogo_id: targetCatalogId })
        .eq('id', discount.id);
      if (updateErr) {
        console.error(`Failed to update ${discount.titulo}:`, updateErr);
      } else {
        console.log(`Successfully updated: "${discount.titulo}"`);
      }
    } else {
      console.log(`No match for: "${discount.titulo}"`);
    }
  }

  console.log('Database updates completed!');
}

run();
