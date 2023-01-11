import React from 'react'
import Header from './Header'
import Auxbar from './Auxbar'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

const Layout = ({children, title}) => {
  return (
    <div className={styles.mainContainer}>
        <Header />
        <div className={styles.mainSection}>
        <Auxbar title={title}/>
          <main className={styles.main}>
              {children}
          </main>
          <Footer />
        </div>
    </div>
  )
}

export default Layout