// import Dashboard from "./pages/dashboard"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { SharedView } from "./pages/sharedPage"
import { AuthRedirect, PravitRoute } from "./components/ui/AuthRedirect"

function App() {
  return(
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<AuthRedirect><Signup/></AuthRedirect>}/>
          <Route path="/signin" element={<AuthRedirect><Signin/></AuthRedirect>}/>
          <Route path="/dashboard" element={<PravitRoute><Dashboard/></PravitRoute>}/>
          <Route path="/share/:hash" element={<SharedView/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
