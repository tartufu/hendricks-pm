import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react'
import styles from './statusCard.module.css'

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import AddCardModal from './addCardModal';


const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN

export default function StatusCard({ listData, listCards }) {

    const [cardsData, setCardsData] = useState(listCards);

    const [modalToggle, setModalToggle] = useState(false)

    const modalToggleHandler = () => {
        setModalToggle(!modalToggle)
    }

    const updateListCardsHandler = (res) => {

        let newListCardsArr = [...listCards];
        newListCardsArr.push(res);

        console.log("TEST", typeof res, newListCardsArr)

        setCardsData(newListCardsArr)
    }


    return (
        <Col md={3} style={{ border: '1px solid red' }}>
            <h2> {listData.name} </h2>
            <ul>
                {
                    cardsData.map(card => <li key={card.id}>{card.name}</li>)
                }
            </ul>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={modalToggleHandler}>
                        Add New Card
                    </Button>
                </Col>
            </Row>

            {
                modalToggle &&
                <AddCardModal modalToggle={modalToggle} modalToggleHandler={modalToggleHandler} listId={listData.id} updateListCardsHandler={updateListCardsHandler}/>
            }
        </Col>
    )
}

