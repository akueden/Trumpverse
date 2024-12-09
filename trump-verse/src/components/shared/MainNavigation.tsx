import {Link} from 'react-router-dom';

const MainNavigation = () => {
    return (
        <header className='navbar'>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="register">Create a new post</Link></li>
                <li><Link to="update-delete">Manage your posts</Link></li>
                <li><Link to="search">Search after posts</Link></li>
            </ul>
        </nav>
        </header>
    )
}

export default MainNavigation;