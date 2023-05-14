import { Routes,Route } from "react-router-dom";
import AuthForm from "./Component/Pages/AuthForm";
import LoggedinPage from "./Component/Pages/LoggedinPage";
import UpdateProfile from "./Component/Pages/UpdateProfile";
import Navbar from "./Component/Navbar/Navbar";
import ExpenseTracker from "./Component/Pages/ExpenseTracker";


function App() {
  return (
    <div >
      <Navbar/>
      <Routes>
      {/* <Route path="/login" element={<AuthForm />} /> */}
      <Route path="/" element={<AuthForm />} />
      <Route path="/loggedin" element={<LoggedinPage />} />
      <Route path="/updateprofile" element={<UpdateProfile/>} />
      <Route path="/expensetracker" element={<ExpenseTracker/>} />
      </Routes>
    
    </div>
  );
}

export default App;
