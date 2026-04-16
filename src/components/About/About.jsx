import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


/**
 * Displays the About section.
 * Fetches content from the iSchool API and shows a quote in a dialog.
 *
 * @returns {JSX.Element} About section with fetched data.
 */
export default function About() {
  /** @type {[Object, Function]} About data object and setter */
  const [about, setAbout] = useState({});

  /** @type {[boolean, Function]} Loading state flag */
  const [loaded, setLoaded] = useState(false);

  /** @type {[string|null, Function]} Error message if API fails */
  const [error, setError] = useState(null);

  /** @type {[boolean, Function]} Dialog open state */
  const [open, setOpen] = useState(false);


  /**
   * Fetches About data from the iSchool API when the component mounts.
   * Uses Axios for HTTP requests and updates local state accordingly.
   */
  useEffect(() => {
    axios
      .get(
        "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/about/"
      )
      .then((response) => {
        setAbout(response.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch ABOUT data:", err);
        setError(`Failed to fetch ABOUT data: ${err.message}`);
        setLoaded(false);
      });
  }, []);


  /** Open quote dialog */
  const handleDialogOpen = () => setOpen(true);
  /** Close quote dialog */
  const handleDialogClose = () => setOpen(false);

  
  /**
   * Determines what content to display based on state.
   * - Shows an error message if the API fails.
   * - Displays a spinner while loading.
   * - Renders About details and quote dialog when loaded.
   *
   * @type {JSX.Element}
   */
  let content;
  if (error) {
    content = (
      <Typography color="error" variant="body1" sx={{ mb: 4 }}>
        {error}
      </Typography>
    );
  } else if (!loaded) {
    content = <CircularProgress />;
  } else {
    content = (
      <>
        <Typography
          variant="h5"
          sx={{
            fontSize: "1.8rem",
            color: "#4B2E05",
            mb: "1rem",
            fontWeight: "600",
          }}
        >
          {about.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "#333",
            maxWidth: "800px",
            margin: "0 auto 1.5rem auto",
          }}
        >
          {about.description}
        </Typography>

        <Button
          variant="contained"
          onClick={handleDialogOpen}
          sx={{
            backgroundColor: "#FF7A00",
            color: "#fff",
            fontSize: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            marginTop: "1.5rem",
            boxShadow: "none",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            "&:hover": { backgroundColor: "#e96c00" },
            "&:active": { backgroundColor: "#cc5e00" },
          }}
        >
          Show Quote
        </Button>

        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Quote</DialogTitle>
          <DialogContent>
            <Typography
              variant="body1"
              sx={{
                fontStyle: "italic",
                fontSize: "1.1rem",
                mb: "0.5rem",
              }}
            >
              "{about.quote}"
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#FFB347",
              }}
            >
              — {about.quoteAuthor}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  
  /**
   * Renders the About section layout with title and dynamic content.
   */
  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        textAlign: "center",
        py: "4rem",
        px: "2rem",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            color: "#FF7A00",
            fontSize: "2.5rem",
            fontWeight: "bold",
            mb: "2rem",
          }}
        >
          iSchool @ RIT
        </Typography>
        {content}
      </Container>
    </Box>
  );
}
