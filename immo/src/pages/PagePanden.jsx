import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButtonComponent';

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

  return (
    <div>
      <h1>Panden</h1>
      {pands.map((pand) => (
        <div key={pand.id}>
          <div onClick={() => navigate(`/panden/${pand.id}`)}>
          <h2>{pand.straat} {pand.huisNr}</h2>
          {pand.afbeeldingen.length > 0 && (
          <img src={pand.afbeeldingen[0].url} alt="First Image" />
          )}
          <p>{pand.beschrijving}</p>
          </div>
          <FavoriteButton/>
        </div>
      ))}
    </div>
  );
};

export default PagePanden;