import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

    const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
    const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN

    const { db } = await connectToDatabase();
    const getAllBoardsMongoDbCount = await db.collection("boards").count()
    let getAllBoardsMongoDb = await db.collection("boards").find({}).toArray()

    const getAllBoardsTrello = await fetch(`https://api.trello.com/1/members/me/boards?&key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}`).then( res => res.json())
    
    if (getAllBoardsMongoDbCount !== getAllBoardsTrello.length) {
        // brute force, need to refine 
        db.collection("boards").deleteMany()
        db.collection("boards").insertMany(getAllBoardsTrello)
        getAllBoardsMongoDb = getAllBoardsTrello
    }


    res.json(getAllBoardsMongoDb)

};