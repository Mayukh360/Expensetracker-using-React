import { Routes,Route } from "react-router-dom";
import AuthForm from "./Component/Pages/AuthForm";
import LoggedinPage from "./Component/Pages/LoggedinPage";
import UpdateProfile from "./Component/Pages/UpdateProfile";
import Navbar from "./Component/Navbar/Navbar";
import ExpenseTracker from "./Component/Pages/ExpenseTracker";

import { useSelector } from "react-redux";


function App() {
  const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
  
  return (
    <div >
      <Navbar/>
      <Routes>
      {/* <Route path="/login" element={<AuthForm />} /> */}
      <Route path="/Expensetracker-using-React" element={<AuthForm />} />
      <Route path="/loggedin" element={<LoggedinPage />} />
      <Route path="/updateprofile" element={<UpdateProfile/>} />
     {isLoggedIn ? ( <Route path="/expensetracker" element={<ExpenseTracker/>} />) :(<Route path="/expensetracker" element={<AuthForm/>} />)}
      </Routes>
    
    </div>
  );
}

export default App;
