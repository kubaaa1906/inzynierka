import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";

const UserPanel = ({userId}) => {

    const [user,setUser] = useState(null)
    const[error,setError] = useState(null)
    const[loading,setLoading] = useState(true)

    const getUserData = async (e) =>{
        if (e && e.preventDefault) e.preventDefault();

        const token = localStorage.getItem("token");


        if(token){
            console.log(userId)
            try{
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/users/${userId}`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config);
                setUser(res.user)
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
                        <button className={styles.white_btn}> Powrót</button>
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

            <div>
                <h2>Witaj, {user.nazwa}!</h2>

            </div>

        </div>
    );
}
export default UserPanel;