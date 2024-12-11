import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AddTasks from "./components/AddTasks";
import MainBeforeLogging from "./components/MainBeforeLogging";
import Contact from "./components/Contact"
import AddReport from "./components/AddReport";
import AddCategory from "./components/AddCategory";
import Category from "./components/Category/category";
import Task from "./components/Category/Task/task";
import DragAndDropTask from "./components/DragNDropTask";
import UserPanel from "./components/UserPanel";
import MemoryGame from "./components/MemoryGame";
import AddImage from "./components/AddImages/formimage";


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
                  <Route path="/addreport" exact element={<AddReport/>} />
                  <Route path="/addcategory" exact element={<AddCategory/>} />
                  <Route path="/category/:category" element={<Category />} />
                  <Route path="/category/:category/age/:age" element={<Task/>} />
                  <Route path="/category/drag" exact element={<DragAndDropTask/>} />
                  <Route path="/userpanel" exact element={<UserPanel/>} />
                  <Route path="/category/memory" exact element={<MemoryGame/>}/>
                  <Route path="/addimage" exact element={<AddImage/>}/>

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

