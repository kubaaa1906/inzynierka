import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";


const AddCategory = () => {
    const [data, setData] = useState({
        nazwaKategorii: "",
        dziedzinaNaukowa: "",
        przedzialWiekowy: "",
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
                const url = "http://localhost:8080/api/categories"
                const headers = {
                    "x-access-token": token,
                };

                const { data:res } = await axios.post(url,data, { headers })
                console.log(res.message)
                console.log("Dodano kategorie poprawnie!")
            } catch (error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                    //localStorage.removeItem("token")
                    //window.location.reload()
                }
            }
        }

    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const [pokazMenu, ustawPokazMenu] = useState(false);

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu);
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
                            <h1>Dodaj kategorię</h1>
                            <input
                                type="text"
                                placeholder="Nazwa kategorii"
                                name="nazwaKategorii"
                                onChange={handleChange}
                                value={data.nazwaKategorii}
                                required
                                className={styles.input}
                            />
                            <select name="dziedzinaNaukowa" onChange={handleChange} value={data.dziedzinaNaukowa}
                                    required>
                                <option value="" disabled>
                                    Wybierz dziedzinę naukową
                                </option>
                                <option value="Matematyka">Matematyka</option>
                                <option value="Przyroda">Przyroda</option>
                                <option value="Zadania logiczne">Zadania logiczne</option>
                                <option value="Język angielski">Język angielski</option>
                            </select>
                            <select name="przedzialWiekowy" onChange={handleChange} value={data.przedzialWiekowy}
                                    required>
                                <option value="" disabled>
                                    Wybierz przedzial wiekowy
                                </option>
                                <option value="3-4">3-4</option>
                                <option value="5-6">5-6</option>
                                <option value="7-9">7-9</option>
                            </select>
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.send_btn}>
                                Wyślij zgłoszenie
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
export default AddCategory