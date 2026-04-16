import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * Entry point for the React application.
 *
 * Imports necessary dependencies, attaches the React component tree to the DOM,
 * and wraps the root component in React.StrictMode to activate additional
 * development checks and warnings.
 *
 * @fileoverview Application bootstrap file for iSchool@RIT React app.
 * @module main
 */

/**
 * Renders the root React component into the DOM.
 *
 * @function renderApp
 * @returns {void}
 */
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
