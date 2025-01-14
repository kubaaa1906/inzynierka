import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";


const AddAchievement = () => {
    const [data, setData] = useState({
        nazwa: "",
        opis: "",
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]: input.value})
        console.log(input.value)
    }

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault()

        if(token){
            try{
                const url = "http://localhost:8080/api/achievements"
                const headers = {
                    "x-access-token": token,
                };

                const { data:res } = await axios.post(url,data, { headers })
                console.log(res.message)
                console.log("Dodano osiagniecie poprawnie!")
            } catch (error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                }
            }
        }

    }


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
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Dodaj osiągnięcie</h1>
                        <input
                            type="text"
                            placeholder="Nazwa osiągnięcia"
                            name="nazwa"
                            onChange={handleChange}
                            value={data.nazwa}
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

                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.send_btn}>
                            Dodaj osiągnięcie
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
export default AddAchievement