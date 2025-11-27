'use client';
import Aos from 'aos';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SessionProvider } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

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

useEffect(() => {
AOS.refresh();
}, [pathname]);

return (
<SessionProvider>
{children}
</SessionProvider>
);
}