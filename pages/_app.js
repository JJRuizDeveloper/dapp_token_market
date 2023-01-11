import '../styles/globals.css'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import addresses from '../store/reducers/addresses';

const store = configureStore({
  reducer: {
    addresses: addresses
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
