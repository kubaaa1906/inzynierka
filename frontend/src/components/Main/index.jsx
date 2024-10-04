import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const [pokazMenu, ustawPokazMenu] = useState(false);

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu);
    }

    return (
            <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.white_btn} onClick={showMenu}>Menu</button>
                <Link to="/">
                    <button className={styles.white_btn}> TeachChild</button>
                </Link>
                <Link to="/contact">
                    <button className={styles.white_btn}> Kontakt </button>
                </Link>
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
