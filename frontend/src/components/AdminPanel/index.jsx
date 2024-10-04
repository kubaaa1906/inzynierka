import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const AdminPanel = () => {
    const [applications, setApplications] = useState([]);

    // Fetch zgłoszeń z backendu
    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/applications', {
                headers: { 'Authorization': token }
            });
            const data = await response.json();
            setApplications(data);
        };
        fetchApplications();
    }, []);


    return (
        <div>
            <h1>Panel Administratora</h1>

            {/* Listowanie zgloszeń */}
            <section>
                <h2>Zgłoszenia użytkowników:</h2>
                <ul>
                    {applications.map((application) => (
                        <li key={application._id}>
                            <h3>{application.tytul}</h3>
                            <p>{application.opis}</p>
                            <p>Status: {application.status}</p>
                            <p>Zgłoszone przez: {application.userId.email}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Dodaj nowe zadanie</h2>
                <Link to="/addtask">
                    <button> Kliknij tutaj, aby przejść do formularza!</button>
                </Link>

            </section>
        </div>
    );
};

export default AdminPanel;