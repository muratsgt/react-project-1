import logo from './logo.svg';
import './App.css';
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {

  console.log(process.env);

  return (
    <div className="App">
      <Navbar/>
      <Signup/>


{/* 
 route
 signin
 signup
 forgotpassword
 ...
*/}
    </div>
  );
}

export default App;
