import {Link} from "react-router-dom";
import {useContext} from "react";
import {CartContext} from "../CartContext.jsx";

export function NavBar() {
    const {setUserR,setLoginUser,setToken} = useContext(CartContext)

    return (
        <>

            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link to={"/"} className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">Happy Web</Link>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text"
                       placeholder="Search" aria-label="Search"/>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <Link to={"/"} onClick={() =>{
                                setUserR([])
                                setLoginUser(false)
                                setToken("")
                            }} className="nav-link px-3" href="#">Sign out</Link>
                        </div>
                    </div>
            </header>

        </>
    )
}