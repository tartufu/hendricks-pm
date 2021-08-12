import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

    const { db } = await connectToDatabase();

    const getData = JSON.parse(req.body)

    console.log("!!!", getData.id)

    const listsData = await db.collection("lists").find({ idBoard: getData.id }).toArray()

    // console.log(listsData)
    // console.log(test)
    // res.json(listsData)

    res.json(listsData)

    // const boardLists = await (await fetch(`https://api.trello.com/1/boards/${params.id}/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)).json()

};