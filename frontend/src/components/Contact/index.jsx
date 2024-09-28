import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const Contact = () => {
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
                Email: teachchildhelpdesk@gmail.com <br/>
                Telefon: 111 111 111 <br/>
                <br/>
                Wyślij nam swoje zgłoszenie! <br/>
                <Link to="/addapplication">
                    <button className={styles.grey_btn}> Przejdź do formularza </button>
                </Link>

            </div>
        </div>
    )
}
export default Contact
