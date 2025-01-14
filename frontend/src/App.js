import { Route, Routes, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute";
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AddTasks from "./components/AddTasks";
import MainBeforeLogging from "./components/MainBeforeLogging";
import Contact from "./components/Contact"
import AddCategory from "./components/AddCategory";
import Category from "./components/Category/category";
import Task from "./components/Category/Task/task";
import DragAndDropTask from "./components/DragNDropTask";
import UserPanel from "./components/UserPanel";
import MemoryGame from "./components/MemoryGame";
import AddImage from "./components/AddImages/formimage";
import AdminPanel from "./components/AdminPanel";
import Edittask from "./components/AdminPanel/Edittask";
import Editcategory from "./components/AdminPanel/Editcategory";
import Editreport from "./components/AdminPanel/Editreport";
import Edituser from "./components/AdminPanel/Edituser";
import AddAchievement from "./components/AddAchievement";
import {jwtDecode} from "jwt-decode";

function App() {
  const token = localStorage.getItem("token")
  const rola = token ? jwtDecode(token).rola : null;

  return (
      <Routes>
          {/* tutaj tylko dla zalogowanych */}
          {token ? (
              <>
                  <Route path="/main" exact element={<Main />} />

                  <Route path="/addtask" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                        <AddTasks />
                      </ProtectedRoute>
                  } />

                  <Route path="/adminpanel" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                          <AdminPanel />
                      </ProtectedRoute>
                  } />
                  <Route path="/addimage" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                            <AddImage/>
                      </ProtectedRoute>
                  } />

                  <Route path="/edittask/:id" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                            <Edittask />
                      </ProtectedRoute>
                  } />

                  <Route path="/editcategory/:id" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                            <Editcategory />
                      </ProtectedRoute>
                  } />

                  <Route path="/editreport/:id" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                            <Editreport />
                      </ProtectedRoute>
                  } />

                  <Route path="/edituser/:id" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                            <Edituser />
                      </ProtectedRoute>
                  } />

                  <Route path="/addcategory" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                            <AddCategory/>
                      </ProtectedRoute>
                  } />

                  <Route path="/addachievement" exact element={
                      <ProtectedRoute rola={rola} allowedRoles={["ADMIN"]}>
                          <AddAchievement/>
                      </ProtectedRoute>
                  } />

                  {/* kazda inna wpisana sciezka po zalogowaniu przekierowuje na main */}
                  <Route path="*" element={<Navigate replace to="/main" />} />
                  <Route path="/contact" exact element={<Contact />} />
                  <Route path="/category/:category" element={<Category />} />
                  <Route path="/category/:category/age/:age" element={<Task/>} />
                  <Route path="/category/drag" exact element={<DragAndDropTask/>} />
                  <Route path="/userpanel" exact element={<UserPanel/>} />
                  <Route path="/category/memory" exact element={<MemoryGame/>}/>
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

