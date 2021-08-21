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

    iconPram.append('user[icon]', userIconFormData)
    axios
      .post(
        'https://api/update',
        iconPram,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      )
  }

  return (          
     <form>
       <p>アイコンアップロード</p>
       <input
         type="file"
         accept="image/*,.png,.jpg,.jpeg,.gif"
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
       />
       <button>
         text="変更する"
         variant="contained"
         color="primary"
         type="button"
         onClick={handleSubmitProfileIcon}
         {/* disabled={userIconPreview === undefined} */}
         </button>
    </form>
  )
}