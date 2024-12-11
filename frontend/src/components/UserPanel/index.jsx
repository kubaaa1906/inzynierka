import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

const UserPanel = () => {

    const [user,setUser] = useState(null)
    const[error,setError] = useState(null)
    const[loading,setLoading] = useState(true)
    const[showChangeUsername, setShowChangeUsername] = useState(false)
    const[showChangePassword, setShowChangePassword] = useState(false)
    const[newUsername, setNewUsername] = useState("")
    const[oldPassword, setOldPassword] = useState("")
    const[newPassword, setNewPassword] = useState("")
    const[showPopup, setShowPopup] = useState(false)

    const getUserData = async (e) =>{
        if (e && e.preventDefault) e.preventDefault();

        const token = localStorage.getItem("token")



        if(token){
            try{
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/users/me`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config);
                setUser(res)
                setLoading(false)

            } catch(error){
                setLoading(false)

                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    setError(error.response.data.message || "Wystąpił bład")

                }
            }
        } else {
            setLoading(false)
            setError("Zaloguj sie ponownie")
        }
    }


    const updateUsername = async (e) =>{
        e.preventDefault()
        const  token = localStorage.getItem("token")

        try{
            const config = {
                method:"put",
                url: `http://localhost:8080/api/users/${user._id}`,
                headers:{"Content-Type": "application/json", "x-access-token": token},
                data: { nazwa: newUsername}
            }
            const {data:updatedUser } = await axios(config)
            setUser(updatedUser)
            //window.location.reload()
            alert("Nazwa uzytkownika zostala zaktualizowana")
            setShowChangeUsername(false)
            setNewUsername("")
        } catch (error){
            alert(error.response?.data?.message || "Wystapil blad podczas zmiany nazwy")
        }
    }

    const updatePassword = async (e) =>{
        e.preventDefault()
        const token = localStorage.getItem("token")

        try{
            const config = {
                method: "put",
                url: `http://localhost:8080/api/users/${user._id}/change-password`,
                headers: {"Content-Type": "application/json", "x-access-token": token},
                data: {oldPassword, newPassword}
            }

            await axios(config)
            alert("Haslo zostalo zaktualizowane")
            setShowChangePassword(false)
            setOldPassword("")
            setNewPassword("")
        } catch (error) {
            alert(error.response?.data?.message || "Wystapil blad podczas zmiany hasla")
        }
    }

    const deleteAccount = async () => {
        const token = localStorage.getItem("token")

        try{
            const config = {
                method: "delete",
                url: `http://localhost:8080/api/users/${user._id}`,
                headers: {"Content-Type": "application/json", "x-access-token": token}
            }

            await axios(config)

            alert("Twoje konto zostalo usuniete")
            localStorage.removeItem("token")
            window.location = "/"
        } catch (error){
            alert(error.response?.data?.message || "Wystapil blad podczas usuwania konta")
        }
    }

    const handlePopupOn = () => {
        setShowPopup(!showPopup)
        setShowChangeUsername(false)
        setShowChangePassword(false)
    }

    const handleShowChangeUsername = () => {
        setShowPopup(false)
        setShowChangeUsername(!showChangeUsername)
        setShowChangePassword(false)
    }

    const handleShowChangePassword = () => {
        setShowPopup(false)
        setShowChangeUsername(false)
        setShowChangePassword(!showChangePassword)
    }





    useEffect(() => {
        getUserData();
    }, []);

    if (loading) return(<h1>Loading...</h1>)
    if(error) return(<h1>Error: {error}</h1>)
    if(!user) return(<h1>User data not found</h1>)




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

            <h1>Witaj, {user.nazwa}!</h1>
            <div className={styles.userContent}>


                <div className={styles.changeBox}>
                    <button onClick={handleShowChangeUsername} className={styles.change_btn}>
                        Zmień nazwę
                    </button>
                    {showChangeUsername && (
                        <form onSubmit={updateUsername} className={styles.form}>
                            <input
                                type="text"
                                placeholder="Nowa nazwa użytkownika"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                required
                                className={styles.panelInput}/>
                            <button type="submit" className={styles.change_btn}>Zapisz</button>

                        </form>
                    )}
                </div>


                <div className={styles.changeBox}>
                    <button onClick={handleShowChangePassword} className={styles.change_btn}>
                        Zmień hasło
                    </button>
                    {showChangePassword && (
                        <form onSubmit={updatePassword} className={styles.form}>
                            <input
                                type="password"
                                placeholder="Stare hasło"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                className={styles.panelInput}/>


                            <input
                                type="password"
                                placeholder="Nowe hasło"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className={styles.panelInput}/>
                            <button type="submit" className={styles.change_btn}>Zapisz</button>

                        </form>
                    )}

                </div>
                <div className={styles.changeBox}>
                    <button onClick={handlePopupOn} className={styles.change_btn}>Usuń konto

                    </button>
                    {showPopup && (
                        <div className={styles.deleteBox}>
                            <h3>Czy na pewno chcesz usunąć konto? Usuniętego konta nie można odzyskać.</h3>
                            <button onClick={handlePopupOn} className={styles.change_btn}>Anuluj</button>
                            <button onClick={deleteAccount} className={styles.delete_btn}>Usuń konto</button>
                        </div>

                    )

                    }

                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>

        </div>
    );
}
export default UserPanel;