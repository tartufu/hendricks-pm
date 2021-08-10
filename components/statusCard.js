import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react'
import styles from './statusCard.module.css'

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import AddCardModal from './addCardModal';


export default function StatusCard({ listData, listCards }) {

    const [cardsData, setCardsData] = useState([]);

    const [modalToggle, setModalToggle] = useState(false)

    const modalToggleHandler = () => {
        setModalToggle(!modalToggle)
    }

    // useEffect(async () => {
    //     const response = await console.log('asdasd')
    // }, [])
    
    return (
        <Col md={3} style={{ border: '1px solid red' }}>
            <h2> {listData.name} </h2>
            <ul>
                {
                    listCards.map(card => <li key={card.id}>{card.name}</li>)
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
                <AddCardModal modalToggle={modalToggle} modalToggleHandler={modalToggleHandler} listId={listData.id}/>
            }
        </Col>
    )
}

