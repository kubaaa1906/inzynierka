import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import styles from "../../AddTasks/styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

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
                navigate("http://localhost:3000/adminpanel")
                console.log("Edytowanie poszlo pomyslnie")
            } catch (error) {
                console.error("Error updating the category data", error);
            }
        }
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_left}>
                    <Link to="/adminpanel">
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
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Dodaj kategorię</h1>
                        <input
                            type="text"
                            placeholder="Nazwa kategorii"
                            name="nazwaKategorii"
                            onChange={handleChange}
                            value={category.nazwaKategorii}
                            required
                            className={styles.input}
                        />
                        <select name="dziedzinaNaukowa" onChange={handleChange} value={category.dziedzinaNaukowa}
                                required>
                            <option value="" disabled>
                                Wybierz dziedzinę naukową
                            </option>
                            <option value="Matematyka">Matematyka</option>
                            <option value="Przyroda">Przyroda</option>
                            <option value="Zadania logiczne">Zadania logiczne</option>
                            <option value="Język angielski">Język angielski</option>
                        </select>
                        <select name="przedzialWiekowy" onChange={handleChange} value={category.przedzialWiekowy}
                                required>
                            <option value="" disabled>
                                Wybierz przedzial wiekowy
                            </option>
                            <option value="3-4">3-4</option>
                            <option value="5-6">5-6</option>
                            <option value="7-9">7-9</option>
                        </select>
                        <button type="submit" className={styles.send_btn}>
                            Edytuj kategorię
                        </button>
                    </form>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    );
};

export default EditCategory;