import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import styles from "../../AddTasks/styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [task, setTask] = useState({
        nazwaZadania: '',
        opis: '',
        tresc: '',
        wszystkieOdpowiedzi: [],
        typZadania: '',
        kategoria: '',
    });

    const addAnswer = () => {
        setTask({
            ...task,
            wszystkieOdpowiedzi: [...task.wszystkieOdpowiedzi, { tekst: "", czyPoprawna: false }],
        });
        console.log("Dodano zadanie!")
    };

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await axios.get(`http://localhost:8080/api/tasks/${id}`, {
                        headers: { 'x-access-token': token }
                    });
                    setTask(data);
                } catch (error) {
                    if(error.response && error.response.status >= 400 && error.response.status <= 500){
                        console.error("Error fetching the task task", error);
                        //localStorage.removeItem("token")
                        //window.location.reload()
                    }

                }
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.put(`http://localhost:8080/api/tasks/${id}`, task, {
                    headers: { 'x-access-token': token }
                });
                console.log("Edytowanie poszlo pomyslnie")
            } catch (error) {
                console.error("Error updating the task task", error);
            }
        }
    };

    const [category, setCategory] = useState([])
    const handleCategories = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        const token = localStorage.getItem("token");

        if(token){
            try{
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/categories',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config);
                setCategory(res.data);
            }catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    window.location.reload();
                }
            }
        }
    }

    useEffect(() => {
        handleCategories();
    }, []);

    const handleAnswerChange = (index, field, value) => {
        const updatedAnswers = [...task.wszystkieOdpowiedzi];
        updatedAnswers[index][field] = value;
        setTask({ ...task, wszystkieOdpowiedzi: updatedAnswers });
    };

    const removeAnswer = (index) => {
        const updatedAnswers = task.wszystkieOdpowiedzi.filter((_, i) => i !== index);
        setTask({ ...task, wszystkieOdpowiedzi: updatedAnswers });
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

                        <form className={styles.form_container}
                              onSubmit={handleSubmit}>
                            <h1>Edytuj</h1>
                            <input
                                type="text"
                                placeholder="Nazwa zadania"
                                name="nazwaZadania"
                                onChange={handleChange}
                                value={task.nazwaZadania}
                                required
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Opis"
                                name="opis"
                                onChange={handleChange}
                                value={task.opis}
                                required
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Treść"
                                name="tresc"
                                onChange={handleChange}
                                value={task.tresc}
                                required
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Typ zadania"
                                name="typZadania"
                                onChange={handleChange}
                                value={task.typZadania}
                                required
                                className={styles.input}
                            />
                            Odpowiedzi:
                            {task.wszystkieOdpowiedzi.map((answer, index) => (

                                    <div key={index} className={styles.answer}>
                                        <input
                                            type="text"
                                            placeholder={`Odpowiedź ${index + 1}`}
                                            value={answer.tekst}
                                            onChange={(e) => handleAnswerChange(index, "tekst", e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                        <label>
                                            <input
                                                className={styles.checkboxInput}
                                                type="radio"
                                                name="odpowiedz"
                                                checked={answer.czyPoprawna}
                                                onChange={(e) => handleAnswerChange(index, "czyPoprawna", e.target.checked)}
                                            />
                                            Poprawna
                                        </label>
                                        <button className={styles.delete_btn} type="button"
                                                onClick={() => removeAnswer(index)}>
                                            Usuń
                                        </button>
                                    </div>
                                )
                            )}
                            <button className={styles.send_btn} type="button" onClick={addAnswer}>
                       Dodaj odpowiedź
                    </button>
                            <select name="kategoria" onChange={handleChange} value={task.kategoria} required>
                                <option value="" disabled> Wybierz kategorię</option>
                                {category.length > 0 ? (
                                    category.map((category) => (
                                        <option key={category._id}
                                                value={category._id}>{category.nazwaKategorii}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>Brak kategorii do wyświetlenia</option>
                                )}
                            </select>
                            {/*error && <div
                        className={styles.error_msg}>{error}</div>*/}
                            <button type="submit"
                                    className={styles.send_btn} onClick={handleSubmit}>
                                Edytuj zadanie
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

export default EditTask;