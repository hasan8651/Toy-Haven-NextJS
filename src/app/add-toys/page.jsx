    'use client';
    import { useState } from 'react';

export default function AddToys() {
const [form, setForm] = useState({
toyName: 'Test Hasan',
Category:'Soft Toys',
price: 99,
rating: 4.5,
pictureURL: 'https://i.ibb.co.com/SXTLHCmn/Plush-Teddy-Bear-Deluxe.jpg',
description: 'Demo Demo Demo Demo Demo',
availableQuantity: 95,
sellerName:'Mahmudul Hasan',
sellerEmail: 'hasan865@gmail.com',
});

async function handleSubmit(e) {
e.preventDefault();
const res = await fetch('/api/toys', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(form),
});
const data = await res.json();
console.log('Created:', data);
}

return <button onClick={handleSubmit}>Create</button>;
}