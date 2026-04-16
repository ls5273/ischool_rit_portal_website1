import Navbar from './components/Navbar/Navbar.jsx';
import About from './components/About/About.jsx';
import Degrees from './components/Degrees/Degrees.jsx';
import Employment from './components/Employment/Employment.jsx';
import Faculty from './components/Faculty/Faculty.jsx';
import Contact from './components/Contact/Contact.jsx';


/**
 * Main app component that renders the site layout and sections.
 *
 * @returns {JSX.Element} The application root element.
 */
function App() {
    return (
        <div className='App'>
            <Navbar />
            <section id='About'><About title='iSchool @ RIT'/></section>
            <section id='Degrees'><Degrees /></section>
            <section id='Employment'><Employment /></section>
            <section id='Faculty'><Faculty /></section>
            <section id='Contact'><Contact /></section>
        </div>
    );
};

export default App;
