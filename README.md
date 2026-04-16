iSCHOOL @ RIT PORTAL WEBSITE 1

Overview:
- The iSchool @ RIT web application is a dynamic, single-page React interface designed to present academic, professional, and faculty information. The application seamlessly connects to external APIs to fetch and display live data regarding undergraduate and graduate degree programs, co-op and employment outcomes, and a comprehensive faculty directory.

Key Features:
- Live Data Integration: Utilizes axios to perform asynchronous HTTP requests, fetching live institutional data directly from the iSchool API.
- Optimized Concurrent Fetching: Employs Promise.all to execute parallel API requests (such as fetching both undergraduate and graduate data simultaneously), significantly reducing load times.
- Robust State Management: Heavily utilizes React hooks (useState, useEffect) to cleanly manage data arrays, loading spinners, and error-handling states across all components.
- Interactive UI Toggles: Features dynamic user controls to filter and expand content on the fly, such as toggling between Co-op and Professional Employment tables, revealing degree concentrations, or expanding the faculty grid.
- Safe HTML Injection: Securely renders raw HTML strings (like copyright and legal links) directly from JSON data using React's dangerouslySetInnerHTML.
- Simulated Asynchronous Loading: Implements setTimeout combined with dynamic imports to simulate API loading states for local JSON data files, ensuring a consistent user experience.

Tech Stack:
- Frontend Library: React (implemented with a component-driven architecture and functional hooks).
- Data Fetching: Axios (for promise-based HTTP requests).
- UI Components & Styling: Material UI (MUI) combined with custom, scoped CSS for responsive grid layouts and interactive elements.
- Build Tool: Vite (configured for fast, modern module bundling).
