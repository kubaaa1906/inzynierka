import styles from "./styles.module.css"
import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import AddReport from "../AddReport";

const Contact = () => {

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
                   
                </div>
            </nav>
            <div className={styles.main_area}>
                <div className={styles.contactContent}>
                <AddReport></AddReport>
                <div className={styles.contactBox}>
                        Email: catchuphelpdesk@gmail.com <br/>
                        <br/>
                        Wyślij nam swoje zgłoszenie! <br/>
                </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link to="/contact">Kontakt</Link> <br/>
                &copy; 2024 CatchUp. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    )}
export default Contact
