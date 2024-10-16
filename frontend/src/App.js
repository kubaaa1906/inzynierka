import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AddTasks from "./components/AddTasks";
import MainBeforeLogging from "./components/MainBeforeLogging";
import Contact from "./components/Contact"
import AddApplication from "./components/AddReport";
import AddCategory from "./components/AddCategory";


function App() {
  const user = localStorage.getItem("token")
  return (
      <Routes>
          {/* tutaj tylko dla zalogowanych */}
          {user ? (
              <>
                  <Route path="/main" exact element={<Main />} />
                  <Route path="/addtask" exact element={<AddTasks />} />
                  {/* kazda inna wpisana sciezka po zalogowaniu przekierowuje na main */}
                  <Route path="*" element={<Navigate replace to="/main" />} />
                  <Route path="/contact" exact element={<Contact />} />
                  <Route path="/addapplication" exact element={<AddApplication/>} />
                  <Route path="/addcategory" exact element={<AddCategory/>} />
              </>
          ):(
              <>
                  {/* tutaj tylko dla niezalogowanych */}
                  {/* signup i login dla niezalogowanych */}
                  <Route path="/signup" exact element={<Signup />} />
                  <Route path="/login" exact element={<Login />} />

                  {/* mainbeforelogging dla niezalogowanych */}
                  <Route path="/" exact element={<MainBeforeLogging />} />

                  {/* jesli user jest niezalogowany i probuje wejsc gdzies indziej to przekierowuje go do mainbeforelogging */}
                  <Route path="*" element={<Navigate replace to="/" />} />
              </>
          )}
      </Routes>
  )
}
export default App

