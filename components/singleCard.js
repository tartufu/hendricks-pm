import { useState, useEffect } from 'react';
import styles from './singleCard.module.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function SingleCard({ card, boardListsData, listIndex, updateListsHandler }) {

    const [updateCardModalToggle, setUpdateCardModalToggle] = useState(false)

    const updateCardHandler = async () => {
        setUpdateCardModalToggle(!updateCardModalToggle)

        const newListId = boardListsData[listIndex + 1].id

        let updatedCardRes = ""

        const updateCardRequest = await fetch('/api/updateCard', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                cardId: card.id,
                newListId: newListId
            })
        }).then( res => {
            return res.json()
        }).then( data => {
            updatedCardRes = data
        }).catch(err => console.error(err))

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
                                <span> Update Status: <strong>{boardListsData[listIndex + 1].name}</strong></span>
                                
                            </Button>
                        }

                    </DialogActions>
                </Dialog>}
        </>
    )
}