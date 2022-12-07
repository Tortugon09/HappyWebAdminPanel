import {NavBar} from "../Header/NavBar.jsx";
import {SlideNavbar} from "../Header/SlideNavbar.jsx";
import {BodyClient} from "../Body/BodyClient/BodyShipping";

export function Clients() {
    return (
        <>
            <NavBar></NavBar>
            <div className="container-fluid">
                <div className="row">
                    <SlideNavbar></SlideNavbar>
                    <BodyClient></BodyClient>
                </div>
            </div>
        </>
    )
}