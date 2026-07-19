import { Button, Input, Textarea } from '@material-tailwind/react'
import { useState } from 'react'



const AddNews = () => {
  const [loader1, setLoader1] = useState(false)
  
  const [newsImg, setnewsImg] = useState('')
  

  //post...
  const handleAddNews = (e) => {
    setLoader1(true)
    e.preventDefault()
    const name = e.target.name.value
    const descriptiion = e.target.descriptiion.value
    const news = {
      newsImg,
      name,
      descriptiion,
    }

    const formData = new FormData()
    formData.append('newsImage', newsImg)
    formData.append('newsTitle', name)
    formData.append('newsDescription', descriptiion)
    fetch('http://127.0.0.1:8000/api/add/news', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader1(false)
        e.target.reset()
      })
      .catch((e) => console.error(e))
  }
  

  

  

  return (
    <div className='mx-5 md:container md:mx-auto py-10 px-5'>
      <form
        onSubmit={handleAddNews}
        className='bg-white shadow-xl rounded-xl p-5'
      >
        <p className='text-2xl font-semibold'>Add News</p>
        <hr className='my-5' />
        <div className='flex flex-row items-center'>
          <input
            type='file'
            id='custom-input'
            onChange={(e) => setnewsImg(e.target.files[0])}
            hidden
          />
          <label
            htmlFor='custom-input'
            className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer'
          >
            Choose News Image
          </label>
          <label className='text-sm text-slate-500'>
            {newsImg.name ? newsImg.name : 'No File Chosen'}
          </label>
        </div>
        <p className='text-red-400 text-sm mt-2.5'>
          Image Ratio - 1200*628. Image size not more than 500kb
        </p>
        <div className='my-4 flex flex-col gap-y-4'>
          <Input required label='News Title' name='name' />
          <Textarea required label='News Description' name='descriptiion' />
        </div>
        <Button className='bg-blue' type='submit'>
          {loader1 ? 'Loading...' : 'Add News'}
        </Button>
      </form>

      
    </div>
  )
}

export default AddNews
