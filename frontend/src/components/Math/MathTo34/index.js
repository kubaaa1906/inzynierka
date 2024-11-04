import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const MathTo34 = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const [zadanie, ustawZadanie] = useState([])

    const [pokazMenu, ustawPokazMenu] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu);
    }

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

                console.log("Odpowiedź z backendu:", res.data);

                const filteredTasks = res.data.filter(task =>
                    task.kategoria === "6728faba4064ee1eef2e81c0"
                );

                console.log("Przefiltrowane zadania:", filteredTasks);

                ustawZadanie(filteredTasks);

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

    const openTaskModal = (task) => {
        setSelectedTask(task);
    };

    // Funkcja do zamykania modalu
    const closeTaskModal = () => {
        setSelectedTask(null);
    };

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
                {zadanie.length > 0 ? (
                    zadanie.map((task, index) => (
                        <div key={task.id} style={{marginBottom: "10px"}}>
                            <button onClick={() => openTaskModal(task)}> Zadanie {index + 1} </button>
                        </div>
                    ))
                ) : (
                    <li>Brak zadań do wyświetlenia</li>
                )}

                {selectedTask && (
                    <div className={styles.show_task}>
                        <div className={styles.show_task_main}>
                            <h2>{selectedTask.nazwaZadania}</h2>
                            <p>{selectedTask.tresc}</p>
                        </div>
                    </div>
                )}
                <button> Przejdź do następnego zadania </button>
                <button> Wróć do poprzedniego zadania </button>
            </div>
        </div>
    )
}
export default MathTo34