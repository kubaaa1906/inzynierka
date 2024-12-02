import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";

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
                console.log(res)
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

    const deleteAccount = async (e) => {
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
                        <button className={styles.white_btn}>Powrót</button>
                    </Link>
                </div>
                <div className={styles.nav_center}>
                    <Link to="/">
                        <a className={styles.text_logo}>TeachChild</a>
                    </Link>
                </div>
                <div className={styles.nav_right}>
                    <Link to="/contact">
                        <button className={styles.white_btn}>Kontakt</button>
                    </Link>

                </div>


            </nav>
            <div className={styles.userContent}>
            <div>
                <h1>Witaj, {user.nazwa}!</h1>
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

            <div>
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
            <div>
                <button onClick={handlePopupOn} className={styles.delete_btn}>Usun konto

                </button>
                {showPopup && (
                    <div>
                        <h3>Czy na pewno chcesz usunac konto? Usunietego konta nie mozna odzyskac.</h3>
                        <button onClick={handlePopupOn} className={styles.change_btn}>Anuluj</button>
                        <button onClick={deleteAccount} className={styles.delete_btn}>Usun konto</button>
                    </div>

                )

                }

            </div>
            </div>

        </div>
    );
}
export default UserPanel;