import React, { Component } from "react";
import TopBar from "../TopBar/TopBar";
import SystemDate from '../SystemDate/SystemDate';
import styles from "./App.module.css";

class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <TopBar
            brandLogo='logo'
            currentDate={<SystemDate />}
            closeButton='close'
          />
        </header>
        <main className={styles.main}>
          <aside className={styles.sideBar}>SideBar</aside>
          <section className={styles.screen}>Screen</section>
        </main>
        <footer className={styles.footer} />
      </div>
    );
  }
}

export default App;