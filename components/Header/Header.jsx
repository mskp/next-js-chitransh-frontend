import styles from "./Header.module.css";
import { Chakra_Petch } from "next/font/google";

const chakraPetch = Chakra_Petch({weight: "500", subsets: ["latin"]})

export default function Header() {

    return (
        <header className={`${styles.header}`} >
            <div style={{ display: "flex" }}>
                <h1 className={`${styles.heading} ${chakraPetch.className}`}>Chitransh</h1>
            </div>
        </header>
    )
}