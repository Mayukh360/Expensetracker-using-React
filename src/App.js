import { Routes,Route } from "react-router-dom";
import AuthForm from "./Component/Pages/AuthForm";
import LoggedinPage from "./Component/Pages/LoggedinPage";
import UpdateProfile from "./Component/Pages/UpdateProfile";
import Navbar from "./Component/Navbar/Navbar";
import ExpenseTracker from "./Component/Pages/ExpenseTracker";
import { useContext } from "react";
import AuthContext from "./Store/AuthContext";


function App() {
  const authCtx=useContext(AuthContext);
  return (
    <div >
      <Navbar/>
      <Routes>
      {/* <Route path="/login" element={<AuthForm />} /> */}
      <Route path="/" element={<AuthForm />} />
      <Route path="/loggedin" element={<LoggedinPage />} />
      <Route path="/updateprofile" element={<UpdateProfile/>} />
     {authCtx.isLoggedIn ? ( <Route path="/expensetracker" element={<ExpenseTracker/>} />) :(<Route path="/expensetracker" element={<AuthForm/>} />)}
      </Routes>
    
    </div>
  );
}

export default App;
