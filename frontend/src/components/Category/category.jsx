import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

const Category = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const [pokazMenu, ustawPokazMenu] = useState(false);

    const navigate = useNavigate();

    const {category} = useParams();

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu);
    }

    const handleChooseTasks = (category, age) => {
        const path = `/category/${category}/age/${age}`;
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
                <div onClick={() => handleChooseTasks(category, "3-4")}>
                    <h3>Zadania dla 3-4 latków </h3>
                    <div>
                        Opis jakiś, może jakie typy zadań itp
                    </div>
                </div>

                <div onClick={() => handleChooseTasks(category, "5-6")}>
                    <h3>Zadania dla 5-6 latków </h3>
                    <div>
                        Opis jakiś, może jakie typy zadań itp
                    </div>
                </div>


                <div onClick={() => handleChooseTasks(category, "7-9")}>
                    <h3>Zadania dla 7-9 latków </h3>
                    <div>
                        Opis jakiś, może jakie typy zadań itp
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Category