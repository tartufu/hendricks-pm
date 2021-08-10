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


    const [newCardDetail, setNewCardDetail] = useState("");
    const [errorToggle, setErrorToggle] = useState(false);

    const submitNewCardHandler = () => {
        if (newCardDetail === "") {
            setErrorToggle(true);
            return null
        }
        // alert("Ping " + listId + " " + newCardDetail);
        modalToggleHandler()
        setErrorToggle(false)
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