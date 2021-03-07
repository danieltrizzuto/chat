import { CircularProgress } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import { AuthPage } from "./pages/Auth";
import { ChatPage } from "./pages/Chat";

function App() {
  const { user, loading: userLoading } = UserContext.useContainer();

  if (userLoading) {
    return (
      <div className="App">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="App">
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/*">
            <ChatPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
