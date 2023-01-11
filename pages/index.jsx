import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import CardFull from '../components/CardFull'
import CardHalf from '../components/CardHalf'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), {ssr: false})

export default function Home() {
  return (
   <Layout title="Inicio">
      <section className='cardContainer'>
      <CardFull>
        <h3 className='pdn'>Bienvenido a tu mercado de criptoactivos de confianza.</h3>
        <p  className='pdn'><b>TokenMarket</b> funciona como una aplicación totalmente descentralizada.
          Para poder interactuar, necesitarás disponer de <b>Metamask </b> 
          instalado en tu navegador, con <b>Binance Smart Chain</b> configurado.</p>
      </CardFull>
      </section>

      <section className='cardContainer'>
      <CardHalf>
        <h3 className='pdn'>Configurar Metamask</h3>
        <div className='pdn'>
          <ReactPlayer url="https://www.youtube.com/watch?v=TR4Mbi4wzgI" width="480px" />
        </div>
        <div className='separator'></div>
      </CardHalf>
      <CardHalf>
        <h3 className='pdn'>Configurar BSC en Metamask</h3>
        <div className='pdn'>
          <ReactPlayer url="https://www.youtube.com/watch?v=46Rq0QILnbI" width="480px" />
        </div>
        <div className='separator'></div>
      </CardHalf>
      </section>
   </Layout>
  )
}
