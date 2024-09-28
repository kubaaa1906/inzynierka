import {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


const AddTasks = () => {
    const currentDateTime = new Date()
    const [data, setData] = useState({
        tytul: "",
        opis: "",
        dataZgloszenia: currentDateTime.toISOString(),
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault()

        if(token){
            try{
                const url = "http://localhost:8080/api/applications"
                const headers = {
                    "x-access-token": token,
                };

                const { data:res } = await axios.post(url,data, { headers })
                navigate("/")
                console.log(res.message)
            } catch (error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                    localStorage.removeItem("token")
                    window.location.reload()
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
                        <h1>Dodaj zgłoszenie</h1>
                        <input
                            type="text"
                            placeholder="Tytuł zgłoszenia"
                            name="tytul"
                            onChange={handleChange}
                            value={data.tytul}
                            required
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Opis"
                            name="opis"
                            onChange={handleChange}
                            value={data.opis}
                            required
                            className={styles.input}
                            style={{width: '370px', height: '100px'}}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                                className={styles.green_btn} onClick={handleSubmit}>
                            Wyślij zgłoszenie
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddTasks