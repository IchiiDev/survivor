import { Link } from "react-router-dom";
import "../pages/pages.scss"
import "./components.scss"

const Sidenav = ({ manageNav }: { manageNav: () => void }) => {
    return (
        <div id="mySidenav" className="sidenav">
            <ul>
                <li>
                    <img className="Link-icon" src="/assets/icon-home.svg" alt="home"/>
                    <Link onClick={manageNav} to="/">Home</Link>
                </li>
                <li>
                    <img className="Link-icon" src="/assets/icon-heart.svg" alt="compatibility"/>
                    <Link onClick={manageNav} to="/compatibility">Compatibility</Link>
                </li>
                <li>
                    <img className="Link-icon" src="/assets/icon-dress.svg" alt="wardrobe"/>
                    <Link onClick={manageNav} to="/wardrobe">Wardrobe</Link>
                </li>
                <li>
                    <img className="Link-icon" src="/assets/icon-customer-service.svg" alt="coaches"/>
                    <Link onClick={manageNav} to="/coaches">Coaches</Link>
                </li>
                <li>
                    <img className="Link-icon" src="/assets/icon-character.svg" alt="customers"/>
                    <Link onClick={manageNav} to="/customers">Customers</Link>
                </li>
                <li>
                    <img className="Link-icon" src="/assets/icon-stats.svg" alt="statistics"/>
                    <Link onClick={manageNav} to="/statistics">Statistics</Link>
                </li>
                <li>
                    <img className="Link-icon" src="/assets/icon-light-bulb.svg" alt="tips"/>
                    <Link onClick={manageNav} to="/tips">Tips</Link>
                </li>
                <li>
                    <img className="Link-icon" src="/assets/icon-events.svg" alt="events"/>
                    <Link onClick={manageNav} to="/events">Events</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidenav;
