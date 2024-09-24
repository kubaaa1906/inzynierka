import styles from "./styles.module.css"
import {useState} from "react";
import axios from "axios";
import AddTasks from "../AddTasks";
import {Link} from "react-router-dom";

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const [zadanie, ustawZadanie] = useState([])
    const handleGetTasks = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/tasks',
                    headers: {'Content-Type': 'application/json', 'x-access-token': token}
                }
                const {data: res} = await axios(config)
                ustawZadanie(res.data)
            } catch (error) {
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    return (<div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>TeachChild</h1>
                <button className={styles.white_btn} onClick={handleGetTasks}> Pokaż zadania </button>
                <Link to="/addtask">
                    <button className={styles.white_btn}> Dodaj zadanie </button>
                </Link>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>
            </nav>
            <div>
                <h1> Lista zadań: </h1>

            </div>
        </div>
    )
}
export default Main
