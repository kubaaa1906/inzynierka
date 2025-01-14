import styles from "./styles.module.css"
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    faArrowRightToBracket,
    faBars, faBrain,
    faCalculator, faGears,
    faHeadset, faImages,
    faLanguage,
    faSeedling
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {getRoleFromToken} from "../../utils/auth";

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const rola = getRoleFromToken();

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
                    <button className={styles.nav_btn}  onClick={showMenu}><FontAwesomeIcon icon={faBars} /> Menu </button>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/">
                        <img src="/catchuplogo.png" alt="logo" className={styles.logo}/>
                    </Link>
                </div>
                <div className={styles.nav_right}>
                    {rola === "ADMIN" && (
                        <Link to="/adminpanel">
                                <button className={styles.nav_btn}><FontAwesomeIcon icon={faUser} /> Panel Administratora
                                </button>
                        </Link>
                        )}
                    <Link to="/contact">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faHeadset} /> Kontakt</button>
                    </Link>
                    <Link to="/userpanel">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faUser} /> Konto</button>
                    </Link>
                    <button className={styles.nav_btn} onClick={handleLogout}><FontAwesomeIcon icon={faArrowRightToBracket} /> Wyloguj się</button>
                </div>
            </nav>
            {pokazMenu && (
                <div className={styles.menu}>
                    <ul>
                        <li onClick={() => handleChooseCategory("Matematyka")}>
                            Matematyka:
                            <ul>
                                {/* test */}
                                <li onClick={() => handleChooseCategory("Matematyka", "7-9")}>7 - 9 lat</li>
                            </ul>
                        </li>
                        <li>
                            Zadania logiczne:
                            <ul>
                                <li onClick={() => handleChooseCategory("memory")}>MemoryGame</li>
                                <li onClick={() => handleChooseCategory("drag")}>DragNDropGame</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )}

            <div className={styles.main_area}>
                <h3 className={styles.text_container}>Na co czekasz? Bierz się za rozwiązywanie zadań!</h3>
                <div className={styles.tiles_container}>
                    <div className={styles.tile}>
                        <div onClick={() => handleChooseCategory("Matematyka")} className={styles.tileLink}>
                            <FontAwesomeIcon icon={faCalculator}/> Matematyka
                        </div>
                    </div>
                    <div className={styles.tile}>
                        <div onClick={() => handleChooseCategory("Przyroda")} className={styles.tileLink}>
                            <FontAwesomeIcon icon={faSeedling}/> Przyroda
                        </div>
                    </div>
                    <div className={styles.tile}>
                        <div onClick={() => handleChooseCategory("Język angielski")} className={styles.tileLink}>
                            <FontAwesomeIcon icon={faLanguage}/> Język Angielski
                        </div>
                    </div>
                    <div className={styles.tile}>
                        <div onClick={() => handleChooseCategory("drag")} className={styles.tileLink}><FontAwesomeIcon
                            icon={faImages}/> Dopasowywanie obrazków
                        </div>
                    </div>
                    <div className={styles.tile}>
                        <div onClick={() => handleChooseCategory("memory")} className={styles.tileLink}><FontAwesomeIcon
                            icon={faBrain}/> Odkrywanie kart
                        </div>
                    </div>
                    <div className={styles.tile}>
                        <div onClick={() => handleChooseCategory("Zadania logiczne")} className={styles.tileLink}>
                            <FontAwesomeIcon icon={faGears}/> Zadania logiczne
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    )
}
export default Main
