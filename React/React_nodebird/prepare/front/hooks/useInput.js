import { useState, useCallback } from 'react';

const useInput  = ({ initalValue }) => {
    const [value, setValue] = useState(initalValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    return [value, handler];
}

export default useInput;

