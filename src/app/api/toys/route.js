export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const API_BASE = process.env.API_BASE || "http://localhost:4000";

// GET /api/toys -> GET http://localhost:4000/toys
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const qs = searchParams.toString();
  const upstream = `${API_BASE}/toys${qs ? `?${qs}` : ""}`;
  try {
    const res = await fetch(upstream, { cache: "no-store" });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (e) {
    return Response.json({ error: "Failed to fetch toys" }, { status: 500 });
  }
}

// POST /api/toys -> POST http://localhost:4000/toys
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const qs = searchParams.toString();
  const upstream = `${API_BASE}/toys${qs ? `?${qs}` : ""}`;
  try {
    const contentType = request.headers.get("content-type") || "";
    let body;
    const headers = {};
    if (contentType.includes("application/json")) {
      body = JSON.stringify(await request.json());
      headers["Content-Type"] = "application/json";
    } else if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      body = await request.text();
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else {
      body = await request.arrayBuffer();
      if (contentType) headers["Content-Type"] = contentType;
    }

    const res = await fetch(upstream, {
      method: "POST",
      headers,
      body,
    });

    const resType = res.headers.get("content-type") || "";
    if (resType.includes("application/json")) {
      const data = await res.json();
      return Response.json(data, { status: res.status });
    }
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { "Content-Type": resType || "text/plain" },
    });
  } catch (e) {
    return Response.json({ error: "Failed to create toy" }, { status: 500 });
  }
}