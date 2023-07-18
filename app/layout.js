import './globals.css'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Chitransh: AI Image Enhancer',
  description: 'Chitransh is an AI based image enhancer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-gray-900 text-white`}>{children}</body>
    </html>
  )
}
