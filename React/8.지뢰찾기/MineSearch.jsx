import React, { useReducer, createContext ,useMemo } from 'react';
import Table from './Table';

export const TableContext = createContext({
    tableData : [],
    dispatch: ()=>{},
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
}
const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return{
                ...state,
                tableData:plantMine(action.row,action.cell,action.mine),
            }
        default:
            return state;
    }
}

export const START_GAME = 'START_GAME';


const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(()=>{
        {tableData : state.tableData , dispatch}
    },[state.tableData])

    return (
        <TableContext.Provider value = {value}>
            <Form></Form>
            <div>{state.timer}</div>
            <Table></Table>
            <div>{state.result}</div>
        </TableContext.Provider>

    );

};

export default MineSearch;