import { useState, useEffect } from 'react';
import styles from './singleCard.module.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN

export default function SingleCard({ card, boardListsData, listIndex, updateListsHandler }) {

    const [updateCardModalToggle, setUpdateCardModalToggle] = useState(false)

    const updateCardHandler = async () => {
        setUpdateCardModalToggle(!updateCardModalToggle)

        const newListId = boardListsData[listIndex + 1].id

        let updatedCardRes = ""

        const response = await fetch(`https://api.trello.com/1/cards/${card.id}?key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}&idList=${newListId}&pos=bottom`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log(
                    `Response: ${response.status} ${response.statusText}`
                );
                return response.json();
            })
            .then(text => {
                updatedCardRes = text
            })
            .catch(err => console.error(err));

        updateListsHandler(updatedCardRes, listIndex, (listIndex + 1))

    }

    return (
        <>
            <div className={styles.singleCardDiv}>
                <div className={styles.singleCard}>
                    <p onClick={() => setUpdateCardModalToggle(!updateCardModalToggle)}> {card.name}</p>
                </div>
            </div>

            {
                updateCardModalToggle &&
                <Dialog
                    open={updateCardModalToggle}
                    keepMounted
                    onClose={() => setUpdateCardModalToggle(!updateCardModalToggle)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Update Card Status"}</DialogTitle>
                    <DialogContent>
                        <p>{card.name}</p>
                        <hr></hr>
                        <p>{card.desc}</p>
                    </DialogContent>
                    <DialogActions>
                        {
                            (listIndex + 1) !== boardListsData.length &&
                            <Button onClick={updateCardHandler} color="primary">
                                <span> Update Status :<strong>{boardListsData[listIndex + 1].name}</strong></span>
                                
                            </Button>
                        }

                    </DialogActions>
                </Dialog>}
        </>
    )
}