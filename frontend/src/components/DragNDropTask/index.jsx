import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const DragAndDropTask = () => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [draggedImage, setDraggedImage] = useState(null)
    const [correctMatches, setCorrectMatches] = useState(0)
    const [message, setMessage] = useState("")
    const [placedImages, setPlacedImages] = useState([]) // Nowa tablica przechowująca poprawne dopasowania

    useEffect(() => {
        // Inicjalizacja przykładowego zadania
        setSelectedTask({
            nazwaZadania: "Dopasuj obrazki do kategorii",
            tresc: "Przeciągnij obrazki do odpowiednich kategorii.",
            images: ["pies.jpg", "kot.jpg", "chomik.jpg"],
            targets: ["pies", "kot", "chomik"],
        })
    }, [])

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
                <Link to="/" className={styles.text_logo}>
                    TeachChild
                </Link>
            </nav>

            <div className={styles.main_area}>
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
        </div>
    )
}

export default DragAndDropTask
