import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate()
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
        <div>
            <div>
                <h2>Edytuj użytkownika</h2>
                <form onSubmit={handleSubmit}>
                    Nazwa użytkownika:
                    <input
                        type="text"
                        placeholder="Nazwa użytkownika"
                        name="nazwa"
                        value={user.nazwa}
                        onChange={handleChange}
                    /><br/>
                    Email:
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    /><br/>
                    Hasło:
                    <input
                        type="password"
                        id="haslo"
                        placeholder="Hasło"
                        name="haslo"
                        value={user.haslo}
                        onChange={handleChange}
                    /><br/>
                    Imię dziecka:
                    <input
                        type="text"
                        id="imieDziecka"
                        placeholder="Imie dziecka"
                        name="imieDziecka"
                        value={user.imieDziecka}
                        onChange={handleChange}
                    /><br/>
                    Wiek dziecka:
                    <input
                        type="text"
                        id="wiekDziecka"
                        placeholder="Wiek dziecka"
                        name="wiekDziecka"
                        value={user.wiekDziecka}
                        onChange={handleChange}
                    /><br/>
                    Rola:
                    <input
                        type="text"
                        id="rola"
                        placeholder="Rola"
                        name="rola"
                        value={user.rola}
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

export default EditUser;