import React, { useState } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

const Stats = ({ userId }) => {
    const [stats, setStats] = useState(null);
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const token = localStorage.getItem("token")
    const handlePasswordSubmit = async () => {
        if(token) {
            try {
                const config = {
                    method: "post",
                    url: 'http://localhost:8080/api/users/validate-password',
                    headers: {"Content-Type": "application/json", "x-access-token": token},
                    data: {userId: userId, haslo: password}
                }
                const res = await axios(config);
                if (res.data.success) {
                    setIsAuthorized(true);
                    fetchStats();
                } else {
                    alert('Niepoprawne hasło!');
                }
            } catch (error) {
                console.error(error);
            }
        }else{
            console.log("Nie podano tokena!")
        }
    };

    const fetchStats = async () => {
        try {
            const config = {
                method: "get",
                url: 'http://localhost:8080/api/users/stats',
                headers: {"Content-Type": "application/json", "x-access-token": token},
                params: {userId: userId}
            }
            const res = await axios(config);
            setStats(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>

            {!isAuthorized ? (

                <div className={styles.statsBox}>
                    <h3 className={styles.statsInfo}>Podaj hasło aby sprawdzić swoje statystyki.</h3>
                    <input
                        className={styles.panelInput}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Podaj hasło"
                    />
                    <button className={styles.change_btn} onClick={handlePasswordSubmit}>Zapisz</button>
                </div>
            ) : (
                stats && (
                    <div className={styles.statsBox}>
                        <h3 className={styles.statsInfo}>Statystyki</h3>
                        <p>Progres: {stats.tasksCompleted}/{stats.totalTasks} ({((stats.tasksCompleted / stats.totalTasks) * 100).toFixed(2)}%)</p>
                        <p>Ukonczone zadania pamięciowe: {stats.memoryGameCompleted}</p>
                        <p>Ukonczone zadania typu dopasuj obrazek do tekstu: {stats.dragNDropGameCompleted}</p>
                    </div>
                )

            )}

        </div>
    );
};

export default Stats;
