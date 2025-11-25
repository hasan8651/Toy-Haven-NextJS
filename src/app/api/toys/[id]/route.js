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





export async function PUT(req, context) {
const { id } = await context.params; // no await



try {
const client = await clientPromise;
const db = client.db('smart_db');
const toys = db.collection('toys');


const body = await req.json();

// Allow only known fields
const allowed = [
  
  'toyName',
  'pictureURL',
  'description',
  'Category',
  'price',
  'availableQuantity',
  'rating',
  'sellerName',
  'sellerEmail'
];

const $set = {};
for (const key of allowed) {
  if (body[key] !== undefined) {
    if (['price', 'availableQuantity', 'rating'].includes(key)) {
      const num = Number(body[key]);
      if (!Number.isNaN(num)) $set[key] = num;
    } else {
      $set[key] = body[key];
    }
  }
}

// if (Object.keys($set).length === 0) {
//   return Response.json({ message: 'No valid fields to update' }, { status: 400 });
// }

$set.updatedAt = new Date();

const filter =  { _id: new ObjectId(id) }

const result = await toys.findOneAndUpdate(
  filter,
  { $set },
  { returnDocument: 'after' }
);
console.log($set)

if (!result.value) {
  return Response.json({ error: 'not found' }, { status: 404 });
}

return Response.json(result.value);
} catch (err) {
console.error(err);
return Response.json({ error: 'server error' }, { status: 500 });
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
