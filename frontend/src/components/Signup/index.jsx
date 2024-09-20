import {useState} from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css"

const Signup = () => {
    const [data, setData] = useState({
        nazwa: "",
        email: "",
        haslo: "",
        imieDziecka: "",
        wiekDziecka: "",
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const url = "http://localhost:8080/api/users"
            const { data:res } = await axios.post(url,data)
            navigate("/login")
            console.log(res.message)
        } catch (error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button"
                                className={styles.white_btn}>
                            Sing in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container}
                          onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Username"
                            name="nazwa"
                            onChange={handleChange}
                            value={data.nazwa}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Imie dziecka"
                            name="imieDziecka"
                            onChange={handleChange}
                            value={data.imieDziecka}
                            required
                            className={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Wiek dziecka"
                            name="wiekDziecka"
                            onChange={handleChange}
                            value={data.wiekDziecka}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Haslo"
                            name="haslo"
                            onChange={handleChange}
                            value={data.haslo}
                            required
                            className={styles.input}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                                className={styles.green_btn}>
                            Sing Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Signup