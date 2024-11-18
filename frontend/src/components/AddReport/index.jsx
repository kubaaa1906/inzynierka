import {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
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
                    <Link to="/contact">
                        <button className={styles.white_btn}> Kontakt</button>
                    </Link>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Wyloguj się
                    </button>
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
                                    className={styles.green_btnapp} onClick={handleSubmit}>
                                Wyślij zgłoszenie
                            </button>
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
export default AddReport