import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

import Navigation from '~/components/navigation';
import NhostClientProvider from '~/components/NhostClientProvider';
import '~/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyCritters Starter App',
  description: 'NextJS + Tailwind + Nhost',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NhostClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <div className="container mx-auto mt-8 p-4 antialiased">{children}</div>
          </ThemeProvider>
        </NhostClientProvider>
      </body>
    </html>
  );
}
