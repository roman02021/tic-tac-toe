import { usePlayerStore } from '.';
import constants from '../constants';

function isSequence({lastTile, board, setGameOver, setWinner,symbol, increaseWins, increaseLooses, enemySymbol, setWinningLineCoordinates}){
    const movedSymbol = board[lastTile[0]][lastTile[1]];
    const originX = lastTile[1];
    const originY = lastTile[0];
    let [leftRightAxis, topBottomAxis, topLeftBottomRightAxis, topRightBottomLeftAxis] = [0,0,0,0];
    for(let i = 1; i < constants.ROWS; i++){
        if(originX - i >= 0 && board[originY][originX - i] === movedSymbol){
            leftRightAxis++;
        }
        if(originX + i < constants.COLUMNS && board[originY][originX + i] === movedSymbol){
            leftRightAxis++;
        }
        if(originY - i >= 0 && board[originY - i][originX] === movedSymbol){
            topBottomAxis++;
        }
        if(originY + i < constants.ROWS && board[originY + i][originX] === movedSymbol){
            topBottomAxis++;
        }
        if(originY - i >= 0 && originX + i < constants.COLUMNS && board[originY - i][originX + i] === movedSymbol){
            topLeftBottomRightAxis++;
        }
        if(originY + i < constants.ROWS && originX - i >= 0 && board[originY + i][originX - i] === movedSymbol){
            topLeftBottomRightAxis++;
        }
        if(originY + i < constants.ROWS && originX + i < constants.COLUMNS && board[originY + i][originX + i] === movedSymbol){
            topRightBottomLeftAxis++;
        }
        if(originY - i >= 0 && originX - i >= 0 && board[originY - i][originX - i] === movedSymbol){
            topRightBottomLeftAxis++;
        }
        if([leftRightAxis, topBottomAxis, topLeftBottomRightAxis, topRightBottomLeftAxis].includes(2)){
            if(leftRightAxis === 2){
                setWinningLineCoordinates([[originY, 0],[originY, 1],[originY, 2]])
            }
            else if(topBottomAxis === 2){
                setWinningLineCoordinates([[0, originX],[1, originX],[2, originX]])
            }
            else if(topLeftBottomRightAxis === 2){
                setWinningLineCoordinates([[2, 0],[1, 1],[0, 2]])
                
            }
            else if(topRightBottomLeftAxis === 2){
                setWinningLineCoordinates([[0, 0],[1, 1],[2, 2]])
            }
            setWinner(movedSymbol);
            
            setGameOver(true);
            
            return true;
        }
    }
    return false;
    
}

export default isSequence;