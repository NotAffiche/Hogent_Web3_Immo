import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButtonComponent';

import noImageAvailable from '../assets/images/no_img.jpg';

const PagePanden = () => {
  const navigate = useNavigate();
  const [pands, setPanden] = useState([]);

  useEffect(() => {
    fetchPanden();
  }, []);

  const fetchPanden = async () => {
    try {
      const response = await fetch('http://localhost:5000/panden');
      const data = await response.json();
      setPanden(data);
    } catch (error) {
      console.error('Error fetching pands:', error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (!description) {
      return "No description available";
    }
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {pands.map((pand) => (
        <div key={pand.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100" onClick={() => navigate(`/panden/${pand.id}`)}>
          <div className="relative h-full">
            <div className="w-full">
              {pand.afbeeldingen.length > 0 ? (
                <img src={pand.afbeeldingen[0].url} alt="Pand" className="max-w-full h-80 object-cover mb-2" />
              ) : (
                <img src={noImageAvailable} alt="Not Available" className="max-w-full h-80 object-cover mb-2" />
              )}
              <div className="px-6 py-4">
                <h2 className="text-lg font-bold mb-2">{pand.straat} {pand.huisNr}</h2>
                <p className="mb-10">{truncateDescription(pand.beschrijving, 35)}</p>
              </div>
            </div>
            <span onClick={(e) => e.stopPropagation()} className="absolute bottom-4 left-0 right-0 flex justify-center">
              <FavoriteButton className="mt-2" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PagePanden;