import React from 'react'
import Link from 'next/link'
import styles from '../styles/Menu.module.css'
import {AiFillHome} from 'react-icons/ai'
import {FaCoins} from 'react-icons/fa'
import {FaUserAlt} from 'react-icons/fa'
 
const Menu = ({showMenu}) => {
    return (
        <nav className={styles.nav}>
            {showMenu ? 
            <ul className={styles.menu}>
                <li>
                    <Link href="/">
                        <a><AiFillHome className={styles.icon} /> Inicio</a>
                    </Link>
                </li>
                <li>
                    <Link href="/products">
                        <a><FaCoins className={styles.icon} /> Productos</a>
                    </Link>
                </li>
                <li>
                    <Link href="/profile">
                        <a><FaUserAlt className={styles.icon} /> Perfil</a>
                    </Link>
                </li>
            </ul> : null }
        </nav>
    )
}

export default Menu