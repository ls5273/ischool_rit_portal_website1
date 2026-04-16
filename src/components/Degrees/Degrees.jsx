import { useState, useEffect } from "react";
import "./Degrees.css";
import loading from "./gears.gif";
import axios from "axios";


/**
 * Degrees section component.
 *
 * Fetches undergraduate and graduate degree data from the iSchool API using Axios.
 * Displays program titles, descriptions, and optionally shows concentrations or certificates.
 * Includes loading and error handling states.
 *
 * @component
 * @returns {JSX.Element} Rendered Degrees section.
 */
export default function Degrees() {
  /** @type {[Array, Function]} List of undergraduate degree objects */
  const [undergrad, setUndergrad] = useState([]);

  /** @type {[Array, Function]} List of graduate degree objects */
  const [grad, setGrad] = useState([]);

  /** @type {[boolean, Function]} Indicates if data has finished loading */
  const [loaded, setLoaded] = useState(false);

  /** @type {[string|null, Function]} Holds error messages if API request fails */
  const [error, setError] = useState(null);

  /** @type {[boolean, Function]} Toggles visibility of concentrations/certificates */
  const [showDetails, setShowDetails] = useState(false);


  /**
   * Fetches both undergraduate and graduate degree data from the API.
   * Uses `Promise.all` to perform parallel requests.
   * Updates state when data is received or logs an error if requests fail.
   */
  useEffect(() => {
    Promise.all([
      axios.get(
        "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/undergraduate/"
      ),
      axios.get(
        "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/graduate/"
      ),
    ])
      .then(([undergradResponse, gradResponse]) => {
        setUndergrad(undergradResponse.data.undergraduate);
        setGrad(gradResponse.data.graduate);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch degrees data:", err);
        setError(`Failed to fetch degrees data: ${err.message}`);
        setLoaded(true);
      });
  }, []);


  /**
   * Toggles visibility of concentrations and certificates.
   *
   * @function
   * @returns {void}
   */

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };


  /**
   * Displays an error message if the API fails.
   */
  if (error) {
    return (
      <div className="degrees">
        <h1>Degrees @ RIT</h1>
        <p className="errorMessage">{error}</p>
      </div>
    );
  }


  /**
   * Shows a loading spinner while data is being fetched.
   */
  if (!loaded) {
    return (
      <div className="degrees">
        <h1>Degrees @ RIT</h1>
        <img src={loading} alt="loading" className="loadingSpinner" />
      </div>
    );
  }


  /**
   * Undergraduate degrees.
   *
   * @type {JSX.Element[]}
   */
  const undergradContent = undergrad.map((deg) => (
    <div key={deg.degreeName} className="degreeCard">
      <h3>{deg.title}</h3>
      <p>{deg.description}</p>

      {showDetails && deg.concentrations && (
        <ul>
          {deg.concentrations.map((conc, index) => (
            <li key={index}>{conc}</li>
          ))}
        </ul>
      )}
    </div>
  ));

  /**
   * Graduate degrees.
   *
   * @type {JSX.Element[]}
   */
  const graduateContent = grad.map((deg) => (
    <div key={deg.degreeName} className="degreeCard">
      <h3>{deg.title || deg.degreeName}</h3>
      <p>{deg.description}</p>

      {showDetails && deg.concentrations && (
        <ul>
          {deg.concentrations.map((conc, index) => (
            <li key={index}>{conc}</li>
          ))}
        </ul>
      )}

      {showDetails && deg.availableCertificates && (
        <ul>
          {deg.availableCertificates.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      )}
    </div>
  ));


  /**
   * Renders the full Degrees section layout.
   */
  return (
    <div className="degrees">
      <h1>Degrees @ RIT</h1>

      <h2>Undergraduate Programs</h2>
      <div className="degreeGrid">{undergradContent}</div>

      <h2>Graduate Programs</h2>
      <div className="degreeGrid">{graduateContent}</div>

      <button onClick={handleToggle} className="toggleButton">
        {showDetails
          ? "Hide Concentrations / Certificates"
          : "Show Concentrations / Certificates"}
      </button>
    </div>
  );
}
