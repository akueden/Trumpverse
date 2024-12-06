import {Link} from 'react-router-dom';

const MainNavigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
            <ul className="navbar-nav me-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Hjem</Link></li>
                <li className="nav-item"><Link className="nav-link" to="register">Legge ut innlegg</Link></li>
                <li className="nav-item"><Link className="nav-link" to="update-delete">Administrer Innlegg</Link></li>
                <li className="nav-item"><Link className="nav-link" to="search">Søk etter Innlegg</Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default MainNavigation;