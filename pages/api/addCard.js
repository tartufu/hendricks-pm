import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {


    const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
    const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN
    const postData = JSON.parse(req.body)
    let createdCardData = {}
    const { db } = await connectToDatabase();

    const createCardTrello = await fetch(`https://api.trello.com/1/cards?key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}&idList=${postData.listId}&name=${postData.newCardDetail}&desc=${postData.newCardDesc}`, {
        method: 'POST',
        body: JSON.stringify(postData)
    }).then(res => {
        return res.json()
    }).then(data => {
        createdCardData = data
    }).catch(err => console.log(err))

    const createCardMongoDb = await db.collection("cards").insertOne(createdCardData)

    res.json(createdCardData)

};