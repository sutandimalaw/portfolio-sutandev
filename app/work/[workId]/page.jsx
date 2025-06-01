import React from 'react';
import { workData } from '@/assets/assets'; // Import workData
import Image from 'next/image'; // To display the bgImage

// Utility function to generate slugs (can be moved to a shared utils file later)
const generateSlug = (title) => {
  if (!title) return '';
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

const WorkDetailPage = ({ params }) => {
  const { workId } = params;
  const workItem = workData.find(item => generateSlug(item.title) === workId);

  if (!workItem) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4 font-ovo dark:text-white">Work Item Not Found</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-ovo">
          The work item you are looking for does not exist.
        </p>
        {/* Consider adding a Link back to the main work/portfolio page */}
      </div>
    );
  }

  return (
    <div className="w-full px-[5%] sm:px-[12%] py-10 scroll-mt-20"> {/* Consistent padding */}
      <div className="max-w-4xl mx-auto"> {/* Max width for content */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-ovo text-center text-gray-800 dark:text-white">
          {workItem.title}
        </h1>
        <div className="mb-8 relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
          <Image
            src={workItem.bgImage}
            alt={workItem.title}
            layout="fill"
            objectFit="cover" // Or "contain" depending on desired effect
            priority // Mark as priority if it's LCP
          />
        </div>
        {/* Using simple paragraph styling. Tailwind Typography 'prose' can be added if plugin is available */}
        <div className="font-ovo text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
          <p>{workItem.description}</p>
        </div>

        {/* Placeholder for more detailed content if available in workData or future enhancements */}
        {/* For example, if workItem has a 'details' array or object:
        {workItem.details && (
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-semibold font-ovo mb-6 text-gray-800 dark:text-white text-center">Project Details</h2>
            <ul className="list-disc list-inside text-left max-w-md mx-auto font-ovo text-gray-700 dark:text-gray-300">
              {/* Example: iterate if details is an array of strings * /}
              {Array.isArray(workItem.details) && workItem.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
              {/* Example: if details is an object * /}
              {typeof workItem.details === 'object' && !Array.isArray(workItem.details) && Object.entries(workItem.details).map(([key, value]) => (
                <li key={key}><span className="font-semibold">{key.replace(/_/g, ' ')}:</span> {String(value)}</li>
              ))}
            </ul>
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default WorkDetailPage;
