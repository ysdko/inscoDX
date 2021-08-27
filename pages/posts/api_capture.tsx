import 'isomorphic-unfetch';
import { NextPage } from 'next'
import axios from "axios";
import { useEffect, useRef, useState } from "react"

// type Props = {
//   test?: string;
// };
// const Api_capture: NextPage<Props> = ({test})  => {
//   return <div>message: {test}</div>
// }


// Api_capture.getInitialProps = async () => {
//     const res = await fetch('http://localhost:5000/hello');
//     const data = await res.json();
//     return {test : data.message}

    

//   }

// export default Api_capture


const TestComponent=() =>{

  useEffect(() => {
    const opt :any = {
      method: "get",
      url: "/hello",
    };
    axios(opt).then((res : any) => {
      console.log(res);
      const data = res.data
      console.log(data)
      // return {test : data.message}
    });
    
  }, []);
  return (
    <div>
      <p>"test"</p>
    </div>
  )
}
export default TestComponent