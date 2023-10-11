import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Setting from "./pages/Setting";
import Questions from "./pages/Questions";
import FinalAns from "./pages/FinalAns";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Switch>
            <Route path="/" exact>
              <Typography variant="h2" fontWeight="bold">
                Quiz App
              </Typography>
              <Setting />
            </Route>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/score">
              <FinalAns />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;