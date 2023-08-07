import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";

const Error = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="50vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <img
        src={"/404-error-idea.gif"}
        alt="404"
        style={{ width: "100%", maxWidth: "150px", margin: "0 auto" }}
      />
      <Typography align="center" variant="h3" mb={4}>
        Opps!!!
      </Typography>
      <Typography align="center" variant="h6" mb={4}>
        This page you are looking for could not be found.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        href="/"
        disableElevation
      >
        Go Back to Home
      </Button>
    </Container>
  </Box>
);

export default Error;

