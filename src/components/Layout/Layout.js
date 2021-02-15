import React, { Fragment } from "react";
import styles from "./Layout.module.css";

const Layout = (props) => (
  <Fragment>
    <header className={styles.header}>
      {props.topBar}
    </header>
    <main className={styles.main}>
      <aside className={styles.sideBar}>
        {props.sideBar}
      </aside>
      <section className={styles.screen}>
        {props.screen}
      </section>
    </main>
    <footer className={styles.footer} />
  </Fragment>
);

export default Layout;