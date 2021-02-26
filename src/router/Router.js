import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import UserDetail from "../pages/UserDetail";
import Navbar from "../components/Navbar";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Switch>
          <Route exact path="/register" component={Signup}></Route>
          <Route exact path="/login" component={Signin}></Route>
          <Route exact path="/user/:id" component={UserDetail}></Route>
          <Route path="/" component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
