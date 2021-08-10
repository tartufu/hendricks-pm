import Modal from '@material-ui/core/Modal';
import styles from './AddCardModal.module.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';


import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';




export default function AddCardModal({ modalToggle, modalToggleHandler, listId }) {

    const REACT_APP_TRELLO_KEY = process.env.REACT_APP_TRELLO_KEY
    const REACT_APP_TRELLO_TOKEN = process.env.REACT_APP_TRELLO_TOKEN

    // TRELLO_KEY=ebee9c2d87f0d634524fe2162b73ced3
    // TRELLO_TOKEN=6056672afc308314a457b271fd2080311aabd4e8f27611e1648b52e65d2e17ea

    const [newCardDetail, setNewCardDetail] = useState("");
    const [errorToggle, setErrorToggle] = useState(false);

    const submitNewCardHandler = () => {
        if (newCardDetail === "") {
            setErrorToggle(true);
            return null
        }
        // alert("Ping " + listId + " " + newCardDetail);
        console.log("ADAWDAD", newCardDetail);
        modalToggleHandler()
        setErrorToggle(false)

        // https://api.trello.com/1/cards?key=myKey&token=myToken&name=newCardName&desc=newCarddescription&idList=myListId
        alert(REACT_APP_TRELLO_KEY)

        fetch(`https://api.trello.com/1/cards?key=${REACT_APP_TRELLO_KEY}&token=${REACT_APP_TRELLO_TOKEN}&idList=${listId}&name=${newCardDetail}`, {
            method: 'POST'
        }).then(res => {
            console.log(
                `Response: ${res.status} ${res.statusText}`
              );
              return res.text();
        }).then(text => console.log(text)).catch(err => console.log(err))
    }

    return (
        <Dialog
            open={modalToggle}
            keepMounted
            onClose={modalToggleHandler}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Add a new card"}</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    label="Card Detail"
                    placeholder="Hello World"
                    fullWidth
                    onChange={(e) => setNewCardDetail(e.target.value)}
                    value={newCardDetail}
                    error={errorToggle}
                    helperText={errorToggle ? "Card Details cannot be blank" : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={submitNewCardHandler} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}