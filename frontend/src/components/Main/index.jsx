import styles from "./styles.module.css"
const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    return (<div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>TeachChild</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>
            </nav>
        </div>
    )
}
export default Main
