import {useRef,useEffect} from 'react';

// const [isRunning, setRunning] = useState(true);
// useInterver(()=>{
//  console.log('hello');   
// }, isRunning ? 1000 : null);

function useInterval(callback,delay){
    const savedCallback = useRef();

    useEffect(()=>{
        savedCallback.current = callback;
    });

    useEffect(()=>{
        function tick(){
            savedCallback.current();
        }
        if(delay!==null){
            let id = setInterval(tick,delay);
            return ()=>clearInterval(id);
        }
    },[delay]);

    return savedCallback.current;
}

export default useInterval;