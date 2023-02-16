import React, { useState } from 'react'

function Eg() {
  const [image, setImage]=useState('')
  const submitImage = async ()=>{
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'pztinjet')
    data.append('cloud_name', 'djnspkxht')   

    const res = await fetch('https://api.cloudinary.com/v1_1/djnspkxht/image/upload', {
      method: 'post',
      body: data
    })
    const newData = await res.json();
    {console.log(newData)}

  }
  return (
    <>
    <div>
      <input type={'file'} onChange={(e)=>setImage(e.target.files[0])}/>
      <button onClick={submitImage}>upload</button>
    </div>
    </>
  )
}

export default Eg
