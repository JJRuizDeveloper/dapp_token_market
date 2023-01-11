import React from 'react'
import styles from '../styles/Auxbar.module.css'

const Auxbar = ({title}) => {
  return (
    <div className={styles.auxbar}><span className={styles.auxbarSpan}>{title}</span></div>
  )
}

export default Auxbar