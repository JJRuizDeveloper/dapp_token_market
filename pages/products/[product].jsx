import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Progress from '../../components/Progress'
import Web3 from 'web3'
import changeChainId from '../../utils/changeChainId';
import token from '../../abi/token.json';
import tokenABI from '../../abi/token.json'
import managerABI from '../../abi/manage.json'
import { BsCurrencyExchange } from 'react-icons/bs'
import { IoMdPricetag } from 'react-icons/io'
import { BsCircleHalf } from 'react-icons/bs'
import { FaCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import numberFormater from '../../utils/numberFormater.js'
import styles from '../../styles/product.module.css'
import descriptions from '../../public/descriptions/descriptions'


const ProductDetail = () => {
  const router = useRouter()
  const product = router.query.product
  const [amount, setAmount] = useState('1000000000000000')
  const [feedback, setFeedback] = useState("")
  const managerAddress = useSelector((state) => state.addresses.managerAddress);
  const [filteredProduct, setFilteredProduct] = useState({
    name: "cargando...",
    symbol: "cargando...",
    price: "cargando...",
    totalSold: 0,
    totalSupply: 0,
    decimals: 0,
    address: 0
  })

  const handleAmount = (e) => {
    const web3 = new Web3(window.ethereum);
    try {
      let weis = web3.utils.toWei(e.target.value, 'ether');
      setAmount(weis);
      setFeedback("");
    } catch (e) {
      setFeedback("Fomato incorrecto.");
    }
  }

  const handleBuyWithBNB = async () => {
    setFeedback("Esperando confirmación en Metamask...");

    const response = await changeChainId();
    if (!response.success) {
      setFeedback(response.message)
      return;
    }

    const availableTokens = product.totalSupply - product.totalSold;
    if (availableTokens < amount) {
      setFeedback("La cantidad supera el máximo disponible.");
      return;
    }

    if (amount <= 0) {
      setFeedback("La cantidad no puede ser negativa.");
    }

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const tokenContract = new web3.eth.Contract(token, product.address);

    // Pay function
    try {
      const res = await tokenContract.methods.presale(amount).send({ from: accounts[0], value: amount });
      setFeedback("Transacción realizada. Id de la transacción: " + res.blockHash);
    } catch (error) {
      setFeedback(error)
    }


    // Feedback
  }

  // Init load
  const handleContractLoad = async () => {


    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(managerABI, managerAddress) // TODO Import abiJSON and address
    const products = await contract.methods.getProducts().call()
    const productInfo = await Promise.all(products.map(async (item) => {
      const tokenContract = new web3.eth.Contract(tokenABI, item) // TODO Import tokenABI
      const isActive = await tokenContract.methods.getActive().call()
      const symbol = await tokenContract.methods.symbol().call()
      if (isActive) {
        const price = await tokenContract.methods.getPrice().call()
        const totalSold = await tokenContract.methods.getTotalSold().call()
        const totalSupply = await tokenContract.methods.totalSupply().call()
        const tokenName = await tokenContract.methods.name().call()
        const decimals = await tokenContract.methods.decimals().call()

        return {
          name: tokenName,
          symbol: symbol,
          price: price,
          totalSold: totalSold,
          totalSupply: totalSupply,
          decimals: decimals,
          address: item
        }
      }
    }))

    const found = productInfo.find(p => p.symbol == product)
    setFilteredProduct(found)
  }
  useEffect(() => { handleContractLoad() }, [])


  return (
    <Layout title={filteredProduct.name}>
      <div className={styles.container}>
        <h1>{filteredProduct.name}</h1>

    <div className={styles.infoContainer}>

        <div className={styles.icon_container}>
          <div className={styles.icon}>
            <span className={styles.featured}><BsCurrencyExchange size={35} /></span>
            <p>{filteredProduct.symbol}</p>
          </div>
          <div className={styles.icon}>
            <span className={styles.featured}><IoMdPricetag size={35} /></span>
            <p>{filteredProduct.price}</p>
          </div>
          <div className={styles.icon}>
            <span className={styles.featured}><BsCircleHalf size={35} /></span>
            <p>{numberFormater(filteredProduct.totalSold, filteredProduct.decimals)}</p>
          </div>
          <div className={styles.icon}>
            <span className={styles.featured}><FaCircle size={35} /></span>
            <p>{numberFormater(filteredProduct.totalSupply, filteredProduct.decimals)}</p>
          </div>
        </div>

        <div className={styles.basicInfo}>
        <a href={'/whitepapers/'+filteredProduct.symbol+".pdf"} target="_blank" className={styles.infoBTN}>Ver el WhitePaper</a>
        <input type="number" step="0.0001" onChange={handleAmount} className={styles.input} placeholder="25"></input>
        <button onClick={() => { handleBuyWithBNB() }} className={styles.infoBTN}>Comprar con BNB</button>
        <h3 className={styles.feedback}>{feedback}</h3>
      </div>
        <div className={styles.contentContainer}>
        <img src={"/img/"+filteredProduct.symbol+".jpg"} className={styles.detailImg} />
        
        <h1>{filteredProduct.name}</h1>
        <p>{descriptions[filteredProduct.symbol]}</p>
       </div>
        
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetail