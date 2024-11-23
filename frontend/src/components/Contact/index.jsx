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
                <div className={styles.nav_left}>
                    <button className={styles.white_btn} onClick={showMenu}> Menu</button>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/">
                        <a className={styles.text_logo}> TeachChild</a>
                    </Link>
                </div>
                <div className={styles.nav_right}>
                    <Link to="/contact">
                        <button className={styles.white_btn}> Kontakt</button>
                    </Link>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Wyloguj się
                    </button>
                </div>


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
            <div className={styles.main_area}>
                <div className={styles.tiles_container}>
                    <div className={styles.text_container}>
                        Email: teachchildhelpdesk@gmail.com <br/>
                        Telefon: 111 111 111 <br/>
                        <br/>
                        Wyślij nam swoje zgłoszenie! <br/>
                        <Link to="/addreport">
                            <button className={styles.btnform}> Przejdź do formularza</button>
                        </Link>
                    </div>

                </div>
            </div>

            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 TeachChild. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    )
}
export default Contact
