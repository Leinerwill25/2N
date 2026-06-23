'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { supabase } from '@/lib/supabase'
import { getLatestRate } from '@/lib/rates-client'
import Navbar from '@/components/Navbar'
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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Play,
  Sparkles,
  Film
} from 'lucide-react'

const aliadosLogos = [
  { nombre: "ZakiPharma", img: "/Gemini_Generated_Image_2kxk002kxk002kxk.png" },
  { nombre: "Roipharma", img: "/Gemini_Generated_Image_6xxwan6xxwan6xxw.png" },
  { nombre: "Insuaminca", img: "/Gemini_Generated_Image_94s1i194s1i194s1.png" },
  { nombre: "Droguería Solidaria", img: "/Gemini_Generated_Image_gcsdopgcsdopgcsd.png" },
  { nombre: "Crist Medicals", img: "/Gemini_Generated_Image_h1zahph1zahph1za.png" },
  { nombre: "Hatillana", img: "/Gemini_Generated_Image_rll0carll0carll0.png" }
]

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true })
  const [products, setProducts] = useState<any[]>([])
  const [catalogs, setCatalogs] = useState<any[]>([])
  const [promoVideos, setPromoVideos] = useState<any[]>([])
  const [descuentos, setDescuentos] = useState<any[]>([])
  const [rates, setRates] = useState({ usd: 1, eur: 1 })
  const [showAllCatalogs, setShowAllCatalogs] = useState(false)

  const sliderRef = React.useRef<HTMLDivElement>(null)

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    fetchProducts()
    fetchRates()
    fetchCatalogs()
    fetchPromoVideos()
    fetchDescuentos()
  }, [])

  const fetchPromoVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos_promocionales')
        .select('*')
        .eq('empresa', '2n')
        .eq('activo', true)
        .order('order_index', { ascending: true })
      if (error) throw error
      setPromoVideos(data || [])
    } catch (err) {
      console.error('Error fetching promo videos:', err)
      setPromoVideos([])
    }
  }

  const fetchDescuentos = async () => {
    try {
      const { data, error } = await supabase
        .from('descuentos_visuales')
        .select('*')
        .eq('empresa', '2n')
        .eq('activo', true)
        .order('order_index', { ascending: true })
      if (error) throw error
      setDescuentos(data || [])
    } catch (err) {
      console.error('Error fetching visual discounts:', err)
      setDescuentos([])
    }
  }

  const getEmbedUrl = (videoUrl: string, tipo: string) => {
    if (tipo === 'youtube') {
      let id = ''
      if (videoUrl.includes('shorts/')) {
        id = videoUrl.split('shorts/')[1]?.split('?')[0] || ''
      } else if (videoUrl.includes('watch?v=')) {
        id = videoUrl.split('watch?v=')[1]?.split('&')[0] || ''
      } else if (videoUrl.includes('youtu.be/')) {
        id = videoUrl.split('youtu.be/')[1]?.split('?')[0] || ''
      }
      return id ? `https://www.youtube.com/embed/${id}` : videoUrl
    }
    if (tipo === 'instagram') {
      const cleanUrl = videoUrl.split('?')[0]
      const suffix = cleanUrl.endsWith('/') ? 'embed/' : '/embed/'
      return `${cleanUrl}${suffix}`
    }
    if (tipo === 'drive') {
      const parts = videoUrl.split('/d/')
      if (parts.length > 1) {
        const fileId = parts[1].split('/')[0]
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }
    return videoUrl
  }

  const fetchProducts = async () => {
    const { data } = await supabase.from('productos').select('*').eq('empresa', '2n').limit(4)
    setProducts(data || [])
  }

  const fetchCatalogs = async () => {
    const { data, error } = await supabase.from('catalogos').select('*').eq('empresa', '2n')
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
      <Navbar />

      <main className="flex-grow pt-20">
        
        {/* 2. Hero Section */}
        <section id="inicio" className="relative bg-gradient-to-br from-white to-muted overflow-hidden min-h-[85vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            >
              <source src="/video2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-mid/70 to-brand-blue/80"></div>
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

        {/* 3. Ofertas de la Semana */}
        <section id="promociones" className="py-16 bg-white relative overflow-hidden text-brand-dark">
          {/* Decorative design elements - light blue/orange shades */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-left mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-semibold tracking-wider uppercase text-xs px-4 py-2 rounded-full mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  Promociones Especiales
                </span>
              </div>

              {descuentos.length > 0 ? (
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-3.5 py-1.5 rounded-full hidden md:inline-block">
                    Haz clic en una oferta para ver su catálogo o desliza para ver más
                  </span>
                </div>
              ) : null}
            </div>

            {/* Carousel Container Wrapper with Side Navigation Arrows */}
            <div className="relative group/carousel">
              {descuentos.length > 0 ? (
                <>
                  {/* Left Arrow Button */}
                  <button 
                    onClick={() => scrollSlider('left')}
                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white hover:bg-brand-orange border border-gray-200 hover:border-brand-orange flex items-center justify-center text-brand-dark hover:text-white transition-all shadow-md hover:shadow-brand-orange/20 cursor-pointer opacity-0 group-hover/carousel:opacity-100 duration-300 hidden md:flex"
                    title="Anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {/* Right Arrow Button */}
                  <button 
                    onClick={() => scrollSlider('right')}
                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white hover:bg-brand-orange border border-gray-200 hover:border-brand-orange flex items-center justify-center text-brand-dark hover:text-white transition-all shadow-md hover:shadow-brand-orange/20 cursor-pointer opacity-0 group-hover/carousel:opacity-100 duration-300 hidden md:flex"
                    title="Siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Sliding Carousel */}
                  <div 
                    ref={sliderRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {descuentos.map((item: any, index) => {
                      const linkedCatalog = catalogs.find((c: any) => c.id === item.catalogo_id);
                      const catalogName = linkedCatalog ? linkedCatalog.nombre : "Oferta Especial";
                      
                      // Verificar si hay alguna promoción destacada explícitamente en todo el array
                      const hasAnyFeatured = descuentos.some((d: any) => d.is_featured === true);
                      
                      // Usar el campo is_featured, o hacer fallback al primer elemento si no hay ninguna destacada
                      const isFeatured = item.is_featured === true || (!hasAnyFeatured && index === 0);

                      // Valores dinámicos desde la BD con fallbacks
                      const fondoColor = item.fondo_color || '#9bd4c3';
                      const botonColor = item.boton_color || '#f2006c';
                      const shortName = item.marca_agua || (item.titulo ? item.titulo.split(' ')[0].toUpperCase() : 'OFERTA');
                      const etiquetaSuperior = item.etiqueta_superior || '✨ MANTÉN TU BIENESTAR BAJO CONTROL';
                      const tituloPrincipal = item.titulo_principal || 'Disfruta cada día sin consecuencias';
                      const etiquetaInferior = item.etiqueta_inferior || `💊 ${item.titulo} - Calidad Asegurada`;

                      const CardContent = isFeatured ? (
                        <div 
                          className="rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative border-none select-none group text-left flex flex-col md:flex-row items-center w-full h-auto md:h-[350px] p-6 md:p-10 gap-6 md:gap-10"
                          style={{ backgroundColor: fondoColor }}
                        >
                          
                          {/* Background Watermark */}
                          <div className="absolute right-[-10%] bottom-[-20%] text-[10rem] md:text-[14rem] font-black text-white/20 select-none pointer-events-none uppercase tracking-tighter" style={{ lineHeight: 0.8 }}>
                            {shortName}
                          </div>

                          {/* Left: Floating White Card */}
                          <div className="relative z-10 w-full md:w-[35%] bg-white rounded-3xl p-4 shadow-xl flex flex-col items-center justify-center flex-shrink-0 aspect-square md:aspect-auto md:h-full">
                            <div className="flex-1 w-full flex items-center justify-center">
                              <img 
                                src={item.imagen_url} 
                                alt={item.titulo} 
                                className="object-contain max-h-[160px] md:max-h-[200px] max-w-full transition-transform duration-500 group-hover:scale-105" 
                              />
                            </div>
                            <div className="mt-4 text-center pb-2">
                              <div className="text-[10px] md:text-xs font-black text-[#0c3e7f] uppercase tracking-wider">{item.titulo}</div>
                              <div className="text-[9px] md:text-[10px] font-bold text-[#23b33a] uppercase tracking-widest mt-1">Garantizado</div>
                            </div>
                          </div>

                          {/* Right: Text and CTA */}
                          <div className="relative z-10 flex-1 flex flex-col justify-center items-start w-full">
                            
                            {/* Top Pill */}
                            <div className="bg-white/20 text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 backdrop-blur-sm border border-white/30 flex items-center gap-2">
                              {etiquetaSuperior}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#0c3e7f] leading-tight mb-4 tracking-tight drop-shadow-sm">
                              {tituloPrincipal}
                            </h3>

                            {/* Details Pill */}
                            <div className="bg-black/10 text-white text-[11px] md:text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm flex items-center gap-2">
                              {etiquetaInferior}
                            </div>

                            {/* CTA Button */}
                            <div 
                              className="text-white py-3 px-8 rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:brightness-90"
                              style={{ backgroundColor: botonColor }}
                            >
                              Comprar Ahora <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>

                        </div>
                      ) : (
                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[350px] relative border border-gray-100 select-none group text-left p-4 card-glow w-full">
                          {/* Image Container */}
                          <div className="relative h-40 w-full bg-gray-50/60 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-gray-100/50 group-hover:bg-gray-50 transition-colors">
                            <img 
                              src={item.imagen_url} 
                              alt={item.titulo} 
                              className="object-contain max-h-full max-w-full rounded-xl transition-transform duration-500 group-hover:scale-105" 
                            />
                          </div>

                          {/* Text Info */}
                          <div className="mt-3 flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-widest block truncate">
                                {catalogName}
                              </span>
                              <h4 className="text-sm font-extrabold text-brand-dark line-clamp-2 leading-snug group-hover:text-brand-blue transition-colors">
                                {item.titulo}
                              </h4>
                              <p className="text-[11px] text-gray-400 font-medium">
                                Descuento de temporada
                              </p>
                            </div>

                            {/* CTA */}
                            <div className="mt-3 w-full bg-brand-blue/5 group-hover:bg-brand-orange text-brand-blue group-hover:text-white py-2 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1 transition-all duration-300">
                              <span>Explorar Catálogo</span>
                              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      );

                      return (
                        <div key={item.id} className={`flex-shrink-0 snap-start ${isFeatured ? 'w-[320px] sm:w-[600px] md:w-[850px] lg:w-[950px]' : 'w-[240px] sm:w-[260px]'}`}>
                          <Link 
                            href={item.catalogo_id ? `/catalogs/${item.catalogo_id}` : "#catalogos"}
                            className="block transform hover:-translate-y-1.5 transition-all duration-300 h-full"
                          >
                            {CardContent}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* Placeholder Skeletons */
                <div className="flex gap-6 overflow-hidden select-none opacity-60">
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <div 
                      key={idx} 
                      className="flex-shrink-0 w-[240px] sm:w-[260px] bg-white rounded-3xl border border-gray-150 p-4 h-[350px] flex flex-col justify-between relative animate-pulse"
                    >
                      <div className="h-40 w-full bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-50 shimmer" />
                      <div className="mt-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="h-2 w-16 bg-gray-100 rounded-full shimmer" />
                          <div className="h-3 w-36 bg-gray-100 rounded-full shimmer" />
                          <div className="h-3 w-28 bg-gray-100 rounded-full shimmer" />
                        </div>
                        <div className="h-9 w-full bg-gray-100 rounded-xl shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Videos Promocionales */}
        <section id="promociones-video" className="py-24 bg-gradient-to-tr from-brand-blue-mid to-brand-blue relative overflow-hidden text-white">
          {/* Decorative design elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue-mid/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-semibold tracking-wider uppercase text-xs px-4 py-2 rounded-full mb-3">
                <Film className="h-3.5 w-3.5" />
                Videos Interactivos
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                Nuestras <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Promociones</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-base leading-relaxed">
                Descubre contenidos exclusivos, consejos de salud y lanzamientos de medicamentos a través de nuestros videos interactivos.
              </p>
            </div>

            {promoVideos.length === 0 ? (
              /* Fallback: Premium Coming Soon video container */
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <motion.div 
                    className="lg:col-span-5 space-y-6 text-left"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full text-xs font-bold text-brand-orange uppercase tracking-wider">
                      <Film className="h-3.5 w-3.5" />
                      Próximamente
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                      Espacio de Novedades y <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Promociones 2N</span>
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      Estamos preparando contenido audiovisual interactivo especialmente para ti. En esta sección podrás conocer de primera mano nuestras promociones exclusivas, consejos de bienestar y detalles de nuestras líneas farmacéuticas.
                    </p>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                        Presentación de nuevas moléculas y medicamentos.
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                        Consejos prácticos de salud respaldados por expertos.
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="lg:col-span-7"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative aspect-[16/9] w-full rounded-[2rem] border-2 border-dashed border-white/20 bg-white/5 p-4 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center group hover:border-brand-orange/30 transition-all duration-500 shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-blue-mid/5 opacity-50" />
                      <div className="z-10 flex flex-col items-center gap-4 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-orange/50 group-hover:bg-brand-orange/5 transition-all duration-500 shadow-lg">
                          <Play className="h-8 w-8 text-white/40 group-hover:text-brand-orange transition-colors duration-500 ml-1" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange animate-pulse">En Producción</span>
                          <p className="text-sm text-gray-400">El reproductor se activará cuando subamos el video</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              /* Real Featured Horizontal Video */
              <div className="max-w-6xl mx-auto">
                {(() => {
                  const featuredVideo = promoVideos[0];
                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <motion.div 
                        className="lg:col-span-5 space-y-6 text-left"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/15 border border-brand-orange/30 rounded-full text-xs font-bold text-brand-orange uppercase tracking-wider">
                          <Film className="h-3.5 w-3.5 animate-pulse" />
                          Contenido Destacado
                        </div>
                        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                          {featuredVideo.titulo}
                        </h3>
                        <p className="text-gray-300 text-base leading-relaxed">
                          Te invitamos a ver este material interactivo que hemos preparado. Aquí conocerás los detalles de nuestras líneas terapéuticas, medicamentos de última generación y promociones especiales vigentes en 2N.
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4">
                          <a 
                            href="#catalogos" 
                            className="px-6 py-3 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-brand-orange/20 text-sm hover:-translate-y-0.5"
                          >
                            Ver Catálogos
                          </a>
                          {featuredVideo.url && (
                            <a 
                              href={featuredVideo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold rounded-xl transition-all text-sm hover:-translate-y-0.5"
                            >
                              Ver en origen
                            </a>
                          )}
                        </div>
                      </motion.div>

                      <motion.div 
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="relative aspect-[16/9] w-full rounded-[2.5rem] border border-white/10 bg-black shadow-2xl overflow-hidden group hover:border-brand-orange/30 transition-all duration-300">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-orange to-brand-blue rounded-[2.5rem] blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                          <div className="relative w-full h-full bg-black rounded-[2.4rem] overflow-hidden">
                            <iframe 
                              src={getEmbedUrl(featuredVideo.url, featuredVideo.tipo)}
                              className="w-full h-full absolute inset-0 border-0"
                              allowFullScreen
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </section>

        {/* 5. Nuestra Esencia (Misión y Visión) */}
        <section id="nosotros" className="py-24 bg-gradient-to-tr from-muted via-white to-muted/80 relative overflow-hidden">
          {/* Orbes de luz de fondo */}
          <div className="absolute top-10 left-10 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 text-brand-blue font-semibold tracking-wider uppercase text-xs px-4 py-2 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                Nosotros
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4 tracking-tight">
                Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-blue-mid">Esencia</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-orange to-transparent mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Misión */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transition-all border-l-8 border-brand-blue relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-brand-blue/8 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-blue/10 p-3.5 rounded-xl group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(26,58,143,0.3)]">
                    <Target className="h-6 w-6 text-brand-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue">Misión</h3>
                </div>
                <div className="text-gray-600 leading-relaxed text-sm">
                  <p className="text-lg font-semibold text-brand-dark mb-6">"Garantizar el acceso de la familia venezolana a soluciones de alta calidad."</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 group/item">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xs mt-0.5 font-bold group-hover/item:bg-brand-blue group-hover/item:text-white transition-all duration-300">✓</span>
                      <span className="group-hover/item:text-brand-dark transition-colors duration-300">Excelencia operativa en la cadena de suministro.</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xs mt-0.5 font-bold group-hover/item:bg-brand-blue group-hover/item:text-white transition-all duration-300">✓</span>
                      <span className="group-hover/item:text-brand-dark transition-colors duration-300">Estricto cumplimiento de estándares sanitarios.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Visión */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transition-all border-l-8 border-brand-orange relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-brand-orange/8 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-orange/10 p-3.5 rounded-xl group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(255,106,0,0.3)]">
                    <Eye className="h-6 w-6 text-brand-orange group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-orange">Visión</h3>
                </div>
                <div className="text-gray-600 leading-relaxed text-sm">
                  <p className="text-lg font-semibold text-brand-dark mb-6">"Consolidarnos como la casa de representación referente en Venezuela."</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 group/item">
                      <span className="w-5 h-5 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-xs mt-0.5 font-bold group-hover/item:bg-brand-orange group-hover/item:text-white transition-all duration-300">✓</span>
                      <span className="group-hover/item:text-brand-dark transition-colors duration-300">Liderar la cadena de suministro farmacéutico.</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="w-5 h-5 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-xs mt-0.5 font-bold group-hover/item:bg-brand-orange group-hover/item:text-white transition-all duration-300">✓</span>
                      <span className="group-hover/item:text-brand-dark transition-colors duration-300">Medicamentos asequibles y de disponibilidad inmediata.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. Sección de Catálogos / Líneas Terapéuticas */}
        <section id="catalogos" className="py-24 bg-muted/70">
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

        {/* 6. Lo Que Somos */}
        <section id="lo-que-somos" className="py-24 bg-white relative overflow-hidden">
          {/* Decorative background shape with floating animation */}
          <motion.div 
            animate={{ 
              y: [0, -12, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/5 rounded-bl-full -z-10"
          />
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
              scale: [1, 1.03, 1] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-orange/5 rounded-tr-full -z-10"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">Lo que somos</span>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Operamos bajo estrictas normativas sanitarias y de buenas prácticas</h2>
              <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full"></div>
            </motion.div>

            {/* Grid de Lo Que Somos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                { icon: ShieldCheck, title: "Excelencia Operativa", desc: "Importación y comercialización de medicamentos de alta calidad para el mercado venezolano." },
                { icon: ClipboardCheck, title: "Compromiso Normativo", desc: "Cumplimiento riguroso de los estándares de almacenamiento y distribución oficial." },
                { icon: Heart, title: "Bienestar Social", desc: "Abastecimiento estratégico de fármacos para patologías diversas y tratamientos de uso prolongado." }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-start cursor-default"
                >
                  <div className="bg-muted p-4 rounded-xl inline-block mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <item.icon className="h-6 w-6 text-brand-orange group-hover:text-white transition-colors group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-brand-dark group-hover:text-brand-orange transition-colors group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Nuestros Valores */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-brand-blue-mid to-brand-blue">
          {/* Orbes de luz de fondo */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-blue-mid/30 rounded-full blur-3xl pointer-events-none" />
          {/* Patrón de líneas cruzadas */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none stripe-bg" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-orange font-semibold tracking-wider uppercase text-xs px-4 py-2 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping" />
                Cultura Corporativa
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-white">Valores</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-orange to-transparent mx-auto rounded-full"></div>
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="flex flex-col p-8 bg-white/5 border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-brand-orange/40 hover:shadow-[0_8px_30px_rgba(255,106,0,0.15)] transition-all duration-300 group cursor-default relative overflow-hidden"
                >
                  {/* Fondo hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  {/* Ícono */}
                  <div className="p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transition-all duration-300 relative z-10 bg-white/10 border border-white/10 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:shadow-[0_0_20px_rgba(255,106,0,0.4)]">
                    <valor.icon className="h-6 w-6 text-white group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:text-brand-orange transition-colors duration-300">
                    {valor.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed relative z-10 group-hover:text-white/80 transition-colors duration-300">
                    {valor.desc}
                  </p>

                  {/* Número decorativo de fondo */}
                  <span className="absolute bottom-2 right-4 text-7xl font-black text-white/[0.03] group-hover:text-brand-orange/[0.08] transition-colors duration-500 select-none leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Línea animada en hover */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-orange to-transparent w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Presencia Nacional */}
        <section id="presencia" className="py-24 bg-gradient-to-tr from-muted/80 via-white to-brand-blue/5 relative overflow-hidden">
          {/* Orbe decorativo */}
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="absolute -bottom-20 left-10 w-72 h-72 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none" />
          {/* Patrón de puntos radiales */}
          <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#1A3A8F 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative z-10">
              <span className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 text-brand-blue font-semibold tracking-wider uppercase text-xs px-4 py-2 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                Alcance
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4 tracking-tight">
                Presencia a Nivel <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-blue-mid">Nacional</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">Con cobertura en los principales estados de Venezuela</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
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
                      staggerChildren: 0.15
                    }
                  }
                }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-brand-blue via-brand-blue-mid to-brand-blue p-8 rounded-3xl text-center sm:col-span-2 shadow-[0_12px_40px_rgba(26,58,143,0.18)] border border-white/10 group cursor-default overflow-hidden relative"
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ y: -5, scale: 1.01 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-6xl md:text-7xl font-black text-white block mb-2 stat-number tracking-tight">8+</span>
                  <span className="text-white/80 font-bold text-xl block">Estados con cobertura</span>
                  <div className="w-12 h-1 bg-brand-orange rounded-full mx-auto mt-4 group-hover:w-20 transition-all duration-300" />
                </motion.div>
                <motion.div 
                  className="bg-white/80 backdrop-blur-md p-6 rounded-2xl text-center border border-gray-100/80 shadow-md transition-all duration-300 hover:border-brand-blue/30 group cursor-default overflow-hidden relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-4xl md:text-5xl font-black text-brand-blue block mb-2 stat-number group-hover:text-brand-orange transition-colors duration-300">4+</span>
                  <span className="text-brand-dark/70 font-semibold text-sm group-hover:text-brand-dark transition-colors duration-300 block">Años en el mercado</span>
                </motion.div>
                <motion.div 
                  className="bg-white/80 backdrop-blur-md p-6 rounded-2xl text-center border border-gray-100/80 shadow-md transition-all duration-300 hover:border-brand-blue/30 group cursor-default overflow-hidden relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-4xl md:text-5xl font-black text-brand-blue block mb-2 stat-number group-hover:text-brand-orange transition-colors duration-300">6+</span>
                  <span className="text-brand-dark/70 font-semibold text-sm group-hover:text-brand-dark transition-colors duration-300 block">Aliados comerciales</span>
                </motion.div>
              </motion.div>

              {/* Columna Derecha: Estados */}
              <motion.div 
                className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full pointer-events-none" />
                <h3 className="text-2xl font-bold text-brand-dark mb-2 relative z-10 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-brand-orange animate-bounce" />
                  Cobertura Estratégica
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Operando desde 2022, aseguramos el abastecimiento estratégico y la cadena de frío en las regiones clave del territorio nacional.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Zulia", "Lara", "Miranda", "Monagas", "Táchira", "Mérida", "Aragua", "Distrito Capital"].map((estado, index) => (
                    <span key={index} className="px-4 py-2.5 bg-white border border-gray-100 text-brand-dark/80 text-sm font-semibold rounded-full shadow-sm transition-all duration-300 cursor-default hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:shadow-[0_4px_14px_rgba(26,58,143,0.25)] hover:-translate-y-0.5 transform inline-block">
                      📍 {estado}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-12">Operando desde 2022, expandiéndonos año a año.</p>
          </div>
        </section>

        {/* 9. Aliados Comerciales */}
        <section id="aliados" className="py-24 bg-gradient-to-b from-white via-muted/30 to-white relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative z-10">
              <span className="inline-flex items-center gap-2 bg-brand-orange/5 border border-brand-orange/10 text-brand-orange font-semibold tracking-wider uppercase text-xs px-4 py-2 rounded-full mb-3 animate-pulse">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
                Confianza
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4 tracking-tight">
                Aliados <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-blue-mid">Comerciales</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">Trabajamos con las principales droguerías del país</p>
            </div>

            <div className="relative overflow-hidden py-10 space-y-8">
              {/* Carrusel de Logos de Aliados */}
              <div className="relative overflow-hidden w-full">
                {/* Multiplicamos el array varias veces para asegurar que el marquee sea infinito y no haya espacios vacíos */}
                <div className="flex gap-8 w-max animate-scroll-left pause-on-hover items-center">
                  {[...aliadosLogos, ...aliadosLogos, ...aliadosLogos, ...aliadosLogos].map((aliado, index) => (
                    <div key={`a-${index}`} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(13,27,75,0.02)] hover:shadow-[0_8px_30px_rgba(26,58,143,0.12)] transition-all duration-300 flex items-center justify-center min-w-[280px] max-w-[280px] h-[160px] group cursor-default">
                      <img 
                        src={aliado.img} 
                        alt={`Logo de ${aliado.nombre}`} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply filter brightness-110 contrast-125 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-125" 
                        title={aliado.nombre}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Footer */}
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
                  <Phone className="h-4 w-4 text-brand-orange shrink-0" />
                  0412-504-0440
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-orange shrink-0" />
                  casaderepresentacion2nventas@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-orange shrink-0" />
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
