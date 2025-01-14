import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css'

const ReportDetails = ({ report, onClose, onDelete }) => {

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/editreport/${report._id}`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Czy na pewno chcesz usunąć to zgłoszenie?");
        if (confirmed) {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    await axios.delete(`http://localhost:8080/api/reports/${report._id}`, {
                        headers: { 'x-access-token': token }
                    });
                    onDelete(report._id);
                } catch (error) {
                    console.error("Error deleting the report", error);
                }
            }
        }
    }

    return (
        <div>
            <p><strong>Tytuł:</strong> {report.tytul}</p>
            <p><strong>Opis:</strong> {report.opis}</p>
            <p><strong>Data zgloszenia:</strong> {report.dataZgloszenia}</p>
            <p><strong>Status:</strong> {report.status}</p>
            <p><strong>Użytkownik:</strong> {report.userId}</p>
            <button onClick={handleEdit}>Edytuj</button>
            <button onClick={onClose} >Zwiń</button>
            <button onClick={handleDelete}>Usuń</button>
        </div>
    );
};

export default ReportDetails;