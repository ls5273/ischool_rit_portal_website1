import './navbar.css';

/**
 * Navigation bar component.
 *
 * Provides anchor links to each major section of the site.
 * Displays the site logo and a horizontal list of navigation items.
 *
 * @component
 * @returns {JSX.Element} Rendered navigation bar.
 */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">RIT</div>
      <ul className="nav-links">
        <li><a href="#About">About</a></li>
        <li><a href="#Degrees">Degrees</a></li>
        <li><a href="#Employment">Employment</a></li>
        <li><a href="#Faculty">Faculty</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
