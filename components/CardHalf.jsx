import React from 'react'
import styles from '../styles/Card.module.css'

const CardHalf = ({children}) => {
    return (
        <div className={styles.cardHalf}>
            <div className={styles.card}>
                {children}
            </div>
        </div>
    )
}

export default CardHalf