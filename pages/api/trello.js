export default async function getAllBoards(req, res) {

    const TRELLO_KEY = process.env.TRELLO_KEY
    const TRELLO_TOKEN = process.env.TRELLO_TOKEN
    console.log("r1111eq", TRELLO_KEY, TRELLO_TOKEN)

    const response = await fetch(`https://api.trello.com/1/members/me/boards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
    const json = await response.json()

    return json
    // curl 'https://api.trello.com/1/members/me/boards?key={yourKey}&token={yourToken}'
    // https://api.trello.com/1/members/me/boards?key=ebee9c2d87f0d634524fe2162b73ced3&token=6056672afc308314a457b271fd2080311aabd4e8f27611e1648b52e65d2e17ea
    
    res.status(200).json({ name: 'John Doe' })
  }