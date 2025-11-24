export const dynamic = 'force-dynamic';

const API_BASE = process.env.API_BASE || 'http://localhost:4000';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const qs = searchParams.toString();
  const upstream = `${API_BASE}/products${qs ? `?${qs}` : ''}`;

  try {
    const res = await fetch(upstream, { cache: 'no-store' });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (e) {
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}