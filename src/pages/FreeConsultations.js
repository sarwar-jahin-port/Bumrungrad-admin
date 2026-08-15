import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'

export default function FreeConsultations() {
  const [loader, setLoader] = useState(true)
  const [consultations, setConsultations] = useState([])

  useEffect(() => {
    fetch('https://api.discoverinternationalmedicalservice.com/api/get/free-consultations')
      .then((res) => res.json())
      .then((data) => {
        setConsultations(data.status === 200 ? data.data : [])
        setLoader(false)
      })
      .catch(() => setLoader(false))
  }, [])

  return (
    <div className="m-5 md:m-10">
      <p className="text-xl text-blue font-semibold">
        Free Consultation Requests: {consultations.length}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Leads submitted via the homepage 'Get Free Consultation' hero form.
      </p>

      {loader ? (
        <Loader />
      ) : consultations.length === 0 ? (
        <p className="mt-10 text-gray-500">No consultation requests yet.</p>
      ) : (
        <div className="mt-5 md:mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {consultations.map((c) => (
            <div key={c.id} className="shadow rounded p-4 flex flex-col gap-2">
              <p className="font-semibold">{c.patient_name}</p>
              <p className="text-sm text-gray-500">{c.whatsapp}</p>
              <p className="text-sm">{c.medical_concern}</p>
              <p className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
