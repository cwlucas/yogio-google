
import React from 'react';
import { YogaPose } from '../types';

interface YogaPoseDisplayProps {
  pose: YogaPose;
}

const YogaPoseDisplay: React.FC<YogaPoseDisplayProps> = ({ pose }) => {
  const imageUrl = `https://picsum.photos/seed/${pose.imageName}/400/600`;

  return (
    <div className="mt-6 p-6 bg-slate-700/50 backdrop-blur-md rounded-lg shadow-lg w-full max-w-sm mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold text-purple-300 mb-4">{pose.displayName}</h2>
      <img
        src={imageUrl}
        alt={`Image of ${pose.displayName}`}
        className="w-full h-auto max-h-[30rem] object-contain rounded-md shadow-xl border-4 border-slate-600"
      />
    </div>
  );
};

export default YogaPoseDisplay;
