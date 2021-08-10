import Layout from '../components/layout'
import Head from 'next/head'

import mockData from '../components/mockData';
import StatusCard from '../components/statusCard';
import { useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useRouter } from 'next/router';
import router from 'next/router'

const TRELLO_KEY = process.env.TRELLO_KEY
const TRELLO_TOKEN = process.env.TRELLO_TOKEN

export async function getStaticPaths() {
    // https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths

    const response = await fetch(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
    const json = await response.json()

    console.log("aasdasd", json)

    const paths = json.map(data => {
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

    console.log(boardLists);
    return {
        props: {
            board,
            boardLists,
            cardListsArr
        }
    }

}


export default function Project({ board, boardLists, cardListsArr }) {

    useEffect(() => {
        // alert("PING")
        // console.log("asdasds", mockData, projData, test, json)
    }, [])

    return (
        <Layout>
            <Head>
                <title> {board.name} </title>
            </Head>
            <main>
                <h1> {board.name} </h1>
                {
                    boardLists.length === 0 &&
                    <p> there are no columns </p>
                }
                <Container fluid>
                    <Row>
                        {
                            boardLists.map((listData, index) => (
                                <>
                                    <StatusCard key={listData.id} listData={listData} listCards={cardListsArr[index]} />
                                </>
                            ))
                        }
                    </Row>
                </Container>
            </main>

        </Layout>
    )
}
