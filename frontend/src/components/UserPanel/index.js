import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const UserPanel = () => {
    const [userData, setUserData] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);

    // Pobierz userId i token z localStorage
    const userId = req.body('userId');
    const token = localStorage.getItem("token");
console.log(userId);
    // Funkcja do pobierania danych użytkownika
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/users/me', {
                headers: {
                    "x-access-token": token, // Wysyłamy token w nagłówku
                },
            });
            setUserData(response.data);  // Zapisz dane użytkownika w stanie
        } catch (error) {
            setError('Błąd podczas ładowania danych użytkownika');
        }
    };

    // Zmienianie nazwy użytkownika
    const handleChangeName = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `/api/users/${userId}`,
                { nazwa: newUsername },
                { headers: { "x-access-token": token } }
            );
            alert('Nazwa użytkownika została zmieniona!');
            fetchUserData(); // Odśwież dane użytkownika po zmianie
        } catch (error) {
            setError('Błąd podczas zmiany nazwy użytkownika');
        }
    };

    // Zmienianie hasła
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `/api/users/${userId}/password`,
                { haslo: newPassword },
                { headers: { "x-access-token": token } }
            );
            alert('Hasło zostało zmienione!');
        } catch (error) {
            setError('Błąd podczas zmiany hasła');
        }
    };

    // Usuwanie konta
    const handleDeleteAccount = async () => {
        if (window.confirm('Czy na pewno chcesz usunąć konto?')) {
            try {
                const response = await axios.delete(
                    `/api/users/${userId}`,
                    { headers: { "x-access-token": token } }
                );
                alert('Twoje konto zostało usunięte.');
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                window.location.reload();
            } catch (error) {
                setError('Błąd podczas usuwania konta');
            }
        }
    };

    useEffect(() => {
        if (token && userId) {
            fetchUserData();
        }
    }, [token, userId]); // Pobierz dane użytkownika po załadowaniu komponentu

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className={styles.nav_center}>
                    <a className={styles.text_logo}>Panel użytkownika</a>
                </div>
                <div>
                    <Link to="/">
                        <button className={styles.white_btn}>Strona główna</button>
                    </Link>
                </div>
            </nav>
            <div className={styles.main_area}>
                <div className={styles.text_container}>
                    {userData ? (
                        <>
                            <h4>Witaj, {userData.nazwa}!</h4>

                            <h4>Zmienianie nazwy użytkownika</h4>
                            <form onSubmit={handleChangeName}>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    placeholder="Nowa nazwa użytkownika"
                                    required
                                />
                                <button type="submit">Zmień nazwę</button>
                            </form>

                            <h4>Zmienianie hasła</h4>
                            <form onSubmit={handleChangePassword}>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Nowe hasło"
                                    required
                                />
                                <button type="submit">Zmień hasło</button>
                            </form>

                            <button className={styles.delete_account_btn} onClick={handleDeleteAccount}>
                                Usuń konto
                            </button>
                        </>
                    ) : (
                        <p>Ładowanie danych użytkownika...</p>
                    )}
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
