import constants from '../constants';

function isSequence({lastTile, board, setGameOver, setWinner, playerSymbol}){
    const movedSymbol = board[lastTile[0]][lastTile[1]];
    const originX = lastTile[1];
    const originY = lastTile[0];
    let [leftRightAxis, topBottomAxis, topLeftBottomRightAxis, topRightBottomLeftAxis] = [0,0,0,0];
    for(let i = 1; i < constants.ROWS; i++){
        if(originX - i >= 0 && board[originY][originX - i] === movedSymbol){
            console.log(originX - i, board[originY][originX - i], movedSymbol, originY);
            leftRightAxis++;
        }
        if(originX + i < constants.COLUMNS && board[originY][originX + i] === movedSymbol){
            console.log(originX + i, board[originY][originX + i], movedSymbol, originY);
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
            console.log([leftRightAxis, topBottomAxis, topLeftBottomRightAxis, topRightBottomLeftAxis]);
            setWinner(movedSymbol);
            setGameOver(true);
            return true;
        }
    }
    return false;
    
}

export default isSequence;