<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in items" :key="item">
      <img v-bind:src="item.path" alt="www"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "carousel",
    data() {
      return{
        choices:[
          {path:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518154698251&di=16142c6a3c5d72b715667176787eda55&imgtype=0&src=http%3A%2F%2Ffd.topitme.com%2Fd%2Fff%2F2a%2F11300657657982affdo.jpg'}
        ,  {path:'http://img2.niutuku.com/desk/130126/50/50-niutuku.com-3495.jpg'},
          {path:'http://img0.imgtn.bdimg.com/it/u=3069472720,3661376600&fm=214&gp=0.jpg'}
        ]

      }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
