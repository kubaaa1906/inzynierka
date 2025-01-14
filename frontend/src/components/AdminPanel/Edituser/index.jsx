import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import styles from "../../AddCategory/styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        nazwa: '',
        email: '',
        haslo: '',
        imieDziecka: '',
        wiekDziecka: '',
        rola: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await axios.get(`http://localhost:8080/api/users/${id}`, {
                        headers: { 'x-access-token': token }
                    });
                    setUser(data);
                } catch (error) {
                    if(error.response && error.response.status >= 400 && error.response.status <= 500){
                        console.error("Error fetching the user data", error);
                    }

                }
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.put(`http://localhost:8080/api/users/${id}`, user, {
                    headers: { 'x-access-token': token }
                });
                console.log("Edytowanie poszlo pomyslnie")
            } catch (error) {
                console.error("Error updating the user data", error);
            }
        }
    };

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
                        <h1>Edytuj uzytkownika</h1>
                        Nazwa użytkownika:
                        <input
                            type="text"
                            placeholder="Nazwa uzytkownika"
                            name="nazwa"
                            onChange={handleChange}
                            value={user.nazwa}
                            required
                            className={styles.input}
                        />
                        Email:
                        <input
                            type="text"
                            placeholder="Email"
                            name="Email"
                            id="email"
                            onChange={handleChange}
                            value={user.email}
                            required
                            className={styles.input}
                        />
                        Imię dziecka:
                        <input
                            type="text"
                            id="imieDziecka"
                            placeholder="Imie dziecka"
                            name="imieDziecka"
                            value={user.imieDziecka}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        Wiek dziecka:
                        <input
                            type="text"
                            id="wiekDziecka"
                            placeholder="Wiek dziecka"
                            name="wiekDziecka"
                            value={user.wiekDziecka}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        Rola:
                        <select
                            id="rola"
                            name="rola"
                            value={user.rola}
                            onChange={handleChange}>
                            <option value={"ADMIN"}>Admin</option>
                            <option value={"USER"}>User</option>
                        </select>

                        <button type="submit" className={styles.send_btn}>
                            Edytuj użytkownika
                        </button>
                    </form>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
)
    ;
};

export default EditUser;