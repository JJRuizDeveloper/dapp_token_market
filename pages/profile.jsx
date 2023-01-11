import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Products.module.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import managerABI from '../abi/manage.json'
import tokenABI from '../abi/token.json'
import Web3 from 'web3'
import changeChainId from '../utils/changeChainId'

const profile = () => {
  const [feedback, setFeedback] = useState("Cargando...");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const managerAddress = useSelector((state) => state.addresses.managerAddress);
  const abiJSON = managerABI;

  const handleReadContract = async () => {
  
    const response = await changeChainId();
    if(!response.success) {
      setFeedback(response.message)
      return;
    }

    setFeedback("Leyendo contratos...");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abiJSON, managerAddress);
    const total = await contract.methods.getTotal().call();
    if (total == 0) {
      setFeedback("No hay productos para mostrar.");
    } else {
      setFeedback('');
      const _products = await contract.methods.getProducts().call();
      const _productsInfo = await Promise.all(_products.map(async (product) => {
        const tokenContract = new web3.eth.Contract(tokenABI, product);
        const isActive = await tokenContract.methods.getActive().call();

        if (isActive) {
          const price = await tokenContract.methods.getPrice().call();
          const totalSold = await tokenContract.methods.getTotalSold().call();
          const totalSupply = await tokenContract.methods.totalSupply().call();
          const tokenName = await tokenContract.methods.name().call();
          const symbol = await tokenContract.methods.symbol().call();
          const decimals = await tokenContract.methods.decimals().call();
          const myTokens = await tokenContract.methods.balanceOf(web3.eth.accounts[0]);
          console.log(myTokens);

          return {
            name: tokenName,
            symbol: symbol,
            price: price,
            totalSold: totalSold,
            totalSupply: totalSupply,
            decimals: decimals,
            address: product,
            myTokens: myTokens
          }
        } else {
          return null
        }
      }))
      setProducts(_productsInfo);
      setFilteredProducts(_productsInfo);
    }
  }

  useEffect(() => { handleReadContract() }, [])

  const handleSearch = (event) => {
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <Layout title="Mis activos">

      <span className={styles.feedback}>{feedback}</span>

      <section className="cardContainer">
      {filteredProducts.map((filteredProduct, index) => (
            {filteredProduct.myTokens > 0 ? <div className={styles.myTokens}>
              <h3>Activo: {filteredProduct.name}</h3>
             <h5>Mis tokens: {filteredProduct.myTokens} {filteredProduct.symbol}</h5>
              </div>: null}
          ))}
      </section>
    </Layout>
  )
}

export default profile