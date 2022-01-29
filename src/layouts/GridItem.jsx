import React from 'react';

import styled from 'styled-components';

const StyledGridItem = styled.div`
    ${(props) => gridPosition(props.position)}
`
const gridPosition = position => {
    switch(position){
        case 'left':
            return `justify-self: start`;
        case 'right':
            return `justify-self: right`;
        case 'center':
            return `justify-self: center`;
        default: 
            return undefined;

    }
}



const GridItem = (props) => {
  return <StyledGridItem {...props}>
      {props.children}
  </StyledGridItem>;
};

export default GridItem;
