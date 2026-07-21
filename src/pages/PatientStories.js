import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
}

export default function PatientStories() {
  const [loader, setLoader] = useState(true)
  const [stories, setStories] = useState([])

  const fetchStories = () => {
    setLoader(true)
    fetch('http://127.0.0.1:8000/api/get/patient-stories/admin')
      .then((res) => res.json())
      .then((data) => {
        setStories(data.status === 200 ? data.data : [])
        setLoader(false)
      })
      .catch(() => setLoader(false))
  }

  useEffect(() => {
    fetchStories()
  }, [])

  const handleApprove = (story) => {
    fetch(`http://127.0.0.1:8000/api/update/patient-story/${story.id}`, {
      method: 'POST',
      body: (() => {
        const body = new FormData()
        body.append('patient_name', story.patient_name)
        body.append('country', story.country || '')
        body.append('rating', story.rating || '')
        body.append('story', story.story)
        body.append('status', 'approved')
        return body
      })(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success('Story approved.')
          fetchStories()
        }
      })
  }

  const handleReject = (story) => {
    const confirmed = window.confirm(
      `Delete/reject the story submitted by ${story.patient_name}?`,
    )
    if (!confirmed) return
    fetch(`http://127.0.0.1:8000/api/delete/patient-story/${story.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success('Story removed.')
          setStories((prev) => prev.filter((s) => s.id !== story.id))
        }
      })
  }

  return (
    <div className="m-5 md:m-10">
      <p className="text-xl text-blue font-semibold">Patient Stories Moderation</p>
      <p className="mt-2 text-sm text-gray-600">
        Review patient-submitted stories. Approve to make them public on the
        Patient Stories page, or reject to remove them.
      </p>

      {loader ? (
        <Loader />
      ) : stories.length === 0 ? (
        <p className="mt-10 text-gray-500">No stories submitted yet.</p>
      ) : (
        <div className="mt-5 md:mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <div key={story.id} className="shadow rounded p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{story.patient_name}</p>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[story.status] || ''}`}
                >
                  {story.status}
                </span>
              </div>
              {story.country && <p className="text-sm text-gray-500">{story.country}</p>}
              {story.rating && <p className="text-sm">Rating: {story.rating} / 5</p>}
              <p className="text-sm text-justify">{story.story}</p>
              <div className="flex justify-between mt-2">
                {story.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(story)}
                    className="px-2.5 py-1 shadow rounded bg-green text-white text-sm"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleReject(story)}
                  className="px-2.5 py-1 shadow rounded bg-red-500 text-white text-sm ml-auto"
                >
                  Reject / Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
