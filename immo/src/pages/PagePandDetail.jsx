import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import noImageAvailable from '../assets/images/no_img.jpg';

//carousel
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pand</h1>
      {pand ? (
        <div>
          {pand.afbeeldingen.length > 0 ? (
            <Carousel showStatus={true} showThumbs={false} infiniteLoop>
              {pand.afbeeldingen.map((i) => (
                <div key={i.id}>
                  <img src={i.url} alt="Pand" className="h-80 object-cover rounded" />
                </div>
              ))}
            </Carousel>
          ) : (
            <img src={noImageAvailable} alt="Not Available" className="h-60 object-cover rounded" />
          )}
          <div>
            <p><b>Adres: </b>{pand.straat} {pand.huisNr} {pand.bus || ''}</p>
            <p><b>Type pand: </b>{pand.typePand.naam}</p>
            <p><b>Postcode/Gemeente: </b>{pand.postCode} {pand.gemeente}</p>
            <p><b>Prijs: </b>€ {pand.prijs.toLocaleString("nl-BE", { minimumFractionDigits: 2 })}</p>
            <p><b>Aantal kamers: </b>{pand.aantalKamers}</p>
            <p><b>Oppervlakte: </b>{pand.oppervlakte}m²</p>
            <p><b>Beschrijving: </b>{pand.beschrijving}</p>
            <p><b>Status: </b>{pand.isVerkochtVerhuurd ? 'Niet beschikbaar' : 'Beschikbaar'}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PagePandDetail;