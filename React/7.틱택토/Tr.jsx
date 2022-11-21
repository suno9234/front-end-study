import React, {Component , memo} from 'react';
import Td from './Td';
const Tr = memo(({rowData,rowIndex ,dispatch})=>{
    console.log(rowData);
    return(
        <>
            <tr>
                
                {Array(rowData.length).fill().map((td,i)=>{ return<Td key={i} dispatch={dispatch} cellData={rowData[i]} rowIndex ={rowIndex} cellIndex={i}>{''}</Td>})}
            </tr>
    
        </>
    )
})

export default Tr;