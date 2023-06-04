import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import PandModifyFieldsComponent from '../components/PandModifyFieldsComponent';

const PagePandEdit = () => {
  const navigate = useNavigate();
  const [pand, setPand] = useState(null);
  const [typePanden, setTypePanden] = useState([]);
  const [regios, setRegios] = useState([]);
  const [previouslySavedRegios, setPreviouslySavedRegios] = useState([]);
  const [afbeelding, setAfbeelding] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchPand();
    fetchTypePanden();
    fetchRegios();
  }, []);

  const fetchPand = async () => {
    try {
      const response = await fetch(`http://localhost:5000/panden/${id}`);
      const data = await response.json();
      const { pandRegios, ...pandData } = data;
      setPand((prevPand) => ({ ...prevPand, ...pandData }));
      const updatedImages = data.afbeeldingen.map((image) => ({ ...image, saved: true }));
      setPreviouslySavedRegios(pandRegios);
      setPand((prevPand) => ({ ...prevPand, afbeeldingen: updatedImages, pandRegios: pandRegios }));
      setAfbeelding({ url: '', pandId: id });
    } catch (error) {
      console.error('Error fetching pand:', error);
    }
  };
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
      const response = await fetch('http://localhost:5000/panden', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pand),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Pand updated:', data);
        navigate(`/panden/${pand.id}`);
      } else {
        const errorMessages = data.map((error) => error.msg).join('\n');
        alert(`Error updating pand:\n${errorMessages}`);
      }
    } catch (error) {
      console.error('Error updating pand:', error);
    }
  };

  //pand DELETE
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/panden/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Pand deleted');
        navigate('/panden');
      } else {
        const data = await response.json();
        const errorMessages = data.map((error) => error.msg).join('\n');
        alert(`Error deleting pand:\n${errorMessages}`);
      }
    } catch (error) {
      console.error('Error deleting pand:', error);
    }
  };

  //afbeelding POST
  const handleImagePost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/afbeeldingen/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(afbeelding),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Afbeelding added');
        setPand((prevPand) => ({
          ...prevPand,
          afbeeldingen: [...prevPand.afbeeldingen, data],
        }));
        setAfbeelding({ url: '', pandId: id });
      } else {
        const errorMessages = data.map((error) => error.msg).join('\n');
        alert(`Error adding afbeelding:\n${errorMessages}`);
      }
    } catch (error) {
      console.error('Error adding afbeelding:', error);
    }
  };

  //pandRegio POST
  /*
  const handlePandRegioPost = async (pandId, regioId) => {
    try {
      const requestBody = {
        regioId: regioId,
        pandId: pandId,
      };
      const response = await fetch(`http://localhost:5000/pandregios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('PandRegio added');
        setPand((prevPand) => ({
          ...prevPand,
          pandRegios: [...prevPand.pandRegios, data],
        }));
        setPreviouslySavedRegios((prevRegios) => [...prevRegios, data]);
      } else {
        const errorMessages = data.map((error) => error.msg).join('\n');
        alert(`Error adding pandregio:\n${errorMessages}`);
      }
    } catch (error) {
      console.error('Error adding pandregio:', error);
    }
  };
  */



  //afbeelding DELETE
  const handleImageDelete = async (imgId) => {
    try {
      const response = await fetch(`http://localhost:5000/afbeeldingen/${imgId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Afbeelding deleted');
        setPand((prevPand) => ({
          ...prevPand,
          afbeeldingen: prevPand.afbeeldingen.filter((afbeelding) => afbeelding.id !== imgId),
        }));
      } else {
        const data = await response.json();
        const errorMessages = data.map((error) => error.msg).join('\n');
        alert(`Error deleting afbeelding:\n${errorMessages}`);
      }
    } catch (error) {
      console.error('Error deleting afbeelding:', error);
    }
  };

  //pandRegio DELETE
  const handlePandRegioDelete = async (pandRegioId) => {
    try {
      const response = await fetch(`http://localhost:5000/pandregios/${pandRegioId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Pandregio deleted');
        setPand((prevPand) => ({
          ...prevPand,
          pandRegios: prevPand.pandRegios.filter((pandRegio) => pandRegio.id !== pandRegioId),
        }));
        setPreviouslySavedRegios((prevRegios) =>
          prevRegios.filter((regio) => regio.id !== pandRegioId)
        );
      } else {
        console.error('Error deleting pandregio:', response.status);
      }
    } catch (error) {
      console.error('Error deleting pandregio:', error);
    }
  };

  //INPUT CHANGE
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
      //handlePandRegioPost(pand.id, parseInt(inputValue));
    }
    else {
      inputValue = value;
    }
    setPand((prevPand) => ({ ...prevPand, [name]: inputValue }));
    if (name === 'url') {
      console.log(`url: ${inputValue}; pandId: ${pand.id}`);
      setAfbeelding({ url: inputValue, pandId: pand.id });
    }
  };

  if (pand === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wijzig Pand</h1>
      <form onSubmit={handleFormSubmit}>
        <PandModifyFieldsComponent
          pand={pand}
          typePanden={typePanden}
          regios={regios}
          handleInputChange={handleInputChange} />
        <label className="block mb-2">Afbeeldingen</label>
        {pand.afbeeldingen.map((image) => (
          <div key={image.id} className="flex items-center mb-2">
            <input
              type="text"
              value={image.url}
              disabled={true}
              className="w-full border border-gray-300 px-2 py-1 rounded"
            />
            <button
              type="button"
              onClick={() => handleImageDelete(image.id)}
              className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex items-center mb-2">
          <input
            type="text"
            name="url"
            value={afbeelding.url}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-2 py-1 rounded"
          />
          <button
            type="button"
            onClick={handleImagePost}
            className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="block mb-2">
          <label className="block mb-2">Regio</label>
          {/*
          <select
            name="regioId"
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-2 py-1 rounded mb-4">
            <option value="" disabled selected>Select Regio</option>
            {regios.map((regio) => (
              <option key={regio.id} value={regio.id}>
                {regio.naam}
              </option>
            ))}
          </select>
          */} 
          <div>
            {previouslySavedRegios.map((pandRegio) => (
              <div key={pandRegio.id} className="flex items-center mb-2">
                <input
                  type="text"
                  value={pandRegio.regio.naam}
                  disabled={true}
                  className="w-full border border-gray-300 px-2 py-1 rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    handlePandRegioDelete(pandRegio.id);
                  }}
                  className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Save Changes
        </button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2">
          Delete
        </button>
      </form>
    </div>
  );
};

export default PagePandEdit;