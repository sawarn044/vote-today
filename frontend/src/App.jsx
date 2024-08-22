import { Navigate, Routes , Route} from "react-router-dom";
import "./App.css"
import { useAuthContext } from "./context/AuthContext";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import Login from './pages/login/Login'
import {Toaster} from "react-hot-toast";
import Vote from "./pages/vote/Vote";
import CreatePoll from "./pages/create/CreatePoll";

function App() {
  
  const {authUser} = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      
    <Routes>
      
      <Route path='/' element={authUser ? <Home/> : <Navigate to ={"/login"} />}/>
      <Route path='/login' element={authUser? <Navigate to ="/" /> : <Login/>}/>
      <Route path= '/signup' element ={authUser ? <Navigate to = "/" /> : <SignUp/>}/>
      <Route path='/vote/:id' element={<Vote/>}/>
      <Route path='/create' element={<CreatePoll/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App;
