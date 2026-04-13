import { Footer, Navbar } from '@/components'
import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Discover the best cars in the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative bg-white dark:bg-[#13131a] transition-colors'>
          <Navbar />
          {children}
          <Footer />
        </body>
    </html>
  )
}
