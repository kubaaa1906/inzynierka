import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const navigate = useNavigate();

    const [pokazMenu, ustawPokazMenu] = useState(false);

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu);
    }

    const handleChooseCategory = (category) => {
        const path = `/category/${category}`;
        navigate(path);
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
                    <Link to="/userpanel">
                        <button className={styles.white_btn}> Konto</button>
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
                        <li onClick={() => handleChooseCategory("Matematyka")}>
                            Matematyka:
                            <ul>
                                {/* test */}
                                <li onClick={() => handleChooseCategory("Matematyka", "7-9")}><strong>7-9 lat</strong></li>
                            </ul>
                        </li>

                        <li>
                            <strong>Zadania logiczne:</strong>
                            <ul>
                                <li><strong>3-4 lata</strong></li>
                                <li><strong>5-6 lat</strong></li>
                                <li><strong>7-9 lat</strong></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )}

            <div className={styles.main_area}>
                <div className={styles.text_container}>
                    <p>
                        Na co czekasz? Bierz się za rozwiązywanie zadań!<br/>
                    </p>
                </div>
                <div className={styles.tiles_container}>
                    <div className={styles.tile}>
                        <div onClick={() => handleChooseCategory("Matematyka")}> Matematyka </div>
                        <div onClick={() => handleChooseCategory("Przyroda")}> Przyroda </div>
                        <div onClick={() => handleChooseCategory("Język angielski")}> Język Angielski </div>
                        <div onClick={() => handleChooseCategory("Dopasowywanie obrazków")}> Dopasowywanie obrazków </div>
                        <div onClick={() => handleChooseCategory("Odkrywanie kart")}> Odkrywanie kart </div>
                        <div onClick={() => handleChooseCategory("Zadania logiczne")}> Zadania logiczne </div>
                    </div>
                    <div className={styles.tile2}>
                        Tekst
                    </div>
                    <div className={styles.tile}>
                        Tekst
                    </div>
                    <div className={styles.tile2}>
                        Tekst
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
export default Main
