import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("smart_db");
    const toysCollection = db.collection("toys");

    const toys = await toysCollection.find().limit(8).toArray();

    return Response.json(toys);
  } catch (err) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
