import styles from "./styles.module.css"
import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

const Category = () => {

    const navigate = useNavigate();
    const {category} = useParams();

    const handleChooseTasks = (category, age) => {
        const path = `/category/${category}/age/${age}`;
        navigate(path);
    }

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
                <div className={styles.categoryContent}>
                    <h1> Wybór zadań </h1>
                <div className={styles.name} onClick={() => handleChooseTasks(category, "3-4")}>
                    <h3>{category} dla 3-4 latków </h3>
                </div>
                <div className={styles.name} onClick={() => handleChooseTasks(category, "5-6")}>
                    <h3>{category} dla 5-6 latków </h3>
                </div>
                <div className={styles.name} onClick={() => handleChooseTasks(category, "7-9")}>
                    <h3>{category} dla 7-9 latków </h3>
                </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    )}
export default Category