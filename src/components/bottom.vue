<template>
    <div class="bottom">
      <h2>小组成员</h2>
      <table>
        <tr>
          <td>杨晓辉</td>
          <td>石磊</td>
          <td>李昭璐</td>
        </tr>
        <tr>
          <td>王嘉政</td>
          <td>胡毅</td>
          <td>杨冰玉</td></tr>
      </table>
    </div>
</template>

<script>
    export default {
        name: "bottom"
    }
</script>

<style scoped>
.bottom{
  margin-top:50px;
  height: 200px;
  width: 100%;
  background-color: #0093dd;
}

.bottom h2{
  color: azure;
  padding-left: 665px;
  padding-top: 40px;
}
.bottom table{
  padding-left: 600px;
}

  .bottom td{
    color: azure;
    padding-top:10px ;
    padding-right:50px;
  }
  body{
    margin: 0px;
    padding: 0px;
  }
</style>
