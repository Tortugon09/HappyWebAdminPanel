import {UserData} from "./ShippingData.jsx";
import {OrderDates} from "../BodyHome/OrderDates.jsx";
import {useContext, useState} from "react";
import {CartContext} from "../../CartContext.jsx";
import axios from "axios";


export function BodyClient() {
    const {users} = useContext(CartContext)
        console.log(users)


    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Clientes</h1>
                </div>
                <div className="table-responsive col-12">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">email</th>
                        <th scope="col">name</th>
                        <th scope="col">lastName</th>
                        <th scope="col">phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => <UserData Data={user} key={user.id} ></UserData>)}
                    </tbody>
                </table>
                </div>
            </main>
        </>
    )
}