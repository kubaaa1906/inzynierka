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

    const [zadanie, ustawZadanie] = useState([])

    const handleGetTasks = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        const token = localStorage.getItem("token");

        if(token){
            try{
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/tasks',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config);
                ustawZadanie(res.data);

            } catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    window.location.reload();
                }
            }
        }
    }

    useEffect(() => {
        handleGetTasks();
    }, []);

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
                        <li>
                            <Link to="/math"><strong>Matematyka:</strong></Link>
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
                <div className={styles.text_container}>
                    <p>
                        Na co czekasz? Bierz się za rozwiązywanie zadań!<br/>
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
                        Tu bedzie test listowania zadan:
                        <h3> Lista zadań: </h3>
                        <ul>
                            {zadanie.length > 0 ? (
                                zadanie.map((task) => (
                                    <li key={task.id}>{task.nazwaZadania}, {task.opis}, {task.tresc}, {task.poprawnaOdpowiedz}</li>
                                ))
                            ) : (
                                <li>Brak zadań do wyświetlenia</li>
                            )}
                        </ul>
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
