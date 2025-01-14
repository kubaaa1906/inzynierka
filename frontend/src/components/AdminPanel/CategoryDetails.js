import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css'


const CategoryDetails = ({ category, onClose, onDelete }) => {

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/editcategory/${category._id}`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Czy na pewno chcesz usunąć tą kategorie?");
        if (confirmed) {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    await axios.delete(`http://localhost:8080/api/categories/${category._id}`, {
                        headers: { 'x-access-token': token }
                    });
                    onDelete(category._id);
                } catch (error) {
                    console.error("Error deleting the category", error);
                }
            }
        }
    }

    return (
        <div>
            <p><strong>Nazwa kategorii:</strong> {category.nazwaKategorii}</p>
            <p><strong>Dziedzina naukowa:</strong> {category.dziedzinaNaukowa}</p>
            <p><strong>Przedzial wiekowy:</strong> {category.przedzialWiekowy}</p>
            <button onClick={handleEdit}>Edytuj</button>
            <button onClick={onClose} >Zwiń</button>
            <button onClick={handleDelete}>Usuń</button>
        </div>
    );
};

export default CategoryDetails;