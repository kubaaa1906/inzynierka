import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
const Login = () => {
    const [data, setData] = useState({ nazwa: "", haslo: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);

            console.log("Response from backend:", res);

            // Zapisz token w localStorage
            localStorage.setItem("token", res.data);
            localStorage.setItem("id",res.userId)
            console.log(res.userId)

            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };


    const [pokazMenu, ustawPokazMenu] = useState(false);

    const showMenu = () => {
        ustawPokazMenu(!pokazMenu)
    }

    return (<div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_left}>
                    <button className={styles.white_btn} onClick={showMenu}> Menu</button>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/">
                        <a className={styles.text_logo}> TeachChild</a>
                    </Link>
                </div>
                <div className={styles.nav_right}>
                    <Link to="/login">
                        <button className={styles.white_btn}> Zaloguj się</button>
                    </Link>
                    <Link to="/signup">
                        <button className={styles.white_btn}> Zarejestruj się</button>
                    </Link>
                </div>


            </nav>
            {pokazMenu && (
                <div className={styles.menu}>
                    <ul>
                        <li>
                            3 Lata:
                        </li>
                        <li>
                            4 Lata:
                        </li>
                        <li>
                            5 Lat:
                        </li>
                        <li>
                            6 lat:
                        </li>
                        <li>
                            7 lat:
                        </li>
                    </ul>
                </div>
            )}
            <div className={styles.login_container}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form className={styles.form_container}
                              onSubmit={handleSubmit}>
                            <h1>Zaloguj się</h1>
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
                            {error && <div
                                className={styles.error_msg}>{error}</div>}
                            <button type="submit"
                                    className={styles.green_btnlogin}>
                                Zaloguj się
                            </button>
                            <p> Nie masz konta? <Link to="/signup"> Zarejestruj się tutaj!</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 TeachChild. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    )
}
export default Login;