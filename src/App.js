import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextField id="standard-basic" label="Username" />
        <TextField id="standard-basic" label="Password" />
        <div style={{ flexDirection: "row", marginTop: 24 }}>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 6 }}
          >
            Sign In
          </Button>
          <Button
            color="secondary"
            variant="contained"
            style={{ marginLeft: 6 }}
          >
            Sign Up
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
