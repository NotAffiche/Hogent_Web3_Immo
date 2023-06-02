import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PandModifyFieldsComponent from '../components/PandModifyFieldsComponent';

const PagePandCreate = () => {
    const navigate = useNavigate();
    const [typePanden, setTypePanden] = useState([]);
    const [pand, setPand] = useState({
        straat: '',
        huisNr: 1,
        bus: '',
        postCode: 1000,
        gemeente: '',
        prijs: 1,
        aantalKamers: 1,
        oppervlakte: 1.10,
        beschrijving: '',
        isVerkochtVerhuurd: false,
        typePandId: 1
      });

      useEffect(() => {
        fetchTypePanden();
      }, []);

      const fetchTypePanden = async () => {
        try {
          const response = await fetch('http://localhost:5000/typepanden');
          const data = await response.json();
          setTypePanden(data);
        } catch (error) {
          console.error('Error fetching typePanden:', error);
        }
      };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      handleInputChange(event);
      const response = await fetch('http://localhost:5000/panden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pand),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Pand created:', data);
        navigate(`/panden`);
      } else {
        const errorMessages = data.map((error) => error.msg).join('\n');
        alert(`Error creating pand:\n${errorMessages}`);
      }
    } catch (error) {
      console.error('Error creating pand:', error);
      alert(`Error creating pand:\n${error}`);
    }
  };

  
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    let inputValue;

    if (type === 'checkbox') {
      inputValue = checked;
    } else if (name === 'oppervlakte') {
      inputValue = parseFloat(value);
    } else if (name === 'typePandId' || name === 'huisNr' || name === 'postCode' || name === 'prijs' || name === 'aantalKamers') {
      inputValue = parseInt(value);
    }
    else {
      inputValue = value;
    }

    setPand((prevPand) => ({ ...prevPand, [name]: inputValue }));
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Maak Nieuw Pand</h1>
      <form onSubmit={handleFormSubmit}>
        <PandModifyFieldsComponent  
        pand={pand}
        typePanden={typePanden}
        handleInputChange={handleInputChange} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PagePandCreate;