import 'isomorphic-unfetch';
import { NextPage } from 'next'

type Props = {
  test?: string;
};
const Api_capture: NextPage<Props> = ({test})  => {
  return <div>message: {test}</div>
}


Api_capture.getInitialProps = async ({ req }) => {
    const res = await fetch('http://127.0.0.1:5000/hello');
    const data = await res.json();
    return {test : data.message}

  }

export default Api_capture