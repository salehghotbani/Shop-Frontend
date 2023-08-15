import { useState } from 'react';
import { HStack, Icon, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export const StarRating = ({ value, onChange, isEditable = false }) => {
  const [hoverValue, setHoverValue] = useState(null);

  const handleHover = (hoveredValue) => {
    if (isEditable) {
      setHoverValue(hoveredValue);
    }
  };

  const handleMouseLeave = () => {
    if (isEditable) {
      setHoverValue(null);
    }
  };

  const handleClick = (clickedValue) => {
    if (isEditable) {
      onChange(clickedValue);
    }
  };

  return (
    <HStack spacing={0}>
      {[1, 2, 3, 4, 5].map((index) => {
        const filled = index <= (hoverValue || value);
        const isHalf = hoverValue === index - 0.5;

        return (
          <IconButton
            backgroundColor={'transparent'}
            key={index}
            m={'-30px'}
            icon={
              <Icon
                as={StarIcon}
                boxSize={3}
                color={filled ? 'yellow.400' : 'gray.300'}
              />
            }
            aria-label={`${index} star`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(isHalf ? index : index - 0.5)}
            _hover={isEditable ? { color: 'yellow.400' } : {}}
            pointerEvents={isEditable ? 'auto' : 'none'}
          >
            {isHalf && (
              <Icon as={StarIcon} boxSize={5} color='yellow.400' />
            )}
          </IconButton>
        );
      })}
    </HStack>
  );
};
