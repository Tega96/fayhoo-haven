"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image'
import  { useState } from 'react'
import { motion } from 'framer-motion';

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
        className="object-cover object-center w-full h-full"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/60 ">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/3 transform -translate-y-1/2  text-center w-full"
        >
            <div className="max-w-4xl mx-auto px-16 sm:px-12">
                <h1 className="font-bold text-5xl mb-4 text-white">Start your journey to finding the perfect place to call home</h1>
                <p className='text-xl text-white mb-18'>Explore our wide range of rental properties tailored to fit your lifestyle and needs!</p>
                <div className='flex justify-center'>
                    <Input 
                        type="text"
                        placeholder="Search by city, neighbourhood, or address"
                        value={formData}
                        onChange={handleChange}
                        className='w-full max-w-lg bg-white rounded-none rounded-l-lg border-none h-12'
                    />
                    <Button 
                        onClick={() => {}}
                        className='bg-secondary-500 rounded-none text-white border-none h-12 px-5 rounded-r-xl hover:bg-secondary-600'
                    >Search</Button>
                </div>
            </div>
            
        </motion.div>
        
      </div>
    </div>
  )
}

export default HeroSection;

