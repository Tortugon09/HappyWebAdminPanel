import {useContext, useState} from "react";
import {CartContext} from "../../CartContext.jsx";
import axios from "axios";
import CardProducts from "./CardProducts";
import {Container, Grid} from "@mui/material";


export function BodyProducts() {
    const {products, addProduct, addImg} = useContext(CartContext)
    const [file,setFile] = useState(null)
    const [product, setproduct] = useState({
        id:0 ,
        description: "",
        name:"",
        price: 0,
        quantity:0,
        cakePicture:`${file}`
    });
    const handleChange = e => {
        setproduct({...product ,[e.target.name]: e.target.value})
        console.log(product)
        console.log(file)
    }
    const handleSubmit = e => {
        e.preventDefault()
        addProduct(product);
    }
    const handleChange2 = event => {
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        console.log(...formData)
        const k = [...formData]
        console.log(k)
        axios.post('http://localhost:8080/file', formData
        ).then(function (response) {
            console.log(response)
            setproduct({...product, cakePicture: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }



    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Productos</h1>
                    <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#ModalToggle1">
                        Add
                    </button>
                </div>
                    <Container maxWidth="lg">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {products.map((product) => (
                                <Grid item xs={2} sm={4} md={4} key={product.id}>
                                    <CardProducts Data={product} key={product.id} ></CardProducts>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                <div className="modal fade" id="ModalToggle1" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Añadir un Nuevo Pastel</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="Input1" className="form-label">Nombre del Pastel</label>
                                        <input onChange={handleChange} type="text" name="name" className="form-control" id="Input1"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Coloca La imgaen del pastel</label>
                                        <input onChange={handleChange2} className="form-control" type="file" id="formFile"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Textarea1" className="form-label">Descripcion</label>
                                        <textarea onChange={handleChange} name="description" className="form-control" id="Textarea1" rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Input2" className="form-label">Cantidad</label>
                                        <input  onChange={handleChange} type="Number" name="quantity" className="form-control" id="Input2"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Input3" className="form-label">Precio</label>
                                        <input onChange={handleChange} name="price" type="Number" className="form-control" id="Input3"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Submit</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}