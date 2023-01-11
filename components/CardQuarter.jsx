import React from 'react'
import styles from '../styles/Card.module.css'

const CardQuarter = ({children}) => {
    return (
        <div className={styles.cardQuarter}>
            <div className={styles.card}>
                {children}
            </div>
        </div>
    )
}

export default CardQuarter