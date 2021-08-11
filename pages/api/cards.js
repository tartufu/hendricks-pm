import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

    const { db } = await connectToDatabase();

    // const test = await db.collection("users").insertOne({ user: "test", password: "problem" })
    console.log("ASDDSDSD", req.body)

    const test = await db.collection("cards").insertOne(req.body)

    res.json(test)
    // const movies = await db
    //     .collection("users")
    //     .find({})
    //     .sort({ metacritic: -1 })
    //     .limit(20)
    //     .toArray();
    // res.json(movies);
};