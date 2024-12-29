import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import BackGround from '@/components/BackGround';
import { ThemeProvider } from 'next-themes';
import LeftSidebar from '@/components/sidebar/LeftSidebar';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const krRg = localFont({
  src: './fonts/LINESeedKR-Rg.woff2'
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const krBd = localFont({
  src: './fonts/LINESeedKR-Bd.woff2'
});

export const metadata: Metadata = {
  title: 'R3pic Blog',
  description: 'A personal blog by r3dsd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className='font-reguler text-light-foreground dark:text-dark-foreground scroll-smooth' suppressHydrationWarning>
      <head>
        <meta data-pagefind-default-meta="image[content]" content="/img/empty.jpg" property="og:image" />
      </head>
      <body>
        <ThemeProvider attribute='class' enableSystem={true} defaultTheme='system' disableTransitionOnChange>
          <BackGround />
          <LeftSidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

