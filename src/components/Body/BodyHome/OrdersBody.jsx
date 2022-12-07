import {OrderDates} from "./OrderDates";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../CartContext.jsx";
import DatePicker from "react-datepicker";
import {DataOrders} from "./DataOrders";

export function OrdersBody() {
    const {order} = useContext(CartContext)
    DataOrders()


    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div className="table-responsive col-12">
                <DataOrders></DataOrders>
                </div>
                <h2>Orders</h2>
                <div className="table-responsive col-12">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Hace cuanto se hizo la orden</th>
                            <th scope="col">Usuario que realizo la orden</th>
                            <th scope="col">Direccion de envio</th>
                            <th scope="col">Status Order</th>
                        </tr>
                        </thead>
                        <tbody >
                        {order.map((orders) => <OrderDates data={orders} key={orders.id}></OrderDates>)}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}