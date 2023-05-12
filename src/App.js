import { Routes,Route } from "react-router-dom";
import AuthForm from "./Component/Pages/AuthForm";
import LoggedinPage from "./Component/Pages/LoggedinPage";


function App() {
  return (
    <div >
      <Routes>
      <Route path="/login" element={<AuthForm />} />
      <Route path="/loggedin" element={<LoggedinPage />} />
      </Routes>
    
    </div>
  );
}

export default App;
