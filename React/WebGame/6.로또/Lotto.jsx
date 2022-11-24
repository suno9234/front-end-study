import React, { Component } from 'react';
import Ball from './Ball';
function getWinNumbers(){
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
class Lotto extends Component {

    state = {
        winNumbers: getWinNumbers(),
        winBalls:[],
        bonus:null,
        redo:false,
    };

    timeouts = [];

    runeTimeouts = () =>{
        const {winNumbers} = this.state;
        for(let i = 0 ;i<winNumbers.length-1;i++){
            this.timeouts[i] = setTimeout(()=>{
                this.setState((prevState)=>{
                    return{
                        winBalls : [...prevState.winBalls,winNumbers[i]],
                    }
                })
            },(i+1)*1000);
        }
        this.timeouts[6] = setTimeout(()=>{
            this.setState({
                bonus:winNumbers[6],
                redo:true,
            })
        },7000);
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.winBalls.length === 0){
            this.runeTimeouts();
        }
    }

    componentDidMount(){
        this.runeTimeouts();
    }

    componentWillUnmount(){
        this.timeouts.forEach((v)=>{
            clearTimeout(v);
        })
    }

    onClickRedo = ()=>{
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls:[],
            bonus:null,
            redo:false,
        });
        this.timeouts = [];
    }

    render() {
        const {winBalls, bonus,redo} = this.state;
        return (
            <>
            <div>당첨 숫자</div>
            <div id="result">
                {winBalls.map((v)=><Ball key={v} number={v}></Ball>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={redo ? this.onClickRedo : ()=>{}}>한 번 더!</button>}
            </>
        )
    }
}

export default Lotto;
