export const imageUpload=async(image)=>{
    console.log(image)
   if(image){
    const formData=new FormData()
    formData.append('image',image)
    const url= `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`
    console.log(formData)
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    console.log(data?.data?.display_url)
    const imgLink=data?.data?.display_url;
    return imgLink
   }
   else{
    return ''
   }
}