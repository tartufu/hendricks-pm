import { useState, useEffect } from 'react';
import styles from './singleCard.module.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


// import Container from 'react-bootstrap/Contan'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'

export default function SingleCard({ card }) {

    const [updateCardModalToggle, setUpdateCardModalToggle] = useState(false)

    const updateCardHandler = () => {
        alert("PING")
        setUpdateCardModalToggle(!updateCardModalToggle)
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
                        {card.name}
                        <hr></hr>
                        {card.desc}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={updateCardHandler} color="primary">
                            Update Status
                        </Button>
                    </DialogActions>
                </Dialog>}
        </>
    )
}