'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  CalendarX2, 
  CalendarCheck2, 
  Database, 
  Ban, 
  Users, 
  Calculator,
  ChevronRight
} from 'lucide-react'

export default function PropuestasPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-foreground font-sans pb-20">
      
      {/* Header Minimalista */}
      <header className="bg-white border-b border-gray-100 py-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider leading-none mb-1">Casa de Representación, C.A.</span>
            <div className="flex items-baseline font-extrabold text-2xl leading-none">
              <span className="text-brand-blue">2</span>
              <span className="text-brand-orange">N</span>
            </div>
          </div>
          <a href="/" className="text-sm font-medium text-brand-dark/70 hover:text-brand-orange transition-colors">
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="mb-10 text-center sm:text-left">
            <p className="text-sm font-semibold tracking-wider text-brand-orange uppercase mb-2">Propuesta comercial v2 • Mayo 2026</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">Sistema de Gestión Digital</h1>
            <p className="text-lg text-brand-dark/70">Preparado exclusivamente para Casa de Representación 2N, C.A.</p>
          </div>

          {/* DEFINICIÓN DE MODIFICACIÓN */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-12">
            <h2 className="text-lg font-bold text-brand-dark mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
              <FileText className="h-5 w-5 text-brand-blue" />
              Definición oficial de "modificación" (Aplica a todas las propuestas)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-4">Sí cuenta como modificación</p>
                <ul className="space-y-3">
                  {[
                    "Cambios de texto, colores o imágenes en páginas existentes",
                    "Ajustes de diseño o layout en secciones ya construidas",
                    "Agregar o quitar un campo en un formulario existente",
                    "Actualizar datos de contacto, redes sociales o textos",
                    "Reordenar o renombrar secciones existentes",
                    "Cambios simples de comportamiento sin tocar base de datos (máx. 2h)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4">NO cuenta (se cotiza aparte)</p>
                <ul className="space-y-3">
                  {[
                    "Crear una nueva página o módulo inexistente",
                    "Cambios en la estructura de la base de datos",
                    "Nuevas integraciones con terceros (pagos, APIs externas)",
                    "Módulos nuevos del panel admin (facturación, reportes)",
                    "Lógica de negocio nueva que no existe hoy",
                    "Cualquier cambio que requiera más de 2 horas de desarrollo"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-5 border-t border-gray-50 bg-gray-50/50 p-4 rounded-xl">
              <p className="text-xs text-gray-500 leading-relaxed">
                Cada solicitud de modificación debe enviarse por escrito (WhatsApp o email). El proveedor confirma si aplica o no al paquete antes de ejecutarla. Las modificaciones no utilizadas no son acumulables ni reembolsables.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            
            {/* PROPUESTA 1 */}
            <motion.div variants={fadeIn} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50/80 p-6 sm:p-8 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">Propuesta 01 — Licencia perpetua</span>
                    <h3 className="text-2xl font-bold text-brand-dark">Pago único</h3>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-3xl font-black text-brand-dark">$700 <span className="text-lg text-gray-500 font-medium">USD</span></p>
                    <p className="text-sm text-gray-500">Sin recurrencia obligatoria</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Incluye</p>
                    <ul className="space-y-3">
                      {[
                        "Sistema completo entregado y configurado",
                        "1 sesión de capacitación (hasta 2h, remota)",
                        "10 modificaciones menores (según definición)",
                        "Manual de uso básico en PDF",
                        "30 días de garantía contra errores técnicos"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-brand-dark/80">
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">No incluye</p>
                    <ul className="space-y-3">
                      {[
                        "Soporte técnico mensual",
                        "Dominio personalizado",
                        "Actualizaciones futuras de funciones",
                        "Corrección de errores tras los 30 días"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                          <XCircle className="h-5 w-5 text-red-300 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Al firmar el contrato</p>
                    <p className="text-lg font-bold text-brand-dark">$350 USD</p>
                    <p className="text-xs text-gray-500">50% en divisas (transferencia)</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Al entregar el sistema</p>
                    <p className="text-lg font-bold text-brand-dark">Bs equiv. $350</p>
                    <p className="text-xs text-gray-500">A tasa BCV del día de pago</p>
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-800 rounded-xl p-4 flex gap-3 text-sm">
                  <Calculator className="h-5 w-5 shrink-0 text-blue-600" />
                  <p><strong>Soporte técnico opcional tras la entrega:</strong> $70 USD/mes — contratación libre, sin compromiso de permanencia. Sin soporte activo, las incidencias fuera de garantía se cotizan por hora.</p>
                </div>
              </div>
            </motion.div>

            {/* PROPUESTA 2 */}
            <motion.div variants={fadeIn} className="bg-white rounded-3xl shadow-lg border-2 border-brand-orange overflow-hidden relative">
              <div className="bg-brand-orange text-white text-center py-2 text-xs font-bold uppercase tracking-widest">
                Mejor relación costo-beneficio a largo plazo
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-white p-6 sm:p-8 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider rounded-full mb-3">Propuesta 02 — SaaS mensual</span>
                    <h3 className="text-2xl font-bold text-brand-dark">Servicio continuo</h3>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-3xl font-black text-brand-orange">$150 <span className="text-lg text-brand-orange/70 font-medium">USD/mes</span></p>
                    <p className="text-sm text-gray-500">Sin pago inicial. Pagadero en Bs</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4">Incluye cada mes</p>
                    <ul className="space-y-3">
                      {[
                        "Sistema activo y operativo",
                        "Soporte técnico L–V 8am–5pm",
                        "Corrección de errores del sistema",
                        "Actualizaciones menores incluidas",
                        "1 modificación menor al mes",
                        "Capacitación inicial (1 sesión remota)"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-brand-dark/80">
                          <CheckCircle2 className="h-5 w-5 text-brand-orange shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Política de suspensión</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <CalendarX2 className="h-5 w-5 text-red-400 shrink-0" />
                        <span>Si el pago no se recibe antes del día 5, el acceso se suspende.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <CalendarCheck2 className="h-5 w-5 text-green-500 shrink-0" />
                        <span>Al regularizar, el acceso se reactiva en &lt; 24h hábiles.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Database className="h-5 w-5 text-amber-500 shrink-0" />
                        <span>Datos se conservan por 60 días tras suspensión.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Ban className="h-5 w-5 text-red-500 shrink-0" />
                        <span>Los meses pagados no son reembolsables.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-100">
                  <h4 className="font-bold text-brand-blue flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5" />
                    Programa de referidos
                  </h4>
                  <p className="text-sm text-brand-dark/80 mb-3">
                    Si 2N refiere a una casa de representación que contrate el mismo sistema y paga su primer mes, <strong className="text-brand-blue">2N recibe $50 USD de crédito</strong> descontados de su factura.
                  </p>
                  <p className="text-xs text-brand-dark/60">
                    Con 3 referidos activos: crédito de $150 = 1 mes gratuito para 2N.
                  </p>
                </div>

                <div className="bg-amber-50 text-amber-800 rounded-xl p-4 text-sm border border-amber-100">
                  <strong>Sin costo de entrada ni penalidad por salida.</strong> Cancelación con 15 días de aviso. Al cancelar, se entrega un respaldo completo en CSV/Excel.
                </div>
              </div>
            </motion.div>

            {/* PROPUESTA 3 */}
            <motion.div variants={fadeIn} className="bg-[#0D1B4B] text-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow relative">
              <div className="p-6 sm:p-8 border-b border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider rounded-full mb-3">Propuesta 03 — Plan completo</span>
                    <h3 className="text-2xl font-bold text-white">Máxima tranquilidad</h3>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-3xl font-black text-white">$1,200 <span className="text-lg text-white/60 font-medium">USD</span></p>
                    <p className="text-sm text-white/60">Pago en 2 cuotas (30 días)</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="bg-white/5 rounded-xl p-4 mb-8 text-sm text-white/80 border border-white/10 flex gap-3">
                  <Calculator className="h-5 w-5 shrink-0 text-white/60" />
                  <p><strong>¿Por qué $1,200?</strong> Los 6 meses de soporte incluidos equivalen a $420 reales ($70 × 6). Para 2N sigue siendo más económico que contratar el desarrollo y luego soporte por separado, garantizando medio año de cobertura total.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Incluye</p>
                    <ul className="space-y-3">
                      {[
                        "Sistema completo entregado y configurado",
                        "Capacitación al equipo (1 sesión, hasta 3h)",
                        "6 meses de soporte técnico L–V 8am–5pm",
                        "20 modificaciones menores",
                        "Dominio .com por 1 año gestionado",
                        "Manual de administración completo en PDF"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                          <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Forma de pago</p>
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-xs text-white/60 mb-1">Cuota 1 — Al firmar el contrato</p>
                        <p className="text-lg font-bold text-white">$600 USD</p>
                        <p className="text-xs text-white/50">$300 en divisas + Bs equiv. $300</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-xs text-white/60 mb-1">Cuota 2 — A los 30 días</p>
                        <p className="text-lg font-bold text-white">$600 USD</p>
                        <p className="text-xs text-white/50">$300 en divisas + Bs equiv. $300</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 text-amber-200 rounded-xl p-4 text-sm border border-amber-500/20 mb-4">
                  <strong>Condición:</strong> el sistema se entrega funcional solo después de la Cuota 1. La Cuota 2 vence exactamente a los 30 días — si no se recibe, el acceso admin queda suspendido (el catálogo público permanece activo).
                </div>
                
                <p className="text-xs text-white/50">
                  Al vencer los 6 meses, 2N puede renovar el soporte por $70/mes o adquirir bloques de modificaciones. El dominio se renueva por cuenta del cliente al año siguiente.
                </p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </main>

      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-8 border-t border-gray-200 text-center sm:text-left">
        <p className="text-xs text-gray-500">
          Casa de Representación 2N, C.A. • J-502058125<br className="sm:hidden" />
          <span className="hidden sm:inline"> • </span>Chacao, Caracas, Venezuela<br className="sm:hidden" />
          <span className="hidden sm:inline"> • </span>casaderepresentacion2nventas@gmail.com<br className="sm:hidden" />
          <span className="hidden sm:inline"> • </span>0412-504-0440
        </p>
      </footer>
    </div>
  )
}
