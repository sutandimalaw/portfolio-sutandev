import { assets, serviceData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const generateSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

const Services = () => {
  return (
    <div id='services' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg font-ovo'>
            What I offer
        </h4>
        <h2 className='text-center text-5xl font-ovo'>
            My Services
        </h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'>
            I'm a fronted developer from Indonesia, with 8 years of experience in multiple companies like microsot, Tesla and Apple
        </p>
        <div className='grid grid-cols-auto gap-6 my-10'>
            {serviceData.map(({icon, title, description }, index) => { // Removed 'link' from destructuring
                const slug = generateSlug(title);
                return (
                    <div key={index} className='border border-gray-400 rounded-lg px-8 py-12 group hover:shadow-black cursor-pointer hover:bg-violet-50
                        hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white' >
                        <Image src={icon} alt={title} className='w-10'/> {/* Added alt text */}
                        <h3 className='text-lg my-4 text-gray-700 dark:text-white'>{title}</h3>
                        <p className='text-sm text-gray-600 leading-5 dark:text-white'>
                            {description}
                        </p>
                        <Link href={`/services/${slug}`} className='flex items-center gap-2 text-sm mt-5 text-violet-600 group-hover:text-violet-800 dark:text-violet-400 dark:group-hover:text-violet-300'>
                            Read more <Image alt='read more arrow' src={assets.right_arrow} className='w-4'/>
                        </Link>
                    </div>
                );
            })}
        </div>  
    </div>
  )
}

export default Services
