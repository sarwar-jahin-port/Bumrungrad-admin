import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'

const OneNews = () => {
  const { id } = useParams()
  const [loader, setLoader] = useState(true)
  const [oneNews, setNews] = useState({})
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/get/news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.data)
        setLoader(false)
      })
  }, [id])
  return (
    <div className='p-5 my-5 md:container md:mx-auto'>
      {loader ? (
        <Loader />
      ) : (
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='lg:w-1/2'>
            <img
              src={oneNews?.newsImage}
              alt=''
              srcset=''
              className='lg:h-[40vh]'
            />
          </div>
          <div className='lg:w-1/2'>
            <h5 className='font-semibold text-blue text-xl'>
              {oneNews?.newsTitle}
            </h5>
            <h5 className='my-3'>{oneNews?.newsDescription}</h5>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default OneNews
