import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {


    const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
    const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN

    const { db } = await connectToDatabase();

    const getData = JSON.parse(req.body)

    
    // console.log("!!!", getData.id)

    let listsData = await db.collection("lists").find({ idBoard: getData.id }).toArray()

    let listDataCountMongoDb = await db.collection("lists").find({ idBoard: getData.id}).count()

    // console.log(listsData)
    // console.log(test)
    // res.json(listsData)

    const listDataTrello = await (await fetch(`https://api.trello.com/1/boards/${getData.id}/lists?key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}`)).json()

    if (listDataCountMongoDb !== listDataTrello.length) {
        // console.log("DIFFERENT")
        // brute force, need to refine 
        // when delete lists need to delete cards too

        db.collection("lists").deleteMany({ idBoard: getData.id })
        db.collection("lists").insertMany(listDataTrello);

        listsData = listDataTrello
    }

    // console.log(listDataCountMongoDb, listDataTrello)

    res.json(listsData)

    // const boardLists = await (await fetch(`https://api.trello.com/1/boards/${params.id}/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)).json()

};