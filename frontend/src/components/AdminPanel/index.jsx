import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import ShowTasks from "./ShowTasks";
import ShowCategories from "./ShowCategories";
import ShowReports from "./ShowReports";
import ShowUsers from "./ShowUsers";
const AdminPanel = () => {


    const [sekcjaWidocznosc, ustawSekcjaWidocznosc] = useState('')
    const [zadanie, ustawZadanie] = useState([])
    const handleGetTasks = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/tasks',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                const { data: res } = await axios(config)
                ustawZadanie(res.data)
                ustawSekcjaWidocznosc('showTasks')
            } catch (error) {
                if (error.response && error.response.status >= 400 &&error.response.status <= 500)
                {
                    window.location.reload()
                }
            }
        }
    }

    const [category, setCategory] = useState([])
    const handleGetCategories = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        const token = localStorage.getItem("token");

        if(token){
            try{
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/categories',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config);
                setCategory(res.data);
                ustawSekcjaWidocznosc('showCategories')
            }catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    window.location.reload();
                }
            }
        }
    }

    const [report, setReport] = useState([])
    const handleGetReports = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        const token = localStorage.getItem("token");

        if(token){
            try{
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/reports',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config);
                setReport(res.data);
                ustawSekcjaWidocznosc('showReports')
            } catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    window.location.reload();
                }
            }
        }
    }

    const [user, setUser] = useState([])
    const handleGetUsers = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/users',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                const { data: res } = await axios(config)
                setUser(res.data)
                ustawSekcjaWidocznosc('showUsers')
            } catch (error) {
                if (error.response && error.response.status >= 400 &&error.response.status <= 500)
                {
                    window.location.reload()
                }
            }
        }
    }


    const zwin = () => {
        ustawSekcjaWidocznosc('')
    }



    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_left}>
                    <Link to="/main">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faRotateLeft}/> Powrót</button>
                    </Link>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/">
                        <img src="/assets/cardbacklogo.png" alt="logo" className={styles.logo}/>

                    </Link>
                </div>
                <div className={styles.nav_right}>

                </div>
            </nav>
            <div>
                <h1> Panel administracyjny </h1>
            </div>
            <div>
                <div>
                    <button onClick={handleGetUsers}> Użytkownicy</button>
                    <button onClick={handleGetReports}> Zgłoszenia użytkowników</button>
                    <button onClick={handleGetTasks}> Zadania</button>
                    <button onClick={handleGetCategories}> Kategorie</button>
                    <Link to="/addachievement"> <button>Dodaj osiągnięcie</button> </Link>
                </div>
                <div>
                    {sekcjaWidocznosc === 'showTasks' ? (
                        <div>
                            <button onClick={zwin}> Zwiń </button>
                            <Link to="/addtask">
                                <button>Dodaj zadanie</button>
                            </Link>

                            {zadanie.length > 0 ? <ShowTasks tasks={zadanie} setTasks={ustawZadanie}/> : <p></p>}
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                    {sekcjaWidocznosc === 'showCategories' ? (
                        <div>
                            <button onClick={zwin}> Zwiń </button>
                            <Link to="/addcategory">
                                <button>Dodaj kategorię</button>
                            </Link>

                            {category.length > 0 ? <ShowCategories categories={category} setCategories={setCategory}/> : <p></p>}
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                    {sekcjaWidocznosc === 'showReports' ? (
                        <div>
                            <button onClick={zwin}> Zwiń </button>

                            {report.length > 0 ? <ShowReports reports={report} setReports={setReport}/> : <p></p>}
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                    {sekcjaWidocznosc === 'showUsers' ? (
                        <div>
                            <button onClick={zwin}> Zwiń </button>

                            {user.length > 0 ? <ShowUsers users={user} setUsers={setUser}/> : <p></p>}
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
            </div>

            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    );
}
export default AdminPanel;