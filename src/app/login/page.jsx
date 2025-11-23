"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  async function handleCredentials(e) {
    e.preventDefault();
    const res = await signIn('credentials', { redirect: false, email, password: pw });
    if (res?.error) setErr(res.error);
    else router.push('/');
  }

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="border rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Sign in</h2>

        <button onClick={() => signIn('google')} className="w-full py-2 border rounded mb-4">Continue with Google</button>

        <form onSubmit={handleCredentials} className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
          {err && <div className="text-red-500">{err}</div>}
          <button className="w-full py-2 bg-primary text-white rounded">Sign in</button>
        </form>

        <p className="mt-3 text-sm text-gray-600">No account? You can <span className="link text-red-500">register</span> here.</p>
      </div>
    </div>
  );
}
