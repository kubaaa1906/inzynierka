import styles from "./styles.module.css"
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


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
                    <button className={styles.white_btn} onClick={showMenu}> Menu</button>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/">
                        <a className={styles.text_logo}> TeachChild</a>
                    </Link>
                </div>
                <div className={styles.nav_right}>
                    <Link to="/login">
                        <button className={styles.white_btn}> Zaloguj się</button>
                    </Link>
                    <Link to="/signup">
                        <button className={styles.white_btn}> Zarejestruj się</button>
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
                    <p>
                        <h3>Witaj na platformie edukacyjnej TeachChild! </h3><br/>
                        Na naszej stronie zdobędziesz ogrom wiedzy z różnych
                        dziedzin naukowych, takich jak matematyka, biologia, geografia oraz wiele innych! <br/>
                        Wypróbuj już dziś zakładając darmowe konto!
                    </p>
                </div>
                <div className={styles.tiles_container}>
                    <div className={styles.tile}>
                        Dla 5-latków:
                        <li> Przyroda </li>
                        <li> Matematyka</li>
                        <li> Kolory</li>
                    </div>
                    <div className={styles.tile2}>
                        Pamiętaj, że możesz nauczyć się wszystkiego, czego tylko chcesz! <br/>
                        <Link to="/signup"> Wypróbuj tutaj! </Link>
                    </div>
                    <div className={styles.tile}>
                        Wielu zadowolonych uczniów! Ponad 15000 dzieci spróbowało uczyć się na naszej stronie.
                    </div>
                    <div className={styles.tile2}>
                        Tekst jakiś dodać
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
