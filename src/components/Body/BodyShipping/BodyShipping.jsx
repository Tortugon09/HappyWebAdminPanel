import {ShippingData} from "./ShippingData.jsx";
import {OrderDates} from "../BodyHome/OrderDates.jsx";
import {useContext, useState} from "react";
import {CartContext} from "../../CartContext.jsx";
import axios from "axios";


export function BodyShipping() {
    const {products, addProduct, shipping} = useContext(CartContext)


    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Shipping</h1>
                </div>
                <div className="table-responsive col-12">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">dateExit</th>
                        <th scope="col">dateReceived</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shipping.map((product) => <ShippingData Data={product} key={product.id} ></ShippingData>)}
                    </tbody>
                </table>
                </div>
            </main>
        </>
    )
}