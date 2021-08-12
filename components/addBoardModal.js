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


export default function AddBoardModal({ newBoardName, setNewBoardName, addBoardHandler, addBoardModalToggle, setAddBoardModalToggle }) {

    const [errorToggle, setErrorToggle] = useState(false);
    // const [newCardDetailRes, setNewCardDetailRes] = useState({})

    const submitNewBoardHandler = () => {
        if (newBoardName === "") {
            setErrorToggle(true)
            return 
        }

        addBoardHandler()
        setErrorToggle(false)
        setAddBoardModalToggle(false)
        setNewBoardName("")
    }

    return (
        <Dialog
            open={addBoardModalToggle}
            keepMounted
            onClose={() => setAddBoardModalToggle(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Add A New Board"}</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    label="Board Name"
                    placeholder="Project XYZ"
                    fullWidth
                    onChange={(e) => setNewBoardName(e.target.value)}
                    value={newBoardName}
                    error={errorToggle}
                    helperText={errorToggle ? "Board Name cannot be blank" : ""}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={submitNewBoardHandler} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}