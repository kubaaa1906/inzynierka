import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

const MathTo34 = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const [zadanie, ustawZadanie] = useState([])

    const [pokazMenu, ustawPokazMenu] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [powiadomienie, setPowiadomienie] = useState("");

    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const navigate = useNavigate();

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
                if (filteredTasks.length > 0) setSelectedTask(filteredTasks[0]);

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

    const openTask = (task) => {
        setSelectedTask(task);
    };

    const closeTask = () => {
        setSelectedTask(null);
    };

    const handleAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    }

    const handleCheckAnswer = () => {
        if(selectedAnswer === null){
            setPowiadomienie("Nie wybrałeś odpowiedzi!");
            return;
        }
        const isCorrect = selectedTask.wszystkieOdpowiedzi[selectedAnswer].czyPoprawna;
        if(isCorrect){
            setPowiadomienie("Brawo! Poprawna odpowiedź!");
            setIsAnswerCorrect(true);
            setTimeout(() => {
                setPowiadomienie("");
                goToNextTask();
            }, 50000);
        }
        else{
            setIsAnswerCorrect(false);
            setPowiadomienie("Błąd! Niepoprawna odpowiedź :(")
        }
    }

    const goToNextTask = () => {
        const currentTask = zadanie.indexOf(selectedTask);
        if(currentTask < zadanie.length - 1){
            setSelectedTask(zadanie[currentTask + 1]);
            setSelectedAnswer(null);
        }
        else{
            setPowiadomienie("Skończyłeś wszystkie zadania z tej kategorii!")
        }
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
                <div className={styles.task_buttons}>
                    {zadanie.length > 0 ? (
                        zadanie.map((task, index) => (
                            <button
                                key={task.id}
                                className={styles.task_buttons}
                                onClick={() => openTask(task)}
                            >
                                Zadanie {index + 1}
                            </button>
                        ))
                    ) : (
                        <li>Brak zadań do wyświetlenia</li>
                    )}
                </div>

                {selectedTask && (
                    <div className={styles.show_task}>
                        <h2>{selectedTask.nazwaZadania}</h2>
                        <p>{selectedTask.tresc}</p>
                        <div className={styles.answers_container}>
                            {selectedTask.wszystkieOdpowiedzi.map((answer, index) => (
                                <div
                                    key={index}
                                    className={styles.answer_container}
                                    onClick={() => setSelectedAnswer(index)}
                                    style={{
                                        backgroundColor: selectedAnswer === index ? (isAnswerCorrect ? 'lightgreen' : 'lightcoral') : 'transparent',
                                    }}
                                >
                                    {answer.tekst} {/* Upewnij się, że to jest właściwość zawierająca treść odpowiedzi */}
                                </div>
                            ))}
                        </div>
                        {powiadomienie && (
                            <p className={powiadomienie === "Brawo! Poprawna odpowiedź!" ? styles.poprawnaOdp : styles.errorOdp}>
                                {powiadomienie}
                            </p>
                        )}
                        <button className={styles.button} onClick={handleCheckAnswer}>Sprawdź</button>
                        <br/>
                        <button className={styles.button} onClick={goToNextTask} style={{marginTop: '10px'}}>Następne
                            zadanie
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default MathTo34