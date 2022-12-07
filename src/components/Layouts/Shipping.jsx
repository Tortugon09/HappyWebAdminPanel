import {NavBar} from "../Header/NavBar.jsx";
import {SlideNavbar} from "../Header/SlideNavbar.jsx";
import {BodyProducts} from "../Body/BodyProducts/BodyProducts.jsx";
import {BodyShipping} from "../Body/BodyShipping/BodyShipping.jsx";

export function Shipping() {
    return (
        <>
            <NavBar></NavBar>
            <div className="container-fluid">
                <div className="row">
                    <SlideNavbar></SlideNavbar>
                    <BodyShipping></BodyShipping>
                </div>
            </div>

        </>
    )
}