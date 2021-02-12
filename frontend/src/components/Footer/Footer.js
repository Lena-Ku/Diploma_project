import React from 'react';
import Navigation from '../Navigation/Navigation.js';


function Footer() {

    return (
        <>
           <footer className="footer">
               <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
               <Navigation />
           </footer>
        </>
    )
}

export default Footer;