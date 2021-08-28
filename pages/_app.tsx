import type { AppProps } from 'next/app';
import "../styles/globals.css";
import "../styles/title.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp