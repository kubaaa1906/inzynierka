import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

const Task = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }


    const [zadanie, ustawZadanie] = useState([])

    const [pokazMenu, ustawPokazMenu] = useState(false)

    const [selectedTask, setSelectedTask] = useState(null)

    const [selectedAnswer, setSelectedAnswer] = useState(null)

    const [powiadomienie, setPowiadomienie] = useState("")

    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

    const [changeColor, setChangeColor] = useState(false)


    const {category, age} = useParams()

    const [blockAnswers, setBlockAnswers] = useState(false)
    const [user,setUser] = useState(null)
    const [wlaczZadania, setWlaczZadania] = useState(false)


    const showTasks = () => {
        setWlaczZadania(true)
    }

    const getUserData = async (e) =>{
        if (e && e.preventDefault) e.preventDefault();

        const token = localStorage.getItem("token")



        if(token){
            try{
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/users/me`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config);
                setUser(res)
                console.log(res)

            } catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    console.log(error)
                }
            }
        } else {
            console.log("Zaloguj sie ponownie")
        }
    }

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

                const filteredTasks = res.data.filter((task) =>
                    task.kategoria.dziedzinaNaukowa === category && task.kategoria.przedzialWiekowy === age
                );


                console.log("Otrzymane zadania:", res.data);
                console.log("Filtruj według:", category, age);
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
        console.log("Category:", category, "Age:", age);
        handleGetTasks();
        getUserData();
    }, [category, age]);


    const handleAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    }

    const handleCheckAnswer = async () => {
        if (selectedAnswer === null) {
            setPowiadomienie("Nie wybrałeś odpowiedzi!");
            return;
        }
        const isCorrect = selectedTask.wszystkieOdpowiedzi[selectedAnswer].czyPoprawna;
        if (isCorrect) {
            try {
                await axios.put(`http://localhost:8080/api/progress/addTask/${user._id}`, {taskId: selectedTask._id})
            }catch (error){
                console.log(error)
            }
            setPowiadomienie("Brawo! Poprawna odpowiedź!");
            setTimeout(() => {
                setPowiadomienie("");
            }, 7000);
            setIsAnswerCorrect(true);
            setChangeColor(true);
            setBlockAnswers(true);
        } else {
            setIsAnswerCorrect(false);
            setPowiadomienie("Błąd! Niepoprawna odpowiedź :(")
        }
    }

    const goToNextTask = () => {
        const currentTask = zadanie.indexOf(selectedTask);
        if(currentTask < zadanie.length - 1){
            setSelectedTask(zadanie[currentTask + 1]);
            setSelectedAnswer(null);
            setIsAnswerCorrect(false);
            setChangeColor(false);
            setPowiadomienie("");
            setBlockAnswers(false);
            setRating(null)
        }
        else{
            setPowiadomienie("Skończyłeś wszystkie zadania z tej kategorii!")
        }
    }

    const [opinion, setOpinion] = useState(null);
    const [powiadomienie2, setPowiadomienie2] = useState("");

    const [error, setError] = useState("")
    const [rating, setRating] = useState(null)

    const [rated, setRated] = useState(false)
    const handleRateTask = async (rateValue) => {
        const token = localStorage.getItem("token");

        console.log("token: ", token)

        if(token){
            try{
                const url = "http://localhost:8080/api/opinions"
                const headers = {
                    "x-access-token": token,
                };
                console.log({zadanie: selectedTask._id, ocena: rateValue})
                await axios.post(url,{ zadanie: selectedTask._id, ocena: rateValue }, { headers: headers })
                setRating(rateValue)
                setRated(true);
                setPowiadomienie2("Dziekujemy za ocenę zadania!")
            }
            catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                    setRated(true)
                }
            }
        }

    }


    const [averageRating, setAverageRating] = useState(null)


    const handleGetOpinions = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const token = localStorage.getItem("token")

        if(token){
            try{
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/opinions?zadanieId=${selectedTask._id}`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data } = await axios(config)
                console.log("Dane opinii z backendu: ", data)
                if (data.avgRating){
                    setAverageRating(data.avgRating)
                }
                else{
                    setAverageRating(0)
                }

            }
            catch (error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                }
            }
        }
    }


    const [star, setStar] = useState(null);

    const showStars = () => {
        const stars = [];
        for(let i=1; i<=5; i++){
            stars.push(
                <span
                    key={i}
                    onClick={() => handleRateTask(i)}
                    onMouseEnter={() => setStar(i)}
                    onMouseLeave={() => setStar(null)}
                    style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        color: i <= (star || opinion) ? "gold" : "gray",
                    }}
                >★</span>
            )
        }
        return stars
    }

    const checkIfRated = async (taskId) => {
        const token = localStorage.getItem("token")

        if(token){
            try{
                const {data} = await axios.get(
                    `http://localhost:8080/api/opinions?zadanieId=${taskId}`,
                    { headers : { "x-access-token": token } }
                )

                const userOpinion = data.opinions.find(opinion => opinion.userId === user._id)
                if(userOpinion){
                    setRating(userOpinion.ocena)
                    setRated(true)
                }
            } catch (error){
                console.error("Error przy sprawdzaniu czy uzytkownik juz ocenil dane zadanie")
            }
        }
    }


    useEffect(() => {
        if(selectedTask){
            checkIfRated(selectedTask._id)
            handleGetOpinions()
        }
    }, [selectedTask]);


    const openTask = (task) => {
        setSelectedTask(task)
        setSelectedAnswer(null)
        setAverageRating(null)
        console.log("Selected task id: ", task._id)
        setRating(null)
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
            <h3><Link to="/main"> Wróć na stronę główną </Link></h3>
            <button onClick={showTasks}> Rozpocznij rozwiązywanie zadań! </button>
            {wlaczZadania && (
                <div className={styles.main_area}>
                    <div className={styles.task_buttons}>
                        {zadanie.length > 0 ? (
                            zadanie.map((task, index) => (
                                <div
                                    key={task._id}
                                    className={styles.task_buttons}
                                    onClick={() => openTask(task)}
                                >
                                    {index + 1}
                                </div>
                            ))
                        ) : (
                            <div>...</div>
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
                                            backgroundColor: selectedAnswer === index ? (blockAnswers ? 'white' : 'lightgray')
                                                : 'transparent',
                                            cursor: blockAnswers ? 'not-allowed' : 'pointer',
                                        }}
                                    >
                                        {answer.tekst}
                                    </div>
                                ))}

                            </div>
                            {powiadomienie && (
                                <p className={powiadomienie === "Brawo! Poprawna odpowiedź!" ? styles.poprawnaOdp : styles.errorOdp}>
                                    {powiadomienie}
                                </p>
                            )}
                            <button className={styles.button} onClick={handleCheckAnswer} disabled={blockAnswers}
                                    style={{
                                        backgroundColor: blockAnswers ? 'gray' : '',
                                        cursor: blockAnswers ? 'not-allowed' : 'pointer',
                                    }}>
                                Odpowiedz
                            </button>
                            <br/>
                            <button className={styles.button} onClick={goToNextTask} style={{marginTop: '10px'}}>
                                Następne zadanie
                            </button>
                            <div>
                                <h2>Ocena zadania: </h2>
                                {!rating ? (
                                    <div>{showStars()}</div>
                                ) : (
                                    <p> Twoja ocena: {rating} ★</p>
                                )}

                                {powiadomienie2 && <p>{powiadomienie2}</p>}
                                <div>
                                    Średnia ocen użytkowników: {averageRating ? averageRating : "Brak ocen"}
                                </div>
                            </div>
                        </div>

                    )}

                </div>
            )}

        </div>
    )
}
export default Task