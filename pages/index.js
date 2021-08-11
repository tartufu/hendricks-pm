import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import mockData from '../components/mockData'
import { useEffect, useState } from 'react'
import { connectToDatabase } from '../lib/mongodb'


// https://stackoverflow.com/questions/64739543/modulenotfounderror-module-not-found-error-cant-resolve-dns-in-node-modul
export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()
  const isConnected = await client.isConnected()

  const TRELLO_KEY = process.env.TRELLO_KEY
  const TRELLO_TOKEN = process.env.TRELLO_TOKEN

  const response = await fetch(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
  const json = await response.json()

  return {
    props: { isConnected, json },
  }
}


// export async function getStaticProps() {
//   return {
//     props: {
//       allProjData: mockData
//     }
//   }
// }

export default function Home({ isConnected, json }) {

  const [allProjData, setAllProjData] = useState(json)

  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title> Hendricks Project Management </title>
      </Head>

      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
          for instructions.
        </h2>
      )}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects Listing</h2>
        <ul className={utilStyles.list}>
          {
            allProjData.map(({ id, name }) => (
              <li key={id}>
                <Link href={`/${id}`}>
                  <a>{name}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  {/* <p> {summary} </p> */}
                </small>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}

