import {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


const AddTasks = () => {
    const [data, setData] = useState({
        nazwaZadania: "",
        opis: "",
        tresc: "",
        poprawnaOdpowiedz: "",
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
                const url = "http://localhost:8080/api/tasks"
                const headers = {
                    "x-access-token": token,
                };

                const taskData = {
                    ...data,
                    kategoria: data.kategoria
                };

                const { data:res } = await axios.post(url,taskData, { headers })
                //navigate("/")
                console.log(res.message)
            } catch (error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                    //localStorage.removeItem("token")
                    //window.location.reload()
                }
            }
        }

    }



    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Powrót na stronę główną</h1>
                    <Link to="/">
                        <button type="button"
                                className={styles.white_btn}>
                            Wróć
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
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
                            placeholder="Poprawna odpowiedz"
                            name="poprawnaOdpowiedz"
                            onChange={handleChange}
                            value={data.poprawnaOdpowiedz}
                            required
                            className={styles.input}
                        />
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
                                className={styles.green_btn} onClick={handleSubmit}>
                            Dodaj zadanie
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddTasks