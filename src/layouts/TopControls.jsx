import React, {useContext} from 'react';
import Logo from '../components/icons/Logo';
import Restart from '../components/icons/Restart';
import Cross from '../components/icons/Cross';
import Circle from '../components/icons/Circle';
import Button from '../components/Button';
import SlimTile from '../components/SlimTile';
import theme from '../styles/theme';
import styled from 'styled-components';
import GridItem from './GridItem';
import {usePlayerStore} from '../store';
import constants from '../constants';

const StyledTopControls = styled.div`
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(${constants.ROWS}, 1fr);
    gap: 1.25rem;
    margin-bottom: 1.25rem;
    
`

const TopControls = () => {

    const player = usePlayerStore((state) => state);

    console.log(player.symbol === constants.CROSS)
    return (
        <StyledTopControls>
            <GridItem position='left'>
                <Logo className="logo" />
            </GridItem>
            <GridItem position='center'>
                <SlimTile
                    icon={
                        (player.isYourTurn && player.symbol === constants.CROSS) || (!player.isYourTurn && player.symbol === constants.CIRCLE) ? 
                        <Cross
                            width={20}
                            height={20}
                            color={theme.colors.secondary}
                        /> : <Circle
                        width={20}
                        height={20}
                        color={theme.colors.primaryCircle}
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

