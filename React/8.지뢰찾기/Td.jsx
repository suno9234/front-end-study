import React, { useCallback, useContext } from 'react';
import { TableContext, CODE, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, CLICK_MINE } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.OPENED:
            return {
                background: 'white'
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            }

        default:
            return {
                background: 'white'
            };
    }
}

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return ;
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
}
const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);
    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.QUESTION:
            case CODE.FLAG_MINE:
            case CODE.QUESTION_MINE: 
                return;

            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }

    }, [tableData[rowIndex][cellIndex],halted])

    const onRigthClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        console.log(tableData[rowIndex][cellIndex] , rowIndex , cellIndex);
        switch (tableData[rowIndex][cellIndex]) {

            case CODE.NORMAL:
            case CODE.MINE:
                return dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                return dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
            default:
                return;

        }
    }, [tableData[rowIndex][cellIndex],halted]);
    return (
        <>
            <td
                style={getTdStyle(tableData[rowIndex][cellIndex])}
                onClick={onClickTd}
                onContextMenu={onRigthClickTd}>{getTdText(tableData[rowIndex][cellIndex])}</td>
        </>
    )
}

export default Td;