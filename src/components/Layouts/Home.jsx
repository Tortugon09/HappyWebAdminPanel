import {NavBar} from "../Header/NavBar";
import {SlideNavbar} from "../Header/SlideNavbar";
import {OrdersBody} from "../Body/BodyHome/OrdersBody.jsx";

export function Home() {
    return (
        <>
            <NavBar></NavBar>
            <div className="container-fluid">
                <div className="row">
            <SlideNavbar></SlideNavbar>
            <OrdersBody></OrdersBody>
                </div>
            </div>
        </>
    )
}