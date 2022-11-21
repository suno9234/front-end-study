<template>
  <div>
  <div class="menu">
    <a v-for="m in menus" :key="m">{{m}}</a>
  </div>

  <div class="black-bg" v-if="isModal">
    <div class="white-bg">
      <h4>상세페이지</h4>
      <p>내용임</p>
      <button @click="this.isModal=false">닫기</button>
    </div>
  </div>

  <div v-for="p in products" :key="p.id">
    <img :src="p.image" class = "room-img"/>
    <h4 @click="this.isModal = true">{{p.title}}</h4>
    <p>{{p.price}}만원</p>
    <button @click="onClickButton">허위매물신고</button><span>신고수 : {{p.number}}</span>
  </div>
</div>
</template>

<script>
import data from './data/post';
export default {
  name: 'App',
  data(){
    return{
      isModal : false,
      menus : ['Home','SHop','About'],
      products: data,
    }
  },
  methods:{
    onClickButton(){
      console.log('click')
      this.products[0].number+=1;
    },
    onClickName(){
      this.isModal = true;
    },
    onClickModal(){
      this.isModal = false;
    }

  },
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu{
  background:darkslateblue;
  padding : 15px;
  border-radius: 5px;
}
.menu a{
  color: white;
  padding : 10px;
}
body{
  margin:0
}
div{
  box-sizing: border-box;
}
.black-bg{
  width:100%;
  height: 100%;
  background:rgba(0,0,0,0.5);
  position: fixed;
  padding:20px;
}
.white-bg{
  width:100%;
  background:white;
  border-radius: 8px;
  padding:20px;
}
.room-img{
  width:100%;
}
</style>
