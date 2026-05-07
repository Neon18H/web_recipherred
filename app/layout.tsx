import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cipher Red | Ciberseguridad Táctica — Medellín',
  description: 'Agencia de ciberseguridad táctica en Medellín, Colombia. SOC 24/7, OSINT, respuesta a incidentes, gestión de vulnerabilidades y ciberinteligencia.',
  keywords: 'ciberseguridad Medellín, Colombia, SOC, OSINT, pentesting, dark web, vulnerabilidades, seguridad informática',
  openGraph: {
    title: 'Cipher Red | Ciberseguridad Táctica',
    description: 'Protege lo que más importa. Inteligencia táctica, vigilancia permanente y respuesta inmediata.',
    url: 'https://cipherred.tech',
    siteName: 'Cipher Red',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
