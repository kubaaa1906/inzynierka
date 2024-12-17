import styles from "./styles.module.css"
import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link, useParams} from "react-router-dom"
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
                    task.kategoria.dziedzinaNaukowa === category && task.kategoria.przedzialWiekowy === age
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
        handleGetTasks()
        getUserData()
    }, [category, age])

    const handleCheckAnswer = async () => {
        if (selectedAnswer === null) {
            setPowiadomienie("Nie wybrałeś odpowiedzi!")
            return
        }
        const isCorrect = selectedTask.wszystkieOdpowiedzi[selectedAnswer].czyPoprawna
        if (isCorrect) {
            try {
                await axios.put(`http://localhost:8080/api/progress/addTask/${user._id}`, {taskId: selectedTask._id})
            }catch (error){
            }
            showNotification("Brawo! Poprawna odpowiedź!")
            setTimeout(() => {
                setPowiadomienie("")
            }, 7000)
            setBlockAnswers(true)

            setBlockAnswers(true)
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
            setRating(null)
            setShowPopup(false)
            setCurrentHighlightedTaskIndex(currentTask+1)
        }
        else{
            setPowiadomienie("Skończyłeś wszystkie zadania z tej kategorii!")
        }
    }

    const [powiadomienie2, setPowiadomienie2] = useState("")
    const [rating, setRating] = useState(null)

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

    const [showPopup, setShowPopup] = useState(false)
    const showNotification = (message) => {
        setPowiadomienie(message)
        setShowPopup(true)

        setTimeout(() => {
            setShowPopup(false)
        }, 3000)
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_left}>
                    <Link to="/main">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faRotateLeft}/> Powrót</button>
                    </Link>
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
                                        backgroundColor: selectedAnswer === index ? (blockAnswers ? 'purple' : 'mediumpurple')
                                            : 'rgba(100,40,150,0.7)',
                                        pointerEvents: blockAnswers ? 'none' : 'auto',
                                        cursor: blockAnswers ? 'not-allowed' : 'pointer',
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
                        <button className={styles.button} onClick={goToNextTask} style={{marginTop: '10px'}}>
                            Następne zadanie
                        </button>
                        {showPopup && (
                            <div className={styles.popup}>
                                <p className={powiadomienie === "Brawo! Poprawna odpowiedź!" ? styles.poprawnaOdp : styles.errorOdp}>
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