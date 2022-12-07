import {useContext, useState} from "react";
import {CartContext} from "../../CartContext.jsx";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DeleteIcon from '@mui/icons-material/Delete';
import {SnackbarProvider, useSnackbar} from 'notistack';






export function UserData({Data}) {
    const {delateUser} = useContext(CartContext)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSend = () => {
        delateUser(Data.id)
        setOpen(false);
    };



    return (
        <>
            <tr>
                <td>{Data.id}</td>
                <td>{Data.email}</td>
                <td>{Data.name}</td>
                <td>{Data.lastName}</td>
                <td>{Data.phone}</td>
                <div className="btn-group col-4">
                    <button type="button" onClick={() => handleClickOpen(Data)} className="btn btn-sm btn-outline-danger">
                        Eliminar
                    </button>
                </div>
            </tr>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Eliminar un usuario?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        SEGURO QUE DESEAS ELMINAR UN USUARIO?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose} >No Eliminar</Button>
                        <Button onClick={handleSend} color="error" autoFocus
                                endIcon={<DeleteIcon />}>
                            Eliminar
                        </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}