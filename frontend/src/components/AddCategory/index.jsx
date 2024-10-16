import {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


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
                                <option value="Historia">Historia</option>
                            </select>
                            <select name="przedzialWiekowy" onChange={handleChange} value={data.przedzialWiekowy}
                                    required>
                                <option value="" disabled>
                                    Wybierz przedzial wiekowy
                                </option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn}>
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
export default AddCategory