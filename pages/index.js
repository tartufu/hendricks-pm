import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import mockData from '../components/mockData'
// import { connectToDatabase } from '../lib/mongodb'


// https://stackoverflow.com/questions/64739543/modulenotfounderror-module-not-found-error-cant-resolve-dns-in-node-modul
// export async function getServerSideProps(context) {
//   const { client } = await connectToDatabase()

//   const isConnected = await client.isConnected()

//   return {
//     props: { isConnected },
//   }
// }


export async function getStaticProps() {
  return {
    props: {
      allProjData: mockData
    }
  }
}

export default function Home({ allPostsData, allProjData, isConnected }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title> Hendricks Project Management </title>
      </Head>

      {/* {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )} */}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects Listing</h2>
        <ul className={utilStyles.list}>
          {
            allProjData.map(({ id, projectId, title, summary }) => (
              <li>
              <Link href={`${projectId}`}>
                <a>{title}</a>
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                <p> {summary} </p>
              </small>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}

