import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css'

const UserDetails = ({ user, onClose, onDelete }) => {

    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/edituser/${user._id}`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Czy na pewno chcesz usunąć tego użytkownika?");
        if (confirmed) {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    await axios.delete(`http://localhost:8080/api/users/paneladmin/${user._id}`, {
                        headers: { 'x-access-token': token }
                    });
                    onDelete(user._id);
                } catch (error) {
                    console.error("Error deleting the user", error);
                }
            }
        }
    }

    return (
        <div>
            <p><strong>Nazwa użytkownika:</strong> {user.nazwa}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Imie dziecka:</strong> {user.imieDziecka}</p>
            <p><strong>Wiek dziecka:</strong> {user.wiekDziecka}</p>
            <p><strong>Rola:</strong> {user.rola}</p>
            <button onClick={handleEdit}>Edytuj</button>
            <button onClick={onClose}>Zwiń</button>
            <button onClick={handleDelete}>Usuń</button>
        </div>
    );
};

export default UserDetails;