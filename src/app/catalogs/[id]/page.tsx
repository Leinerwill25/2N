'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function CatalogPage() {
  const params = useParams()
  const id = params?.id
  const [catalog, setCatalog] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchCatalogAndProducts()
    }
  }, [id])

  const fetchCatalogAndProducts = async () => {
    try {
      setLoading(true)
      
      // Fetch Catalog
      const { data: catalogData, error: catalogError } = await supabase
        .from('catalogos')
        .select('*')
        .eq('id', id)
        .single()
        
      if (catalogError) {
        console.error("Error fetching catalog:", catalogError)
      }
      
      setCatalog(catalogData)

      // Fetch Products
      const { data: productsData, error: productsError } = await supabase
        .from('productos')
        .select('*')
        .eq('catalogo_id', id)
        .order('nombre', { ascending: true })
        
      if (productsError) {
        console.error("Error fetching products:", productsError)
      }
      
      setProducts(productsData || [])
    } catch (err) {
      console.error("Unexpected error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-foreground/60">Cargando catálogo...</div>
      </div>
    )
  }

  if (!catalog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="text-foreground/60">Catálogo no encontrado</div>
        <Link href="/" className="text-brand-blue hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-foreground font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-brand-dark hover:text-brand-orange transition-colors flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver</span>
          </Link>
          <div className="font-bold text-xl text-brand-dark flex flex-col items-start justify-center">
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider leading-none mb-0.5">Casa de Representación, C.A.</span>
            <div className="flex items-baseline font-extrabold text-2xl leading-none">
              <span className="text-brand-blue">2</span>
              <span className="text-brand-orange">N</span>
            </div>
          </div>
          <div className="w-10"></div> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">Catálogo</span>
          <h1 className="text-4xl font-bold text-brand-dark mb-4">{catalog.nombre}</h1>
          <p className="text-gray-600 max-w-3xl">{catalog.descripcion}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <div className="col-span-4 text-center text-foreground/60 py-12">
              No hay productos registrados en este catálogo.
            </div>
          ) : (
            products.map((product: any) => (
              <Link href={`/products/${product.id}`} key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col group">
                <div className="relative h-48 bg-muted flex items-center justify-center">
                  {product.imagen_url ? (
                    <Image src={product.imagen_url} alt={product.nombre} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-contain p-4" />
                  ) : (
                    <ShoppingBag className="h-12 w-12 text-foreground/20" />
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-brand-orange transition-colors">{product.nombre}</h3>
                    {product.principio_activo && (
                      <p className="text-sm text-brand-blue font-medium mb-1">{product.principio_activo}</p>
                    )}
                    {product.presentacion && (
                      <p className="text-sm text-foreground/60 mb-2">{product.presentacion}</p>
                    )}
                    <p className="text-sm text-foreground/60 line-clamp-2">{product.descripcion}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-sm">
                    <span className="text-foreground/60">Stock: {product.stock}</span>
                    <span className="font-bold text-brand-orange">
                      {product.precio > 0 ? `$${product.precio.toFixed(2)}` : <span className="text-brand-blue group-hover:text-brand-orange transition-colors">Consultar</span>}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
