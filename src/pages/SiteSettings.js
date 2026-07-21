import { Button, Input, Textarea } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const EMPTY = {
  breaking_news_ticker: '',
  hero_stat_cases_managed: '',
  stat_visas_approved: '',
  stat_complex_cases_coordinated: '',
  footer_address: '',
  footer_facebook_url: '',
  footer_youtube_url: '',
  footer_whatsapp_url: '',
}

export default function SiteSettings() {
  const [loader, setLoader] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get/site-settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setForm((prev) => ({ ...prev, ...data.data }))
        }
        setLoader(false)
      })
      .catch(() => setLoader(false))
  }, [])

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSave = async () => {
    setSaving(true)
    const body = new FormData()
    Object.keys(form).forEach((key) => body.append(key, form[key]))

    try {
      const response = await fetch('http://127.0.0.1:8000/api/update/site-settings', {
        method: 'POST',
        body,
      })
      const data = await response.json()
      setSaving(false)
      if (data.status === 200) {
        toast.success('Site settings saved.')
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      setSaving(false)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="m-5 md:m-10 max-w-2xl">
      <p className="text-xl text-blue font-semibold">Homepage Site Settings</p>
      <p className="mt-2 text-sm text-gray-600">
        These values drive the breaking-news ticker, the animated stat
        counters, and the footer address/social links on the public site.
      </p>

      {loader ? (
        <p className="mt-10">Loading...</p>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          <Textarea
            label="Breaking News Ticker Text"
            value={form.breaking_news_ticker}
            onChange={handleChange('breaking_news_ticker')}
          />
          <Input
            label='Hero Stat (e.g. "10,000+ Cases Managed")'
            value={form.hero_stat_cases_managed}
            onChange={handleChange('hero_stat_cases_managed')}
          />
          <Input
            label='Successful Medical Visas Approved (e.g. "5,000+")'
            value={form.stat_visas_approved}
            onChange={handleChange('stat_visas_approved')}
          />
          <Input
            label='Successful Complex Clinical Events Coordinated (e.g. "1,200+")'
            value={form.stat_complex_cases_coordinated}
            onChange={handleChange('stat_complex_cases_coordinated')}
          />
          <hr className="border-gray-200" />
          <p className="font-semibold text-blue">Footer</p>
          <Textarea
            label="Office Address (footer)"
            value={form.footer_address}
            onChange={handleChange('footer_address')}
          />
          <Input
            label="Facebook URL"
            value={form.footer_facebook_url}
            onChange={handleChange('footer_facebook_url')}
          />
          <Input
            label="YouTube URL"
            value={form.footer_youtube_url}
            onChange={handleChange('footer_youtube_url')}
          />
          <Input
            label="WhatsApp URL"
            value={form.footer_whatsapp_url}
            onChange={handleChange('footer_whatsapp_url')}
          />
          <Button className="bg-blue w-fit" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      )}
    </div>
  )
}
