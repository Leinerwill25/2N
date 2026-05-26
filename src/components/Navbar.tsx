'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ChevronDown, Phone, Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoleculesOpen, setIsMoleculesOpen] = useState(false)
  const [catalogs, setCatalogs] = useState<any[]>([])

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
          {/* Logo */}
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://wa.me/584125040440" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
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
