import {useState} from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css"

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
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <div className={styles.right}>
                        <form className={styles.form_container}
                              onSubmit={handleSubmit}>
                            <h1>Zarejestruj się</h1>
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
                                    className={styles.green_btnregister}>
                                Zarejestruj się
                            </button>
                            <p> Masz już konto? <Link to="/login"> Zaloguj się tutaj!</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 TeachChild. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    );
};
export default Signup