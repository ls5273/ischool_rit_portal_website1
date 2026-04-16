import { useState, useEffect } from "react";
import './Contact.css';
import loading from './gears.gif';


/**
 * Contact section component.
 *
 * Loads contact data from a local JSON file and displays
 * social media links, a tweet, and quick links that can be toggled.
 * Shows a loading spinner while fetching data.
 *
 * @component
 * @returns {JSX.Element} Rendered Contact section.
 */
export default function Contact() {
    /** @type {[Object, Function]} Contact data object and setter */
    const [contactData, setContactData] = useState({});

    /** @type {[boolean, Function]} Data loading state flag */
    const [loaded, setLoaded] = useState(false);

    /** @type {[boolean, Function]} Toggles visibility of quick links */
    const [showLinks, setShowLinks] = useState(false);


    /**
     * Simulates asynchronous loading of contact data from `contact.json`.
     * Waits 2 seconds before dynamically importing the JSON file.
     */
    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const data = await import('./contact.json');
                setContactData(data);
                setLoaded(true);
            } catch (error) {
                console.error("Error loading contact.json:", error);
            }
        }, 2000);
    });


    /**
     * Toggles visibility of the Quick Links section.
     *
     * @function
     * @returns {void}
     */
    const handleToggleLinks = () => {
        setShowLinks(!showLinks);
    };


    /**
     * Renders loading state, error, or loaded contact content.
     *
     * @type {JSX.Element}
     */
    let content;
    if (!loaded) {
        content = <img src={loading} alt="loading" className="loadingSpinner"/>;
    } else {
        const { social, quickLinks, copyright } = contactData;

        content = (
            <>
                <h2>{social.title}</h2>
                <p className="tweet">
                    {social.tweet} <br />
                    <span>{social.by}</span>
                </p>

                <div className="socialLinks">
                    <div className="socialLinks">
                        <a href={social.twitter} target="_blank" rel="noreferrer">Twitter</a>
                        <a href={social.facebook} target="_blank" rel="noreferrer">Facebook</a>
                    </div>
                </div>

                <button onClick={handleToggleLinks} className="toggleButton">
                    {showLinks ? "Hide Quick Links" : "Show Quick Links"}
                </button>

                {showLinks && (
                    <div className="quickLinks">
                        {quickLinks.map((link, index) => (
                            <a key={index} href={link.href} target="_blank" rel="noreferrer">
                                {link.title}
                            </a>
                        ))}
                    </div>
                )}

                <div
                    className="copyright"
                    dangerouslySetInnerHTML={{ __html: copyright.html }}
                />
            </>
        );
    }

    
    /**
     * Renders the footer container with all contact content.
     */
    return (
        <footer className="contact">
            <div className="contactContent">{content}</div>
        </footer>
    );
}
