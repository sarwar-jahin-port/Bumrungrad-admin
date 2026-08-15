import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiFillEye } from 'react-icons/ai'
import { toast } from 'react-toastify'

export default function AddDoctors() {
  //loader
  const [loader, setLoader] = useState(false)
  //dialogues
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(!open)
  const [open2, setOpen2] = React.useState(false)
  const handleOpen2 = () => setOpen2(!open2)
  const [open3, setOpen3] = React.useState(false)
  const handleOpen3 = () => setOpen3(!open3)
  const [open4, setOpen4] = React.useState(false)
  const handleOpen4 = () => setOpen4(!open4)
  const [open5, setOpen5] = React.useState(false)
  const handleOpen5 = () => setOpen5(!open5)
  const [open6, setOpen6] = React.useState(false)
  const handleOpen6 = () => setOpen6(!open6)
  const [open7, setOpen7] = React.useState(false)
  const handleOpen7 = () => setOpen7(!open7)
  const [open8, setOpen8] = React.useState(false)
  const handleOpen8 = () => setOpen8(!open8)
  const [open9, setOpen9] = React.useState(false)
  const handleOpen9 = () => setOpen9(!open9)
  const [open10, setOpen10] = React.useState(false)
  const handleOpen10 = () => setOpen10(!open10)
  const [open11, setOpen11] = React.useState(false)
  const handleOpen11 = () => setOpen11(!open11)

  //states of datas
  const [selectedDoctorImg, setSelectedDoctorImg] = useState('')

  const [certificate, setCertificate] = useState('')
  const [certificates, setCertificates] = useState([])

  const [training, setTraining] = useState('')
  const [trainings, setTrainings] = useState([])

  const [fellowship, setFellowship] = useState('')
  const [fellowships, setFellowships] = useState([])

  const [Interest, setInterest] = useState('')
  const [interests, setInterests] = useState([])

  const [experience, setExperience] = useState('')
  const [experiences, setExperiences] = useState([])

  const [research, setResearch] = useState('')
  const [researchs, setResearchs] = useState([])

  const [article, setArticle] = useState('')
  const [articles, setArticles] = useState([])

  const [specialities, setSpecialities] = useState([])
  const [subSpecialities, setSubSpecialities] = useState([])

  const [parentSpecialityId, setparentSpecialityId] = useState('')
  const [selectedSubSpecialities, setSelectedSubSpecialities] = useState([])

  const handleSubSpecialityChange = (value) => {
    // Check if the value is not empty and not already selected
    if (value && !selectedSubSpecialities.includes(value)) {
      setSelectedSubSpecialities([...selectedSubSpecialities, value])
      // setSubSpecialityId(""); // Clear the input after selection
    }
  }

  const removeSubSpeciality = (value) => {
    const updatedSubSpecialities = selectedSubSpecialities.filter(
      (subSpeciality) => subSpeciality !== value
    )
    setSelectedSubSpecialities(updatedSubSpecialities)
  }

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const languages = [
    'Thai',
    'English',
    'Arabic',
    'Chinese',
    'Dutch',
    'Teo Chew',
    'French',
    'German',
    'Hindi',
    'Japanese',
    'Spanish',
    'Urdo',
    'Mandarin',
    'Punjab',
    'Hokkin',
    'Hainan',
    'Cantonese',
  ]
  //docotrs schedule
  const [selectedDay, setSelectedDay] = useState('')
  const [message, setMessage] = useState('')
  const [gender, setGender] = useState('')
  const [enterTime, setEnterTime] = useState('')
  const [exitTime, setExitTime] = useState('')
  const [time, setTime] = useState('')

  const [schedules, setSchedules] = useState([])
  const [langs, setLangs] = useState([])

  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [schools, setSchools] = useState('')

  const handleLangChange = (value) => {
    // Check if the value is not empty and not already selected
    if (value && !langs.includes(value)) {
      setLangs([...langs, value])
    }
  }

  const removeLang = (value) => {
    const updatedLangs = langs.filter((lang) => lang !== value)
    setLangs(updatedLangs)
  }

  // Handle "Add" schedules
  const handleAddSchedule = () => {
    // Create a new object with the current input values
    const newData = [selectedDay, time, enterTime, exitTime, message]
    // Add the new data to the schedules
    setSchedules([...schedules, newData])
    // Reset the input fields
    setSelectedDay('')
    setMessage('')
    // setTime("");
    setEnterTime('')
    setExitTime('')
  }
  // Handle remove schedules
  const removeSchedule = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index)
    setSchedules(updatedSchedules)
  }

  // certificates add remove functions
  const addSchools = () => {
    const newSchools = [...schools, { school }]
    setSchools(newSchools)
    setSchool('')
  }
  const removeSchool = (index) => {
    const updatedSchools = [...schools]
    updatedSchools.splice(index, 1)
    setSchools(updatedSchools)
  }
  // certificates add remove functions
  const addCertificates = () => {
    const newCertificates = [...certificates, { certificate }]
    setCertificates(newCertificates)
    setCertificate('')
  }
  const removeCertificate = (index) => {
    const updatedCertificates = [...certificates]
    updatedCertificates.splice(index, 1)
    setCertificates(updatedCertificates)
  }

  // trainings add remove functions
  const addTrainings = () => {
    const newTrainings = [...trainings, { training }]
    setTrainings(newTrainings)
    setTraining('')
  }
  const removeTraining = (index) => {
    const updatedTrainings = [...trainings]
    updatedTrainings.splice(index, 1)
    setTrainings(updatedTrainings)
  }

  // certificates add remove functions
  const addFellowship = () => {
    const newFellowships = [...fellowships, { fellowship }]
    setFellowships(newFellowships)
    setFellowship('')
  }
  const removeFellowship = (index) => {
    const updatedFellowships = [...fellowships]
    updatedFellowships.splice(index, 1)
    setFellowships(updatedFellowships)
  }

  // Interest add remove functions
  const addInterest = () => {
    const newinterests = [...interests, { Interest }]
    setInterests(newinterests)
    setInterest('')
  }
  const removeInterest = (index) => {
    const updatedinterests = [...interests]
    updatedinterests.splice(index, 1)
    setInterests(updatedinterests)
  }

  // Experience add remove functions
  const addExperience = () => {
    const newExperiences = [...experiences, { experience }]
    setExperiences(newExperiences)
    setExperience('')
  }
  const removeExperience = (index) => {
    const updatedExperiences = [...experiences]
    updatedExperiences.splice(index, 1)
    setExperiences(updatedExperiences)
  }

  // Research add remove functions
  const addResearch = () => {
    const newResearchs = [...researchs, { research }]
    setResearchs(newResearchs)
    setResearch('')
  }
  const removeResearch = (index) => {
    const updatedResearchs = [...researchs]
    updatedResearchs.splice(index, 1)
    setResearchs(updatedResearchs)
  }

  // Article add remove functions
  const addArticle = () => {
    const newArticles = [...articles, { article }]
    setArticles(newArticles)
    setArticle('')
  }
  const removeArticle = (index) => {
    const updatedArticles = [...articles]
    updatedArticles.splice(index, 1)
    setArticles(updatedArticles)
  }

  //get speacilities
  useEffect(() => {
    fetch('https://api.discoverinternationalmedicalservice.com/api/get/specialty')
      .then((res) => res.json())
      .then((data) => {
        if (data?.response?.status === 200) {
          setSpecialities(data?.response?.data)
          setLoader(false)
        } else {
        }
      })
  }, [])

  //get sub speacilities
  useEffect(() => {
    setSubSpecialities([])
    if (parentSpecialityId) {
      fetch(
        `https://api.discoverinternationalmedicalservice.com/api/get/selected/sub/specialty/${parentSpecialityId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.response?.status === 200) {
            setSubSpecialities(data?.response?.data)
            setLoader(false)
          } else {
          }
        })
    }
  }, [parentSpecialityId])

  const handleAddDoctor = (e) => {
    setLoader(true)

    e.preventDefault()
    const postData = {
      cover_photo: selectedDoctorImg,
      name: name,
      lang: langs,
      school: schools,
      parentSpeciality: parentSpecialityId,
      subSpecialities: selectedSubSpecialities,
      certificates: certificates,
      trainings: trainings,
      fellowships: fellowships,
      interests: interests,
      experiences: experiences,
      researches: researchs,
      articles: articles,
      schedules: schedules,
    }
    const formData = new FormData()
    // file upload
    formData.append('cover_photo', selectedDoctorImg)
    // single strings
    formData.append('name', name)
    formData.append('schools', JSON.stringify(schools))
    //select
    formData.append('gender', gender)
    formData.append('specialty', parentSpecialityId)
    // array
    formData.append('sub_specialty', selectedSubSpecialities)
    formData.append('lang', langs)
    //array of objects
    formData.append('article', JSON.stringify(articles))
    formData.append('certificates', JSON.stringify(certificates))
    formData.append('trainings', JSON.stringify(trainings))
    formData.append('fellowships', JSON.stringify(fellowships))
    formData.append('interests', JSON.stringify(interests))
    formData.append('experiences', JSON.stringify(experiences))
    formData.append('researches', JSON.stringify(researchs))
    //array of array
    formData.append('schedule', JSON.stringify(schedules))

    fetch('https://api.discoverinternationalmedicalservice.com/api/add/doctor', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          setLoader(false)
        } else {
          toast.success('Doctor Added Successfully!')
          window.location.reload()
        }
      })
      .catch((e) => {
        console.error(e)
        setLoader(false)
      })
  }
  return (
    <div className='mx-5 md:container md:mx-auto py-10'>
      <div className='flex flex-col gap-4 bg-white rounded-xl shadow-xl p-5'>
        <p className='text-2xl font-semibold'>Add Doctor</p>
        <hr />
        <div className='flex flex-row items-center'>
          <input
            type='file'
            id='custom-input'
            onChange={(e) => setSelectedDoctorImg(e.target.files[0])}
            hidden
          />
          <label
            htmlFor='custom-input'
            className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer'
          >
            Choose file
          </label>
          <label className='text-sm text-slate-500'>
            {selectedDoctorImg.name ? selectedDoctorImg.name : 'No File Chosen'}
          </label>
        </div>
        <p className='text-red-400 text-sm mt-2.5'>
          Image Ratio - 400*300. Image size not more than 500kb
        </p>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='w-full'>
            <Select
              label='Select Specialties'
              onChange={(value) => setparentSpecialityId(value)}
            >
              {specialities?.map((s) => (
                <Option key={s.id} value={s.name}>
                  {s.name}
                </Option>
              ))}
            </Select>
            {parentSpecialityId === '' && (
              <p className='capitalize text-red-400 font-semibold text-sm'>
                *required
              </p>
            )}
          </div>
          <div>
            <div className='w-full relative flex gap-1'>
              <Select
                label='Select Sub Specialties'
                disabled={subSpecialities.length === 0}
                onChange={(value) => handleSubSpecialityChange(value)}
              >
                {subSpecialities?.map((sb, i) => (
                  <Option key={i} value={sb?.sub_specialty}>
                    {sb?.sub_specialty}
                  </Option>
                ))}
              </Select>
              <button
                onClick={handleOpen7}
                className='px-2.5 py-0.5 border border-blue rounded'
              >
                <AiFillEye className='text-3xl text-blue' />
              </button>
              {selectedSubSpecialities.length > 0 && (
                <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
              )}
              <Dialog open={open7} handler={handleOpen7}>
                <DialogHeader>Sub Specialities</DialogHeader>
                <DialogBody divider>
                  {selectedSubSpecialities.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                      {selectedSubSpecialities.map((c, i) => (
                        <div key={i} className='flex justify-between'>
                          <p className='text-xl'>
                            {i + 1}. {c}
                          </p>
                          <AiOutlineDelete
                            onClick={() => removeSubSpeciality(c)}
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
                    onClick={handleOpen7}
                    className='mr-1'
                  >
                    <span>Close</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
            {/* {selectedSubSpecialities.length === 0 && (
              <p className='capitalize text-red-400 font-semibold text-sm'>
                *required
              </p>
            )} */}
          </div>
          <div>
            <Input
              label='Enter Name'
              name='name'
              onChange={(e) => setName(e.target.value)}
            />
            {name === '' && (
              <p className='capitalize text-red-400 font-semibold text-sm'>
                *required
              </p>
            )}
          </div>
          <div>
            <div className='w-full relative flex gap-1'>
              <Select
                label='Language Spoken'
                onChange={(value) => handleLangChange(value)}
              >
                {languages.map((l, i) => (
                  <Option key={i} value={l}>
                    {l}
                  </Option>
                ))}
              </Select>
              <button
                onClick={handleOpen9}
                className='px-2.5 py-0.5 border border-blue rounded'
              >
                <AiFillEye className='text-3xl text-blue' />
              </button>
              {langs.length > 0 && (
                <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
              )}
              <Dialog open={open9} handler={handleOpen9}>
                <DialogHeader>Language Spoken</DialogHeader>
                <DialogBody divider>
                  {langs.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                      {langs.map((c, i) => (
                        <div key={i} className='flex justify-between'>
                          <p className='text-xl'>
                            {i + 1}. {c}
                          </p>
                          <AiOutlineDelete
                            onClick={() => removeLang(c)}
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
                    onClick={handleOpen9}
                    className='mr-1'
                  >
                    <span>Close</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
            {langs.length === 0 && (
              <p className='capitalize text-red-400 font-semibold text-sm'>
                *required
              </p>
            )}
          </div>
          {/* <div>
            <Input
              label='Medical School'
              name='school'
              required
              onChange={(e) => setSchool(e.target.value)}
            />
            {school === '' && (
              <p className='capitalize text-red-400 font-semibold text-sm'>
                *required
              </p>
            )}
          </div> */}
          <div>
            <Select
              label='Select Gender'
              onChange={(value) => setGender(value)}
            >
              <Option value={'Male'}>Male</Option>
              <Option value={'Female'}>Female</Option>
            </Select>
            {gender === '' && (
              <p className='capitalize text-red-400 font-semibold text-sm'>
                *required
              </p>
            )}
          </div>
        </div>
        {/* Schools */}
        <div className='flex items-center gap-5'>
          <div className='relative flex w-full'>
            <Input
              value={school}
              type='text'
              label='Medical Schools'
              onChange={(e) => setSchool(e.target.value)}
            />
            <Button
              size='sm'
              onClick={addSchools}
              className='!absolute right-1 top-1 rounded bg-blue'
              disabled={school === ''}
            >
              Add
            </Button>
          </div>
          <div className='relative'>
            <Button
              onClick={handleOpen11}
              size='sm'
              className='bg-white text-blue border border-blue'
            >
              View
            </Button>
            {schools.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog open={open11} handler={handleOpen11}>
              <DialogHeader>Schools</DialogHeader>
              <DialogBody divider>
                {schools.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {schools.map((c, i) => (
                      <div key={i} className='flex justify-between'>
                        <p className='text-xl'>
                          {i + 1}. {c.school}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeSchool(i)}
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
                  onClick={handleOpen11}
                  className='mr-1'
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        {schools === '' && (
          <p className='capitalize text-red-400 font-semibold text-sm'>
            *required
          </p>
        )}
        {/* Certifications */}
        <div className='flex items-center gap-5'>
          <div className='relative flex w-full'>
            <Input
              value={certificate}
              type='text'
              label='Board Certifications'
              onChange={(e) => setCertificate(e.target.value)}
            />
            <Button
              size='sm'
              onClick={addCertificates}
              className='!absolute right-1 top-1 rounded bg-blue'
              disabled={certificate === ''}
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
            {certificates.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Cerificates</DialogHeader>
              <DialogBody divider>
                {certificates.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {certificates.map((c, i) => (
                      <div key={i} className='flex justify-between'>
                        <p className='text-xl'>
                          {i + 1}. {c.certificate}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeCertificate(i)}
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
        {/* trainings */}
        <div className='flex items-center gap-5'>
          <div className='relative flex w-full'>
            <Input
              value={training}
              type='text'
              label='Trainings'
              onChange={(e) => setTraining(e.target.value)}
            />
            <Button
              size='sm'
              onClick={addTrainings}
              className='!absolute right-1 top-1 rounded bg-blue'
              disabled={training === ''}
            >
              Add
            </Button>
          </div>
          <div className='relative'>
            <Button
              onClick={handleOpen10}
              size='sm'
              className='bg-white text-blue border border-blue'
            >
              View
            </Button>
            {trainings.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog open={open10} handler={handleOpen10}>
              <DialogHeader>Trainings</DialogHeader>
              <DialogBody divider>
                {trainings.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {trainings.map((c, i) => (
                      <div key={i} className='flex justify-between'>
                        <p className='text-xl'>
                          {i + 1}. {c.training}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeTraining(i)}
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
                  onClick={handleOpen10}
                  className='mr-1'
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        {/* Articles */}
        <div className='flex items-center gap-5'>
          <div className='relative flex w-full'>
            <Input
              value={article}
              type='text'
              label='Enter Articles'
              onChange={(e) => setArticle(e.target.value)}
            />
            <Button
              size='sm'
              onClick={addArticle}
              className='!absolute right-1 top-1 rounded bg-blue'
              disabled={article === ''}
            >
              Add
            </Button>
          </div>
          <div className='relative'>
            <Button
              onClick={handleOpen8}
              size='sm'
              className='bg-white text-blue border border-blue'
            >
              View
            </Button>
            {articles.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog open={open8} handler={handleOpen8}>
              <DialogHeader>Articles</DialogHeader>
              <DialogBody divider>
                {articles.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {articles.map((c, i) => (
                      <div key={i} className='flex justify-between'>
                        <p className='text-xl'>
                          {i + 1}. {c.article}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeArticle(i)}
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
                  onClick={handleOpen8}
                  className='mr-1'
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        {/* Fellowships */}
        <div className='flex items-center gap-5'>
          <div className='relative flex w-full'>
            <Input
              value={fellowship}
              type='text'
              label='Fellowships'
              onChange={(e) => setFellowship(e.target.value)}
            />
            <Button
              size='sm'
              onClick={addFellowship}
              className='!absolute right-1 top-1 rounded bg-blue'
              disabled={fellowship === ''}
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
            {fellowships.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog open={open2} handler={handleOpen2}>
              <DialogHeader>Fellowships</DialogHeader>
              <DialogBody divider>
                {fellowships.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {fellowships.map((c, i) => (
                      <div key={i} className='flex justify-between'>
                        <p className='text-xl'>
                          {i + 1}. {c.fellowship}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeFellowship(i)}
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
        {/* interests */}
        <div className='flex items-center gap-5'>
          <div className='relative flex w-full'>
            <Input
              value={Interest}
              type='text'
              label='Interest'
              onChange={(e) => setInterest(e.target.value)}
            />
            <Button
              size='sm'
              onClick={addInterest}
              className='!absolute right-1 top-1 rounded bg-blue'
              disabled={Interest === ''}
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
            {interests.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog open={open3} handler={handleOpen3}>
              <DialogHeader>Interests</DialogHeader>
              <DialogBody divider>
                {interests.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {interests.map((c, i) => (
                      <div key={i} className='flex justify-between'>
                        <p className='text-xl'>
                          {i + 1}. {c.Interest}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeInterest(i)}
                          className='text-red-500 text-3xl cursor-pointer'
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='py-5 text-red-500 font-semibold'>
                    Enter something!
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
        {/* Experiences  */}
        <div className='flex items-center gap-5'>
          <div className='relative flex w-full'>
            <Input
              value={experience}
              type='text'
              label='Experience'
              onChange={(e) => setExperience(e.target.value)}
            />
            <Button
              size='sm'
              onClick={addExperience}
              className='!absolute right-1 top-1 rounded bg-blue'
              disabled={experience === ''}
            >
              Add
            </Button>
          </div>
          <div className='relative'>
            <Button
              onClick={handleOpen4}
              size='sm'
              className='bg-white text-blue border border-blue'
            >
              View
            </Button>
            {experiences.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog open={open4} handler={handleOpen4}>
              <DialogHeader>Experiences</DialogHeader>
              <DialogBody divider>
                {experiences.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {experiences.map((c, i) => (
                      <div key={i} className='flex justify-between'>
                        <p className='text-xl'>
                          {i + 1}. {c.experience}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeExperience(i)}
                          className='text-red-500 text-3xl cursor-pointer'
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='py-5 text-red-500 font-semibold'>
                    Enter something!
                  </p>
                )}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant='text'
                  color='red'
                  size='sm'
                  onClick={handleOpen4}
                  className='mr-1'
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        {/* Research  */}
        <div className='flex items-center gap-5'>
          <div className='relative flex w-full'>
            <Input
              value={research}
              type='text'
              label='Research'
              onChange={(e) => setResearch(e.target.value)}
            />
            <Button
              size='sm'
              onClick={addResearch}
              className='!absolute right-1 top-1 rounded bg-blue'
              disabled={research === ''}
            >
              Add
            </Button>
          </div>
          <div className='relative'>
            <Button
              onClick={handleOpen5}
              size='sm'
              className='bg-white text-blue border border-blue'
            >
              View
            </Button>
            {researchs.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog open={open5} handler={handleOpen5}>
              <DialogHeader>Researchs</DialogHeader>
              <DialogBody divider>
                {researchs.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {researchs.map((c, i) => (
                      <div key={i} className='flex justify-between'>
                        <p className='text-xl'>
                          {i + 1}. {c.research}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeResearch(i)}
                          className='text-red-500 text-3xl cursor-pointer'
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='py-5 text-red-500 font-semibold'>
                    Enter something!
                  </p>
                )}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant='text'
                  color='red'
                  size='sm'
                  onClick={handleOpen5}
                  className='mr-1'
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        {/* Schedule  */}
        <div className='flex justify-between items-center'>
          <p className='font-semibold uppercase'>Enter Schedule Information</p>
          <div className='relative'>
            <Button
              size='sm'
              variant='outlined'
              className='font-semibold text-blue'
              onClick={handleOpen6}
            >
              View
            </Button>
            {schedules.length > 0 && (
              <div className='h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl'></div>
            )}
            <Dialog
              open={open6}
              handler={handleOpen6}
              className='h-[570px] overflow-y-scroll'
              size='lg'
            >
              <DialogHeader>Doctor Schedules</DialogHeader>
              <DialogBody divider>
                {schedules.length > 0 ? (
                  <Card className='h-full w-full overflow-scroll'>
                    <table className='w-full min-w-max table-auto text-left'>
                      <thead>
                        <tr>
                          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal leading-none opacity-70'
                            >
                              Day
                            </Typography>
                          </th>
                          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal leading-none opacity-70'
                            >
                              Time
                            </Typography>
                          </th>
                          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal leading-none opacity-70'
                            >
                              Duration
                            </Typography>
                          </th>
                          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal leading-none opacity-70'
                            >
                              Location
                            </Typography>
                          </th>
                          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal leading-none opacity-70'
                            >
                              Action
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules.map((s, i) => (
                          <tr key={i} className='even:bg-blue-gray-50/50'>
                            <td className='p-4'>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {s[0]}
                              </Typography>
                            </td>
                            <td className='p-4'>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {s[1]}
                              </Typography>
                            </td>
                            <td className='p-4'>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {s[2]} to {s[3]}
                              </Typography>
                            </td>
                            <td className='p-4'>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {s[4]}
                              </Typography>
                            </td>
                            <td className='p-4'>
                              <AiOutlineDelete
                                onClick={() => removeSchedule(i)}
                                className='text-red-500 text-3xl cursor-pointer'
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
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
                  onClick={handleOpen6}
                  className='mr-1'
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-4'>
          <Select
            label='Select Day'
            name='selectedDay'
            value={selectedDay}
            onChange={(value) => setSelectedDay(value)}
          >
            {weekdays.map((w, i) => (
              <Option key={i} value={w}>
                {w}
              </Option>
            ))}
          </Select>
          <Input
            label='Enter Location'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Input
            label='Enter Time'
            type='time'
            value={enterTime}
            onChange={(e) => setEnterTime(e.target.value)}
          />
          <Input
            label='Exit Time'
            type='time'
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
          />
          <Select
            label='Select Time'
            name='select time'
            value={time}
            onChange={(value) => setTime(value)}
          >
            <Option value='Morning'>Morning</Option>
            <Option value='Evening'>Evening</Option>
            <Option value='Night'>Night</Option>
          </Select>
        </div>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-blue uppercase'>
            Click on add to save a schedule
          </p>
          <Button
            disabled={
              selectedDay === '' ||
              enterTime === '' ||
              exitTime === '' ||
              time === ''
            }
            size='sm'
            className='bg-blue w-fit'
            onClick={handleAddSchedule}
          >
            Add
          </Button>
        </div>
        <p className='font-semibold text-red-500 uppercase'>
          *Double check your given information before submit!
        </p>
        <Button
          disabled={
            selectedDoctorImg === '' ||
            gender === '' ||
            langs.length === 0 ||
            parentSpecialityId === ''
          }
          className='bg-blue flex items-center w-fit gap-1'
          onClick={handleAddDoctor}
        >
          Submit {loader && <Spinner className='h-4 w-4' color='white' />}
        </Button>
      </div>
    </div>
  )
}
