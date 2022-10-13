import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Link to="/home/recipes">
        <button className={styles.btn}>Ingresar</button>
      </Link>
    </div>
  );
}
