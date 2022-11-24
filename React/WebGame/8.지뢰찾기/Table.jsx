import React, { useContext } from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';
const Table = () => {
    const { tableData } = useContext(TableContext);
    return (
        <>
            <table>
                <tbody>
                    {Array(tableData.length).fill().map((tr, i) => (<Tr rowIndex={i} key={i}></Tr>))}
                </tbody>
            </table>
        </>
    )
}

export default Table;