import {
  Button,
  Input,
  Textarea,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import { toast } from 'react-toastify'

const EMPTY_HUB = {
  city: '',
  office_name: '',
  building: '',
  floor_map: '',
  address: '',
  phone1: '',
  phone2: '',
  whatsapp_hotline: '',
  operational_hours: '',
  map_embed_url: '',
}

export default function AirAmbulanceHubs() {
  const [loader, setLoader] = useState(true)
  const [hubs, setHubs] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const [activeHubId, setActiveHubId] = useState(null)
  const [form, setForm] = useState(EMPTY_HUB)
  const [saving, setSaving] = useState(false)

  const fetchHubs = () => {
    setLoader(true)
    fetch('https://api.discoverinternationalmedicalservice.com/api/get/air/ambulance/hubs')
      .then((res) => res.json())
      .then((data) => {
        setHubs(data.status === 200 ? data.data : [])
        setLoader(false)
      })
      .catch(() => setLoader(false))
  }

  useEffect(() => {
    fetchHubs()
  }, [])

  const openEditor = (hub) => {
    setActiveHubId(hub?.id ?? null)
    setForm(
      hub
        ? {
            city: hub.city || '',
            office_name: hub.office_name || '',
            building: hub.building || '',
            floor_map: hub.floor_map || '',
            address: hub.address || '',
            phone1: hub.phone1 || '',
            phone2: hub.phone2 || '',
            whatsapp_hotline: hub.whatsapp_hotline || '',
            operational_hours: hub.operational_hours || '',
            map_embed_url: hub.map_embed_url || '',
          }
        : EMPTY_HUB,
    )
    handleOpen()
  }

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSave = async () => {
    if (!form.city.trim()) {
      toast.error('Hub / City name is required.')
      return
    }

    setSaving(true)
    const body = new FormData()
    Object.keys(form).forEach((key) => body.append(key, form[key]))

    const url = activeHubId
      ? `https://api.discoverinternationalmedicalservice.com/api/update/air/ambulance/hub/${activeHubId}`
      : 'https://api.discoverinternationalmedicalservice.com/api/create/air/ambulance/hub'

    try {
      const response = await fetch(url, { method: 'POST', body })
      const data = await response.json()
      setSaving(false)
      if (data.status === 200) {
        toast.success(`${form.city} hub saved successfully.`)
        setOpen(false)
        fetchHubs()
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      setSaving(false)
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleDelete = async (hub) => {
    if (!window.confirm(`Delete the ${hub.city} hub? This cannot be undone.`)) {
      return
    }
    try {
      const response = await fetch(
        `https://api.discoverinternationalmedicalservice.com/api/delete/air/ambulance/hub/${hub.id}`,
      )
      const data = await response.json()
      if (data.status === 200) {
        toast.success(`${hub.city} hub deleted.`)
        fetchHubs()
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="m-5 md:m-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xl text-blue font-semibold">Air Ambulance Emergency Hubs</p>
          <p className="mt-2 text-sm text-gray-600">
            Manage the address, contact numbers, hours, and map for each
            emergency hub shown on the public Air Ambulance landing page. Add
            as many hubs as you need.
          </p>
        </div>
        <button
          onClick={() => openEditor(null)}
          className="flex items-center gap-2 px-3 py-1.5 shadow rounded bg-blue text-white shrink-0"
        >
          <AiOutlinePlus className="text-lg" />
          Add Hub
        </button>
      </div>

      {loader ? (
        <p className="mt-10">Loading...</p>
      ) : hubs.length === 0 ? (
        <p className="mt-10 text-sm text-gray-500">
          No hubs configured yet. Click "Add Hub" to create one.
        </p>
      ) : (
        <div className="mt-5 md:mt-10 grid gap-5 md:grid-cols-2">
          {hubs.map((hub) => (
            <div key={hub.id} className="shadow-xl rounded p-5">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-blue">
                  {hub.city} Hub
                </h5>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditor(hub)}
                    className="flex items-center gap-2 px-3 py-1.5 shadow rounded bg-blue text-white"
                  >
                    <AiOutlineEdit className="text-lg" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hub)}
                    className="flex items-center gap-2 px-3 py-1.5 shadow rounded bg-red text-white"
                  >
                    <AiOutlineDelete className="text-lg" />
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-4 text-sm space-y-1.5">
                <p>
                  <span className="font-semibold">Office: </span>
                  {hub.office_name || '-'}
                </p>
                <p>
                  <span className="font-semibold">Address: </span>
                  {[hub.building, hub.floor_map, hub.address]
                    .filter(Boolean)
                    .join(', ') || '-'}
                </p>
                <p>
                  <span className="font-semibold">Phone: </span>
                  {[hub.phone1, hub.phone2].filter(Boolean).join(' / ') || '-'}
                </p>
                <p>
                  <span className="font-semibold">WhatsApp: </span>
                  {hub.whatsapp_hotline || '-'}
                </p>
                <p>
                  <span className="font-semibold">Hours: </span>
                  {hub.operational_hours || '-'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>{activeHubId ? `${form.city} Hub Details` : 'New Hub'}</DialogHeader>
        <DialogBody className="max-h-[70vh] overflow-y-auto grid gap-4">
          <Input label="Hub / City Name" value={form.city} onChange={handleChange('city')} />
          <Input label="Office Name" value={form.office_name} onChange={handleChange('office_name')} />
          <Input label="Building" value={form.building} onChange={handleChange('building')} />
          <Input label="Floor" value={form.floor_map} onChange={handleChange('floor_map')} />
          <Textarea label="Street Address / City" value={form.address} onChange={handleChange('address')} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Phone 1" value={form.phone1} onChange={handleChange('phone1')} />
            <Input label="Phone 2" value={form.phone2} onChange={handleChange('phone2')} />
          </div>
          <Input label="WhatsApp Hotline" value={form.whatsapp_hotline} onChange={handleChange('whatsapp_hotline')} />
          <Textarea label="Operational Hours" value={form.operational_hours} onChange={handleChange('operational_hours')} />
          <Textarea label="Google Maps Embed URL" value={form.map_embed_url} onChange={handleChange('map_embed_url')} />
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="black" onClick={handleOpen} className="mr-4">
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
