import { Routes,Route } from "react-router-dom";
import AuthForm from "./Component/Pages/AuthForm";
import LoggedinPage from "./Component/Pages/LoggedinPage";
import UpdateProfile from "./Component/Pages/UpdateProfile";


function App() {
  return (
    <div >
      <Routes>
      {/* <Route path="/login" element={<AuthForm />} /> */}
      <Route path="/" element={<AuthForm />} />
      <Route path="/loggedin" element={<LoggedinPage />} />
      <Route path="/updateprofile" element={<UpdateProfile/>} />
      </Routes>
    
    </div>
  );
}

export default App;
