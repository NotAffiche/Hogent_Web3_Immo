import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButtonComponent';

import noImageAvailable from '../assets/images/no_img.jpg';
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/favorites/slice';

const PagePanden = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [panden, setPanden] = useState([]);

  const [filterTypePanden, setFilterTypePanden] = useState([]);
  const [filterRegios, setFilterRegios] = useState([]);

  const [activeFilterTypePanden, setActiveFilterTypePanden] = useState([]);
  const [activeFilterRegios, setActiveFilterRegios] = useState([]);

  const [filters, setFilters] = useState({
    postCode: '',
    gemeente: '',
    minPrijs: '',
    maxPrijs: '',
    minAantalKamers: '',
    maxAantalKamers: '',
    minOppervlakte: '',
    maxOppervlakte: '',
    isVerkochtVerhuurd: '',
    showFavoritesOnly: false,
  });

  useEffect(() => {
    fetchPanden();
    fetchTypePanden();
    fetchRegios();
  }, [filters]);

  const fetchPanden = async () => {
    try {
      const response = await fetch(`http://localhost:5000/panden`);
      const data = await response.json();
      setPanden(data);
    } catch (error) {
      console.error('Error fetching pands:', error);
    }
  };

  const fetchTypePanden = async () => {
    try {
      const response = await fetch(`http://localhost:5000/typepanden`);
      const data = await response.json();
      setFilterTypePanden(data);
    } catch (error) {
      console.error('Error fetching typePanden:', error);
    }
  };

  const fetchRegios = async () => {
    try {
      const response = await fetch(`http://localhost:5000/regios`);
      const data = await response.json();
      setFilterRegios(data);
    } catch (error) {
      console.error('Error fetching pandRegios:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: inputValue }));
  };

  const truncateDescription = (description, maxLength) => {
    if (!description) {
      return 'Geen beschrijving';
    }
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  const filteredPands = panden.filter((pand) => {
    const {
      postCode,
      gemeente,
      minPrijs,
      maxPrijs,
      minAantalKamers,
      maxAantalKamers,
      minOppervlakte,
      maxOppervlakte,
      isVerkochtVerhuurd,
      showFavoritesOnly
    } = filters;

    if (postCode && parseInt(pand.postCode) !== parseInt(postCode)) {
      return false;
    }

    if (gemeente && pand.gemeente !== gemeente) {
      return false;
    }

    if (minPrijs && parseInt(pand.prijs) < parseInt(minPrijs)) {
      return false;
    }

    if (maxPrijs && parseInt(pand.prijs) > parseInt(maxPrijs)) {
      return false;
    }

    if (minAantalKamers && parseInt(pand.aantalKamers) < parseInt(minAantalKamers)) {
      return false;
    }

    if (maxAantalKamers && parseInt(pand.aantalKamers) > parseInt(maxAantalKamers)) {
      return false;
    }

    if (minOppervlakte && parseFloat(pand.oppervlakte) < parseFloat(minOppervlakte)) {
      return false;
    }

    if (maxOppervlakte && parseFloat(pand.oppervlakte) > parseFloat(maxOppervlakte)) {
      return false;
    }

    if (isVerkochtVerhuurd && pand.isVerkochtVerhuurd !== isVerkochtVerhuurd) {
      return false;
    }

    if (showFavoritesOnly && (localStorage.getItem(`isLiked_${pand.id}`) !== 'true')) {
      return false;
    }

    if (activeFilterTypePanden.length > 0) {
      if (!activeFilterTypePanden.includes(pand.typePandId)) {
        return false;
      }
    }

    if (activeFilterRegios.length > 0) {
      const regioMatches = pand.pandRegios.some((regio) =>
        activeFilterRegios.includes(regio.regioId)
      );
  
      if (!regioMatches) {
        return false;
      }
    }

    return true;
  });

  if (panden === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="filter-section bg-gray-100 p-4 mb-4 rounded">
        <h2 className="text-lg font-bold mb-2">Filters</h2>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div>
            <label htmlFor="postCode" className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
            <input
              type="number"
              name="postCode"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Postcode"
              value={filters.postCode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="gemeente" className="block text-sm font-medium text-gray-700 mb-1">Gemeente</label>
            <input
              type="text"
              name="gemeente"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Gemeente"
              value={filters.gemeente}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="minPrijs" className="block text-sm font-medium text-gray-700 mb-1">Min Prijs</label>
            <input
              type="number"
              name="minPrijs"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Min Prijs"
              value={filters.minPrijs}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="maxPrijs" className="block text-sm font-medium text-gray-700 mb-1">Max Prijs</label>
            <input
              type="number"
              name="maxPrijs"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Max Prijs"
              value={filters.maxPrijs}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="minAantalKamers" className="block text-sm font-medium text-gray-700 mb-1">Min Aantal Kamers</label>
            <input
              type="number"
              name="minAantalKamers"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Min Aantal Kamers"
              value={filters.minAantalKamers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="maxAantalKamers" className="block text-sm font-medium text-gray-700 mb-1">Max Aantal Kamers</label>
            <input
              type="number"
              name="maxAantalKamers"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Max Aantal Kamers"
              value={filters.maxAantalKamers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="minOppervlakte" className="block text-sm font-medium text-gray-700 mb-1">Min Oppervlakte</label>
            <input
              type="number"
              name="minOppervlakte"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Min Oppervlakte"
              value={filters.minOppervlakte}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="maxOppervlakte" className="block text-sm font-medium text-gray-700 mb-1">Max Oppervlakte</label>
            <input
              type="number"
              name="maxOppervlakte"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Max Oppervlakte"
              value={filters.maxOppervlakte}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="mr-20 ">
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                name="isVerkochtVerhuurd"
                checked={filters.isVerkochtVerhuurd}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="isVerkochtVerhuurd" className="text-sm text-gray-700">Is Verkocht/Verhuurd</label>
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                name="showFavoritesOnly"
                checked={filters.showFavoritesOnly}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="showFavoritesOnly" className="text-sm text-gray-700">Toon Enkel Favorieten</label>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-20 rounded border p-2">
              <label htmlFor="typePand" className="block text-sm font-medium text-gray-700 mb-1">Type Pand</label>
              {filterTypePanden.map((typePand) => (
                <div key={typePand.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={typePand.id}
                    value={typePand.id}
                    checked={activeFilterTypePanden.includes(typePand.id)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setActiveFilterTypePanden((prevAFTP) => {
                        if (isChecked) {
                          return [...prevAFTP, typePand.id];
                        } else {
                          return prevAFTP.filter((id) => id !== typePand.id);
                        }
                      });
                    }}
                  />
                  <label htmlFor={typePand.id} className="ml-1">{typePand.naam}</label>
                </div>
              ))}
            </div>

            <div className="mr-2 rounded border p-2">
              <label htmlFor="regio" className="block text-sm font-medium text-gray-700 mb-1">Pand Regio</label>
              <div className="grid grid-cols-3 gap-2">
                {filterRegios.map((regio) => (
                  <div key={regio.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={regio.id}
                      value={regio.id}
                      checked={activeFilterRegios.includes(regio.id)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setActiveFilterRegios((prevFR) => {
                          if (isChecked) {
                            return [...prevFR, regio.id];
                          } else {
                            return prevFR.filter((id) => id !== regio.id);
                          }
                        });
                      }}
                    />
                    <label htmlFor={regio.id} className="ml-1">{regio.naam}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPands.map((pand) => (
          <div
            key={pand.id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100"
            onClick={() => navigate(`/panden/${pand.id}`)}
          >
            <div className="relative h-full">
              <div className="w-full">
                {pand.afbeeldingen.length > 0 ? (
                  <img
                    src={pand.afbeeldingen[0].url}
                    alt="Pand"
                    className="max-w-full h-80 object-cover mb-2"
                  />
                ) : (
                  <img
                    src={noImageAvailable}
                    alt="Not Available"
                    className="max-w-full h-80 object-cover mb-2"
                  />
                )}
                <div className="px-6 py-4">
                  <h2 className="text-lg font-bold mb-2">{pand.straat} {pand.huisNr}</h2>
                  <p className="mb-10">{truncateDescription(pand.beschrijving, 35)}</p>
                </div>
              </div>
              <span onClick={(e) => e.stopPropagation()} className="absolute bottom-4 left-0 right-0 flex justify-center">
                <FavoriteButton className="mt-2" id={pand.id}
                  onClick={() => {
                    if (localStorage.getItem('isLiked_' + pand.id) === 'false') {
                      dispatch(add(pand.id));
                    } else {
                      dispatch(remove(pand.id));
                    }
                  }}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagePanden;
