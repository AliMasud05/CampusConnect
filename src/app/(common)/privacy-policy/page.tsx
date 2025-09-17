import PrivacyPolicySection from '@/components/privacyPolicy/PrivacyPolicySection'
import BannerSectionTwo from '@/components/shared/BannerSectionTwo'
import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div>
        <BannerSectionTwo title='Your Privacy Matters' subtitle='' />
        <PrivacyPolicySection />
    </div>
  )
}
