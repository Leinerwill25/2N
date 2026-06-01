-- SQL script to associate existing discounts with their correct catalogs.
-- Run this in your Supabase SQL Editor to apply changes immediately.

UPDATE public.descuentos_visuales 
SET catalogo_id = (SELECT id FROM public.catalogos WHERE nombre = 'Línea Vitaminas y Minerales' LIMIT 1)
WHERE titulo = 'Hasta 30% de Descuento en la Línea de Cuidado Bucal y Dental';

UPDATE public.descuentos_visuales 
SET catalogo_id = (SELECT id FROM public.catalogos WHERE nombre = 'Línea Analgésica Antiinflamatoria' LIMIT 1)
WHERE titulo = '20% de Descuento Especial en Analgésicos y Fórmulas Pediátricas';

UPDATE public.descuentos_visuales 
SET catalogo_id = (SELECT id FROM public.catalogos WHERE nombre = 'Línea Antibiótica' LIMIT 1)
WHERE titulo = '15% de Descuento en Antibióticos y Medicamentos de la Línea Cardiovascular';

UPDATE public.descuentos_visuales 
SET catalogo_id = (SELECT id FROM public.catalogos WHERE nombre = 'Línea Vitaminas y Minerales' LIMIT 1)
WHERE titulo = '25% de Descuento en Vitaminas y Suplementos para el Fortalecimiento Inmune';

UPDATE public.descuentos_visuales 
SET catalogo_id = (SELECT id FROM public.catalogos WHERE nombre = 'Línea Salud Respiratoria' LIMIT 1)
WHERE titulo = '10% de Descuento en Equipos Médicos, Tensiómetros y Nebulizadores';
