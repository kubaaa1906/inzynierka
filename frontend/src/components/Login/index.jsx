import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFileSignature, faKey, faRotateLeft} from "@fortawesome/free-solid-svg-icons"
const Login = () => {
    const [data, setData] = useState({ nazwa: "", haslo: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/auth"
            const { data: res } = await axios.post(url, data)
            console.log("Response from backend:", res)
            localStorage.setItem("token", res.data)
            localStorage.setItem("id",res.userId)
            console.log(res.userId)
            window.location = "/"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (<div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_left}>
                    <Link to="/main">
                        <button className={styles.nav_btn}><FontAwesomeIcon icon={faRotateLeft} /> Powrót</button>
                    </Link>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/" >
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
            <div className={styles.login_container}>
                <div className={styles.login_form_container}>
                    <div>
                        <form className={styles.form_container}
                              onSubmit={handleSubmit}>
                            <h1 className={styles.formTitle}>Zaloguj się</h1>
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
                                type="password"
                                placeholder="Hasło"
                                name="haslo"
                                onChange={handleChange}
                                value={data.haslo}
                                required
                                className={styles.input}
                            />
                            <a className={styles.forgot_password} href=""> Nie pamiętasz hasła? </a>
                            {error &&
                                <div className={styles.error_msg}>{error}</div>}
                            <button type="submit"
                                    className={styles.login_btn}>
                                Zaloguj się
                            </button>
                             <Link to="/signup" className={styles.forgot_password}>Nie masz konta? Zarejestruj się tutaj!</Link>
                        </form>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    )}
export default Login