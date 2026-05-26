'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  ArrowUpDown, 
  ExternalLink,
  FileVideo,
  AlertTriangle,
  Sparkles,
  RefreshCw
} from 'lucide-react'

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

interface VideoPromo {
  id: string
  titulo: string
  url: string
  tipo: 'youtube' | 'drive' | 'instagram'
  activo: boolean
  order_index: number
  created_at?: string
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoPromo[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [titulo, setTitulo] = useState('')
  const [url, setUrl] = useState('')
  const [orderIndex, setOrderIndex] = useState(0)
  const [activo, setActivo] = useState(true)

  // Local Mock Data if DB table doesn't exist
  const [isUsingMock, setIsUsingMock] = useState(false)
  const mockVideos: VideoPromo[] = [
    {
      id: 'mock-1',
      titulo: 'Promoción Salud Pediátrica',
      url: 'https://www.youtube.com/shorts/pUuM9e_dI0s',
      tipo: 'youtube',
      activo: true,
      order_index: 1
    },
    {
      id: 'mock-2',
      titulo: 'Nueva Línea Dermatológica',
      url: 'https://www.instagram.com/reel/C7Xy2fOg_Xm/',
      tipo: 'instagram',
      activo: true,
      order_index: 2
    }
  ]

  useEffect(() => {
    fetchVideos()
  }, [])

  const detectVideoType = (videoUrl: string): 'youtube' | 'drive' | 'instagram' => {
    const cleanUrl = videoUrl.toLowerCase()
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
      return 'youtube'
    }
    if (cleanUrl.includes('instagram.com')) {
      return 'instagram'
    }
    return 'drive' // fallback to drive/other
  }

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setDbError(false)
      
      const { data, error } = await supabase
        .from('videos_promocionales')
        .select('*')
        .order('order_index', { ascending: true })
        
      if (error) {
        throw error
      }
      
      setVideos(data || [])
      setIsUsingMock(false)
    } catch (err: any) {
      console.error("Error fetching videos from Supabase:", err)
      // Check if it looks like a relation/table not found error
      if (err.code === '42P01' || err.message?.includes('does not exist')) {
        setDbError(true)
        setIsUsingMock(true)
        setVideos(mockVideos)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo || !url) return

    const tipo = detectVideoType(url)
    const newVideo = {
      titulo,
      url,
      tipo,
      activo,
      order_index: Number(orderIndex)
    }

    try {
      setSubmitting(true)
      if (isUsingMock) {
        // Add to local state
        const mockItem: VideoPromo = {
          id: `mock-${Date.now()}`,
          ...newVideo
        }
        setVideos(prev => [...prev, mockItem].sort((a, b) => a.order_index - b.order_index))
        resetForm()
      } else {
        const { error } = await supabase
          .from('videos_promocionales')
          .insert([newVideo])
          
        if (error) throw error
        
        await fetchVideos()
        resetForm()
      }
    } catch (err) {
      console.error("Error saving video:", err)
      alert("No se pudo guardar el video. Verifica tu conexión o base de datos.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este video promocional?')) return

    try {
      if (isUsingMock) {
        setVideos(prev => prev.filter(v => v.id !== id))
      } else {
        const { error } = await supabase
          .from('videos_promocionales')
          .delete()
          .eq('id', id)
          
        if (error) throw error
        await fetchVideos()
      }
    } catch (err) {
      console.error("Error deleting video:", err)
      alert("No se pudo eliminar el video.")
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      if (isUsingMock) {
        setVideos(prev => prev.map(v => v.id === id ? { ...v, activo: !currentStatus } : v))
      } else {
        const { error } = await supabase
          .from('videos_promocionales')
          .update({ activo: !currentStatus })
          .eq('id', id)
          
        if (error) throw error
        await fetchVideos()
      }
    } catch (err) {
      console.error("Error updating status:", err)
      alert("No se pudo actualizar el estado del video.")
    }
  }

  const resetForm = () => {
    setTitulo('')
    setUrl('')
    setOrderIndex(videos.length + 1)
    setActivo(true)
  }

  const getEmbedUrl = (video: VideoPromo) => {
    const videoUrl = video.url
    if (video.tipo === 'youtube') {
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
    if (video.tipo === 'instagram') {
      const cleanUrl = videoUrl.split('?')[0]
      const suffix = cleanUrl.endsWith('/') ? 'embed/' : '/embed/'
      return `${cleanUrl}${suffix}`
    }
    if (video.tipo === 'drive') {
      // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      // To embed: https://drive.google.com/file/d/FILE_ID/preview
      const parts = videoUrl.split('/d/')
      if (parts.length > 1) {
        const fileId = parts[1].split('/')[0]
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }
    return videoUrl
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <YoutubeIcon className="h-5 w-5 text-red-500" />
      case 'instagram':
        return <InstagramIcon className="h-5 w-5 text-pink-500" />
      default:
        return <FileVideo className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Title / Premium Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-brand-dark to-brand-blue p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-brand-orange">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wider">Nuevo Módulo</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Videos Promocionales</h1>
          <p className="text-white/70 max-w-xl">
            Gestiona el video promocional en formato horizontal (16:9) para mostrar ofertas, lanzamientos y novedades destacadas en la landing page.
          </p>
        </div>
        <button 
          onClick={fetchVideos}
          className="relative z-10 self-start md:self-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all flex items-center gap-2 text-sm font-medium"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Recargar
        </button>
      </div>

      {/* SQL Migration Alert */}
      {dbError && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-3 items-start">
            <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold text-amber-800">Base de datos desactualizada</h3>
              <p className="text-sm text-amber-700/90 leading-relaxed max-w-2xl">
                La tabla <code className="bg-amber-500/15 px-1.5 py-0.5 rounded font-mono text-xs">videos_promocionales</code> no existe.
                Por favor, ejecuta el script <code className="bg-amber-500/15 px-1.5 py-0.5 rounded font-mono text-xs">create_videos_promocionales.sql</code> en el editor SQL de tu panel de Supabase.
              </p>
            </div>
          </div>
          <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap self-end md:self-center">
            Modo Local / Simulación
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Plus className="h-5 w-5 text-brand-orange" />
            Nuevo Video Promocional
          </h2>
          
          <form onSubmit={handleAddVideo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título del Video</label>
              <input
                type="text"
                required
                placeholder="Ej. Descuentos en Pediatría"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enlace del Video</label>
              <input
                type="url"
                required
                placeholder="YouTube Shorts, Instagram Reel o Drive Link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm"
              />
              <span className="text-[11px] text-gray-400 mt-1 block leading-normal">
                Soporta Youtube (Shorts/Videos), Instagram Reels/Publicaciones, y archivos compartidos de Google Drive.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orden de visualización</label>
                <input
                  type="number"
                  min="0"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 px-2 py-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                    className="w-4.5 h-4.5 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                  />
                  <span className="text-sm font-medium text-gray-700">Activo</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {submitting ? 'Guardando...' : 'Agregar Video'}
            </button>
          </form>
        </div>

        {/* Video List / Layout Container */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-brand-orange" />
              Videos Activos ({videos.length})
            </h2>
            {isUsingMock && (
              <span className="text-xs text-gray-400 font-medium italic">Mostrando simulación local</span>
            )}
          </div>

          {loading ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-orange mb-3"></div>
              <span className="text-sm text-gray-500 font-medium">Cargando listado...</span>
            </div>
          ) : videos.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <FileVideo className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No hay videos promocionales</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Utiliza el formulario de la izquierda para agregar tu primer video. Se mostrará en formato horizontal (16:9) destacado en la landing page.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className={`bg-white rounded-3xl border transition-all overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md ${
                    video.activo ? 'border-gray-100' : 'border-dashed border-gray-300 opacity-70'
                  }`}
                >
                  {/* Top Bar Video Item */}
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2 min-w-0">
                      {getIcon(video.tipo)}
                      <span className="font-bold text-sm text-gray-800 truncate" title={video.titulo}>
                        {video.titulo}
                      </span>
                    </div>
                    <span className="bg-white border border-gray-200 text-[10px] px-2 py-0.5 rounded-full font-mono text-gray-500">
                      Orden: {video.order_index}
                    </span>
                  </div>

                  {/* Body Video Preview Mockup (vertical phone shape) */}
                  <div className="p-4 flex justify-center bg-gray-950">
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-4 border-gray-800 shadow-2xl bg-black">
                      <iframe 
                        src={getEmbedUrl(video)}
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-4 border-t border-gray-50 flex items-center justify-between bg-white">
                    <button
                      onClick={() => handleToggleStatus(video.id, video.activo)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        video.activo 
                          ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={video.activo ? "Desactivar" : "Activar"}
                    >
                      {video.activo ? (
                        <>
                          <Eye className="h-4 w-4" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-4 w-4" />
                          <span>Oculto</span>
                        </>
                      )}
                    </button>

                    <div className="flex gap-2">
                      <a 
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition-colors"
                        title="Ver enlace original"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
