'use client';
import Aos from 'aos';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SessionProvider } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
// import AuthNotifier from "../AuthNotifier/AuthNotifier";

export default function Providers({ children }) {

const pathname = usePathname();

useEffect(() => {
Aos.init({
duration: 600,
once: true,
easing: 'ease-out-cubic',
offset: 20
});

// Refresh after images/styles load
const onLoad = () => AOS.refresh();
window.addEventListener('load', onLoad);
return () => window.removeEventListener('load', onLoad);
}, []);

// Re-run on route changes so new elements animate
useEffect(() => {
AOS.refresh();
}, [pathname]);

return (
<SessionProvider>
{/* <AuthNotifier /> */}
{children}
</SessionProvider>
);
}