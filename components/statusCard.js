import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react'

export default function StatusCard({ listData, listCards }) {

    const [cardsData, setCardsData] = useState([]);

    const [modalToggle, setModalToggle] = useState(false)

    const handleOpen = () => {
        alert("PING")
    }

    useEffect(async () => {
        const response = await console.log('asdasd')
    }, [])
    return (
        <Col md={3} style={{ border: '1px solid red' }}>
            <h2> {listData.name} </h2>
            <ul>
                {
                    listCards.map(map => <li>{map.name}</li>)
                }
            </ul>
            <Row>
                <Col style={{ textAlign: 'center'}}>
                    <button type="button" onClick={handleOpen} style={{ margin: '0 auto' }}>
                        Add New Card
                    </button>
                </Col>
            </Row>
        </Col>
    )
}

