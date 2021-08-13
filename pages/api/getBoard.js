import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

    const { db } = await connectToDatabase();

    const getData = JSON.parse(req.body)

    const boardData = await db.collection("boards").findOne({ id: getData.id })
    res.json(boardData)

};