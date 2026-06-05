'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Upload,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Search,
  ZoomIn,
  ChevronDown,
  Check,
  X,
} from 'lucide-react'

// ────────────────────────────────────────────────────────────
// Fuzzy scoring: compara nombre de archivo vs nombre de producto
// ────────────────────────────────────────────────────────────
function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar tildes
    .replace(/[^a-z0-9\s]/g, ' ')   // quitar símbolos
    .replace(/\s+/g, ' ')
    .trim()
}

function scoreMatch(imageFile: string, productName: string): number {
  const img = normalize(imageFile.replace(/\.(png|jpg|jpeg)$/i, '').replace(/-\d+$/,'').replace(/ copia.*$/i,'').replace(/ estuche.*/i,'').replace(/ png$/i,''))
  const prod = normalize(productName)

  if (img === prod) return 100
  if (img.includes(prod) || prod.includes(img)) return 90

  // token overlap
  const imgTokens = new Set(img.split(' ').filter(t => t.length > 2))
  const prodTokens = prod.split(' ').filter(t => t.length > 2)
  if (prodTokens.length === 0) return 0

  let hits = 0
  for (const t of prodTokens) {
    if (imgTokens.has(t)) hits++
    else {
      // partial token match
      for (const it of imgTokens) {
        if (it.includes(t) || t.includes(it)) { hits += 0.6; break }
      }
    }
  }
  return Math.round((hits / prodTokens.length) * 85)
}

interface Product {
  id: string
  nombre: string
  imagen_url: string | null
}

interface MatchRow {
  file: string
  fileObj: File
  previewUrl: string
  product: Product | null
  score: number
  status: 'pending' | 'uploading' | 'done' | 'error' | 'skipped'
  selected: boolean
  publicUrl?: string
  errorMsg?: string
}

export default function BulkImagesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [rows, setRows] = useState<MatchRow[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'matched' | 'unmatched' | 'done'>('all')
  const [search, setSearch] = useState('')
  const [minScore, setMinScore] = useState(50)
  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const [overrideMap, setOverrideMap] = useState<Record<string, string>>({}) // file → product_id override

  // stats
  const total = rows.length
  const matched = rows.filter(r => r.product && r.score >= minScore).length
  const done = rows.filter(r => r.status === 'done').length
  const errors = rows.filter(r => r.status === 'error').length
  const selected = rows.filter(r => r.selected).length

  useEffect(() => {
    loadData()
  }, [])

  const fetchProducts = async () => {
    const { data: prods } = await supabase
      .from('productos')
      .select('id, nombre, imagen_url')
      .eq('empresa', '2n')
    return (prods || []) as Product[]
  }

  const buildRowsFromFiles = (files: File[], allProds: Product[]): MatchRow[] => {
    const images = files.filter(f =>
      /\.(png|jpe?g)$/i.test(f.name)
    )

    const newRows: MatchRow[] = images.map(fileObj => {
      const file = fileObj.name
      let bestProduct: Product | null = null
      let bestScore = 0

      for (const p of allProds) {
        const s = scoreMatch(file, p.nombre)
        if (s > bestScore) {
          bestScore = s
          bestProduct = p
        }
      }

      return {
        file,
        fileObj,
        previewUrl: URL.createObjectURL(fileObj),
        product: bestScore >= 30 ? bestProduct : null,
        score: bestScore,
        status: 'pending',
        selected: bestScore >= 50,
      }
    })

    newRows.sort((a, b) => b.score - a.score)
    return newRows
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const allProds = await fetchProducts()
      setProducts(allProds)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilesSelected = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return

    setLoading(true)
    try {
      const allProds = products.length > 0 ? products : await fetchProducts()
      if (products.length === 0) setProducts(allProds)

      setRows(prev => {
        prev.forEach(r => URL.revokeObjectURL(r.previewUrl))
        return buildRowsFromFiles(Array.from(fileList), allProds)
      })
      setOverrideMap({})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const reanalyze = async () => {
    if (rows.length === 0) return
    setLoading(true)
    try {
      const allProds = await fetchProducts()
      setProducts(allProds)
      const files = rows.map(r => r.fileObj)
      setRows(prev => {
        prev.forEach(r => URL.revokeObjectURL(r.previewUrl))
        return buildRowsFromFiles(files, allProds)
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleSelect = (file: string) => {
    setRows(prev => prev.map(r => r.file === file ? { ...r, selected: !r.selected } : r))
  }

  const selectAll = (val: boolean) => {
    setRows(prev => prev.map(r => ({ ...r, selected: Boolean(val && r.status === 'pending' && (r.product !== null || overrideMap[r.file])) })))
  }

  const setOverride = (file: string, productId: string) => {
    setOverrideMap(prev => ({ ...prev, [file]: productId }))
    setRows(prev => prev.map(r => {
      if (r.file !== file) return r
      const p = products.find(p => p.id === productId) || null
      return { ...r, product: p, score: p ? 99 : r.score, selected: !!p }
    }))
  }

  const uploadSelected = async () => {
    const toUpload = rows.filter(r => r.selected && r.status === 'pending')
    if (toUpload.length === 0) return
    setUploading(true)

    for (const row of toUpload) {
      const productId = overrideMap[row.file] || row.product?.id
      if (!productId) continue

      setRows(prev => prev.map(r => r.file === row.file ? { ...r, status: 'uploading' } : r))

      try {
        const fileExt = row.file.split('.').pop()?.toLowerCase() || 'png'
        const contentType = row.fileObj.type || `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`
        const storagePath = `productos/${productId}_${Date.now()}.${fileExt}`

        const { error: uploadErr } = await supabase.storage
          .from('product-images')
          .upload(storagePath, row.fileObj, { contentType, upsert: true })

        if (uploadErr) throw uploadErr

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(storagePath)

        const publicUrl = urlData.publicUrl

        // Update product
        const { error: updateErr } = await supabase
          .from('productos')
          .update({ imagen_url: publicUrl })
          .eq('id', productId)

        if (updateErr) throw updateErr

        setRows(prev => prev.map(r => r.file === row.file ? { ...r, status: 'done', publicUrl } : r))
      } catch (err: any) {
        setRows(prev => prev.map(r => r.file === row.file ? { ...r, status: 'error', errorMsg: err.message } : r))
      }
    }
    setUploading(false)
  }

  // Filtered rows
  const filteredRows = rows.filter(r => {
    if (filter === 'matched') return r.product !== null && r.score >= minScore
    if (filter === 'unmatched') return r.product === null || r.score < minScore
    if (filter === 'done') return r.status === 'done'
    return true
  }).filter(r => {
    if (!search) return true
    const q = search.toLowerCase()
    return r.file.toLowerCase().includes(q) || r.product?.nombre.toLowerCase().includes(q)
  })

  const scoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600 bg-green-50'
    if (s >= 50) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-500 bg-red-50'
  }

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-brand-blue" />
        <p className="text-gray-500">Analizando imágenes y productos...</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-blue-mid to-brand-blue p-7 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-brand-orange mb-1">
            <ImageIcon className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Herramienta Masiva</span>
          </div>
          <h1 className="text-2xl font-bold">Carga Masiva de Imágenes</h1>
          <p className="text-white/70 text-sm mt-1">Selecciona imágenes desde tu computadora y asigna automáticamente a productos</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors cursor-pointer">
            <ImageIcon className="h-4 w-4" /> Seleccionar imágenes
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              multiple
              className="sr-only"
              onChange={e => {
                handleFilesSelected(e.target.files)
                e.target.value = ''
              }}
            />
          </label>
          <button
            onClick={reanalyze}
            disabled={rows.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors disabled:opacity-40"
          >
            <RefreshCw className="h-4 w-4" /> Reanalizar
          </button>
          <button
            onClick={uploadSelected}
            disabled={uploading || selected === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange hover:bg-brand-orange/90 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Subiendo...' : `Subir ${selected} seleccionadas`}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total archivos', value: total, color: 'text-brand-blue' },
          { label: 'Con match', value: matched, color: 'text-green-600' },
          { label: 'Sin match', value: total - matched, color: 'text-yellow-600' },
          { label: 'Completadas', value: done, color: 'text-emerald-600' },
          { label: 'Errores', value: errors, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter tabs */}
          {(['all', 'matched', 'unmatched', 'done'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === f ? 'bg-brand-blue text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {f === 'all' ? 'Todas' : f === 'matched' ? 'Con match' : f === 'unmatched' ? 'Sin match' : 'Completadas'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Score threshold */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Score mín:</span>
            <select value={minScore} onChange={e => setMinScore(Number(e.target.value))} className="border border-gray-200 rounded-lg px-2 py-1 text-sm">
              <option value={30}>30%</option>
              <option value={50}>50%</option>
              <option value={70}>70%</option>
              <option value={80}>80%</option>
            </select>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:border-brand-blue/40"
            />
          </div>
          {/* Select all */}
          <button onClick={() => selectAll(true)} className="px-3 py-1.5 text-xs rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
            Seleccionar todos
          </button>
          <button onClick={() => selectAll(false)} className="px-3 py-1.5 text-xs rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
            Deseleccionar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-3 text-left w-10"></th>
                <th className="p-3 text-left w-16">Imagen</th>
                <th className="p-3 text-left">Archivo PNG</th>
                <th className="p-3 text-left">Producto asignado</th>
                <th className="p-3 text-center w-20">Score</th>
                <th className="p-3 text-center w-24">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRows.map(row => (
                <tr
                  key={row.file}
                  className={`hover:bg-gray-50/50 transition-colors ${row.selected ? 'bg-blue-50/30' : ''} ${row.status === 'done' ? 'bg-green-50/20' : ''} ${row.status === 'error' ? 'bg-red-50/20' : ''}`}
                >
                  {/* Checkbox */}
                  <td className="p-3">
                    {row.status === 'pending' && (
                      <button
                        onClick={() => toggleSelect(row.file)}
                        className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-all ${row.selected ? 'bg-brand-blue border-brand-blue' : 'border-gray-300 hover:border-brand-blue'}`}
                      >
                        {row.selected && <Check className="h-3 w-3 text-white" />}
                      </button>
                    )}
                  </td>

                  {/* Thumbnail */}
                  <td className="p-3">
                    <button
                      onClick={() => setPreviewImg(row.previewUrl)}
                      className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 hover:border-brand-blue/40 transition-all group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={row.previewUrl}
                        alt={row.file}
                        className="h-full w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <ZoomIn className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  </td>

                  {/* Filename */}
                  <td className="p-3">
                    <div className="font-medium text-gray-800 text-xs truncate max-w-[200px]" title={row.file}>
                      {row.file}
                    </div>
                    {row.status === 'done' && row.publicUrl && (
                      <div className="text-[11px] text-green-600 mt-0.5">✓ Subida y asignada</div>
                    )}
                    {row.status === 'error' && (
                      <div className="text-[11px] text-red-500 mt-0.5">{row.errorMsg}</div>
                    )}
                  </td>

                  {/* Product match */}
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      {row.product ? (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-800 font-medium text-xs truncate max-w-[180px]" title={row.product.nombre}>
                            {row.product.nombre}
                          </span>
                          {row.product.imagen_url && (
                            <span className="text-[10px] text-gray-400 ml-1">(ya tiene img)</span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <XCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-400 text-xs">Sin coincidencia</span>
                        </div>
                      )}
                      {/* Override dropdown */}
                      {row.status === 'pending' && (
                        <select
                          value={overrideMap[row.file] || row.product?.id || ''}
                          onChange={e => setOverride(row.file, e.target.value)}
                          className="text-[11px] border border-gray-200 rounded-md px-1.5 py-0.5 mt-0.5 text-gray-600 focus:outline-none focus:border-brand-blue/40 max-w-[220px]"
                        >
                          <option value="">— Asignar manualmente —</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </td>

                  {/* Score */}
                  <td className="p-3 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${scoreColor(row.score)}`}>
                      {row.score}%
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3 text-center">
                    {row.status === 'pending' && (
                      <span className="text-xs text-gray-400">Pendiente</span>
                    )}
                    {row.status === 'uploading' && (
                      <Loader2 className="h-4 w-4 animate-spin text-brand-blue mx-auto" />
                    )}
                    {row.status === 'done' && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    )}
                    {row.status === 'error' && (
                      <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                    {row.status === 'skipped' && (
                      <span className="text-xs text-gray-400">Omitida</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-gray-500">No hay imágenes seleccionadas</p>
              <p className="text-sm mt-1">Usa el botón &quot;Seleccionar imágenes&quot; para elegir los archivos PNG o JPG desde tu computadora.</p>
            </div>
          )}
          {rows.length > 0 && filteredRows.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No hay imágenes que coincidan con el filtro.</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImg(null)}
        >
          <div className="relative max-w-lg max-h-[80vh]" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewImg} alt="preview" className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" />
            <button
              onClick={() => setPreviewImg(null)}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
