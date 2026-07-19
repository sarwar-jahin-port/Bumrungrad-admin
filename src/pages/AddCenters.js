import {
  Button,
  Input,
} from '@material-tailwind/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React, { useState } from 'react'
//import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

export default function AddCenters() {
  const [loader, setLoader] = useState(false)
  //dialogue
  //const [open, setOpen] = React.useState(false)
  //const handleOpen = () => setOpen(!open)
  //const [open2, setOpen2] = React.useState(false)
  //const handleOpen2 = () => setOpen2(!open2)
  //const [open3, setOpen3] = React.useState(false)
  //const handleOpen3 = () => setOpen3(!open3)

  //data states
  const [selectedCenterImg, setSelectedCenterImg] = useState('')

  //const [information, setInformation] = useState('')
  //const [informations, setInformations] = useState([])

  //const [condition, setCondition] = useState('')
  //const [conditions, setConditions] = useState([])

  //const [treatment, setTreatment] = useState('')
  //const [treatments, setTreatments] = useState([])

  // informations add remove functions
  // const addInformations = () => {
  //   const newInformations = [...informations, { information }]
  //   setInformations(newInformations)
  //   setInformation('')
  // }
  // const removeInformation = (index) => {
  //   const updatedInformations = [...informations]
  //   updatedInformations.splice(index, 1)
  //   setInformations(updatedInformations)
  // }
  // // conditions add remove functions
  // const addConditions = () => {
  //   const newConditions = [...conditions, { condition }]
  //   setConditions(newConditions)
  //   setCondition('')
  // }
  // const removeCondition = (index) => {
  //   const updatedConditions = [...conditions]
  //   updatedConditions.splice(index, 1)
  //   setConditions(updatedConditions)
  // }
  // // conditions add remove functions
  // const addTreatments = () => {
  //   const newTreatments = [...treatments, { treatment }]
  //   setTreatments(newTreatments)
  //   setTreatment('')
  // }
  // const removeTreatment = (index) => {
  //   const updatedTreatments = [...treatments]
  //   updatedTreatments.splice(index, 1)
  //   setTreatments(updatedTreatments)
  // }

  //react quil
  const [editorValue, seteditorValue] = useState('')

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video', 'code-block'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  //add clinic and centers
  const handleAddClinics = (e) => {
    setLoader(true)
    e.preventDefault()
    const name = e.target.name.value
    const location = e.target.location.value
    //const description = e.target.description.value
    const postData = {
      selectedCenterImg,
      name,
      location,
      //description,
      editorValue,
      //informations,
      //conditions,
      //treatments,
    }
    if (
      selectedCenterImg === '' ||
      name === '' ||
      location === '' 
    ) {
      setLoader(false)
      if (selectedCenterImg === '') {
        toast.error('Select Center Image')
      }
      if (name === '') {
        toast.error('Center Name is Required')
      }
      if (location === '') {
        toast.error('Center Location is Required')
      }
      // if (description === '') {
      //   toast.error('Center Description')
      // }
    } else {
      const formData = new FormData()
      formData.append('cover_photo', selectedCenterImg)
      formData.append('name', name)
      formData.append('location', location)
      formData.append('content', editorValue)
      // formData.append('description', description)
      // formData.append('informations', JSON.stringify(informations))
      // formData.append('conditions', JSON.stringify(conditions))
      // formData.append('treatments', JSON.stringify(treatments))

      fetch('http://127.0.0.1:8000/api/add/center', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false)
          e.target.reset()
          //setInformations([])
          //setConditions([])
          //setTreatments([])
          setSelectedCenterImg('')
          toast.success('Clinic/Centers added successfully!')
        })
        .catch((e) => console.error(e))
    }
  }
  return (
    <div className='mx-5 md:container md:mx-auto py-10'>
      <form onSubmit={handleAddClinics} className=''>
        <p className='text-2xl font-semibold'>Add Center</p>
        <hr className='my-5' />
        <div className='flex flex-row items-center'>
          <input
            type='file'
            id='custom-input'
            onChange={(e) => setSelectedCenterImg(e.target.files[0])}
            hidden
          />
          <label
            htmlFor='custom-input'
            className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer'
          >
            Choose file
          </label>
          <label className='text-sm text-slate-500'>
            {selectedCenterImg.name ? selectedCenterImg.name : 'No File Chosen'}
          </label>
        </div>
        <p className='text-red-400 text-sm mt-2.5'>
          Image Ratio - 1200*628. Image size not more than 500kb
        </p>
        <div className='grid gap-4 lg:grid-cols-2 my-4'>
          <Input label='Enter Name' name='name' />
          <Input label='Enter Location' name='location' />
          {/* multiple information */}
          {/* <div className='flex items-center gap-5'>
            <div className='relative flex w-full'>
              <Input
                value={information}
                type='text'
                label='Enter Informations'
                onChange={(e) => setInformation(e.target.value)}
              />
              <Button
                size='sm'
                onClick={addInformations}
                className='!absolute right-1 top-1 rounded bg-blue'
                disabled={information === ''}
              >
                Add
              </Button>
            </div>
            <div className='relative'>
              <Button
                onClick={handleOpen}
                size='sm'
                className='bg-white text-blue border border-blue'
              >
                View
              </Button>
              {informations.length > 0 && (
                <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
              )}
              <Dialog
                open={open}
                handler={handleOpen}
                className='overflow-y-auto h-[90%]'
              >
                <DialogHeader>Informations</DialogHeader>
                <DialogBody divider>
                  {informations.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                      {informations.map((c, i) => (
                        <div key={i} className='flex justify-between'>
                          <ul className='w-5/6 list-disc ml-4'>
                            <li className='text-xl text-justify'>
                              {c.information}
                            </li>
                          </ul>
                          <div className='w-1/6 flex justify-center'>
                            {' '}
                            <AiOutlineDelete
                              onClick={() => removeInformation(i)}
                              className='text-red-500 text-3xl cursor-pointer'
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='py-5 font-semibold text-red-500'>
                      Enter Something!
                    </p>
                  )}
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant='text'
                    color='red'
                    size='sm'
                    onClick={handleOpen}
                    className='mr-1'
                  >
                    <span>Close</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
          </div> */}
          {/* multiple condition */}
          {/* <div className='flex items-center gap-5'>
            <div className='relative flex w-full'>
              <Input
                value={condition}
                type='text'
                label='Enter Condition'
                onChange={(e) => setCondition(e.target.value)}
              />
              <Button
                size='sm'
                onClick={addConditions}
                className='!absolute right-1 top-1 rounded bg-blue'
                disabled={condition === ''}
              >
                Add
              </Button>
            </div>
            <div className='relative'>
              <Button
                onClick={handleOpen2}
                size='sm'
                className='bg-white text-blue border border-blue'
              >
                View
              </Button>
              {conditions.length > 0 && (
                <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
              )}
              <Dialog
                open={open2}
                handler={handleOpen2}
                className='overflow-auto h-[90%]'
              >
                <DialogHeader>Conditions</DialogHeader>
                <DialogBody divider>
                  {conditions.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                      {conditions.map((c, i) => (
                        <div key={i} className='flex justify-between'>
                          <ul className='w-5/6 list-disc ml-4'>
                            <li className='text-xl text-justify'>
                              {c.condition}
                            </li>
                          </ul>
                          <div className='w-1/6 flex justify-center'>
                            {' '}
                            <AiOutlineDelete
                              onClick={() => removeCondition(i)}
                              className='text-red-500 text-3xl cursor-pointer'
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='py-5 font-semibold text-red-500'>
                      Enter Something!
                    </p>
                  )}
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant='text'
                    color='red'
                    size='sm'
                    onClick={handleOpen2}
                    className='mr-1'
                  >
                    <span>Close</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
          </div> */}
          {/* multiple treatment */}
          {/* <div className='flex items-center gap-5'>
            <div className='relative flex w-full'>
              <Input
                value={treatment}
                type='text'
                label='Enter Treatment'
                onChange={(e) => setTreatment(e.target.value)}
              />
              <Button
                size='sm'
                onClick={addTreatments}
                className='!absolute right-1 top-1 rounded bg-blue'
                disabled={treatment === ''}
              >
                Add
              </Button>
            </div>
            <div className='relative'>
              <Button
                onClick={handleOpen3}
                size='sm'
                className='bg-white text-blue border border-blue'
              >
                View
              </Button>
              {treatments.length > 0 && (
                <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
              )}
              <Dialog
                open={open3}
                handler={handleOpen3}
                className='overflow-auto h-[90%]'
              >
                <DialogHeader>Treatments</DialogHeader>
                <DialogBody divider>
                  {treatments.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                      {treatments.map((c, i) => (
                        <div key={i} className='flex justify-between'>
                          <ul className='w-5/6 list-disc ml-4'>
                            <li className='text-xl text-justify'>
                              {c.treatment}
                            </li>
                          </ul>
                          <div className='w-1/6 flex justify-center'>
                            {' '}
                            <AiOutlineDelete
                              onClick={() => removeTreatment(i)}
                              className='text-red-500 text-3xl cursor-pointer'
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='py-5 font-semibold text-red-500'>
                      Enter Something!
                    </p>
                  )}
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant='text'
                    color='red'
                    size='sm'
                    onClick={handleOpen3}
                    className='mr-1'
                  >
                    <span>Close</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
          </div> */}
        </div>
        {/* <div className='lg:w-1/2'>
          <Textarea label='Enter Details' name='description' />
        </div> */}
        <div className=''>
          <label htmlFor='' className='text-red'>
            <span className='font-semibold'>Long Description</span>
          </label>
          <ReactQuill
            theme='snow'
            modules={modules}
            formats={formats}
            value={editorValue}
            onChange={seteditorValue}
            className='my-2.5'
          />
        </div>
        <Button className='bg-blue' type='submit'>
          {loader ? 'Loading' : 'Add Center'}
        </Button>
      </form>
    </div>
  )
}
