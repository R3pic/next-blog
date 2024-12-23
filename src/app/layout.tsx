import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import BackGround from '@/components/BackGround';
import { ThemeProvider } from 'next-themes';
import LeftSidebar from '@/components/sidebar/LeftSidebar';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jpRg = localFont({
  src: './fonts/LINESeedJP_OTF_Rg.woff2'
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jpBd = localFont({
  src: './fonts/LINESeedJP_OTF_Bd.woff2'
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const krRg = localFont({
  src: './fonts/LINESeedKR-Rg.woff2'
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const krBd = localFont({
  src: './fonts/LINESeedKR-Bd.woff2'
});

export const metadata: Metadata = {
  title: 'r3dsd Blog',
  description: 'A personal blog by r3dsd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='font-reguler text-light-foreground dark:text-dark-foreground scroll-smooth' suppressHydrationWarning>
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

