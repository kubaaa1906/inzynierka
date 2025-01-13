import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import styles from "../../AddTasks/styles.module.css";

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
                        console.error("Error fetching the task data", error);
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
                console.error("Error updating the task data", error);
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
        <div>
            <div>
                <h2>Edytuj zadanie</h2>
                <form onSubmit={handleSubmit}>
                    Nazwa zadania:
                    <input
                        type="text"
                        placeholder="Nazwa zadania"
                        name="nazwaZadania"
                        value={task.nazwaZadania}
                        onChange={handleChange}
                    /><br/>
                    Opis:
                    <input
                        type="text"
                        id="opis"
                        placeholder="Opis"
                        name="opis"
                        value={task.opis}
                        onChange={handleChange}
                    /><br/>
                    Treść:
                    <input
                        type="text"
                        id="tresc"
                        placeholder="Tresc"
                        name="tresc"
                        value={task.tresc}
                        onChange={handleChange}
                    /><br/>
                    Wszystkie odpowiedzi:
                    {task.wszystkieOdpowiedzi.map((answer, index) => (
                            <div key={index} className={styles.answer}>
                                <input
                                    type="text"
                                    placeholder={`Odpowiedź ${index + 1}`}
                                    value={answer.tekst}
                                    onChange={(e) => handleAnswerChange(index, "tekst", e.target.value)}
                                    required
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={answer.czyPoprawna}
                                        onChange={(e) => handleAnswerChange(index, "czyPoprawna", e.target.checked)}
                                    />
                                    Poprawna
                                </label>
                                <button type="button" onClick={() => removeAnswer(index)}>
                                    Usuń
                                </button>
                            </div>
                        )
                    )}<br/>
                    Typ zadania:
                    <input
                        type="text"
                        id="typZadania"
                        placeholder="Typ zadania"
                        name="typZadania"
                        value={task.typZadania}
                        onChange={handleChange}
                    /><br/>
                    Kategoria:
                    <select name="kategoria" onChange={handleChange} value={task.kategoria} required>
                        <option value="" disabled> Wybierz kategorię</option>
                        {category.length > 0 ? (
                            category.map((category) => (
                                <option key={category._id} value={category._id}>{category.nazwaKategorii}</option>
                            ))
                        ) : (
                            <option value="" disabled>Brak kategorii do wyświetlenia</option>
                        )}
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

export default EditTask;