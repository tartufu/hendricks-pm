import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {


    const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
    const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN
    const defaultLists = ['Planning', 'To Do', 'Doing', 'Done'];
    const newBoardData = JSON.parse(req.body)
    let newBoardId = ""
    let createdBoardData = {}
    const { db } = await connectToDatabase();

    const createBoardTrello = await fetch(`https://api.trello.com/1/boards/?key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}&name=${newBoardData.name}&defaultLists=false`, {
        method: 'POST'
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.json();
        })
        .then(data => {
            console.log(data.id)
            newBoardId = data.id
            createdBoardData = data
        })
        .catch(err => console.error(err));

    console.log(createdBoardData);

    const createBoardMongoDb = await db.collection("boards").insertOne(createdBoardData)

    for (let i = 0; i < defaultLists.length; i++) {

        let listData = {}
        const createListTrello = await fetch(`https://api.trello.com/1/boards/${newBoardId}/lists?key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}&name=${defaultLists[i]}&pos=bottom`, {
            method: 'POST'
        })
            .then(response => {
                console.log(
                    `Response: ${response.status} ${response.statusText}`
                );
                return response.json();
            })
            .then(data => {
                console.log(data)
                listData = data;
            })
            .catch(err => console.error(err));
        
        const createListMongoDb = await db.collection("lists").insertOne(listData)
    }


    res.json(createdBoardData)
    // return createdBoardData
};