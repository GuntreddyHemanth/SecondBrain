// import Dashboard from "./pages/dashboard"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"

function App() {
  return(
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          {/* <Route path="/shared" element={<SharedView/>}/> */}
       </Routes>
    </BrowserRouter>
  )
}

export default App
