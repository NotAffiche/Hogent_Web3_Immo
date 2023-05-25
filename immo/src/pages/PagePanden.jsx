import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButtonComponent';

const recipesData = require("../utils/buildings.json");

const PagePanden = () => {
    const navigate = useNavigate();
    const sendTo = (id) => {
      navigate(`/panden/${id}`);
    };
    return(
        <div>
        <h1>TEST PANDEN</h1>
        <h2>TE KOOP/HUUR</h2>
        <div>
          {recipesData.map((r, idx) => (
            <div key={r.id}>
              <img src={r.imageURL} alt={r.name} />
              <FavoriteButton id={r.id} />
              <article onClick={() => sendTo(r.id)}>
                <section>
                  <ul className='text-center '>
                    <li>{r.id} {r.name}</li>
                    <li className='text-justify'>{r.steps}</li>
                  </ul>
                </section>
              </article>
            </div>
          ))}
        </div>
        </div>
    );  
};

export default PagePanden;