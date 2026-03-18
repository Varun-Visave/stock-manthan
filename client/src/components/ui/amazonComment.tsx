import React from 'react';

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg 
    className="w-5 h-5" 
    fill={filled ? '#fb923c' : '#d1d5db'} 
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

export interface ReviewCardProps {
  userName: string;
  rating: number;
  description: string;
}

export const AmazonReviewCard: React.FC<ReviewCardProps> = ({ userName, rating, description }) => {
  return (
    <div className="transition-transform duration-200 hover:scale-103 bg-white rounded-lg border-[1.5px] border-[#e1e1e1] p-4 max-w-2xl w-full h-full overflow-hidden
    ">
      {/* Profile and Name Section */}
      <div className="flex items-center gap-3 mb-2">
        
        <div className="flex flex-col items-start">
           <span className="font-bold text-gray-900">{userName}</span>
            {/* Stars */}
           <div className="flex gap-1 mb-1">
             {[...Array(5)].map((_, i) => (
               <StarIcon key={i} filled={i < Math.round(rating)} />
             ))}
           </div>
        </div>
      </div>

      

      {/* Review Description */}
      <p className="text-gray-700 leading-relaxed">
       {description.length > 220
  ? "\""+description.slice(0, 220) + "..."+"\""
  : "\""+description+"\""}
      </p>
    </div>
  );
};