import Faq from '@/components/faq/Faq'
import StillQuestion from '@/components/faq/StillQuestion'
import FaqBannerSection from '@/components/shared/FaqBannerSection'
import React from 'react'

export default function FaqPage() {
  return (
    <div>
        <FaqBannerSection title='FAQ' titleBelow='(Frequently Asked Questions)' />
        <Faq />
        <StillQuestion />
    </div>
  )
}
