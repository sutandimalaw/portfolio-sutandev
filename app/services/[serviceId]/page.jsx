import React from 'react';
import Image from 'next/image';
import { serviceData, assets } from '@/assets/assets'; // Assuming assets might be needed later

const generateSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

const ServiceDetailPage = ({ params }) => {
  const { serviceId } = params;
  const service = serviceData.find(s => generateSlug(s.title) === serviceId);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-10 text-center"> {/* Basic container for not found */}
        <h1 className="text-3xl font-bold mb-4 font-ovo dark:text-white">Service Not Found</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-ovo">
          The service you are looking for does not exist.
        </p>
        {/* Consider adding a Link back to the services page or homepage */}
      </div>
    );
  }

  return (
    <div className="w-full px-[12%] py-10 scroll-mt-20"> {/* Matches padding of other sections */}
      <div className="max-w-3xl mx-auto"> {/* Limits width for readability, centers content block */}
        <div className="flex flex-col items-center text-center mb-8"> {/* Center icon and title */}
          <Image src={service.icon} alt={service.title} width={80} height={80} className="mb-4 rounded-lg shadow-md" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 font-ovo text-gray-800 dark:text-white">{service.title}</h1>
        </div>
        {/* Using simple paragraph styling for description. Tailwind Typography 'prose' can be added if plugin is available */}
        <div className="font-ovo text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
          <p>{service.description}</p>
        </div>

        {/* Placeholder for more detailed content if available in serviceData or future enhancements */}
        {service.details && (
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-semibold font-ovo mb-6 text-gray-800 dark:text-white text-center">Further Details</h2>
            {/* This assumes service.details is an array of paragraphs or a single string. Adjust as needed. */}
            {Array.isArray(service.details) ? (
              service.details.map((detail, index) => (
                <p key={index} className="font-ovo text-gray-700 dark:text-gray-300 mb-4 text-left md:text-center">{detail}</p>
              ))
            ) : (
              <p className="font-ovo text-gray-700 dark:text-gray-300 text-left md:text-center">{service.details}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailPage;
