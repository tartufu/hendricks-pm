import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

    const { db } = await connectToDatabase();

    let getAllProjectPathsMongoDb = await db.collection("boards").find({}).toArray()

    res.json(getAllProjectPathsMongoDb)

};