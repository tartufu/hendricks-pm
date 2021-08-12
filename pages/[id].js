import Layout from '../components/layout'
import Head from 'next/head'

import StatusCard from '../components/statusCard';
import { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TRELLO_KEY = process.env.TRELLO_KEY
const TRELLO_TOKEN = process.env.TRELLO_TOKEN

const NEXT_PUBLIC_DEV_URL = process.env.NEXT_PUBLIC_DEV_URL


export async function getStaticPaths() {
    // https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths

    const response = await fetch(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
    const json = await response.json()

    // console.log("aasdasd", json)

    const projectPaths = await fetch(`${NEXT_PUBLIC_DEV_URL}/api/getProjectPaths`)
    const projectPathsJson = await projectPaths.json()

    const paths = projectPathsJson.map(data => {
        return {
            params: {
                id: data.id
            }
        }
    })

    console.log(paths)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    // console.log(params.id)
    const board = await (await fetch(`https://api.trello.com/1/boards/${params.id}/?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)).json()
    const boardLists = await (await fetch(`https://api.trello.com/1/boards/${params.id}/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)).json()

    let cardListsArr = [];

    for (let i = 0; i < boardLists.length; i++) {
        const cardLists = await (await fetch(`https://api.trello.com/1/lists/${boardLists[i].id}/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)).json()
        cardListsArr.push(cardLists)
    }

    // console.log(boardLists);
    return {
        props: {
            board,
            boardLists,
            cardListsArr
        }
    }

}


export default function Project({ board, boardLists, cardListsArr }) {

    const [boardData, setBoardData] = useState(board);
    const [boardListsData, setBoardListsData] = useState(boardLists);
    const [cardListsArrData, setCardListsArrData] = useState(cardListsArr);

    const updateListsHandler = (res, currentListIndex, newListIndex) => {
        console.log("HEYYYYY", res, currentListIndex, newListIndex)

        let newCardListsArr = [...cardListsArrData];

        let newCardListsCurrentIndexArr = newCardListsArr[currentListIndex].filter(x => x.id !== res.id);
        newCardListsArr[currentListIndex] = newCardListsCurrentIndexArr
        newCardListsArr[newListIndex].push(res);

        setCardListsArrData(newCardListsArr)
    }




    return (
        <Layout>
            <Head>
                <title> {board.name} </title>
            </Head>
            <main>
                <h1 style={{ textAlign: 'center' }}> {board.name} </h1>
                {
                    boardLists.length === 0 &&
                    <p> there are no columns </p>
                }
                <Container fluid>
                    <Row>
                        {
                            boardLists.map((listData, index) => (
                                    <StatusCard 
                                        key={listData.id} 
                                        listData={listData} 
                                        listCards={cardListsArrData[index]} 
                                        boardListsData={boardListsData}
                                        listIndex={index}
                                        updateListsHandler={updateListsHandler}
                                    />
                            ))
                        }
                    </Row>
                </Container>
            </main>

        </Layout>
    )
}
