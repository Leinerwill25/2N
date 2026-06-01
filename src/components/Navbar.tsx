'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ChevronDown, Phone, Menu, X, Search, Loader2 } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoleculesOpen, setIsMoleculesOpen] = useState(false)
  const [catalogs, setCatalogs] = useState<any[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCatalogs = async () => {
      const { data, error } = await supabase.from('catalogos').select('*')
      if (error) {
        console.error('Error fetching catalogs:', error)
      } else {
        setCatalogs(data || [])
      }
    }
    fetchCatalogs()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true)
        try {
          const { data, error } = await supabase
            .from('productos')
            .select('id, nombre, principio_activo, presentacion')
            .or(`nombre.ilike.%${searchQuery}%,principio_activo.ilike.%${searchQuery}%`)
            .eq('activo', true)
            .limit(6)
          if (error) throw error
          setSearchResults(data || [])
        } catch (err) {
          console.error('Error searching products:', err)
          setSearchResults([])
        } finally {
          setIsSearching(false)
          setShowResults(true)
        }
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const getLinkHref = (hash: string) => {
    if (pathname === '/') {
      return hash
    }
    return `/${hash}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md text-brand-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Country Indicator */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link href="/" className="flex-shrink-0 flex items-center justify-center h-16 w-36 relative overflow-hidden">
              <Image 
                src="/logon_transparent.png" 
                alt="2N Logo"
                fill
                sizes="144px"
                className="object-contain"
                style={{ 
                  transform: 'scale(2.2)',
                  transformOrigin: 'center 46%'
                }}
                priority
              />
            </Link>
            
            {/* Venezuela Flag Indicator */}
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-50/80 border border-gray-150 rounded-lg text-[11px] sm:text-xs font-bold text-brand-dark/80 select-none hover:bg-gray-100/50 hover:border-gray-300 transition-colors duration-200">
              <div className="relative w-5 h-3.5 overflow-hidden rounded-[2px] shadow-sm border border-gray-200/50 flex-shrink-0">
                <Image
                  src="/Flag_of_Venezuela.svg.png"
                  alt="Bandera de Venezuela"
                  fill
                  className="object-cover"
                />
              </div>
              <span>Ven</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium items-center">
            <Link href={getLinkHref('#inicio')} className="text-brand-dark/70 hover:text-brand-orange transition-colors">
              Inicio
            </Link>
            <Link href={getLinkHref('#nosotros')} className="text-brand-dark/70 hover:text-brand-orange transition-colors">
              Nosotros
            </Link>
            
            {/* Moléculas Dropdown */}
            <div className="relative group">
              <span className="flex items-center gap-1 text-brand-dark/70 hover:text-brand-orange transition-colors py-2 cursor-pointer">
                Líneas Terapéuticas <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </span>
              <div className="absolute top-full left-0 mt-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                <div className="p-2 flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {catalogs.length === 0 ? (
                    <span className="px-4 py-3 text-sm text-gray-500">Cargando...</span>
                  ) : (
                    catalogs.map(catalog => (
                      <Link 
                        key={catalog.id} 
                        href={`/catalogs/${catalog.id}`}
                        className="block px-4 py-2.5 text-sm leading-normal text-brand-dark hover:bg-brand-orange/10 hover:text-brand-orange rounded-lg transition-colors whitespace-nowrap"
                      >
                        {catalog.nombre}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            <Link href={getLinkHref('#aliados')} className="text-brand-dark/70 hover:text-brand-orange transition-colors">
              Aliados
            </Link>
            <Link href={getLinkHref('#contacto')} className="text-brand-dark/70 hover:text-brand-orange transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:block relative w-64 mr-4" ref={searchRef}>
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar medicamento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowResults(true)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none transition-all focus:bg-white focus:border-brand-orange/50 focus:ring-4 focus:ring-brand-orange/10 text-brand-dark placeholder-gray-400"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-brand-orange" />
              )}
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden max-h-[320px] overflow-y-auto custom-scrollbar">
                {isSearching ? (
                  <div className="p-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-orange" />
                    <span>Buscando...</span>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No se encontraron medicamentos
                  </div>
                ) : (
                  <div className="py-2">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={() => {
                          setShowResults(false)
                          setSearchQuery('')
                        }}
                        className="block px-4 py-2.5 hover:bg-brand-orange/5 transition-colors border-b border-gray-50 last:border-b-0 text-left"
                      >
                        <div className="font-bold text-sm text-brand-dark truncate">{product.nombre}</div>
                        <div className="text-[11px] text-gray-500 truncate mt-0.5">
                          {product.principio_activo} {product.presentacion && `• ${product.presentacion}`}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://wa.me/584125040440" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-brand-orange hover:bg-brand-orange/95 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contactar WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-dark hover:text-brand-orange focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 max-h-[80vh] overflow-y-auto">
          {/* Mobile Search Bar */}
          <div className="px-4 pt-4 pb-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar medicamento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowResults(true)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none transition-all focus:bg-white focus:border-brand-orange/50 focus:ring-4 focus:ring-brand-orange/10 text-brand-dark placeholder-gray-400"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-brand-orange" />
              )}
            </div>
            
            {/* Search Results for Mobile */}
            {showResults && searchQuery.trim().length >= 2 && (
              <div className="relative mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden max-h-[240px] overflow-y-auto custom-scrollbar">
                {isSearching ? (
                  <div className="p-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-orange" />
                    <span>Buscando...</span>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No se encontraron medicamentos
                  </div>
                ) : (
                  <div className="py-2">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={() => {
                          setShowResults(false)
                          setSearchQuery('')
                          setIsMenuOpen(false)
                        }}
                        className="block px-4 py-2.5 hover:bg-brand-orange/5 transition-colors border-b border-gray-50 last:border-b-0 text-left"
                      >
                        <div className="font-bold text-sm text-brand-dark truncate">{product.nombre}</div>
                        <div className="text-[11px] text-gray-500 truncate mt-0.5">
                          {product.principio_activo} {product.presentacion && `• ${product.presentacion}`}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href={getLinkHref('#inicio')} className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </Link>
            <Link href={getLinkHref('#nosotros')} className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>
              Nosotros
            </Link>
            
            {/* Moléculas Dropdown Mobile */}
            <div>
              <button 
                onClick={() => setIsMoleculesOpen(!isMoleculesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange"
              >
                Líneas Terapéuticas <ChevronDown className={`h-5 w-5 transition-transform ${isMoleculesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMoleculesOpen && (
                <div className="pl-6 pr-3 py-2 space-y-1 bg-gray-50/50 rounded-lg mx-3 mb-2">
                  <Link href={getLinkHref('#catalogos')} className="block py-2 text-sm font-medium text-brand-dark hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>
                    Ver todos
                  </Link>
                  {catalogs.map(catalog => (
                    <Link 
                      key={catalog.id} 
                      href={`/catalogs/${catalog.id}`}
                      className="block py-2 text-sm leading-normal text-brand-dark/70 hover:text-brand-orange"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {catalog.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={getLinkHref('#aliados')} className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>
              Aliados
            </Link>
            <Link href={getLinkHref('#contacto')} className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>
              Contacto
            </Link>
            <a 
              href="https://wa.me/584125040440" 
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-white bg-brand-orange rounded-md text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Contactar WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
