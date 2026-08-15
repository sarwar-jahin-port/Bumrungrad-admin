import { Card } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
export default function Home() {
  const [loader, setLoader] = useState(true)
  const [allData, setAllDta] = useState()

  useEffect(() => {
    fetch('https://api.discoverinternationalmedicalservice.com/api/get/category/length')
      .then((res) => res.json())
      .then((data) => {
        setAllDta(Object.values(data?.data))
        setLoader(false)
      })
  }, [])

  return (
    <section className='m-5 md:m-10'>
      <h1 className='text-xl font-semibold text-blue'>Explore Features</h1>
      <div className='mt-5 md:mt-10'>
      {loader ? (
        <Loader/>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {allData?.map((d, i) => (
            <Link to={d.link}>
              <Card key={i} className='p-5 border-r-4 border-blue text-black shadow-blue hover:shadow-xl duration-300 ease-linear'>
                <p className='text-4xl font-bold text-blue'>{d.length}</p>
                <p className='font-semibold mt-2.5 capitalize'>{d.name}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
    </section>
  )
}
