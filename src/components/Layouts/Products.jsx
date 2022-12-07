import {NavBar} from "../Header/NavBar.jsx";
import {SlideNavbar} from "../Header/SlideNavbar.jsx";
import {OrdersBody} from "../Body/BodyHome/OrdersBody.jsx";
import {BodyProducts} from "../Body/BodyProducts/BodyProducts";

export function Products() {
    return (
        <>
            <NavBar></NavBar>
            <div className="container-fluid">
                <div className="row">
                    <SlideNavbar></SlideNavbar>
                    <BodyProducts></BodyProducts>
                </div>
            </div>
        </>
    )
}