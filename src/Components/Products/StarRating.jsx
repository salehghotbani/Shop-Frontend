import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

export const StarRating = ({ setRate }) => {
  const commentProduct = useSelector(state => state.commentProduct);
  const [hoveredRating, setHoveredRating] = useState(0);
  const dispatch = useDispatch();

  const handleRatingHover = (hoveredIndex) => {
    setHoveredRating(hoveredIndex);
  };

  const handleRatingClick = (selectedIndex) => {
    dispatch(setRate(selectedIndex));
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  return (
    <Flex dir={'ltr'} align='center'>
      {[1, 2, 3, 4, 5].map((index) => (
        <Box
          key={index}
          as='button'
          mx={1}
          onMouseEnter={() => handleRatingHover(index)}
          onMouseLeave={handleRatingLeave}
          onClick={() => handleRatingClick(index)}
        >
          <StarIcon
            color={
              index <= (hoveredRating || commentProduct.rate) ? 'yellow.300' : 'gray.300'
            }
            boxSize={6}
          />
        </Box>
      ))}
    </Flex>
  );
};
