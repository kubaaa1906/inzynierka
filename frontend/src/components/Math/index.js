import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Main from "../Main";

const Math = () => {

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
                    <Link to="">

                    </Link>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Wyloguj się
                    </button>
                </div>


            </nav>

            {pokazMenu && (
                <div className={styles.menu}>
                    <h2>Menu</h2>
                    <ul>
                        <li>
                            <strong>Matematyka:</strong>
                            <ul>
                                <li><strong>3-4 lata</strong>
                                </li>
                                <li><strong>5-6 lat</strong>
                                </li>
                                <li><strong>7-9 lat</strong>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <strong>5-6 lat:</strong>
                            <ul>
                                <li><strong>Matematyka</strong>
                                </li>
                                <li><strong>Historia</strong>
                                </li>
                                <li><strong>Przyroda</strong>
                                </li>
                                <li><strong>Zadania Logiczne</strong>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <strong>7-9 lat:</strong>
                            <ul>
                                <li><strong>Matematyka</strong>
                                </li>
                                <li><strong>Historia</strong>
                                </li>
                                <li><strong>Przyroda</strong>
                                </li>
                                <li><strong>Zadania Logiczne</strong>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )}
            <div className={styles.main_area}>
                <h1> Matematyka </h1>
                <Link to="/math/math34"><button> Zadania dla 3-4 latków </button></Link>
            </div>
        </div>
    )
}
export default Math