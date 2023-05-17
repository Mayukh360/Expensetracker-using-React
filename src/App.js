import { Routes,Route } from "react-router-dom";
import AuthForm from "./Component/Pages/AuthForm";
import LoggedinPage from "./Component/Pages/LoggedinPage";
import UpdateProfile from "./Component/Pages/UpdateProfile";
import Navbar from "./Component/Navbar/Navbar";
import ExpenseTracker from "./Component/Pages/ExpenseTracker";
import { useContext } from "react";
import AuthContext from "./Store/AuthContext";
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
  const authCtx=useContext(AuthContext);
  return (
    <div >
      <Navbar/>
      <Routes>
      {/* <Route path="/login" element={<AuthForm />} /> */}
      <Route path="/" element={<AuthForm />} />
      <Route path="/loggedin" element={<LoggedinPage />} />
      <Route path="/updateprofile" element={<UpdateProfile/>} />
     {isLoggedIn ? ( <Route path="/expensetracker" element={<ExpenseTracker/>} />) :(<Route path="/expensetracker" element={<AuthForm/>} />)}
      </Routes>
    
    </div>
  );
}

export default App;
