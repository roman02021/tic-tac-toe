import React from 'react';
import Logo from '../components/icons/Logo';
import Restart from '../components/icons/Restart';
import Cross from '../components/icons/Cross';
import Button from '../components/Button';
import SlimTile from '../components/SlimTile';
import theme from '../styles/theme';
import styled from 'styled-components';
import GridItem from './GridItem';

const StyledTopControls = styled.div`
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(${theme.dimensions.rows}, 1fr);
    gap: 1.25rem;
    margin-bottom: 1.25rem;
    
`

const TopControls = () => {
    return (
        <StyledTopControls>
            <GridItem position='left'>
                <Logo className="logo" />
            </GridItem>
            <GridItem position='center'>
                <SlimTile
                    icon={
                        <Cross
                            width={20}
                            height={20}
                            color={theme.colors.secondary}
                        />
                    }
                >
                    Turn
                </SlimTile>
            </GridItem>
            <GridItem position='right'>
                <Button icon={<Restart />} color='silver' square borderWidth='small' />
            </GridItem>
        </StyledTopControls>
    );
};

export default TopControls;

