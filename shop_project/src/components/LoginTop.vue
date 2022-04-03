<template>
  <div class="user_nav" id="user_nav">
        <div class="user_nav_container">
            <div class="user_nav_left">
                <div class="user_nav_left_1 user_nav_left_item">
                    <span>
                        <router-link to="/index/advertise">首页</router-link>
                    </span>
                </div>
                <div class="user_nav_left_2 user_nav_left_item">
                    <span>
                        <a href="#">成为商家</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'LoginTop'
}
</script>

<style>
    
.user_nav{
    min-width: 1280px;
    background-color: rgb(234, 234, 234);
}
.user_nav_container{
    margin: auto;
    display: flex;
    width: 80%;
    min-width: 1280px;
}
.user_nav_left{
    display: flex;
    flex: 1;
}
.user_nav_left_item{
    height: 25px;
    text-align: center;
}
.user_nav_left_item{
    margin:auto 20px ;
}


.user_nav_left_item span,
.user_nav_left_item a{
    line-height: 25px;
    font-size: 12px;
    color: rgb(100, 100, 100);
    text-decoration: none;
    display: inline-block;
}


.user_nav_left_item a:hover{
    color: rgb(235, 75, 47);
}


</style>