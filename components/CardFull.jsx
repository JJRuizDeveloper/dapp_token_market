import React from 'react'
import styles from '../styles/Card.module.css'

const CardFull = ({children}) => {
  return (
    <div className={styles.cardFull}>
        <div className={styles.card}>
        {children}
        </div>
    </div>
  )
}

export default CardFull