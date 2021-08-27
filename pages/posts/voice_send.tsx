import { NextPage } from 'next'
import { useRef, useState, useCallback } from "react";
import axios from 'axios';


const IconUpload: React.FC = () => {

  const [userIconFormData, setUserIconFormData] = useState<File>()

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const iconFile:File = e.target.files[0]
    setUserIconFormData(iconFile)
  }

  const handleSubmitProfileIcon = () => {
    const iconPram = new FormData()
    if (!userIconFormData) return

    iconPram.append('file', userIconFormData)
    console.log(userIconFormData)
    axios
      .post(
        'http://127.0.0.1:5000/upload',
        iconPram,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      )
    
  }

  return (        
    <>  
     <form>
       <p>アイコンアップロード</p>
       <input
         type="file"
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
       />
       <button
         onClick={handleSubmitProfileIcon}
>アップロード
         </button>
    </form>
    <p></p>
    </>
  )
}

export default IconUpload