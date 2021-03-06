import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

// db
import { connectToDatabase } from '../lib/mongodb'

// components 
import Layout, { siteTitle } from '../components/layout'
import AddBoardModal from '../components/addBoardModal';

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()
  const isConnected = await client.isConnected()

  const NEXT_PUBLIC_DEV_URL = process.env.NEXT_PUBLIC_DEV_URL

  const allBoardsJson = await (await fetch(`${NEXT_PUBLIC_DEV_URL}/api/getAllBoards`)).json();
  console.log(allBoardsJson)

  return {
    props: { isConnected, allBoardsJson },
  }
}


export default function Home({ isConnected, allBoardsJson }) {

  const [allProjData, setAllProjData] = useState(allBoardsJson)
  const [newBoardName, setNewBoardName] = useState("")
  const [addBoardModalToggle, setAddBoardModalToggle] = useState(false)



  const addBoardHandler = async () => {

    let newProjectArr = [...allProjData];
    let newBoardData = {};

    const addBoard = await fetch(`/api/addBoard`, {
      method: 'POST',
      body: JSON.stringify({
        name: newBoardName
      })
    }).then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    }).then(data => {
      // console.log("???", dat
      newBoardData = data
    }).catch(err => console.log(err))

    newProjectArr.push(newBoardData);
    setAllProjData(newProjectArr);

  }

  return (
    <Layout home>
      <Head>
        <title> Hendricks Project Manager </title>
      </Head>

      {/* {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
          for instructions.
        </h2>
      )} */}



      <h2 onClick={() => setAddBoardModalToggle(!addBoardModalToggle)} style={{ color: 'blue', cursor: 'pointer' }}> Add Board </h2>

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

      {
        addBoardModalToggle &&
        <AddBoardModal
          newBoardName={newBoardName}
          setNewBoardName={setNewBoardName}
          addBoardHandler={addBoardHandler}
          addBoardModalToggle={addBoardModalToggle}
          setAddBoardModalToggle={setAddBoardModalToggle}
        />
      }
    </Layout>
  )
}

Home.propTypes = {
  isConnected: PropTypes.bool,
  allBoardsJson: PropTypes.array
}