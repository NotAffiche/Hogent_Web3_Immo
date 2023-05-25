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