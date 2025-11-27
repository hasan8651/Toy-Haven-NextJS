import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("smart_db");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user)
      return Response.json({ message: "User not found" }, { status: 404 });

    if (user.password !== password) {
      return Response.json({ message: "Wrong password" }, { status: 401 });
    }

    return Response.json({ message: "Login success", user });
  } catch (err) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
