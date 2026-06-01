-- SQL script to insert mock/test promotions into public.descuentos_visuales table for testing purposes
INSERT INTO public.descuentos_visuales (titulo, porcentaje, imagen_url, catalogo_id, activo, order_index)
VALUES 
  ('Hasta 30% de Descuento en la Línea de Cuidado Bucal y Dental', 30, 'https://images.unsplash.com/photo-1593009805482-a5d2a9844577?auto=format&fit=crop&q=80&w=400', NULL, true, 1),
  ('20% de Descuento Especial en Analgésicos y Fórmulas Pediátricas', 20, 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400', NULL, true, 2),
  ('15% de Descuento en Antibióticos y Medicamentos de la Línea Cardiovascular', 15, 'https://images.unsplash.com/photo-1607619056574-7b8d304b3b86?auto=format&fit=crop&q=80&w=400', NULL, true, 3),
  ('25% de Descuento en Vitaminas y Suplementos para el Fortalecimiento Inmune', 25, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400', NULL, true, 4),
  ('10% de Descuento en Equipos Médicos, Tensiómetros y Nebulizadores', 10, 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=400', NULL, true, 5);
