<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
    //   // const api = "https://vue-course-api.hexschool.io/api/zxcv4695152526/products";
    //   //API 伺服器路徑
    //   //所申請的 APIPath
    //   this.$http.get(api).then((response) => {
    //   console.log(response.data)
    // })
  },
}
</script>
<style lang="scss">
@import "./assets/all";

*{
  letter-spacing: 2px;
}

 button.btn-dark{
     color: #E1D5BD;
 }


 li.active a.page-link{
   background: black!important;
   color: #E1D5BD!important;
 }

 .card-body,{
    background: #E1D5BD;
    font-weight: 100;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
 }

 .card-footer{
  background: #E1D5BD;
  font-weight: 100;
 }

  .modal-content{
    background: #343a40;
    color:#E1D5BD;
  }

  
input:focus{
  border-color: #E1D5BD!important;
 }
</style>
