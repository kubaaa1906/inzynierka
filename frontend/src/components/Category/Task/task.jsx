import styles from "./styles.module.css"
import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link, useNavigate, useParams} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons"

const Task = () => {

    const [zadanie, ustawZadanie] = useState([])
    const [selectedTask, setSelectedTask] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [powiadomienie, setPowiadomienie] = useState("")
    const {category, age} = useParams()
    const [blockAnswers, setBlockAnswers] = useState(false)
    const [user,setUser] = useState(null)
    const [currentHighlightedTaskIndex, setCurrentHighlightedTaskIndex] = useState(0)
    const [blockButton, setBlockButton] = useState(true)
    const navigate = useNavigate()

    const getUserData = async (e) =>{
        if (e && e.preventDefault) e.preventDefault()
        const token = localStorage.getItem("token")
        if(token){
            try{
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/users/me`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                const { data: res } = await axios(config)
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

    const handleGetTasks = async (e) => {
        if (e && e.preventDefault) e.preventDefault()
        const token = localStorage.getItem("token")
        if(token){
            try{
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/tasks',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                const { data: res } = await axios(config)
                const filteredTasks = res.data.filter((task) =>
                    task.kategoria.dziedzinaNaukowa === category &&
                        task.kategoria.przedzialWiekowy === age
                )
                ustawZadanie(filteredTasks)
                if (filteredTasks.length > 0) setSelectedTask(filteredTasks[0])
            } catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    window.location.reload()
                }
            }
        }
    }

    useEffect(() => {
        handleGetTasks();
        getUserData();
    }, [category, age]);


    const handleCheckAnswer = async () => {
        if (selectedAnswer === null) {
            setPowiadomienie("Nie wybrałeś odpowiedzi!")
            return
        }
        const isCorrect = selectedTask.wszystkieOdpowiedzi[selectedAnswer].czyPoprawna
        if (isCorrect) {
            const token = localStorage.getItem("token")
            console.log(token)
            if(token){
                try{
                    const config = {
                        method: 'put',
                        url: `http://localhost:8080/api/users/${user._id}/addTask`,
                        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                        data: {taskId : selectedTask._id}
                    }
                    await axios(config)
                } catch(error){
                    if(error.response && error.response.status >= 400 && error.response.status <= 500){
                        console.log(error)
                    }
                }
            } else {
                console.log("Blad w zatwierdzaniu wykonania zadania!")
            }
            showNotification("Brawo! Poprawna odpowiedź!")
            setTimeout(() => {
                setPowiadomienie("")
            }, 7000)
            setBlockAnswers(true)
            setBlockAnswers(true);
            setBlockButton(false);
        } else {
            showNotification("Błąd! Niepoprawna odpowiedź :(")
        }
    }

    const goToNextTask = () => {
        const currentTask = zadanie.indexOf(selectedTask)
        if(currentTask < zadanie.length - 1){
            setSelectedTask(zadanie[currentTask + 1])
            setSelectedAnswer(null)
            setPowiadomienie("")
            setBlockAnswers(false)
            setBlockButton(true)

            setRating(null)
            setShowPopup(false)
            setCurrentHighlightedTaskIndex(currentTask+1)
            setPowiadomienie2("")
        }
        else{
            showNotification("Brawo! Skończyłeś/aś wszystkie zadania z tej kategorii!")
        }
    }

    const [powiadomienie2, setPowiadomienie2] = useState("")
    const [rating, setRating] = useState(null)
    const [rated, setRated] = useState(false)

    const handleRateTask = async (rateValue) => {
        const token = localStorage.getItem("token")
        console.log("token: ", token)
        if(token){
            try{
                const config = {
                    method: "post",
                    url: "http://localhost:8080/api/opinions",
                    headers: { "x-access-token": token },
                    data: { zadanie: selectedTask._id, ocena: rateValue }
                }
                console.log({ zadanie: selectedTask._id, ocena: rateValue })
                await axios(config)
                setRating(rateValue)
                setRated(true)
                setPowiadomienie2("Dziękujemy za ocenę zadania!")
            }
            catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    error.response.data.message("Błąd")
                }
            }
        }
    }

    const [averageRating, setAverageRating] = useState(null)

    const handleGetOpinions = async (e) => {
        if (e && e.preventDefault) e.preventDefault()
        const token = localStorage.getItem("token")
        if(token){
            try{
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/opinions?zadanieId=${selectedTask._id}`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                const { data } = await axios(config)
                if (data.avgRating){
                    setAverageRating(data.avgRating)
                }
                else{
                    setAverageRating(0)
                }
            }
            catch (error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    error.response.data.message("Błąd")
                }
            }
        }
    }

    const [star, setStar] = useState(null)
    const showStars = () => {
        const stars = []
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
                        color: i <= (star) ? "gold" : "mediumpurple",
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
                const config = {
                    method: "get",
                    url: `http://localhost:8080/api/opinions?zadanieId=${taskId}`,
                    headers: { "x-access-token": token }
                }
                const { data } = await axios(config)
                const userOpinion = data.opinions.find(opinion => opinion.userId === user._id)
                if (userOpinion) {
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
    }, [selectedTask])


    const [showPopup, setShowPopup] = useState(false);
    const showNotification = (message) => {
        setShowPopup(false);
        setPowiadomienie(message);
        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    const containsEmoji = (text) => {
        const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E6}-\u{1F1FF}]/gu;
        return emojiRegex.test(text);
    };



    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_left}>
                        <button className={styles.nav_btn} onClick={()=> {navigate(`/category/${category}`)}}><FontAwesomeIcon icon={faRotateLeft}/> Powrót</button>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/">
                        <img src="/assets/cardbacklogo.png" alt="logo" className={styles.logo}/>
                    </Link>
                </div>
                <div className={styles.nav_right}>
                    <Link to="/contact">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faHeadset}/> Kontakt</button>
                    </Link>
                </div>
            </nav>
            <div className={styles.main_area}>
                <div className={styles.task_buttons}>
                    {zadanie.length > 0 ? (
                        zadanie.map((task, index) => (
                            <div
                                key={task._id}
                                className={styles.task_button}
                                style={{
                                    backgroundColor: currentHighlightedTaskIndex === index ? 'violet' : 'transparent',
                                    color: currentHighlightedTaskIndex === index ? 'white' : 'black',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    marginBottom: '5px',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                {index + 1}
                            </div>
                        ))
                    ) : (
                        <div>...</div>
                    )}
                </div>
                { selectedTask && (
                    <div className={styles.show_task}>
                        <h2>{selectedTask.nazwaZadania}</h2>
                        <p
                            style={{
                                fontSize: containsEmoji(selectedTask.tresc) ? '3rem' : '1rem',
                            }}
                        >
                            {selectedTask.tresc}
                        </p>
                        <div className={styles.answers_container}>
                            {selectedTask.wszystkieOdpowiedzi.map((answer, index) => (
                                <div
                                    key={index}
                                    className={styles.answer_container}
                                    onClick={() => setSelectedAnswer(index)}
                                    style={{
                                        backgroundColor: selectedAnswer === index ? (blockAnswers ? 'purple' : 'mediumpurple') : 'rgba(100,40,150,0.7)',
                                        pointerEvents: blockAnswers ? 'none' : 'auto',
                                        cursor: blockAnswers ? 'not-allowed' : 'pointer',
                                        fontSize: containsEmoji(answer.tekst) ? '3rem' : '1rem',
                                    }}
                                >
                                    {answer.tekst}
                                </div>
                            ))}
                        </div>

                        <button className={styles.button} onClick={handleCheckAnswer} disabled={blockAnswers}
                                style={{
                                    backgroundColor: blockAnswers ? 'gray' : '',
                                    cursor: blockAnswers ? 'not-allowed' : 'pointer',
                                }}>
                            Odpowiedz
                        </button>
                        <br/>
                        <button className={styles.button} onClick={goToNextTask}
                                style={{
                                    marginTop: '10px', backgroundColor: blockButton ? 'gray'
                                        : '',
                                    pointerEvents: blockButton ? 'none' : 'auto',
                                    cursor: blockButton ? 'not-allowed' : 'pointer',
                                }}>
                            Następne zadanie
                        </button>
                        {showPopup && (
                            <div className={styles.popup}>
                                <p className={powiadomienie === "Brawo! Poprawna odpowiedź!" || powiadomienie === "Brawo! Skończyłeś/aś wszystkie zadania z tej kategorii!" ? styles.poprawnaOdp : styles.errorOdp}>
                                    {powiadomienie}
                                </p>
                            </div>
                        )}
                        <div>
                            <h2>Ocena zadania: </h2>
                            {!rating ? (
                                <div>{showStars()}</div>
                            ) : (
                                <p> Twoja ocena: {rating} ★</p>
                            )}

                            </div>
                            <div>
                                {powiadomienie2 && <p>{powiadomienie2}</p>}
                                Średnia ocen użytkowników: {averageRating ? averageRating : "Brak ocen"}
                            </div>
                        </div>
                    )}
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    )
}
export default Task