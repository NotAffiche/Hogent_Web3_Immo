import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PagePandEdit = () => {
  const navigate = useNavigate();
  const [pand, setPand] = useState(null);
  const [typePanden, setTypePanden] = useState([]);
  const [afbeelding, setAfbeelding] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchPand();
  }, []);

  const fetchPand = async () => {
    try {
      const response = await fetch(`http://localhost:5000/panden/${id}`);
      const data = await response.json();
      setPand(data);
      const updatedImages = data.afbeeldingen.map((image) => ({ ...image, saved: true }));
      setPand((prevPand) => ({ ...prevPand, afbeeldingen: updatedImages }));
      setAfbeelding({ url: '', pandId: id });
    } catch (error) {
      console.error('Error fetching pand:', error);
    }
  };

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
      console.log(afbeelding);
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

  //INPUT CHANGE
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    let inputValue;

    if (type === 'checkbox') {
      inputValue = checked;
    } else if (name === 'oppervlakte') {
      inputValue = parseFloat(value);
    } else if (name === 'typePandId' || name === 'huisNr' || name === 'postCode' || name === 'prijs' || name === 'aantalKamers') {
      inputValue = parseInt(value);
    } else {
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
        <label className="block mb-2">Straat</label>
        <input
          type="text"
          name="straat"
          value={pand.straat}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        />
        <label className="block mb-2">Huis nummer</label>
        <input
          type="number"
          name="huisNr"
          value={pand.huisNr}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        />
        <label className="block mb-2">Bus?</label>
        <input
          type="text"
          name="bus"
          value={pand.bus}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        />
        <label className="block mb-2">Postcode</label>
        <input
          type="number"
          name="postCode"
          value={pand.postCode}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        />
        <label className="block mb-2">Gemeente</label>
        <input
          type="text"
          name="gemeente"
          value={pand.gemeente}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        />
        <label className="block mb-2">Prijs</label>
        <input
          type="number"
          name="prijs"
          value={pand.prijs}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        />
        <label className="block mb-2">Aantal kamers</label>
        <input
          type="number"
          name="aantalKamers"
          value={pand.aantalKamers}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        />
        <label className="block mb-2">Oppervlakte</label>
        <input
          type="text"
          name="oppervlakte"
          value={pand.oppervlakte}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        />
        <label className="block mb-2">Beschrijving</label>
        <textarea
          name="beschrijving"
          value={pand.beschrijving}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        ></textarea>
        <label className="block mb-2">
          Is verkocht of verhuurd?
          <input
            type="checkbox"
            name="isVerkochtVerhuurd"
            checked={pand.isVerkochtVerhuurd}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block mb-2">Type Pand</label>
        <select
          name="typePandId"
          value={pand.typePandId}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
        >
          {typePanden.map((typePand) => (
            <option key={typePand.id} value={typePand.id}>
              {typePand.naam}
            </option>
          ))}
        </select>
        <label className="block mb-2">Afbeeldingen</label>
        {pand.afbeeldingen.map((image, index) => (
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