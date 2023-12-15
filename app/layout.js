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
      <body className={`${inter.className} min-h-screen`}>
        <StoreProvider>
          <div>
            <Header/>
          <main className="">{children}</main>
          <Footer/>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}