import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Textarea,
  Select,
  Option,
  Button,
  Spinner,
} from '@material-tailwind/react'
import { toast } from 'react-toastify'
// import { AiOutlineDelete } from 'react-icons/ai'

export default function AddPackages() {
  //dialogue
  // const [open, setOpen] = React.useState(false)
  //const handleOpen = () => setOpen(!open)
  // const [open2, setOpen2] = React.useState(false)
  //const handleOpen2 = () => setOpen2(!open2)
  // const [open3, setOpen3] = React.useState(false)
  //const handleOpen3 = () => setOpen3(!open3)

  const [loader, setLoader] = useState(false)
  const [childLoader, setChildLoader] = useState(false)

  const [parentPckages, setParentPackages] = useState([])
  const [parentId, setParentId] = useState('')

  const [activeTab, setActiveTab] = React.useState('Parent')
  const [selectedParentImage, setSelectedParentImage] =
    useState('No file chosen')
  const [selectedChildImage, setSelectedChildImage] = useState('No file chosen')

  //const [information, setInformation] = useState('')
  const [informations, setInformations] = useState([])

  //const [condition, setCondition] = useState('')
  const [conditions, setConditions] = useState([])

  //const [treatment, setTreatment] = useState('')
  const [treatments, setTreatments] = useState([])

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

  //get parent package
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get/package')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
        } else {
          setParentPackages(data?.data)
        }
      })
  }, [])
  //  add parent package
  const handleAddParentPackage = (e) => {
    setLoader(true)
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value

    if (selectedParentImage === 'No file chosen') {
      setLoader(false)
      toast.error('Select Package Image')
    } else {
      const formData = new FormData()
      formData.append('cover_photo', selectedParentImage)
      formData.append('title', title)
      formData.append('description', description)

      fetch('http://127.0.0.1:8000/api/create/package', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false)
          e.target.reset()
          setSelectedParentImage('No file chosen')
          toast.success('Package Added Successfully!')
        })
        .catch((e) => console.error(e))
    }
  }
  // add child packages
  const handleAddChildPackages = (e) => {
    setChildLoader(true)
    e.preventDefault()
    const title = e.target.title.value
    const price = e.target.price.value
    //const description = e.target.description.value
    const location = e.target.location.value
    const shift1 = e.target.shift1.value
    const shift2 = e.target.shift2.value
    const postData = {
      selectedChildImage,
      title,
      price,
      //description,
      location,
      shift1,
      shift2,
      informations,
      conditions,
      treatments,
      editorValue,
    }
    if (selectedChildImage === 'No file chosen') {
      setChildLoader(false)
      toast.error('Select Child Package Image')
    } else if (parentId === '') {
      setChildLoader(false)
      toast.error('Please Select Parent Package')
    } else {
      const formData = new FormData()
      formData.append('cover_photo', selectedChildImage)
      formData.append('title', title)
      formData.append('price', price)
      // formData.append('description', description)
      formData.append('parent_id', parentId)
      formData.append('location', location)
      formData.append('shift1', shift1)
      formData.append('shift2', shift2)
      formData.append('content', editorValue)
      //formData.append('conditions', JSON.stringify(informations))
      //formData.append('inclusions', JSON.stringify(conditions))
      //formData.append('exclusions', JSON.stringify(treatments))

      fetch('http://127.0.0.1:8000/api/create/sub/package', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          e.target.reset()
          toast.success('Child Package Added Successfully!')
          setChildLoader(false)
          setInformations([])
          setConditions([])
          setTreatments([])
          setSelectedChildImage('No file chosen')
        })
        .catch((e) => console.error(e))
    }
  }
  return (
    <div className='mx-5 py-10 md:container md:mx-auto'>
      <div className='rounded-xl p-5 shadow-xl bg-white'>
        <p className='text-2xl font-semibold'>Add Packages</p>
        <hr className='my-5' />
        <Tabs value={activeTab}>
          <TabsHeader
            className='rounded-none border-b border-blue-gray-50 bg-transparent p-0'
            indicatorProps={{
              className:
                'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
            }}
          >
            <Tab
              value='Parent'
              onClick={() => setActiveTab('Parent')}
              className={activeTab === 'Parent' ? 'text-gray-900' : ''}
            >
              Parent Package
            </Tab>
            <Tab
              value='Child'
              onClick={() => setActiveTab('Child')}
              className={activeTab === 'Child' ? 'text-gray-900' : ''}
            >
              Child Packages
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value={'Parent'}>
              <form
                onSubmit={handleAddParentPackage}
                action=''
                className='flex flex-col gap-4'
              >
                <div className='flex flex-row items-center'>
                  <input
                    type='file'
                    id='parent-input'
                    onChange={(e) => setSelectedParentImage(e.target.files[0])}
                    hidden
                  />
                  <label
                    htmlFor='parent-input'
                    className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer'
                  >
                    Choose file
                  </label>
                  <label className='text-sm text-slate-500'>
                    {selectedParentImage.name
                      ? selectedParentImage.name
                      : selectedParentImage}
                  </label>
                </div>
                <p className='text-red-400 text-sm'>
                  Image Ratio - 1200*628. Image size not more than 500kb
                </p>
                <Input label='Enter Title' name='title' required />
                <Textarea
                  label='Enter Description'
                  name='description'
                  required
                />
                <Button
                  className='bg-blue min-w-[100px] max-w-fit flex items-center gap-1'
                  type='submit'
                >
                  Add Parent
                  {loader && <Spinner className='h-4 w-4' color='white' />}
                </Button>
              </form>
            </TabPanel>
            <TabPanel value={'Child'}>
              <form
                onSubmit={handleAddChildPackages}
                action=''
                className='flex flex-col gap-4'
              >
                <div className='flex flex-row items-center'>
                  <input
                    type='file'
                    id='child-input'
                    onChange={(e) => setSelectedChildImage(e.target.files[0])}
                    hidden
                  />
                  <label
                    htmlFor='child-input'
                    className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer'
                  >
                    Choose file
                  </label>
                  <label className='text-sm text-slate-500'>
                    {selectedChildImage.name
                      ? selectedChildImage.name
                      : selectedChildImage}
                  </label>
                </div>
                <p className='text-red-400 text-sm'>
                  Image Ratio - 1200*628. Image size not more than 500kb
                </p>

                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='w-full'>
                    <Select
                      label='Select Parent Package'
                      required
                      onChange={(value) => setParentId(value)}
                    >
                      {parentPckages?.map((pp) => (
                        <Option key={pp.id} value={pp.id.toString()}>
                          {pp.title}
                        </Option>
                      ))}
                    </Select>
                    {parentId === '' && (
                      <p className='text-red-500 text-sm mt-1'>
                        *Select Parent Package
                      </p>
                    )}
                  </div>
                  <Input label='Enter Title' name='title' required />
                  <Input label='Enter Price' name='price' required />
                  <Input label='Enter Location' name='location' />
                  <Input label='Enter First Shift' name='shift1' />
                  <Input label='Enter Second Shift' name='shift2' />
                </div>
                <div className='grid gap-4 md:grid-cols-2'>
                  {/* multiple Conditions */}
                  {/* <div className='flex items-center gap-5'>
                    <div className='relative flex w-full'>
                      <Input
                        value={information}
                        type='text'
                        label='Terms & Conditions'
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
                      <Dialog open={open} handler={handleOpen}>
                        <DialogHeader>Informations</DialogHeader>
                        <DialogBody divider>
                          {informations.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                              {informations.map((c, i) => (
                                <div key={i} className='flex justify-between'>
                                  <p className='text-xl'>{c.information}</p>
                                  <AiOutlineDelete
                                    onClick={() => removeInformation(i)}
                                    className='text-red-500 text-3xl cursor-pointer'
                                  />
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
                  {/* multiple Inclusions */}
                  {/* <div className='flex items-center gap-5'>
                    <div className='relative flex w-full'>
                      <Input
                        value={condition}
                        type='text'
                        label='Package Inclusions'
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
                      <Dialog open={open2} handler={handleOpen2}>
                        <DialogHeader>Conditions</DialogHeader>
                        <DialogBody divider>
                          {conditions.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                              {conditions.map((c, i) => (
                                <div key={i} className='flex justify-between'>
                                  <p className='text-xl'>{c.condition}</p>
                                  <AiOutlineDelete
                                    onClick={() => removeCondition(i)}
                                    className='text-red-500 text-3xl cursor-pointer'
                                  />
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
                  {/* multiple Exclusions */}
                  {/* <div className='flex items-center gap-5'>
                    <div className='relative flex w-full'>
                      <Input
                        value={treatment}
                        type='text'
                        label='Package Exclusions'
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
                      <Dialog open={open3} handler={handleOpen3}>
                        <DialogHeader>Treatments</DialogHeader>
                        <DialogBody divider>
                          {treatments.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                              {treatments.map((c, i) => (
                                <div key={i} className='flex justify-between'>
                                  <p className='text-xl'>{c.treatment}</p>
                                  <AiOutlineDelete
                                    onClick={() => removeTreatment(i)}
                                    className='text-red-500 text-3xl cursor-pointer'
                                  />
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
                <div className=''>
                  <label htmlFor='' className='text-red'>
                    <span className='font-semibold'>Description</span>
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

                <Button
                  className='bg-blue w-fit flex items-center gap-1'
                  type='submit'
                >
                  Add Child{' '}
                  {childLoader && <Spinner className='h-4 w-4' color='white' />}
                </Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  )
}
