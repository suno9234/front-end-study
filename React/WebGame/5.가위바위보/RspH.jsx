import React, { useState, useRef, useEffect } from 'react';
import useInterval from './useIntervel';


const rspCoords = {
    가위: '0',
    바위: '-140px',
    보: '-280px',
}
const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
}

const Rsp = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    
    /*
    useEffect(() => { //componentDidMount , componentDidUpdate 역할
        interval.current = setInterval(changeHand, 100);
        return () => { //componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]);
    // [] => closer 문제 해결
    // imgCoord가 바뀔때 실행
    */

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    useInterval(changeHand, isRunning ? 100 : null);

    const onClickBtn = (choice) => () => {
        if (isRunning) {
            setIsRunning(false);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore;
            if (diff === 0) {
                setResult('비겼습니다');
            } else if ([-1, 2].includes(diff)) {
                setResult('이겼습니다');
                setScore((prevScore) => {
                    return prevScore + 1
                })
            } else {
                setResult('졌습니다');
                setScore((prevScore) => {
                    return prevScore - 1
                })
            }
            setTimeout(() => {
                setIsRunning(true);
            }, 2000);
        }

    }
    const comStyle = {
        width: `142px`,
        height: `180px`,
        background: `url(./rsp.png) ${imgCoord} 0 no-repeat`,
    }
    return (
        <>
            <div id="computer" style={comStyle}></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )

}

export default Rsp;