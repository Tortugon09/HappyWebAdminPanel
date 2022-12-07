import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useContext, useState} from "react";
import {CartContext} from "../../CartContext.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete.js";

export default function CardProducts({Data}) {
    const {delateProduct, editProduct} = useContext(CartContext)
    const [product, setproduct] = useState({
        id: Data.id ,
        description: "",
        name:"",
        price: "",
        quantity:"",
    });
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSend = () => {
        delateProduct(Data)
        setOpen(false);
    };

    const handleChange = e => {
        setproduct({...product ,[e.target.name]: e.target.value})
        console.log(product)
    }
    const handleSubmit = e => {
        e.preventDefault()
        editProduct(product);
    }
    return (

        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="Pastel producto"
                    height="200"
                    image={Data.cakePicture}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        ID:{Data.id}
                        <br/>
                        {Data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Descripcion:{Data.description}
                        <br/>
                        Cantidad: {Data.quantity} Precio: {Data.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#ModalToggle2">
                        Edit
                    </button>
                    <button type="button" onClick={() => handleClickOpen(Data)} className="btn btn-sm btn-outline-danger">
                        Eliminar
                    </button>
                </CardActions>
            </Card>
            <div className="modal fade" id="ModalToggle2" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Producto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="Input2" className="form-label">Cantidad</label>
                                    <input  onChange={handleChange} type="Number" name="quantity" className="form-control" id="Input2"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Input3" className="form-label">Precio</label>
                                    <input onChange={handleChange} name="price" type="Number" className="form-control" id="Input3"/>
                                </div>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal"
                                        aria-label="Close">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

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
    );
}
