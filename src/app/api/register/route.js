import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, image } = body;

    if (!name || !email || !password || !image) {
      return Response.json({ message: "Some fields are missing" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("smart_db");
    const usersCollection = db.collection("users");

    const exist = await usersCollection.findOne({ email });
    if (exist) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const newUser = {
      name,
      email,
      password,
      image,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    return Response.json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}