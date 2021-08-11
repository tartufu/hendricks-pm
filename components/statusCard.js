import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react'
import styles from './statusCard.module.css'

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import AddCardModal from './addCardModal';
import SingleCard from './singleCard';


export default function StatusCard({ listData, listCards, boardListsData, listIndex, updateListsHandler }) {

    const [cardsData, setCardsData] = useState(listCards);

    const [modalToggle, setModalToggle] = useState(false)

    const modalToggleHandler = () => {
        setModalToggle(!modalToggle)
    }

    const updateListCardsHandler = (res) => {

        let newListCardsArr = [...listCards];
        newListCardsArr.push(res);
        setCardsData(newListCardsArr)
    }


    return (
        <Col md={3}>
            <div className={styles.statusCardDiv}>
            <h2> {listData.name} </h2>
            {
                cardsData.map(card => <SingleCard key={card.id} card={card} boardListsData={boardListsData} listIndex={listIndex} updateListsHandler={updateListsHandler}/>)
            }
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
            </div>
        </Col>
    )
}

