import { Outlet, Link } from 'react-router-dom';

function Layout() {
    return (
        <div className="app-container">
            <header>
                <h1>GLITCH BAY</h1>
                <nav>
                    <Link to="/">Home</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <p>© 1920 Glitch Bay</p>
            </footer>
        </div>
    );
}

export default Layout;