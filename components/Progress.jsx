import React, { useState } from 'react'
import styles from '../styles/Progress.module.css'
const Progress = ({totalSupply, totalSold}) => {
    const [percentage, setPercentage] = useState(parseInt((totalSold*100)/totalSupply))
  return (
    <div className={styles.progress_container}>
        <progress value={percentage} max={totalSupply} />
        <p>{percentage}% completado</p>
    </div>
  )
}

export default Progress 