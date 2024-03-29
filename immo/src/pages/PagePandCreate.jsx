import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PandModifyFieldsComponent from '../components/PandModifyFieldsComponent';

const PagePandCreate = () => {
  const navigate = useNavigate();
  const [typePanden, setTypePanden] = useState([]);
  const [regios, setRegios] = useState([]);
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
  const [urls, setUrls] = useState(['']);

  useEffect(() => {
    fetchTypePanden();
    fetchRegios();
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

  const fetchRegios = async () => {
    try {
      const response = await fetch('http://localhost:5000/regios');
      const data = await response.json();
      setRegios(data);
    } catch (error) {
      console.error('Error fetching regios:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      handleInputChange(event);
      const { regioId, ...pandData } = pand;
  
      // Send the modified pandData in the request body
      const response = await fetch('http://localhost:5000/panden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pandData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Pand created:', data);
  
        // Create PandRegio records
        let selectedRegioIds = regioId;
        if (!Array.isArray(selectedRegioIds)) {
          selectedRegioIds = [selectedRegioIds];
        }
        const selectedRegiosIdsIntArr = selectedRegioIds.map((str) => parseInt(str));
        await Promise.allSettled(
          selectedRegiosIdsIntArr.map(async (regioId) => {
            const response = await fetch('http://localhost:5000/pandregios', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ regioId, pandId: data.id }),
            });
            const pandRegioData = await response.json();
            console.log('PandRegio created:', pandRegioData);
          })
        );
  
        // Create Afbeelding records
        const nonEmptyUrls = urls.filter((url) => url !== '');
        await Promise.all(
          nonEmptyUrls.map(async (url) => {
            const response = await fetch('http://localhost:5000/afbeeldingen', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url, pandId: data.id }),
            });
            const imageData = await response.json();
            console.log('Image created:', imageData);
          })
        );
  
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
      if (/^\d*\.?\d*$/.test(value) || value === '.') {
        inputValue = value === '' ? '' : parseFloat(value);
      } else {
        return;
      }
    } else if (name === 'typePandId' || name === 'huisNr' || name === 'postCode' || name === 'prijs' || name === 'aantalKamers') {
      inputValue = parseInt(value);
    }
    else if (name === 'regioId') {
      const options = event.target.options;
      inputValue = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
        console.log(inputValue);
    }
    else {
      inputValue = value;
    }

    setPand((prevPand) => ({ ...prevPand, [name]: inputValue }));
  };

  const handleInputChangeURL = (event, index) => {
    const { value } = event.target;

    setUrls((prevUrls) => {
      const updatedUrls = [...prevUrls];
      updatedUrls[index] = value;

      // remove if null
      if (value === '' && updatedUrls.length > 1) {
        updatedUrls.splice(index, 1);
      }

      // new empty input
      const lastValue = updatedUrls[updatedUrls.length - 1];
      if (lastValue !== '') {
        updatedUrls.push('');
      }

      return updatedUrls;
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Maak Nieuw Pand</h1>
      <form onSubmit={handleFormSubmit}>
        <PandModifyFieldsComponent
          pand={pand}
          typePanden={typePanden}
          regios={regios}
          handleInputChange={handleInputChange}
        />
        <div className="mb-2">
          <label className="block mb-2">Afbeeldingen</label>
          {urls.map((url, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`url-${index}`}
                value={url}
                onChange={(event) => handleInputChangeURL(event, index)}
                className="w-full border border-gray-300 px-2 py-1 rounded"
              />
            </div>
          ))}
          <label className="block mb-2">Regio</label>
            <select
              name="regioId"
              onChange={handleInputChange}
              multiple
              className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
            >
              {regios.map((regio) => (
                <option key={regio.id} value={regio.id}>
                  {regio.naam}
                </option>
              ))}
            </select>
        </div>
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