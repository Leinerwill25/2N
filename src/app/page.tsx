'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { supabase } from '@/lib/supabase'
import { getLatestRate } from '@/lib/rates-client'
import { 
  Heart, 
  Shield, 
  Clock, 
  Truck, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  CreditCard, 
  ArrowRight, 
  Globe, 
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  ClipboardCheck,
  Building2,
  Target,
  Eye,
  Zap,
  Users,
  Star,
  Leaf,
  ChevronDown
} from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [emblaRef] = useEmblaCarousel({ loop: true })
  const [products, setProducts] = useState<any[]>([])
  const [catalogs, setCatalogs] = useState<any[]>([])
  const [rates, setRates] = useState({ usd: 1, eur: 1 })
  const [showAllCatalogs, setShowAllCatalogs] = useState(false)
  const [isMoleculesOpen, setIsMoleculesOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchRates()
    fetchCatalogs()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('productos').select('*').limit(4)
    setProducts(data || [])
  }

  const fetchCatalogs = async () => {
    const { data, error } = await supabase.from('catalogos').select('*')
    if (error) {
      console.error('Error fetching catalogs:', error)
    }
    console.log('Catalogs data fetched:', data)
    setCatalogs(data || [])
  }

  const fetchRates = async () => {
    const usdRate = await getLatestRate('USD')
    const eurRate = await getLatestRate('EUR')
    setRates({
      usd: usdRate?.rate || 36.5,
      eur: eurRate?.rate || 40.0,
    })
  }

  const calculateEquivalents = (price: number, currency: string) => {
    let bs = 0
    let usd = 0
    let eur = 0

    if (currency === 'BS') {
      bs = price
      usd = price / rates.usd
      eur = price / rates.eur
    } else if (currency === 'USD') {
      usd = price
      bs = price * rates.usd
      eur = (price * rates.usd) / rates.eur
    } else if (currency === 'EUR') {
      eur = price
      bs = price * rates.eur
      usd = (price * rates.eur) / rates.usd
    }

    return { usd, eur, bs }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  }



  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground font-sans overflow-x-hidden">
      
      {/* 1. Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md text-brand-dark shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex flex-col items-start justify-center">
              <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider leading-none mb-1">Casa de Representación, C.A.</span>
              <div className="flex items-baseline font-extrabold text-4xl leading-none">
                <span className="text-brand-blue">2</span>
                <span className="text-brand-orange">N</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium items-center">
              <a href="#inicio" className="text-brand-dark/70 hover:text-brand-orange transition-colors">Inicio</a>
              <a href="#nosotros" className="text-brand-dark/70 hover:text-brand-orange transition-colors">Nosotros</a>
              
              {/* Moléculas Dropdown */}
              <div className="relative group">
                <a href="#catalogos" className="flex items-center gap-1 text-brand-dark/70 hover:text-brand-orange transition-colors py-2">
                  Moléculas <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute top-full left-0 mt-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {catalogs.length === 0 ? (
                      <span className="px-4 py-3 text-sm text-gray-500">Cargando...</span>
                    ) : (
                      catalogs.map(catalog => (
                        <a 
                          key={catalog.id} 
                          href={`/catalogs/${catalog.id}`}
                          className="block px-4 py-2.5 text-sm leading-normal text-brand-dark hover:bg-brand-orange/10 hover:text-brand-orange rounded-lg transition-colors whitespace-nowrap"
                        >
                          {catalog.nombre}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <a href="#aliados" className="text-brand-dark/70 hover:text-brand-orange transition-colors">Aliados</a>
              <a href="#contacto" className="text-brand-dark/70 hover:text-brand-orange transition-colors">Contacto</a>
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
              <a href="#inicio" className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>Inicio</a>
              <a href="#nosotros" className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
              
              {/* Moléculas Dropdown Mobile */}
              <div>
                <button 
                  onClick={() => setIsMoleculesOpen(!isMoleculesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange"
                >
                  Moléculas <ChevronDown className={`h-5 w-5 transition-transform ${isMoleculesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMoleculesOpen && (
                  <div className="pl-6 pr-3 py-2 space-y-1 bg-gray-50/50 rounded-lg mx-3 mb-2">
                    <a href="#catalogos" className="block py-2 text-sm font-medium text-brand-dark hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>Ver todos</a>
                    {catalogs.map(catalog => (
                      <a 
                        key={catalog.id} 
                        href={`/catalogs/${catalog.id}`}
                        className="block py-2 text-sm leading-normal text-brand-dark/70 hover:text-brand-orange"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {catalog.nombre}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#aliados" className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>Aliados</a>
              <a href="#contacto" className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-orange" onClick={() => setIsMenuOpen(false)}>Contacto</a>
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

      <main className="flex-grow pt-20">
        
        {/* 2. Hero Section */}
        <section id="inicio" className="relative bg-gradient-to-br from-white to-muted overflow-hidden min-h-[85vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero_bg.png"
              alt="Pharmacy interior"
              fill
              className="object-cover object-center opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A8F]/80 to-[#0D1B4B]/90"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              className="max-w-3xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">2N — Bienestar con Sello de Calidad y Confianza</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Bienestar con Sello de Calidad y Confianza
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Somos una empresa venezolana dedicada a la importación, distribución y comercialización de productos farmacéuticos de uso humano, avalados por el Ministerio de Salud y el Instituto Nacional de Higiene Rafael Rangel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#catalogos" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Ver Catálogos
                </a>
                <a 
                  href="#contacto" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Contáctanos
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Secciones movidas y actualizadas */}

        {/* 3. Lo Que Somos */}
        <section id="lo-que-somos" className="py-24 bg-white relative overflow-hidden">
          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/5 rounded-bl-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-orange/5 rounded-tr-full -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">Lo que somos</span>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Operamos bajo estrictas normativas sanitarias y de buenas prácticas</h2>
              <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full"></div>
            </div>

            {/* Grid de Lo Que Somos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                { icon: ShieldCheck, title: "Excelencia Operativa", desc: "Importación y comercialización de medicamentos de alta calidad para el mercado venezolano." },
                { icon: ClipboardCheck, title: "Compromiso Normativo", desc: "Cumplimiento riguroso de los estándares de almacenamiento y distribución oficial." },
                { icon: Heart, title: "Bienestar Social", desc: "Abastecimiento estratégico de fármacos para patologías diversas y tratamientos de uso prolongado." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-start hover:-translate-y-2">
                  <div className="bg-muted p-4 rounded-xl inline-block mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <item.icon className="h-6 w-6 text-brand-orange group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-brand-dark group-hover:text-brand-orange transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Nuestra Esencia (Misión y Visión) */}
        <section id="nosotros" className="py-24 bg-muted px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">Nosotros</span>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Nuestra Esencia</h2>
              <div className="w-20 h-1 bg-brand-blue mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Misión */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all border-l-4 border-brand-blue relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-blue/10 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue">Misión</h3>
                </div>
                <div className="text-gray-600 leading-relaxed text-sm">
                  <p className="text-lg font-semibold text-brand-dark mb-4">"Garantizar el acceso de la familia venezolana a soluciones de alta calidad."</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>
                      Excelencia operativa en la cadena de suministro.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>
                      Estricto cumplimiento de estándares sanitarios.
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Visión */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all border-l-4 border-brand-orange relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-orange/10 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-brand-orange" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-orange">Visión</h3>
                </div>
                <div className="text-gray-600 leading-relaxed text-sm">
                  <p className="text-lg font-semibold text-brand-dark mb-4">"Consolidarnos como la casa de representación referente en Venezuela."</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                      Liderar la cadena de suministro farmacéutico.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                      Medicamentos asequibles y de disponibilidad inmediata.
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. Nuestros Valores */}
        <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">Cultura Corporativa</span>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Nuestros Valores</h2>
              <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { title: "Responsabilidad Social", desc: "Comprometidos con el bienestar de la comunidad.", icon: Heart },
                { title: "Innovación y Adaptabilidad", desc: "Evolucionamos con las necesidades del mercado.", icon: Zap },
                { title: "Trabajo en Equipo", desc: "Sinergia para lograr objetivos comunes.", icon: Users },
                { title: "Excelencia", desc: "Buscamos la máxima calidad en todo lo que hacemos.", icon: Star },
                { title: "Integridad", desc: "Actuamos con ética, transparencia y honestidad.", icon: Shield },
                { title: "Sostenibilidad", desc: "Crecimiento responsable con el entorno.", icon: Leaf }
              ].map((valor, index) => (
                <div key={index} className="flex flex-col p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group hover:-translate-y-1">
                  <div className="bg-brand-blue/5 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <valor.icon className="h-6 w-6 text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-orange transition-colors">{valor.title}</h3>
                  <p className="text-gray-500 text-sm">{valor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Catálogos / Líneas Terapéuticas */}
        <section id="catalogos" className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">Líneas Terapéuticas</span>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Nuestros Catálogos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Explora nuestros catálogos por línea terapéutica y consulta los productos disponibles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {catalogs.length === 0 ? (
                <div className="col-span-4 text-center text-foreground/60">Cargando catálogos...</div>
              ) : (
                catalogs.slice(0, showAllCatalogs ? catalogs.length : 4).map((catalog: any) => {
                  return (
                    <a 
                      href={`/catalogs/${catalog.id}`} 
                      key={catalog.id} 
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col group cursor-pointer"
                    >
                      <div className="relative h-48 bg-muted flex items-center justify-center">
                        {catalog.image_url ? (
                          <Image src={catalog.image_url} alt={catalog.nombre} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <ShoppingBag className="h-12 w-12 text-foreground/20" />
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-brand-orange transition-colors">{catalog.nombre}</h3>
                          <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{catalog.descripcion || 'Sin descripción'}</p>
                        </div>
                        <div className="flex items-center text-brand-blue text-sm font-medium group-hover:translate-x-1 transition-transform">
                          Ver productos <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </a>
                  )
                })
              )}
            </div>
            
            {catalogs.length > 4 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllCatalogs(!showAllCatalogs)}
                  className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-medium py-3 px-8 rounded-full transition-colors"
                >
                  {showAllCatalogs ? 'Ver menos' : 'Ver más'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 6. Presencia Nacional */}
        <section id="presencia" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">Alcance</span>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Presencia a Nivel Nacional</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Con cobertura en los principales estados de Venezuela</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Columna Izquierda: Stats */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                <motion.div 
                  className="bg-muted p-8 rounded-2xl text-center sm:col-span-2"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                >
                  <span className="text-6xl font-bold text-brand-orange block mb-2">8+</span>
                  <span className="text-brand-dark font-medium text-lg">Estados con cobertura</span>
                </motion.div>
                <motion.div 
                  className="bg-muted p-6 rounded-2xl text-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <span className="text-4xl font-bold text-brand-blue block mb-2">4+</span>
                  <span className="text-brand-dark font-sm">Años en el mercado</span>
                </motion.div>
                <motion.div 
                  className="bg-muted p-6 rounded-2xl text-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <span className="text-4xl font-bold text-brand-blue block mb-2">6+</span>
                  <span className="text-brand-dark font-sm">Aliados comerciales</span>
                </motion.div>
              </motion.div>

              {/* Columna Derecha: Estados */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-brand-dark mb-4">Cobertura Estratégica</h3>
                <p className="text-gray-600 mb-6">Operando desde 2022, aseguramos el abastecimiento en las regiones clave del país.</p>
                <div className="flex flex-wrap gap-3">
                  {["Zulia", "Lara", "Miranda", "Monagas", "Táchira", "Mérida", "Aragua", "Distrito Capital"].map((estado, index) => (
                    <span key={index} className="px-4 py-2 bg-brand-blue/10 text-brand-blue text-sm font-medium rounded-full hover:bg-brand-orange hover:text-white transition-colors cursor-default">
                      {estado}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <p className="text-center text-gray-500 text-sm">Operando desde 2022, expandiéndonos año a año.</p>
          </div>
        </section>

        {/* 7. Aliados Comerciales */}
        <section id="aliados" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">Confianza</span>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Aliados Comerciales</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Trabajamos con las principales droguerías del país</p>
            </div>

            <div className="relative overflow-hidden py-10">
              <motion.div 
                className="flex gap-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              >
                {[
                  "Crist Medicals", "Droguería Nibiru", "Insuaminca", "Droguería Hatillana", "Droguería Solidaria", "Droguería Infarven",
                  "Crist Medicals", "Droguería Nibiru", "Insuaminca", "Droguería Hatillana", "Droguería Solidaria", "Droguería Infarven"
                ].map((aliado, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 min-w-[280px]">
                    <div className="bg-brand-blue/5 p-3 rounded-xl">
                      <Building2 className="h-6 w-6 text-brand-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark">{aliado}</h3>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer id="contacto" className="bg-brand-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-white">2N</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Casa de Representación 2N, C.A. — Distribuidora e importadora de medicamentos comprometidos con la salud y el bienestar de toda Venezuela.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#inicio" className="hover:text-brand-orange transition-colors">Inicio</a></li>
                <li><a href="#nosotros" className="hover:text-brand-orange transition-colors">Nosotros</a></li>
                <li><a href="#moleculas" className="hover:text-brand-orange transition-colors">Catálogos</a></li>
                <li><a href="#aliados" className="hover:text-brand-orange transition-colors">Aliados</a></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-orange" />
                  0412-504-0440
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-brand-orange" />
                  casaderepresentacion2nventas@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-orange" />
                  Caracas, Venezuela.
                </li>
              </ul>
            </div>

            {/* Redes */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/casaderepresentacion2n/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://wa.me/584125040440" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
            <p>&copy; 2026 Casa de Representación 2N, C.A. Todos los derechos reservados.</p>
            <p>Sello de Calidad y Confianza</p>
          </div>
        </div>
      </footer>

        {/* Botón flotante de WhatsApp */}
        <a 
          href="https://wa.me/584125040440?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%2C%20me%20interesa%20cotizar%20algunos%20productos." 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50 flex items-center justify-center"
          aria-label="Contactar por WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.163 1.236 8.41 3.483 2.246 2.246 3.482 5.234 3.482 8.41 0 6.556-5.332 11.888-11.888 11.888-2.008 0-3.978-.512-5.728-1.484l-6.265 1.7zm6.34-3.15c1.558.924 3.41 1.411 5.3 1.411 5.617 0 10.188-4.57 10.188-10.188 0-2.72-1.057-5.275-2.977-7.194-1.92-1.919-4.475-2.977-7.193-2.977-5.618 0-10.188 4.57-10.188 10.188 0 1.886.516 3.722 1.492 5.311L1.242 22.75l6.335-1.66zM17.472 14.397c-.3-.149-1.777-.876-2.047-.975-.27-.099-.466-.149-.663.149-.197.298-.761.975-.933 1.173-.173.199-.346.223-.646.074-.3-.149-1.265-.466-2.41-1.484-.89-.794-1.49-1.774-1.665-2.073-.173-.299-.018-.46.131-.609.135-.133.3-.346.45-.52.15-.173.2-.298.3-.497.1-.198.05-.371-.025-.52-.075-.149-.663-1.597-.91-2.194-.24-.58-.485-.5-.663-.51-.172-.007-.37-.007-.568-.007-.198 0-.52.074-.793.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.777-.726 2.027-1.427.25-.702.25-1.303.175-1.427-.075-.124-.27-.199-.57-.348z" />
          </svg>
        </a>
    </div>
  )
}
