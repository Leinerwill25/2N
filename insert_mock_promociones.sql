-- SQL script to insert mock/test promotions into public.descuentos_visuales table,
-- automatically linking them to existing catalogs by name so that redirection works.

-- Clean existing mock promotions first
DELETE FROM public.descuentos_visuales;

-- Insert new visual discounts with related catalogs
INSERT INTO public.descuentos_visuales (titulo, porcentaje, imagen_url, catalogo_id, activo, order_index)
VALUES 
  (
    'Hasta 30% de Descuento en la Línea de Vitaminas y Minerales', 
    30, 
    'https://images.unsplash.com/photo-1593009805482-a5d2a9844577?auto=format&fit=crop&q=80&w=400', 
    (SELECT id FROM catalogos WHERE nombre = 'Línea Vitaminas y Minerales' LIMIT 1), 
    true, 
    1
  ),
  (
    '20% de Descuento Especial en la Línea Analgésica Antiinflamatoria', 
    20, 
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400', 
    (SELECT id FROM catalogos WHERE nombre = 'Línea Analgésica Antiinflamatoria' LIMIT 1), 
    true, 
    2
  ),
  (
    '15% de Descuento en Medicamentos de la Línea Antibiótica', 
    15, 
    'https://images.unsplash.com/photo-1607619056574-7b8d304b3b86?auto=format&fit=crop&q=80&w=400', 
    (SELECT id FROM catalogos WHERE nombre = 'Línea Antibiótica' LIMIT 1), 
    true, 
    3
  ),
  (
    '25% de Descuento en toda la Línea Gastrointestinal', 
    25, 
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400', 
    (SELECT id FROM catalogos WHERE nombre = 'Línea Gastrointestinal' LIMIT 1), 
    true, 
    4
  ),
  (
    '10% de Descuento en la Línea de Salud Sexual', 
    10, 
    'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=400', 
    (SELECT id FROM catalogos WHERE nombre = 'Línea Salud Sexual' LIMIT 1), 
    true, 
    5
  );
