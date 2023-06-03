
import React,{useState,useEffect} from 'react'
import { FaRegThumbsUp,FaThumbsUp } from 'react-icons/fa';

const FavoriteButton = ({id}) => {
    const [isLiked, setIsLiked] = useState(
        localStorage.getItem(`isLiked_${id}`) === 'true'
      );
    const handleLikeClick = () => {
      setIsLiked(!isLiked);
    };
    useEffect(() => {
        localStorage.setItem(`isLiked_${id}`, isLiked);
      }, [isLiked,id]);

  
    return (
      <div>
        {isLiked ? (
        <FaThumbsUp
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={handleLikeClick}
        />
        ) : (
        <FaRegThumbsUp
          style={{ color: 'blue', cursor: 'pointer'}}
          onClick={handleLikeClick}
        />
        )}
      </div>
    );
}

export default FavoriteButton;

/*
import React, { useState } from 'react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../store/favorites/slice';

const FavoriteButton = ({ id }) => {
  const dispatch = useDispatch();
  const favoritesState = useSelector((storeState) => storeState.favorites);
  const [isLiked, setIsLiked] = useState();
  const handleLikeClick = () => {
    console.log(favoritesState);
    if (favoritesState.includes(id)) {
      dispatch(remove(id));
      localStorage.setItem(`isLiked_${id}`, false);
      console.log(favoritesState);
    } else {
      dispatch(add(id));
      localStorage.setItem(`isLiked_${id}`, true);
      console.log(favoritesState);
    }
  };


  return (
    <div>
      {isLiked ? (
        <FaThumbsUp
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={handleLikeClick}
        />
      ) : (
        <FaRegThumbsUp
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={handleLikeClick}
        />
      )}
    </div>
  );
}

export default FavoriteButton;
*/