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


    return (<div className={styles.main_container}>
            <nav className={styles.navbar}>
                <Link to="/">
                    <button className={styles.white_btn}> TeachChild</button>
                </Link>
                <Link to="/login">
                    <button className={styles.white_btn}> Zaloguj się </button>
                </Link>
                <Link to="/signup">
                    <button className={styles.white_btn}> Zarejestruj się </button>
                </Link>

            </nav>
            <div>
                Tralalala trzeba uzupełnić treść
            </div>
        </div>
    )
}
export default Main
