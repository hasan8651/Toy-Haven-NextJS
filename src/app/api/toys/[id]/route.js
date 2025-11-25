import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  const { id } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("smart_db");
    const toys = db.collection("toys");

    let toy = null;

    // Search by ObjectId if valid
    if (ObjectId.isValid(id)) {
      toy = await toys.findOne({ _id: new ObjectId(id) });
    }

    // Fallback: treat as string ID
    if (!toy) {
      toy = await toys.findOne({ _id: id });
    }

    if (!toy)
      return Response.json({ error: "not found" }, { status: 404 });

    return Response.json(toy);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  const { id } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("smart_db");
    const toys = db.collection("toys");

    let query = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id };

    const result = await toys.deleteOne(query);

    if (result.deletedCount === 0)
      return Response.json({ error: "not found" }, { status: 404 });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
