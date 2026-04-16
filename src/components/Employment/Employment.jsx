import { useState, useEffect } from "react";
import "./Employment.css";
import loading from "./gears.gif";
import axios from "axios";


/**
 * Employment section component.
 *
 * Fetches and displays professional employment and co-op position data
 * from the iSchool API. Users can toggle between the two data sets.
 * Includes loading and error handling states.
 *
 * @component
 * @returns {JSX.Element} Rendered Employment section.
 */
export default function Employment() {
   /** @type {[Array, Function]} Professional employment data */
  const [employmentData, setEmploymentData] = useState([]);

  /** @type {[Array, Function]} Co-op placement data */
  const [coopData, setCoopData] = useState([]);

  /** @type {[boolean, Function]} Data loading status flag */
  const [loaded, setLoaded] = useState(false);

  /** @type {[string|null, Function]} Error message string */
  const [error, setError] = useState(null);

  /** @type {[boolean, Function]} Controls whether employment or co-op data is shown */
  const [showEmployment, setShowEmployment] = useState(true);


  /**
   * Fetches employment and co-op data from the API on component mount.
   * Runs both requests in parallel using `Promise.all`.
   * Updates local state when successful or records an error if requests fail.
   */
  useEffect(() => {
    Promise.all([
      axios.get(
        "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/employmentTable/"
      ),
      axios.get(
        "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/coopTable/"
      ),
    ])
      .then(([employmentResponse, coopResponse]) => {
        setEmploymentData(
          employmentResponse.data.employmentTable.professionalEmploymentInformation
        );
        setCoopData(coopResponse.data.coopTable.coopInformation);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch employment or coop data:", err);
        setError(`Failed to fetch data: ${err.message}`);
        setLoaded(true);
      });
  }, []);


  /**
   * Toggles between displaying employment and co-op data.
   *
   * @function
   * @returns {void}
   */
  const handleToggle = () => {
    setShowEmployment(!showEmployment);
  };


  /**
   * Displays an error message if the API request fails.
   */
  if (error) {
    return (
      <div className="employment">
        <h1>Employment & Co-op Opportunities</h1>
        <p className="errorMessage">{error}</p>
      </div>
    );
  }


  /**
   * Shows a loading spinner while data is being fetched.
   */
  if (!loaded) {
    return (
      <div className="employment">
        <h1>Employment & Co-op Opportunities</h1>
        <img src={loading} alt="loading" className="loadingSpinner" />
      </div>
    );
  }


  /**
   * Limits the number of displayed entries for clarity.
   *
   * @type {Array}
   */
  const jobs = employmentData.slice(0, 8);
  const coops = coopData.slice(0, 8);


  /**
   * Generates JSX elements for professional employment data.
   *
   * @type {JSX.Element[]}
   */
  const jobContent = jobs.map((job, index) => (
    <div key={index} className="employmentCard">
      <h3>{job.title}</h3>
      <p><strong>Employer:</strong> {job.employer}</p>
      <p><strong>Degree:</strong> {job.degree}</p>
      <p><strong>City:</strong> {job.city}</p>
      <p><strong>Start Date:</strong> {job.startDate}</p>
    </div>
  ));
 
  /**
   * Generates JSX elements for co-op position data.
   *
   * @type {JSX.Element[]}
   */
  const coopContent = coops.map((coop, index) => (
    <div key={index} className="employmentCard">
      <p><strong>Employer:</strong> {coop.employer}</p>
      <p><strong>Degree:</strong> {coop.degree}</p>
      <p><strong>City:</strong> {coop.city}</p>
      <p><strong>Term:</strong> {coop.term}</p>
    </div>
  ));


  /**
   * Renders the main Employment section layout with a toggle
   * between Professional Employment and Co-op Positions.
   */
  return (
    <div className="employment">
      <h1>Employment & Co-op Opportunities</h1>

      <button onClick={handleToggle} className="toggleButton">
        {showEmployment ? "Show Co-op Positions" : "Show Professional Employment"}
      </button>

      {showEmployment ? (
        <>
          <h2>Professional Employment</h2>
          <div className="employmentGrid">{jobContent}</div>
        </>
      ) : (
        <>
          <h2>Co-op Positions</h2>
          <div className="employmentGrid">{coopContent}</div>
        </>
      )}
    </div>
  );
}
