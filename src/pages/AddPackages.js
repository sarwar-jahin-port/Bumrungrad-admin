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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { AiOutlineDelete } from 'react-icons/ai'

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export default function AddPackages() {
  //dialogue
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(!open)
  const [open2, setOpen2] = React.useState(false)
  const handleOpen2 = () => setOpen2(!open2)
  const [open3, setOpen3] = React.useState(false)
  const handleOpen3 = () => setOpen3(!open3)

  const [loader, setLoader] = useState(false)
  const [childLoader, setChildLoader] = useState(false)

  const [parentPckages, setParentPackages] = useState([])
  const [parentId, setParentId] = useState('')

  const [activeTab, setActiveTab] = React.useState('Parent')
  const [selectedParentImage, setSelectedParentImage] =
    useState('No file chosen')
  const [selectedChildImage, setSelectedChildImage] = useState('No file chosen')

  const [parentSlug, setParentSlug] = useState('')
  const [parentSlugEdited, setParentSlugEdited] = useState(false)

  const [childSlug, setChildSlug] = useState('')
  const [childSlugEdited, setChildSlugEdited] = useState(false)

  // Terms & Conditions -> DB `conditions` column
  const [term, setTerm] = useState('')
  const [terms, setTerms] = useState([])

  // Package Inclusions -> DB `inclusions` column
  const [inclusion, setInclusion] = useState('')
  const [inclusions, setInclusions] = useState([])

  // Package Exclusions -> DB `exclusions` column
  const [exclusion, setExclusion] = useState('')
  const [exclusions, setExclusions] = useState([])

  const addTerm = () => {
    setTerms([...terms, { condition: term }])
    setTerm('')
  }
  const removeTerm = (index) => {
    setTerms(terms.filter((_, i) => i !== index))
  }
  const addInclusion = () => {
    setInclusions([...inclusions, { inclusion }])
    setInclusion('')
  }
  const removeInclusion = (index) => {
    setInclusions(inclusions.filter((_, i) => i !== index))
  }
  const addExclusion = () => {
    setExclusions([...exclusions, { exclusion }])
    setExclusion('')
  }
  const removeExclusion = (index) => {
    setExclusions(exclusions.filter((_, i) => i !== index))
  }

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
    fetch('https://api.discoverinternationalmedicalservice.com/api/get/package')
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
      formData.append('slug', parentSlug)
      formData.append('description', description)

      fetch('https://api.discoverinternationalmedicalservice.com/api/create/package', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false)
          e.target.reset()
          setSelectedParentImage('No file chosen')
          setParentSlug('')
          setParentSlugEdited(false)
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
    const location = e.target.location.value
    const shift1 = e.target.shift1.value
    const shift2 = e.target.shift2.value

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
      formData.append('slug', childSlug)
      formData.append('price', price)
      formData.append('parent_id', parentId)
      formData.append('location', location)
      formData.append('shift1', shift1)
      formData.append('shift2', shift2)
      formData.append('content', editorValue)
      formData.append('conditions', JSON.stringify(terms))
      formData.append('inclusions', JSON.stringify(inclusions))
      formData.append('exclusions', JSON.stringify(exclusions))

      fetch('https://api.discoverinternationalmedicalservice.com/api/create/sub/package', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          e.target.reset()
          toast.success('Child Package Added Successfully!')
          setChildLoader(false)
          setTerms([])
          setInclusions([])
          setExclusions([])
          setChildSlug('')
          setChildSlugEdited(false)
          seteditorValue('')
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
                <Input
                  label='Enter Title'
                  name='title'
                  required
                  onChange={(e) => {
                    if (!parentSlugEdited) setParentSlug(slugify(e.target.value))
                  }}
                />
                <div>
                  <Input
                    label='Enter Slug'
                    name='slug'
                    value={parentSlug}
                    onChange={(e) => {
                      setParentSlugEdited(true)
                      setParentSlug(slugify(e.target.value))
                    }}
                  />
                  <p className='text-xs text-slate-500 mt-1'>
                    Auto-generated from the title. Used in the page URL — edit only if needed.
                  </p>
                </div>
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
                  <Input
                    label='Enter Title'
                    name='title'
                    required
                    onChange={(e) => {
                      if (!childSlugEdited) setChildSlug(slugify(e.target.value))
                    }}
                  />
                  <div>
                    <Input
                      label='Enter Slug'
                      name='slug'
                      value={childSlug}
                      onChange={(e) => {
                        setChildSlugEdited(true)
                        setChildSlug(slugify(e.target.value))
                      }}
                    />
                    <p className='text-xs text-slate-500 mt-1'>
                      Used in the page URL — edit only if needed.
                    </p>
                  </div>
                  <Input label='Enter Price' name='price' type='number' required />
                  <Input label='Enter Location' name='location' />
                  <Input label='Enter First Shift' name='shift1' />
                  <Input label='Enter Second Shift' name='shift2' />
                </div>
                <div className='grid gap-4 md:grid-cols-2'>
                  {/* Terms & Conditions -> conditions */}
                  <div className='flex items-center gap-5'>
                    <div className='relative flex w-full'>
                      <Input
                        value={term}
                        type='text'
                        label='Terms & Conditions'
                        onChange={(e) => setTerm(e.target.value)}
                      />
                      <Button
                        size='sm'
                        onClick={addTerm}
                        className='!absolute right-1 top-1 rounded bg-blue'
                        disabled={term === ''}
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
                      {terms.length > 0 && (
                        <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
                      )}
                      <Dialog open={open} handler={handleOpen}>
                        <DialogHeader>Terms &amp; Conditions</DialogHeader>
                        <DialogBody divider>
                          {terms.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                              {terms.map((c, i) => (
                                <div key={i} className='flex justify-between'>
                                  <p className='text-xl'>{c.condition}</p>
                                  <AiOutlineDelete
                                    onClick={() => removeTerm(i)}
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
                  </div>
                  {/* Package Inclusions -> inclusions */}
                  <div className='flex items-center gap-5'>
                    <div className='relative flex w-full'>
                      <Input
                        value={inclusion}
                        type='text'
                        label='Package Inclusions'
                        onChange={(e) => setInclusion(e.target.value)}
                      />
                      <Button
                        size='sm'
                        onClick={addInclusion}
                        className='!absolute right-1 top-1 rounded bg-blue'
                        disabled={inclusion === ''}
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
                      {inclusions.length > 0 && (
                        <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
                      )}
                      <Dialog open={open2} handler={handleOpen2}>
                        <DialogHeader>Package Inclusions</DialogHeader>
                        <DialogBody divider>
                          {inclusions.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                              {inclusions.map((c, i) => (
                                <div key={i} className='flex justify-between'>
                                  <p className='text-xl'>{c.inclusion}</p>
                                  <AiOutlineDelete
                                    onClick={() => removeInclusion(i)}
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
                  </div>
                  {/* Package Exclusions -> exclusions */}
                  <div className='flex items-center gap-5'>
                    <div className='relative flex w-full'>
                      <Input
                        value={exclusion}
                        type='text'
                        label='Package Exclusions'
                        onChange={(e) => setExclusion(e.target.value)}
                      />
                      <Button
                        size='sm'
                        onClick={addExclusion}
                        className='!absolute right-1 top-1 rounded bg-blue'
                        disabled={exclusion === ''}
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
                      {exclusions.length > 0 && (
                        <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
                      )}
                      <Dialog open={open3} handler={handleOpen3}>
                        <DialogHeader>Package Exclusions</DialogHeader>
                        <DialogBody divider>
                          {exclusions.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                              {exclusions.map((c, i) => (
                                <div key={i} className='flex justify-between'>
                                  <p className='text-xl'>{c.exclusion}</p>
                                  <AiOutlineDelete
                                    onClick={() => removeExclusion(i)}
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
                  </div>
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
