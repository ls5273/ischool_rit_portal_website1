import { useState, useEffect } from "react";
import "./Faculty.css";
import loading from "./gears.gif";
import axios from "axios";


/**
 * Faculty section component.
 *
 * Fetches and displays iSchool faculty data from the API.
 * Allows users to toggle between viewing a limited number or all faculty members.
 * Includes loading and error handling states.
 *
 * @component
 * @returns {JSX.Element} Rendered Faculty section.
 */
export default function Faculty() {
  /** @type {[Array, Function]} List of faculty member objects */
  const [facultyData, setFacultyData] = useState([]);

  /** @type {[Array, Function]} List of faculty member objects */
  const [loaded, setLoaded] = useState(false);

  /** @type {[string|null, Function]} Holds any API fetch error message */
  const [error, setError] = useState(null);

  /** @type {[boolean, Function]} Toggles between showing all or some faculty members */
  const [showAll, setShowAll] = useState(false);


  /**
   * Fetches faculty data from the iSchool API when the component mounts.
   * Updates local state with results or displays an error if the request fails.
   */
  useEffect(() => {
    axios.get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/people/faculty/")
      .then((response) => {
        setFacultyData(response.data.faculty);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch faculty data:", err);
        setError(`Failed to fetch faculty data: ${err.message}`);
        setLoaded(true);
      });
  }, []);

  
  /**
   * Toggles display of all faculty members or only the first few.
   *
   * @function
   * @returns {void}
   */
  const handleToggle = () => {
    setShowAll(!showAll);
  };


  /**
   * Displays an error message if faculty data fails to load.
   */
  if (error) {
    return (
      <div className="faculty">
        <h1>Faculty</h1>
        <p className="errorMessage">{error}</p>
      </div>
    );
  }


  /**
   * Shows a loading spinner while fetching data.
   */
  if (!loaded) {
    return (
      <div className="faculty">
        <h1>Faculty</h1>
        <img src={loading} alt="loading" className="loadingSpinner" />
      </div>
    );
  }


  /**
   * Limits displayed faculty to 8 by default, or shows all when toggled.
   *
   * @type {Array}
   */
  const visibleFaculty = showAll
    ? facultyData
    : facultyData.slice(0, 8);


  /**
   * Generates JSX cards for each visible faculty member.
   *
   * @type {JSX.Element[]}
   */
  const facultyContent = visibleFaculty.map((member, index) => (
    <div key={index} className="facultyCard">
      <img src={member.imagePath} alt={member.name} />
      <p className="facultyName">{member.name}</p>
      <p className="facultyTitle">{member.title}</p>

      {member.tagline && <p className="facultyTagline">{member.tagline}</p>}
      {member.interestArea && (
        <p>
          <strong>Interest Area:</strong> {member.interestArea}
        </p>
      )}
      {member.office && (
        <p>
          <strong>Office:</strong> {member.office}
        </p>
      )}
      {member.phone && (
        <p>
          <strong>Phone:</strong> {member.phone}
        </p>
      )}
      {member.email && (
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${member.email}`}>{member.email}</a>
        </p>
      )}
      {member.website && (
        <p>
          <strong>Website:</strong>{" "}
          <a href={member.website} target="_blank" rel="noreferrer">
            {member.website}
          </a>
        </p>
      )}

      <div className="facultySocials">
        {member.twitter && (
          <a href={member.twitter} target="_blank" rel="noreferrer">
            Twitter
          </a>
        )}
        {member.facebook && (
          <a href={member.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        )}
      </div>
    </div>
  ));


  /**
   * Renders the Faculty section with toggle control and grid layout.
   */
  return (
    <div className="faculty">
      <h1>Faculty</h1>

      <button onClick={handleToggle} className="toggleButton">
        {showAll ? "Show Less" : "Show More"}
      </button>

      <div className="facultyGrid">{facultyContent}</div>
    </div>
  );
}
