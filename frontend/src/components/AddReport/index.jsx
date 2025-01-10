import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const AddReport = () => {
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
                const url = "http://localhost:8080/api/reports"
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
                    className={styles.send_btn} onClick={handleSubmit}>
                Wyślij zgłoszenie
            </button>
        </form>
    )
}
export default AddReport