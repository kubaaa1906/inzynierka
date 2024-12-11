import styles from "./styles.module.css"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DragAndDropTask = () => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [draggedImage, setDraggedImage] = useState(null)
    const [correctMatches, setCorrectMatches] = useState(0)
    const [message, setMessage] = useState("")
    const [placedImages, setPlacedImages] = useState([]) // Nowa tablica przechowująca poprawne dopasowania



    useEffect(() => {
        // Inicjalizacja przykładowego zadania
        // setSelectedTask({
        //     nazwaZadania: "Dopasuj obrazki do kategorii",
        //     tresc: "Przeciągnij obrazki do odpowiednich kategorii.",
        //     images: [],
        //     targets: [],
        // })
        handleGetImages()



    }, [selectedTask])
    const handleGetImages = async () =>{
        try{
            const url = "http://localhost:8080/api/images"
            const { data:data } = await axios.get(url)
            const images = data.map(item => item.nazwa)
            const targets = data.map(item => item.link)


            const updatedTask ={
                nazwaZadania: "Dopasuj obrazki do kategorii",
                tresc: "Przeciągnij obrazki do odpowiednich kategorii.",
                images: images,
                targets: targets
            }
            setSelectedTask(updatedTask)


        } catch (error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                console.log(error)
            }
        }
    }
    const handleDragStart = (imageIndex) => {
        setDraggedImage(imageIndex)
    }

    const handleDrop = (targetIndex) => {
        if (draggedImage !== null && selectedTask) {
            const isCorrect = draggedImage === targetIndex
            if (isCorrect) {
                setPlacedImages((prev) => [...prev, { imageIndex: draggedImage, targetIndex }]) // Dodaj poprawne dopasowanie
                setCorrectMatches((prev) => prev + 1)
                setMessage("Dobrze!")
            } else {
                setMessage("Spróbuj ponownie.")
            }

            setTimeout(() => setMessage(""), 2000)
        }
    }

    useEffect(() => {
        if (correctMatches === selectedTask?.targets.length) {
            setMessage("Brawo! Zadanie wykonane!")
        }
    }, [correctMatches])

    const isImagePlaced = (imageIndex) =>
        placedImages.some((placed) => placed.imageIndex === imageIndex)

    const getImageForTarget = (targetIndex) => {
        const placed = placedImages.find((placed) => placed.targetIndex === targetIndex)
        return placed ? selectedTask.images[placed.imageIndex] : null
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

            <div className={styles.userContent}>
                {selectedTask && (
                    <div className={styles.task_container}>
                        <h2>{selectedTask.nazwaZadania}</h2>
                        <p>{selectedTask.tresc}</p>
                        <div className={styles.images_container}>
                            {selectedTask.images.map((image, index) => (
                                !isImagePlaced(index) && ( // Wyświetl tylko obrazki, które nie są jeszcze dopasowane
                                    <img
                                        key={index}
                                        src={`/img/${image}`}
                                        alt={`Obrazek ${index + 1}`}
                                        className={styles.draggable_image}
                                        draggable
                                        onDragStart={() => handleDragStart(index)}
                                    />
                                )
                            ))}
                        </div>
                        <div className={styles.targets_container}>
                            {selectedTask.targets.map((target, index) => (
                                <div
                                    key={index}
                                    className={styles.drop_target}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDrop(index)}
                                >
                                    {getImageForTarget(index) ? (
                                        <img
                                            src={`/img/${getImageForTarget(index)}`}
                                            alt={`Obrazek ${index + 1}`}
                                            className={styles.target_image}
                                        />
                                    ) : (
                                        target
                                    )}
                                </div>
                            ))}
                        </div>
                        {message && <p className={styles.message}>{message}</p>}
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

export default DragAndDropTask
