
<template>
    <div>
        <div id="computer" v-bind:style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton(`바위`)">바위</button>
            <button @click="onClickButton(`가위`)">가위</button>  
            <button @click="onClickButton(`보`)">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}} 점</div>
    </div>
</template>

<script>
    const rspCoords = {
        바위:'0',
        가위: '-142px',
        보:'-284px', 
    };
    const scores = {
        가위:1,
        바위:0,
        보:-1,
    }
    const computerChoice = (imageCoord) => {
        return Object.entries(rspCoords).find(function(v){
            return v[1] === imageCoord;
        })[0];
    };
    let interval = 0;
    export default{
        data(){
            return{
                result:'',
                score : 0,
                imageCoord : rspCoords.바위,
            };
        },
        computed:{
            computedStyleObject(){
                return {
                    background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imageCoord} 0`,
                }
            }
        },
        methods :{
            changeHand(){
                interval  = setInterval(()=>{
                if(this.imageCoord === rspCoords.바위){     
                    this.imageCoord = rspCoords.가위;
                } else if(this.imageCoord === rspCoords.가위){                   
                    this.imageCoord = rspCoords.보;
                } else if(this.imageCoord === rspCoords.보){
                    this.imageCoord = rspCoords.바위;
                }
                },100);
            },
            onClickButton(choice){
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imageCoord)];
                const diff = myScore - cpuScore;
                if (diff === 0 ){
                    this.result = '비겼습니다';
                }else if ([-1,2].includes(diff)){
                    this.result = '이겼습니다';
                    this.score+=1;
                }else{
                    this.result = '졌습니다';
                    this.score-=1;
                }
                setTimeout(()=>{
                    this.changeHand();
                },1000);
            },
        },
        created(){
            console.log('created');
        },
        mounted(){
            console.log('mounted');
            this.changeHand();
        },
        updated(){
            console.log('updated');
        },
        beforeDestroy(){
            console.log('beforeDestroy');
            clearInterval(interval);
        },  
        destroyed(){
            console.log('destroyed');
        },
    };
</script>

<style scoped>
    #computer{
        width:142px;
        height:200px;
        background-color: black;
    }
</style>

