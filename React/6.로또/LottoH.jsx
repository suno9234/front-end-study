import React , {useState,useRef, useEffect ,useMemo ,useCallback} from 'react';
import Ball from './Ball';
function getWinNumbers(){
    console.log('getwinnumbers');
    const candidate = Array(45).fill().map((value, index) => index + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        const random = Math.floor(Math.random() * candidate.length);
        const spliceArray = candidate.splice(random, 1);
        const value = spliceArray[0];
        shuffle.push(value);
    }
    const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
    const bonus = shuffle[6];
    return [...winBalls,bonus];
}

const LottoH = ()=>{
    const lottoNumbers = useMemo(()=>{return getWinNumbers()},[])
    const [winNumbers,setWinNumbers] = useState(lottoNumbers);
    const [winBalls,setWinBalls] = useState([]);
    const [bonus,setBonus] = useState(null);
    const [redo,setRedo] = useState(false);
    const timeouts = useRef([]);
    useEffect(()=>{
        runTimeouts();

        return ()=>{
            timeouts.current.forEach((v)=>{clearTimeout(v)});
        }
    },[timeouts.current]);

    const onClickRedo = useCallback(()=>{
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[]);

    const runTimeouts = () =>{
        for(let i = 0 ;i<winNumbers.length-1;i++){
            timeouts.current[i] = setTimeout(()=>{
                setWinBalls((prevWinBalls)=>{
                    return [...prevWinBalls,winNumbers[i]];
                })
    
            },(i+1)*1000);
        }
        timeouts.current[6] = setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
        },7000);
    }

    

    return(
        <>
            <div>당첨 숫자</div>
            <div id="result">
                {winBalls.map((v)=><Ball key={v} number={v}></Ball>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={redo ? onClickRedo : ()=>{}}>한 번 더!</button>}
            </>
    )


}

export default LottoH;