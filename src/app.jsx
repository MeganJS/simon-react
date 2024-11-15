import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    
    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header className='container-fluid'>
                <nav className='navbar fixed-top navbar-dark'>
                    <div className='navbar-brand'>
                    Simon<sup>&reg;</sup>
                    </div>
                    <menu className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to=''>
                                Login
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='about'>
                                About
                            </NavLink>
                        </li>
                        {authState === AuthState.Authenticated && (
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='scores'>
                                    Scores
                                </NavLink>
                            </li>
                        )}
                        {authState === AuthState.Authenticated && (
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='play'>
                                    Play
                                </NavLink>
                            </li>
                        )}
                    </menu>
                </nav>
                </header>

                <main>
                <Routes>
                    <Route path='/' element={<Login 
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState)=>{
                            setAuthState(authState);
                            setUserName(userName);
                        }}
                    />} exact />
                    <Route path='/play' element={<Play userName="frogs"/>} />
                    <Route path='/scores' element={<Scores />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                </main>

                <footer className='bg-dark text-white-50'>
                <div className='container-fluid'>
                    <span className='text-reset'>Author Name(s)</span>
                    <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
                    Source
                    </a>
                </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;