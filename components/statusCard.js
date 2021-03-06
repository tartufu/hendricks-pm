import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styles from './statusCard.module.css'
import Button from '@material-ui/core/Button';
import AddCardModal from './addCardModal';
import SingleCard from './singleCard';


export default function StatusCard({ listData, listCards, boardListsData, listIndex, updateListsHandler }) {

    const [cardsData, setCardsData] = useState(listCards);
    const [modalToggle, setModalToggle] = useState(false)

    const modalToggleHandler = () => {
        setModalToggle(!modalToggle)
    }

    const updateListCardsHandler = (res) => {

        let newListCardsArr = [...cardsData];
        newListCardsArr.push(res);
        setCardsData(newListCardsArr)

    }

    useEffect(() => {
        setCardsData(listCards)
    }, [listCards])


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

StatusCard.propTypes = {
    listData: PropTypes.object, 
    listCards: PropTypes.array, 
    boardListsData: PropTypes.array, 
    listIndex: PropTypes.number, 
    updateListsHandler: PropTypes.func
}

