import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import { toast } from 'react-toastify'

const EMPTY_FORM = { category: '', name: '', reference_url: '' }

export default function InsuranceProviders() {
  const [loader, setLoader] = useState(true)
  const [providers, setProviders] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const [activeId, setActiveId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [logo, setLogo] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchProviders = () => {
    setLoader(true)
    fetch('http://127.0.0.1:8000/api/get/insurance-providers')
      .then((res) => res.json())
      .then((data) => {
        setProviders(data.status === 200 ? data.data : [])
        setLoader(false)
      })
      .catch(() => setLoader(false))
  }

  useEffect(() => {
    fetchProviders()
  }, [])

  const openAdd = () => {
    setActiveId(null)
    setForm(EMPTY_FORM)
    setLogo('')
    handleOpen()
  }

  const openEdit = (provider) => {
    setActiveId(provider.id)
    setForm({
      category: provider.category || '',
      name: provider.name || '',
      reference_url: provider.reference_url || '',
    })
    setLogo('')
    handleOpen()
  }

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSave = async () => {
    setSaving(true)
    const body = new FormData()
    body.append('category', form.category)
    body.append('name', form.name)
    body.append('reference_url', form.reference_url)
    if (logo !== '') {
      body.append('logo', logo)
    }

    const url = activeId
      ? `http://127.0.0.1:8000/api/update/insurance-provider/${activeId}`
      : 'http://127.0.0.1:8000/api/create/insurance-provider'

    try {
      const response = await fetch(url, { method: 'POST', body })
      const data = await response.json()
      setSaving(false)
      if (data.status === 200) {
        toast.success(activeId ? 'Provider updated.' : 'Provider added.')
        setOpen(false)
        fetchProviders()
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      setSaving(false)
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleDelete = (provider) => {
    const confirmed = window.confirm(`Delete "${provider.name}"?`)
    if (!confirmed) return
    fetch(`http://127.0.0.1:8000/api/delete/insurance-provider/${provider.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success('Provider deleted.')
          setProviders((prev) => prev.filter((p) => p.id !== provider.id))
        }
      })
  }

  const grouped = providers.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || []
    acc[p.category].push(p)
    return acc
  }, {})

  return (
    <div className="m-5 md:m-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl text-blue font-semibold">
            Accepted Insurance Framework Matrix
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Manage the insurance providers shown on the public "Insurance We
            Accept" page, grouped by category.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-3 py-1.5 shadow rounded bg-blue text-white"
        >
          <AiOutlinePlus className="text-lg" />
          Add Provider
        </button>
      </div>

      {loader ? (
        <p className="mt-10">Loading...</p>
      ) : Object.keys(grouped).length === 0 ? (
        <p className="mt-10 text-gray-500">No providers added yet.</p>
      ) : (
        <div className="mt-5 md:mt-10 flex flex-col gap-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h5 className="text-lg font-semibold text-blue mb-3">{category}</h5>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((provider) => (
                  <div key={provider.id} className="shadow rounded p-4 flex flex-col gap-2.5">
                    {provider.logo && (
                      <img src={provider.logo} alt={provider.name} className="h-16 object-contain" />
                    )}
                    <p className="font-semibold">{provider.name}</p>
                    {provider.reference_url && (
                      <a
                        href={provider.reference_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue underline truncate"
                      >
                        Reference link
                      </a>
                    )}
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => openEdit(provider)}
                        className="flex items-center gap-1.5 px-2.5 py-1 shadow rounded bg-blue text-white text-sm"
                      >
                        <AiOutlineEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(provider)}
                        className="flex items-center gap-1.5 px-2.5 py-1 shadow rounded bg-red-500 text-white text-sm"
                      >
                        <AiOutlineDelete /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>{activeId ? 'Edit Provider' : 'Add Provider'}</DialogHeader>
        <DialogBody className="grid gap-4">
          <Input
            label="Category (e.g. Thailand Company Direct Billing Contracts)"
            value={form.category}
            onChange={handleChange('category')}
          />
          <Input label="Provider Name" value={form.name} onChange={handleChange('name')} />
          <Input label="Reference URL (optional)" value={form.reference_url} onChange={handleChange('reference_url')} />
          <div>
            <label className="text-sm font-semibold">Logo (optional)</label>
            <input type="file" className="block mt-1" onChange={(e) => setLogo(e.target.files[0])} />
          </div>
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
