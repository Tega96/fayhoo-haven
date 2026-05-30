"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image'
import  { useState } from 'react'

const HeroSection = () => {
    const [formData, setFormData] = useState()
    const handleChange = () => {

    }
  return (
    <div className="relative top-0 left-0 h-screen w-full">
      <Image 
        src="/landing-splash.jpg"
        alt="Fayhoo Hero Image"
        fill
        className="absolute object-cover object-center w-full h-full"
      />
      <div className="absolute inset-0 bg-black/60 ">
        <div className="absolute top-1/3  px-12 sm:px-16 text-center ">
            <h1 className="font-bold text-4xl text-white">Start your journey to finding the perfect place to call home</h1>
            <p className='text-lg text-white mb-12'>Explore our wide range of rental properties tailored to fit your lifestyle and needs!</p>
            <div className='flex'>
                <Input 
                    type="text"
                    placeholder="Search by city, neighbourhood, or address"
                    value={formData}
                    onChange={handleChange}
                    className='bg-white rounded-l-lg rounded-r-none'
                />
                <Button 
                    className='bg-secondary-600 rounded-l-none -'
                >Search</Button>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default HeroSection;

