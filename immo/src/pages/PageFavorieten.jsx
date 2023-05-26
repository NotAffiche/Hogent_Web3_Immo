import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../store/slice';

const PageFavorieten = () => {
    const dispatch = useDispatch();
    // const state = useSelector(state => state);
    const favoritesState = useSelector((storeState) => storeState.favoritesState);
    return (
      <div>
        {favoritesState.map(f => 
          <div key={f.id}>
            <p>{f.name}</p>
            <button onClick={() => {dispatch(remove(f.id));localStorage.setItem('isLiked_'+f.id,false)}}>Verwijderen</button>
          </div>  
        )}
      </div>
    );
  };

export default PageFavorieten;
