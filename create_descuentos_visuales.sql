-- Create table for visual discounts
CREATE TABLE IF NOT EXISTS descuentos_visuales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  porcentaje INTEGER NOT NULL,
  imagen_url TEXT NOT NULL,
  catalogo_id UUID REFERENCES catalogos(id) ON DELETE SET NULL,
  activo BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE descuentos_visuales ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on descuentos_visuales" 
ON descuentos_visuales 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to perform all actions
CREATE POLICY "Allow authenticated users all actions on descuentos_visuales" 
ON descuentos_visuales 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
