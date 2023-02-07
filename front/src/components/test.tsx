import * as React from 'react';

export default function Test(){
    const newArray:string[][] = [['1', '2', '3', '4', '5'], ['6', '7', '8'], ['9', '10', '11', '12', '']];
    return (<div style={{display: 'flex', position: 'absolute', bottom: 0, height: '200px'}}>
        {
        newArray.map((column:string[]) => { 
            return < div style= {{flex: 1, display: 'flex', flexDirection: 'column-reverse', border: '1px black solid', padding: '5px', alignItems: 'baseline', justifyContent: 'flex-start' }}> 
                {column.map((value: string) => { 
                    return <div style = {{ height: '20px', width: '20px',  border: '1px black solid' }}>
                                {value}
                            </div>})}
            </div>})
        }
    </div>);
}