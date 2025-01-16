import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import {faHeadset, faRotateLeft} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

const initialCards = [
    { id: 1, src: '/assets/jez.jpg', matched: false },
    { id: 2, src: '/assets/jez.jpg', matched: false },
    { id: 3, src: '/assets/kot.jpg', matched: false },
    { id: 4, src: '/assets/kot.jpg', matched: false },
    { id: 5, src: '/assets/pies.jpg', matched: false },
    { id: 6, src: '/assets/pies.jpg', matched: false },
    { id: 7, src: '/assets/zyrafa.jpg', matched: false },
    { id: 8, src: '/assets/zyrafa.jpg', matched: false },
]

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5)
}


function MemoryGame() {

    const [cardsData, setCardsData] = useState(shuffle(initialCards))
    const [flippedCards, setFlippedCards] = useState([])
    const [moves, setMoves] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [gameWon, setGameWon] = useState(false)
    const [showALlCards, setShowAllCards] = useState(true)
    const [user,setUser] = useState("")
    const token = localStorage.getItem("token")
    const handleFlip = (index) => {
        if (disabled || flippedCards.includes(index) || cardsData[index].matched) return
        setFlippedCards((prev) => [...prev, index])
    }
    const getUser = async (e) =>{
        if (e && e.preventDefault) e.preventDefault();
        if(token){
            try{
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/users/me`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                const { data: res } = await axios(config);
                setUser(res)
            } catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    console.log(error)
                }
            }
        }
    }
    const sendWin = async (e) =>{
        if (e && e.preventDefault) e.preventDefault();
        if(token){
            try{
                const config = {
                    method: 'put',
                    url: `http://localhost:8080/api/users/${user._id}/addMG`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                await axios(config);
                console.log("Dodano wygraną!")
            } catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    console.log("Nie udalo się dodac wygranej! :", error)
                }
            }
        } else {
            console.log("Zaloguj sie ponownie")
        }
    }
    useEffect(() => {
        getUser()
        if (flippedCards.length === 2) {
            setDisabled(true)
            const [firstIndex, secondIndex] = flippedCards
            const firstCard = cardsData[firstIndex]
            const secondCard = cardsData[secondIndex]
            if (firstCard.src === secondCard.src) {
                setCardsData((prev) =>
                    prev.map((card, idx) =>
                        idx === firstIndex || idx === secondIndex
                            ? { ...card, matched: true }
                            : card
                    )
                )
            }
            setTimeout(() => {
                setFlippedCards([])
                setDisabled(false)
            }, 1000)
            setMoves((prev) => prev + 1)
        }
    }, [flippedCards])

    useEffect( () => {
        if (cardsData.every((card) => card.matched)) {
            sendWin()
            setTimeout(() => {
                setGameWon(true)
            }, 1000)
        }
    }, [cardsData])


    useEffect(()=>{
        const timer =  setTimeout(()=>{
        setShowAllCards(false)}, 1000)
        return () => clearTimeout(timer)
    },[])

    const restartGame = () => {
        setDisabled(true)
        setFlippedCards([])
        setMoves(0)
        setGameWon(false)
        setShowAllCards(true)
        setCardsData(shuffle(initialCards))
        setDisabled(false)
        setTimeout(() => setShowAllCards(false),1000)
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_left}>
                    <Link to="/main">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faRotateLeft} /> Powrót</button>
                    </Link>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/" >
                        <img src="/assets/cardbacklogo.png" alt="logo" className={styles.logo}/>
                    </Link>
                </div>
                <div className={styles.nav_right}>
                    <Link to="/contact">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faHeadset} /> Kontakt</button>
                    </Link>
                </div>
            </nav>
            <div className={styles.userContent}>
                <div className={styles.memoryGame}>
                    <div className={styles.memoryHeader}>
                        <h1 className={styles.memoryTitle}>Memory Game</h1>
                        <div className={styles.hintBox}>
                            <p className={styles.hintHeader}> <FontAwesomeIcon icon={faLightbulb} size="2x" style={{color: "#FFD600"}}></FontAwesomeIcon> Wskazówka</p>
                            <p>Kliknij na obrazek żeby go odwrócić i znajdź wszystkie takie same pary.</p>
                        </div>
                    </div>
                    <div className={styles.board}>
                        {cardsData.map((card, index) => (
                            <div
                                key={index}
                                className={`${styles.card} ${
                                    flippedCards.includes(index) || card.matched || showALlCards
                                        ? styles.flipped
                                        : ''
                                }`}
                                onClick={() => handleFlip(index)}>
                                <div className={styles["card-inner"]}>
                                    <div className={styles["card-front"]}>
                                        <img src="/assets/cardbacklogo.png" alt="Backcard"/>
                                    </div>
                                    <div className={styles["card-back"]}>
                                        <img className={styles.frontImg} src={card.src} alt="Card" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.scoreboard}>
                        Liczba ruchów: {moves}
                    </div>
                    <div className={styles.controls}>
                        {gameWon && (
                            <div className={styles.winMessageBox}>
                            <div className={styles.winMessage}>
                                Gratulacje! Wygrałeś grę w {moves} ruchach!
                            </div>
                            </div>
                        )}
                        <button onClick={restartGame} className={styles.restart_btn}>
                            Restartuj grę
                        </button>
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

export default MemoryGame
