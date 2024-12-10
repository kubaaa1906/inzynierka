import React, {useState} from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileSignature, faKey, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
    const [data, setData] = useState({
        nazwa: "",
        email: "",
        haslo: "",
        imieDziecka: "",
        wiekDziecka: "",
        czyAdmin: false,
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const url = "http://localhost:8080/api/users"
            const { data:res } = await axios.post(url,data)
            navigate("/login")
            console.log(res.message)
        } catch (error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    const [pokazMenu, ustawPokazMenu] = useState(false);

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu);
    }

    return (<div className={styles.main_container}>
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
                    <Link to="/login">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faKey} /> Zaloguj się</button>
                    </Link>
                    <Link to="/signup">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faFileSignature} /> Zarejestruj się</button>
                    </Link>
                </div>


            </nav>
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>

                    <form className={styles.form_container}
                          onSubmit={handleSubmit}>
                        <h1 className={styles.formTitle}>Zarejestruj się</h1>
                        <input
                            type="text"
                            placeholder="Nazwa użytkownika"
                            name="nazwa"
                            onChange={handleChange}
                            value={data.nazwa}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Imię dziecka"
                            name="imieDziecka"
                            onChange={handleChange}
                            value={data.imieDziecka}
                            required
                            className={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Wiek dziecka"
                            name="wiekDziecka"
                            onChange={handleChange}
                            value={data.wiekDziecka}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Hasło"
                            name="haslo"
                            onChange={handleChange}
                            value={data.haslo}
                            required
                            className={styles.input}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                                className={styles.register_btn}>
                            Zarejestruj się
                        </button>
                        <Link to="/login" className={styles.forgot_password}>Masz już konto? Zaloguj się tutaj!</Link>
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
export default Signup