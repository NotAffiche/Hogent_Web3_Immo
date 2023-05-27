import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PagePandDetail = ({ match }) => {
  const [pand, setPand] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const responsePand = await fetch(`http://localhost:5000/panden/${id}`);
      const dataPand = await responsePand.json();
      setPand(dataPand);
    } catch (error) {
      console.error('Error fetching pand:', error);
    }
  };

  return (
    <div>
        <h1>Pand</h1>
      {pand ? (
        <div>
          {pand.afbeeldingen.map((i) => (
          <div key={i.id}>
            <img src={i.url}></img>
          </div>
          ))}
          <p><b>Adres: </b>{pand.straat} {pand.huisNr} {pand.bus ? pand.bus : ''}</p>
          <p><b>Postcode/Gemeente: </b>{pand.postCode} {pand.gemeente}</p>
          <p><b>Prijs: </b>€{pand.prijs}</p>
          <p><b>Aantal kamers: </b>{pand.aantalKamers}</p>
          <p><b>Oppervlakte: </b>{pand.oppervlakte}m²</p>
          <p><b>Beschrijving: </b>{pand.beschrijving}</p>
          <p><b>Status: </b>{pand.isVerkochtVerhuurd ? 'Niet beschikbaar' : 'Beschikbaar'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PagePandDetail;