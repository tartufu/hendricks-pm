import Layout from '../components/layout'
import Head from 'next/head'

import mockData from '../components/mockData';
import { useEffect } from 'react'


export async function getStaticPaths() {
    // const paths = getAllPostIds()
    // https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths
    const paths = mockData.map( data => {
        return {
            params: {
                projectId: data.projectId.toString()
            }
        }
    })
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
    // let projData = mockData.filter( data => data.projectId.toString() === params.projectId)
    let projIndex = mockData.findIndex( x => x.id.toString() === params.projectId);
    let projData = mockData[projIndex]
    // console.log("XCZXCX", params, mockData, projData)
    return {
        props: {
            projData,
        }
    }
}


export default function Project({ projData, test }) {

    useEffect(() => {
        // alert("PING")
        console.log("asdasds", mockData, projData, test)
    }, [])
    
    return (
        <Layout>
            <Head>
                <title> {projData.title} </title>
            </Head>
            <main>
                <h1> {projData.title} </h1>
                <h2> {projData.summary} </h2>
            </main>
        </Layout>
    )
}
