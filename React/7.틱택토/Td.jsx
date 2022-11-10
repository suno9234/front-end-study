import React , {Component, useCallback} from 'react';
import {CLICK_CELL,CHANGE_TURN} from './Tictactoe';

const Td = ({rowIndex, cellIndex, dispatch , cellData}) =>{
    const onClickTd = useCallback(()=>{
        if(cellData){
            return;
        }
        dispatch({
            type:CLICK_CELL,
            row:rowIndex,
            cell:cellIndex,
        },[cellData]);
        
    },[cellData]);
    return(
        <>
        <td onClick = {onClickTd}>{cellData}</td>
        </>
    )
}

export default Td;