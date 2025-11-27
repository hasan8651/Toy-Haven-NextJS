import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("smart_db");
    const toys = db.collection("toys");

    // Extract email from query: /api/toys?email=user@gmail.com
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    let query = {};

    // Filter by email if provided
    if (email) {
      query.sellerEmail = email;
    }

    const result = await toys.find(query).toArray();

    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      toyName,
      Category,
      pictureURL,
      sellerName,
      sellerEmail,
      price,
      rating,
      availableQuantity,
      description,
    } = body;

    if (!toyName || !description) {
      return Response.json({ error: "missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("smart_db");
    const toysCollection = db.collection("toys");

    const doc = {
      toyName,
      Category,
      pictureURL,
      sellerName,
      sellerEmail,
      price,
      rating,
      availableQuantity,
      description,
    };

    const result = await toysCollection.insertOne(doc);

    return Response.json({ insertedId: result.insertedId });
  } catch (err) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
