import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {


    const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
    const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN
    const putData = JSON.parse(req.body)
    let updatedCardListData = {}
    const { db } = await connectToDatabase();

    console.log("??", putData)
    const { cardId, newListId } = putData;

    const updateCardListTrello = await fetch(`https://api.trello.com/1/cards/${cardId}?key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}&idList=${newListId}&pos=bottom`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.json();
        })
        .then(data => {
            updatedCardListData = data
        })
        .catch(err => console.error(err));

    const updateCardListMongoDb = await db.collection("cards").updateOne({ id: cardId }, { $set: { idList: newListId } })

    res.json(updatedCardListData)

};