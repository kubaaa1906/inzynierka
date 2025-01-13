import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import styles from "../../AddTasks/styles.module.css";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [category, setCategory] = useState({
        nazwaKategorii: '',
        dziedzinaNaukowa: '',
        przedzialWiekowy: '',
    });

    useEffect(() => {
        const fetchCategory = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await axios.get(`http://localhost:8080/api/categories/${id}`, {
                        headers: { 'x-access-token': token }
                    });
                    setCategory(data);
                } catch (error) {
                    if(error.response && error.response.status >= 400 && error.response.status <= 500){
                        console.error("Error fetching the category data", error);
                    }

                }
            }
        };

        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.put(`http://localhost:8080/api/categories/${id}`, category, {
                    headers: { 'x-access-token': token }
                });
                console.log("Edytowanie poszlo pomyslnie")
            } catch (error) {
                console.error("Error updating the category data", error);
            }
        }
    };

    return (
        <div>
            <div>
                <h2>Edytuj kategorie</h2>
                <form onSubmit={handleSubmit}>
                    Nazwa kategorii:
                    <input
                        type="text"
                        placeholder="Nazwa kategorii"
                        name="nazwaKategorii"
                        value={category.nazwaKategorii}
                        onChange={handleChange}
                    /><br/>
                    Dziedzina naukowa:
                    <select name="dziedzinaNaukowa" onChange={handleChange} value={category.dziedzinaNaukowa}
                            required>
                        <option value="" disabled>
                            Wybierz dziedzinę naukową
                        </option>
                        <option value="Matematyka">Matematyka</option>
                        <option value="Przyroda">Przyroda</option>
                        <option value="Zadania logiczne">Zadania logiczne</option>
                        <option value="Język angielski">Język angielski</option>
                    </select><br/>
                    Przedział wiekowy:
                    <select name="przedzialWiekowy" onChange={handleChange} value={category.przedzialWiekowy}
                            required>
                        <option value="" disabled>
                            Wybierz przedzial wiekowy
                        </option>
                        <option value="3-4">3-4</option>
                        <option value="5-6">5-6</option>
                        <option value="7-9">7-9</option>
                    </select><br/>
                    <button type="submit">Zapisz</button>
                    <Link to="/adminpanel">
                        <button type="button">
                            Wróć
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;