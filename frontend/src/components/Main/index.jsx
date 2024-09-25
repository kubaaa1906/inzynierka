import styles from "./styles.module.css"
import {useState} from "react";
import axios from "axios";
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

    const [pokazMenu, ustawPokazMenu] = useState(false);

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu);
    }

    return (<div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.white_btn} onClick={showMenu}>Menu</button>
                <Link to="/">
                    <button className={styles.white_btn}> TeachChild</button>
                </Link>
                <Link to="/addtask">
                    <button className={styles.white_btn}> Dodaj zadanie </button>
                </Link>
                <button className={styles.white_btn}> Kontakt </button>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>
            </nav>

            {pokazMenu && (
                <div className={styles.menu}>
                    <ul>
                        <li>
                            3 Lata:
                        </li>
                        <li>
                            4 Lata:
                        </li>
                        <li>
                            5 Lat:
                        </li>
                        <li>
                            6 lat:
                        </li>
                        <li>
                            7 lat:
                        </li>
                    </ul>
                </div>
            )}

            <div>
                Tralala tutaj tez trzeba uzupelnic tresc itp <br/>
                I ten przycisk dodaj zadanie jest testowy do sprawdzenia czy dziala dodawanie taskow, trzeba go zrobic tylko dla admina
            </div>
        </div>
    )
}
export default Main
