import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";


const AddTasks = () => {
    const [data, setData] = useState({
        nazwaZadania: "",
        opis: "",
        tresc: "",
        wszystkieOdpowiedzi: [{tekst: "", czyPoprawna: false }],
        typZadania: "",
        kategoria: "",
    })


    const [category, setCategory] = useState([])

    const [error, setError] = useState("")
    const navigate = useNavigate()

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



    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]: input.value})
        console.log(input.value)
    }

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault()

        if(token){
            try{
                const urlTask = "http://localhost:8080/api/tasks"
                const headersTask = {
                    "x-access-token": token,
                };
                console.log(data)
                await axios.post(urlTask, data, {headers: headersTask})

                console.log("Zadanie dodano i przypisano do kategorii")
            } catch (error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                }
            }
        }

    }

    const addAnswer = () => {
        setData({
            ...data,
            wszystkieOdpowiedzi: [...data.wszystkieOdpowiedzi, { tekst: "", czyPoprawna: false }],
        });
        console.log("Dodano zadanie!")
    };

    const handleAnswerChange = (index, field, value) => {
        const updatedAnswers = [...data.wszystkieOdpowiedzi];
        updatedAnswers[index][field] = value;
        setData({ ...data, wszystkieOdpowiedzi: updatedAnswers });
    };

    const removeAnswer = (index) => {
        const updatedAnswers = data.wszystkieOdpowiedzi.filter((_, i) => i !== index);
        setData({ ...data, wszystkieOdpowiedzi: updatedAnswers });
    };



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
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>

                    <form className={styles.form_container}
                          onSubmit={handleSubmit}>
                        <h1>Dodaj zadanie</h1>
                        <input
                            type="text"
                            placeholder="Nazwa zadania"
                            name="nazwaZadania"
                            onChange={handleChange}
                            value={data.nazwaZadania}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Opis"
                            name="opis"
                            onChange={handleChange}
                            value={data.opis}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Treść"
                            name="tresc"
                            onChange={handleChange}
                            value={data.tresc}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Typ zadania"
                            name="typZadania"
                            onChange={handleChange}
                            value={data.typZadania}
                            required
                            className={styles.input}
                        />
                        Odpowiedzi:
                        {data.wszystkieOdpowiedzi.map((answer, index) => (

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
                                    <button className={styles.delete_btn} type="button" onClick={() => removeAnswer(index)}>
                                        Usuń
                                    </button>
                                </div>
                            )
                        )}
                        <button className={styles.send_btn} type="button" onClick={addAnswer}>
                            Dodaj odpowiedź
                        </button>
                        <select name="kategoria" onChange={handleChange} value={data.kategoria} required>
                            <option value="" disabled> Wybierz kategorię</option>
                            {category.length > 0 ? (
                                category.map((category) => (
                                    <option key={category._id} value={category._id}>{category.nazwaKategorii}</option>
                                ))
                            ) : (
                                <option value="" disabled>Brak kategorii do wyświetlenia</option>
                            )}
                        </select>
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                                className={styles.send_btn} onClick={handleSubmit}>
                            Dodaj zadanie
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
export default AddTasks