import { Outlet } from "react-router-dom";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import styles from "./MainLayout.module.css";

function MainLayout() {
    return (
        <div className={styles.layoutWrapper}>
            <Header />
            
            <main className={styles.mainContent}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;