import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

    const { db } = await connectToDatabase();

    const getData = JSON.parse(req.body)

    // console.log("!!!", getData.id)

    const boardData = await db.collection("boards").findOne({ id: getData.id })
    // console.log(test)
    res.json(boardData)

};