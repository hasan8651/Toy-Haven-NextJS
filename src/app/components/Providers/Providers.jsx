'use client';


import { SessionProvider } from "next-auth/react";
import AuthNotifier from "../AuthNotifier/AuthNotifier";

export default function Providers({ children }) {

return (
<SessionProvider>
<AuthNotifier />
{children}
</SessionProvider>
);
}