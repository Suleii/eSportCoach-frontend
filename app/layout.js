import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from "./StoreProvider"
import { notFound } from "next/navigation";
import Header from '../components/Header';
import Footer from '../components/Footer';



const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'eSport Coach',
  description: 'Get professional coaching',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='flex flex-col min-h-screen'>
        <StoreProvider>
          
            <Header/>
          <main className="flex-auto">{children}</main>
          <Footer/>
        
        </StoreProvider>
      </body>
    </html>
  );
}