import React from "react";

const PandModifyFieldsCompoent = ({pand, typePanden, handleInputChange}) => {
    return (
        <div>
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
        </div>
    );
};

export default PandModifyFieldsCompoent;