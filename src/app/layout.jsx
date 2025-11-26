import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers/Providers";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Toy Haven",
  description: "Online Toy Shop",


  icons: {
icon: [
{ url: '/logo.png', sizes: '32x32', type: 'image/png' }, // optional
],

  }


};

export default function RootLayout({ children }) {
return (
<html lang="en">
<body className="min-h-dvh flex flex-col">
<Providers>
<Navbar />
<main className="flex-1">
{children}
</main>
<Footer />
</Providers>
</body>
</html>
);
}