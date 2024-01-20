import './globals.css'
import PageLayout from '@/ui/components/Layout/PageLayout'

export const metadata = {
  title: 'AWB Generator',
  description: 'Generated AWB Document easily',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  )
}
