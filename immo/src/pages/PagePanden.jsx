import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButtonComponent';

import { useDispatch } from "react-redux";
import { add } from "../store/slice";
import { remove } from "../store/slice";
const recipesData = require("../utils/buildings.json");

const PagePanden = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <h1 className="mb-8 text-center mt-8">TE KOOP</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 ml-10 mr-10" >
        {recipesData.map((r, idx) => (
          <div key={r.id} className="relative w-full h-auto align-middle rounded-md shadow-md">
            <img className="inline-block w-full h-56 object-cover" src={r.imageURL} alt={r.name} />
            <button className="absolute top-2 right-2 bg-white rounded-md p-2 text-xl cursor-auto" onClick={() => {
              if (localStorage.getItem('isLiked_'+r.id) == 'false') {
                dispatch(add(r))
              }else{
                dispatch(remove(r.id))
              }
            }}>
              <FavoriteButton id={r.id} />
            </button>
            <article className="cursor-pointer" onClick={() => navigate(`/forSale/${r.id}`)}>
              <section className='grid mt-3 mb-3'>
                <ul className='text-center '>
                  <li>{r.id} {r.name}</li>
                  <li className='text-justify'>{}</li>
                </ul>
              </section>
            </article>
          </div>
        ))}
      </div>
    </div>
  ) 
};

export default PagePanden;