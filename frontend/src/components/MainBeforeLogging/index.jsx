import styles from "./styles.module.css"
import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {faBars, faFileSignature, faKey} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }


    const [pokazMenu, ustawPokazMenu] = useState(false);

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu);
    }


    return (<div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_left}>
                    <Link to="/login">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faKey} /> Zaloguj się</button>
                    </Link>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/">
                        <img src="/catchuplogo.png" alt="logo" className={styles.logo}/>
                    </Link>
                </div>
                <div className={styles.nav_right}>

                    <Link to="/signup">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faFileSignature} /> Zarejestruj się</button>
                    </Link>
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
                <div className={styles.text_container}>

                        <p className={styles.textTitle}>Witaj na platformie edukacyjnej CatchUp! </p>
                        Na naszej stronie zdobędziesz ogrom wiedzy z różnych
                        dziedzin naukowych, takich jak matematyka, biologia, geografia oraz wiele innych! <br/>
                        Wypróbuj już dziś zakładając darmowe konto!

                </div>
                <div className={styles.tiles_container}>
                    <div className={styles.tile}>
                        Dla 5-latków:
                        <li> Przyroda </li>
                        <li> Matematyka</li>
                        <li> Kolory</li>
                    </div>
                    <div className={styles.tile}>
                        Pamiętaj, że możesz nauczyć się wszystkiego, czego tylko chcesz! <br/>
                       <div className={styles.tileLinkBox}><Link to="/signup" className={styles.tileLink}> Wypróbuj tutaj!</Link></div>
                    </div>
                    <div className={styles.tile}>
                        Wielu zadowolonych uczniów! Ponad 15000 dzieci spróbowało uczyć się na naszej stronie.
                    </div>
                    <div className={styles.tile}>
                        Tekst jakiś dodać
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
