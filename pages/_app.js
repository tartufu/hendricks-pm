import '../styles/global.css'
import NextNprogress from 'nextjs-progressbar';


export default function App({ Component, pageProps }) {
  return <>
    <NextNprogress />
    <Component {...pageProps} />
  </>
}