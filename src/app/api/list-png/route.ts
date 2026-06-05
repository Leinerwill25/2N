import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const pngDir = path.join(process.cwd(), 'public', 'PNG')
    const files = fs.readdirSync(pngDir)
    const images = files.filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'))
    return NextResponse.json({ images })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
