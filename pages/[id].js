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
    // const paths = getAllPostIds()
    // https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths

    const response = await fetch(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)


    // https://api.trello.com/1/members/me/boards?fields=name,url&key={apiKey}&token={apiToken}
    const json = await response.json()

    console.log("aasdasd", json)

    const paths = json.map( data => {
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

    console.log(params.id)

    // const { asPath, pathname } = useRouter();
    // console.log(asPath); // '/blog/xyz'
    // console.log(pathname); // '/blog/[slug]'

    // let boardIndex = params.findIndex( x => x.id )

    // https://api.trello.com/1/members/me/boards?fields=name,url&key={apiKey}&token={apiToken}

    // https://api.trello.com/1/boards/{id}?key=0471642aefef5fa1fa76530ce1ba4c85&token=9eb76d9a9d02b8dd40c2f3e5df18556c831d4d1fadbe2c45f8310e6c93b5c548

    const response = await fetch(`https://api.trello.com/1/boards/${params.id}/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
    const json = await response.json()

    console.log(response)
    // curl 'https://api.trello.com/1/boards/{idBoard}?key={yourKey}&token={yourToken}'
    // let projData = mockData.filter( data => data.projectId.toString() === params.projectId)
    // let projIndex = mockData.findIndex( x => x.id.toString() === params.projectId);
    // let projData = mockData[projIndex]
    // console.log("XCZXCX", params, mockData, projData)
    return {
        props: {
            json
        }
    }

}


export default function Project({ projData, test, json }) {

    useEffect(() => {
        // alert("PING")
        console.log("asdasds", mockData, projData, test, json)
    }, [])
    
    return (
        <Layout>
            <Head>
                <title> {json.name} </title>
            </Head>
            <main>
                <h1> {json.name} </h1>
                {/* <h2> {projData.summary} </h2> */}
                    <Container fluid>
                        <Row>
                            <StatusCard />
                            <StatusCard />
                            <StatusCard />
                            <StatusCard />
                        </Row>
                    </Container>
                    {
                        json.map( x => <p> {x.name}</p>)
                    }
            </main>

        </Layout>
    )
}
