import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

    const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
    const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN

    const { db } = await connectToDatabase();

    const getData = JSON.parse(req.body)

    let cardListsArr = []

    for (let i = 0; i < getData.length; i++) {

        let listCardsMongoDb = await db.collection("cards").find({ idList: getData[i].id }).toArray();
        const listCardsCountMongoDb = await db.collection("cards").find({ idList: getData[i].id }).count()

        const listCardsTrello = await fetch(`https://api.trello.com/1/lists/${getData[i].id}/cards?key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}`).then( res => res.json())

        if (listCardsCountMongoDb !== listCardsTrello.length) {
            // brute force
            db.collection("cards").deleteMany({ idList: getData[i].id })
            db.collection("cards").insertMany(listCardsTrello)

            listCardsMongoDb = listCardsTrello
        }
        cardListsArr.push(listCardsMongoDb);
    }

    res.json(cardListsArr)


};