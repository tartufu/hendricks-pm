import styles from './AddCardModal.module.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';


import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

const NEXT_PUBLIC_TRELLO_KEY = process.env.NEXT_PUBLIC_TRELLO_KEY
const NEXT_PUBLIC_TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN


export default function AddCardModal({ modalToggle, modalToggleHandler, listId, updateListCardsHandler }) {

    const [newCardDetail, setNewCardDetail] = useState("");
    const [newCardDesc, setNewCardDesc] = useState("")
    const [errorToggle, setErrorToggle] = useState(false);
    // const [newCardDetailRes, setNewCardDetailRes] = useState({})

    const submitNewCardHandler = async () => {

        let newCardDetailRes = "";
        if (newCardDetail === "") {
            setErrorToggle(true);
            return null
        }
        // console.log("ADAWDAD", newCardDetail);
        modalToggleHandler()
        setErrorToggle(false)

        const response = await fetch(`https://api.trello.com/1/cards?key=${NEXT_PUBLIC_TRELLO_KEY}&token=${NEXT_PUBLIC_TRELLO_TOKEN}&idList=${listId}&name=${newCardDetail}&desc=${newCardDesc}`, {
            method: 'POST'
        }).then(res => {
            console.log(
                `Response: ${res.status} ${res.statusText}`
              );
              return res.json();
        }).then(text => {
            newCardDetailRes = text;
        }).catch(err => console.log(err))

        // console.log(">>>", newCardDetailRes)
        updateListCardsHandler(newCardDetailRes)

        // const test = await fetch("/api/cards", {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       },
        //     body: JSON.stringify(newCardDetailRes)
        // });

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

                <TextField
                    label="Card Description"
                    placeholder="FooBar"
                    fullWidth
                    onChange={(e) => setNewCardDesc(e.target.value)}
                    value={newCardDesc}
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