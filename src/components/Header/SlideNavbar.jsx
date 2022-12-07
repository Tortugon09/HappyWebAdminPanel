import {FaHome,FaShoppingCart,FaUsersCog,FaPlaneDeparture} from "react-icons/fa"
import {Link} from "react-router-dom";



export function SlideNavbar() {
    return (
        <>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3 sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to={"/Home"} className="nav-link" aria-current="page" href="#">
                                <span className="align-text-bottom"><FaHome/></span>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/Products"} className="nav-link" href="#">
                                <span className="align-text-bottom"><FaShoppingCart/></span>
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/Shipping"} className="nav-link" href="#">
                                <span className="align-text-bottom"><FaPlaneDeparture/></span>
                                Shippings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/Client"} className="nav-link" href="#">
                                <span className="align-text-bottom"><FaUsersCog/></span>
                                Clients
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}