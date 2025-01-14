import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import styles from "../../Contact/styles.module.css";
import stylesReport from "../../AddReport/styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

const EditReport = () => {
    const { id } = useParams();
    const [report, setReport] = useState({
        tytul: '',
        opis: '',
        dataZgloszenia: '',
        status: '',
    });

    useEffect(() => {
        const fetchReport = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await axios.get(`http://localhost:8080/api/reports/${id}`, {
                        headers: { 'x-access-token': token }
                    });
                    setReport(data);
                } catch (error) {
                    if(error.response && error.response.status >= 400 && error.response.status <= 500){
                        console.error("Error fetching the report data", error);
                    }

                }
            }
        };

        fetchReport();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReport((prevReport) => ({
            ...prevReport,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.put(`http://localhost:8080/api/reports/${id}`, report, {
                    headers: { 'x-access-token': token }
                });
                console.log("Edytowanie poszlo pomyslnie")
            } catch (error) {
                console.error("Error updating the report data", error);
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
            <div className={styles.main_area}>
                <div className={styles.contactContent}>
                    <form className={stylesReport.form_container}
                          onSubmit={handleSubmit}>
                        <h1>Edytuj zgłoszenie</h1>
                        <input
                            type="text"
                            placeholder="Tytuł zgłoszenia"
                            name="tytul"
                            onChange={handleChange}
                            value={report.tytul}
                            required
                            disabled
                            className={stylesReport.input}
                        />
                        <textarea
                            placeholder="Opis"
                            name="opis"
                            onChange={handleChange}
                            value={report.opis}
                            required
                            disabled
                            className={stylesReport.input}
                            style={{width: '370px', height: '100px'}}
                        />
                        <select
                            id="status"
                            name="status"
                            value={report.status}
                            onChange={handleChange}
                        >
                            <option value={"Oczekujący"}>Oczekujący</option>
                            <option value={"W trakcie"}>W trakcie</option>
                            <option value={"Zamknięte"}>Zamknięte</option>
                        </select>
                        <button type="submit"
                                className={stylesReport.send_btn} onClick={handleSubmit}>
                            Edytuj zgłoszenie
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

export default EditReport;