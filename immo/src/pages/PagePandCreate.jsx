import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Create Pand</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Straat</label>
        <input
          type="text"
          name="straat"
          value={pand.straat}
          onChange={handleInputChange}
        />
        <label>Huis nummer</label>
        <input
          type="number"
          name="huisNr"
          value={pand.huisNr}
          onChange={handleInputChange}
        />
        <label>Bus?</label>
        <input
          type="text"
          name="bus"
          value={pand.bus}
          onChange={handleInputChange}
        />
        <label>Postcode</label>
        <input
          type="number"
          name="postCode"
          value={pand.postCode}
          onChange={handleInputChange}
        />
        <label>Gemeente</label>
        <input
          type="text"
          name="gemeente"
          value={pand.gemeente}
          onChange={handleInputChange}
        />
        <label>Prijs</label>
        <input
          type="number"
          name="prijs"
          value={pand.prijs}
          onChange={handleInputChange}
        />
        <label>Aantal kamers</label>
        <input
          type="number"
          name="aantalKamers"
          value={pand.aantalKamers}
          onChange={handleInputChange}
        />
        <label>Oppervlakte</label>
        <input
          type="text"
          name="oppervlakte"
          value={pand.oppervlakte}
          onChange={handleInputChange}
        />
        <label>Beschrijving</label>
        <input
          type="text"
          name="beschrijving"
          value={pand.beschrijving}
          onChange={handleInputChange}
        />
        <label>Is verkocht of verhuurd?</label>
        <input
          type="checkbox"
          name="isVerkochtVerhuurd"
          value={pand.isVerkochtVerhuurd}
          onChange={handleInputChange}
        />
        <label>Type Pand</label>
        <select name="typePandId" value={pand.typePandId} onChange={handleInputChange}>
            {typePanden.map((typePand) => (
            <option key={typePand.id} value={typePand.id}>
                {typePand.naam}
            </option>
            ))}
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PagePandCreate;