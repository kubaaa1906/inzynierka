import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';


const TaskDetails = ({ task, onClose, onDelete }) => {

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/edittask/${task._id}`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Czy na pewno chcesz usunąć to zadanie?");
        if (confirmed) {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    await axios.delete(`http://localhost:8080/api/tasks/${task._id}`, {
                        headers: { 'x-access-token': token }
                    });
                    onDelete(task._id); // Wywołaj funkcję przekazaną z rodzica, aby usunąć samochód z listy
                } catch (error) {
                    console.error("Error deleting the car", error);
                }
            }
        }
    }

    return (
        <div>
            <p><strong>Nazwa zadania:</strong> {task.nazwaZadania}</p>
            <p><strong>Opis:</strong> {task.opis}</p>
            <p><strong>Treść</strong> {task.tresc}</p>
            <p><strong>Typ zadania:</strong> {task.typZadania}</p>
            <p><strong>Kategoria: </strong> {task.kategoria.nazwaKategorii}</p>
            <button onClick={handleEdit}>Edytuj</button>
            <button onClick={onClose} >Zwiń</button>
            <button onClick={handleDelete}>Usuń</button>
        </div>
    );
};

export default TaskDetails;