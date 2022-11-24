import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
};

export const TableContext = createContext({
    tableData: [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
    ],
    halted: true,
    dispatch: () => { },
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: false,
    openedCount: 0,
}
const plantMine = (row, cell, mine) => {
    console.log('plantmine');
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    })
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen)
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: {
            console.log('start_game');
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                openedCount : 0,
            }
        }
        case OPEN_CELL: {
            
            const tableData = [...state.tableData];
            console.log("tableData...copy : ",tableData)
            tableData[action.row] = [...state.tableData[action.row]];
            console.log("tableData..rowcopy :",tableData)
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            })
            console.log("tableData foreach : ",tableData)
            const checked = [];
            let openedCount = 0;
            
            const checkArround = (row, cell) => {
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }
                if (row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length) {
                    return;
                }
                if (checked.includes(row + '/' + cell)) {
                    return;
                }
                checked.push(row + '/' + cell);
                openedCount += 1;

                let around = [
                    tableData[row - 1]?.[cell - 1],
                    tableData[row - 1]?.[cell],
                    tableData[row - 1]?.[cell + 1],
                    tableData[row]?.[cell - 1],
                    tableData[row]?.[cell + 1],
                    tableData[row + 1]?.[cell - 1],
                    tableData[row + 1]?.[cell],
                    tableData[row + 1]?.[cell + 1],
                ];

                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                tableData[row][cell] = count;

                if (count === 0) {
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 < tableData.length) {
                        near.push([row + 1, cell + 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell - 1]);
                    }
                    near.forEach((n) => {
                        if (tableData[n[0]][n[1]] < CODE.OPENED) {
                            checkArround(n[0], n[1]);
                        }
                    })
                } else {

                }
            }
            checkArround(action.row, action.cell);
            let halted = false;
            let result = '';
            console.log(state.data.row,state.data.cell,state.data.mine,state.openedCount)
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = '승리하셨습니다';
                console.log(tableData);
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            }
        }
        case CLICK_MINE: {
            console.log('mine_clicked');
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        }
        case FLAG_CELL: {
            console.log('normal_clicked(to !)');
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL: {
            console.log('flag_clicked(to ?)');
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL: {
            console.log('qeustion_clicked');
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            }
        }
        default:
            return { ...state };
    }
}




const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;
    const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted])
    console.log('minsearch');
    return (
        <TableContext.Provider value={value}>
            <Form></Form>
            <div>{timer}</div>
            <Table></Table>
            <div>{result}</div>
        </TableContext.Provider>

    );

};

export default MineSearch;