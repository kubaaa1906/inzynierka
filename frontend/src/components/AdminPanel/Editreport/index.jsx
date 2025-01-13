import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const EditReport = () => {
    const { id } = useParams();
    const navigate = useNavigate()
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
        <div>
            <div>
                <h2>Edytuj zgłoszenie</h2>
                <form onSubmit={handleSubmit}>
                    Tytuł zgłoszenia:
                    <input
                        type="text"
                        placeholder="Tytuł zgłoszenia"
                        name="tytul"
                        value={report.tytul}
                        onChange={handleChange}
                    /><br/>
                    Opis:
                    <input
                        type="text"
                        id="opis"
                        placeholder="Opis"
                        name="opis"
                        value={report.opis}
                        onChange={handleChange}
                    /><br/>
                    Data zgłoszenia:
                    <input
                        type="text"
                        id="dataZgloszenia"
                        placeholder="Data zgłoszenia"
                        name="dataZgloszenia"
                        value={report.dataZgloszenia}
                        onChange={handleChange}
                    /><br/>
                    Status zgłoszenia:
                    <input
                        type="text"
                        id="status"
                        placeholder="Status zgloszenia"
                        name="status"
                        value={report.status}
                        onChange={handleChange}
                    /><br/>
                    <button type="submit">Zapisz</button>
                    <Link to="/adminpanel">
                        <button type="button">
                            Wróć
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default EditReport;