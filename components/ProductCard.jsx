import Link from 'next/link'
import React from 'react'
import styles from '../styles/ProductCard.module.css'
import Progress from './Progress'
import { BsCurrencyExchange } from 'react-icons/bs'
import { IoMdPricetag } from 'react-icons/io'
import { BsCircleHalf } from 'react-icons/bs'
import { FaCircle } from 'react-icons/fa'
import numberFormater from '../utils/numberFormater.js'

const ProductCard = ({ product }) => {
  return (
    <div className={styles.product_card}>
      <h3>{product.name}</h3>
      <div className={styles.row}>
        <div className={styles.feature}>
          <span className={styles.featured}><BsCurrencyExchange size={35} /></span>
          <h5>Símbolo</h5>
          <p>{product.symbol}</p>
        </div>
        <div className={styles.feature}>
        <span className={styles.featured}><IoMdPricetag size={35} /></span>
          <h5>Tokens por BNB</h5>
          <p>{product.price}</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.feature}>
        <span className={styles.featured}><BsCircleHalf size={35} /></span>
          <h5>Vendidos</h5>
          <p>{numberFormater(product.totalSold, product.decimals)}</p>
        </div>
        <div className={styles.feature}>
        <span className={styles.featured}><FaCircle size={35} /></span>
          <h5>Total</h5>
          <p>{numberFormater(product.totalSupply, product.decimals)}</p>
        </div>
      </div>
      <Progress totalSold={product.totalSold} totalSupply={product.totalSupply} />

      <Link href={{ pathname: '/products/[product]', query: { product: product.symbol } }}>
        <a className={styles.button}>
          Acceder
        </a>
      </Link>
    </div>
  )
}

export default ProductCard