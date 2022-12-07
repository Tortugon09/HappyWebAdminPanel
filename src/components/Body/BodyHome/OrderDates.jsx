import {format} from "timeago.js";
import axios from "axios";
import {useEffect, useState} from "react";




export function OrderDates({data}) {
    const [user,setUser] = useState([]);
    const [address,setAddress] = useState([])
    const [status,setStatus] = useState([])

    const getUser = async () => {
        await axios
            .get(`http://localhost:8080/client/${data.clientId}`)
            .then(({ data }) => setUser(data.data));
    };
    useEffect(() => {
        getUser();
    }, []);
    const getAddress = async () => {
        await axios.get(`http://localhost:8080/address/client/${data.clientId}`)
            .then(({ data }) => setAddress(data.data));
    }
    useEffect(() => {
        getAddress();
    }, []);
    const getStatus = async () => {
        await axios.get(`http://localhost:8080/statusOrder/${data.statusOrderId}`)
            .then(({ data }) => setStatus(data.data));
    }
    useEffect(() => {
        getStatus();
    }, []);
    return (
        <>
            <tr>
                <td>{data.id}</td>
                <td>{format(data.date)}</td>
                <td>{user.name}</td>
                {address.map((addresss) => <td>{addresss.street}</td>)}
                <td>{status.status}</td>
                <td>                <div className="btn-group col-4">
                    <button type="button" className="btn btn-sm btn-outline-primary">Share</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                </div></td>

            </tr>
        </>
    )
}