'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

export default function AuthNotifier() {
const { status } = useSession();

useEffect(() => {
if (status === 'authenticated') {
const intent = sessionStorage.getItem('loginIntent');
if (intent === 'google') {
Swal.fire({
position: 'top-end',
background: '#3b82f6',
color: 'white',
icon: 'success',
title: 'Signed in with Google!',
showConfirmButton: false,
timer: 1500
});
sessionStorage.removeItem('loginIntent');
}
}
}, [status]);

return null;
}