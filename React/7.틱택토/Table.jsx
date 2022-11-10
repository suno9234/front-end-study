import React, { Component } from 'react';
import Tr from './Tr';

const Table = ({onClick , tableData ,dispatch}) => {
    return (
        <>
            <table >
                <tbody>
                    {Array(tableData.length).fill().map((tr,i)=><Tr dispatch={dispatch} rowIndex={i} rowData = {tableData[i]}></Tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Table;