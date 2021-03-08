import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import ForgotPass from "../pages/ForgotPass";
import UserDetail from "../pages/UserDetail";
import UserPost from "../pages/UserPost";
import TagPost from "../pages/TagPost";
import Navbar from "../components/Navbar";
import StickyFooter from "../components/Footer";
import { FirebaseAuthContext } from "../context/AuthContext";

function AppRouter() {
  const { currentUser } = useContext(FirebaseAuthContext);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={Signup}></Route>
        <Route exact path="/login" component={Signin}></Route>
        <Route exact path="/forgotpass" component={ForgotPass}></Route>
        <Route
          exact
          path="/user/:id"
          component={currentUser ? UserDetail : Signin}
        ></Route>
        <Route
          exact
          path="/user/:id/post"
          component={currentUser ? UserPost : Signin}
        ></Route>
        <Route
          exact
          path="/tag/:tag/post"
          component={currentUser ? TagPost : Signin}
        ></Route>
        <Route path="/" component={Main}></Route>
      </Switch>
      <StickyFooter />
    </Router>
  );
}

export default AppRouter;
