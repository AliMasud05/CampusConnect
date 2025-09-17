import HowToUse from '@/components/resources/details/HowToUse'
import ResourceDetailsSection from '@/components/resources/details/ResourceDetailsSection'
import WhatsIncludedSection from '@/components/resources/details/WhatsIncludedSection'
import BannerSectionTwo from '@/components/shared/BannerSectionTwo'
import React from 'react'

export default function ResourcesDetailsPage() {
  return (
    <div>
        <BannerSectionTwo title='Resource Details' subtitle='' />
        <ResourceDetailsSection />
        <WhatsIncludedSection />
        <HowToUse />
    </div>
  )
}
