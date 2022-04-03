<template>
<div>
    <login-top/>
    <div class="login_page">
        <div class="top_logo">
            <img src="https://s1.ax1x.com/2022/03/28/qDYSL6.png" alt="">
        </div>
        <div class="login_container">
            <div class="login_span"><span>登录</span></div>
            <div class="phone_input login_item">
                <span>手机号</span>
                <input type="number" v-model="phone" placeholder="请输入手机号">
            </div>
            <div class="password_input login_item">
                <span>密码</span>
                <input type="password" v-model="password" placeholder="请输入密码">
            </div>
            <div class="submit_btn login_item">
                <button class="login_submit" @click="login">登&nbsp;&nbsp;录</button>
            </div>
            <router-link to="/register" class="to_register">没有账号？前往注册</router-link>
        </div>
    </div>
</div>

</template>

<script>
import LoginTop from './LoginTop.vue'
export default {
  components: { LoginTop },
    name:'LoginAndRegister',
    data(){
        return {
            phone:'',
            password:''
        }
    },
    methods:{
        //登录
        login(){
            if(this.phone === ''){
                alert('手机号不能为空')
                return
            }else if(this.password === ''){
                alert('密码不能为空')
                return
            }
            this.$API.loginPost(this.phone,this.password).then((res)=>{
                if(res.data === 'id_or_password_err'){
                    alert('账号或密码错误')
                    return
                }
                sessionStorage.setItem('user',JSON.stringify(res.data))
                this.$router.push('/index/advertise')
            })
        }
    },

}
</script>

<style scoped>

/*登录*/
.login_page{
    background-color: white;
    width: 1280px;
    margin: auto;
    height: 720px;
    /* border: 1px red solid; */
    border-radius: 20px;
}

.top_logo{
    width: 100%;
    border-bottom: 1px solid red;
    height: 100px;
    display: flex;
    justify-content: space-around;
}

.top_logo>img{
    width: 100px;
    height: 100px;
}


.login_container{
    width: 80%;
    height: 560px;
    border: 1px red solid;
    border-radius: 20px;
    margin: auto;
    margin-top: 20px;
}


.login_span{
    height: 60px;
    width: 200px;
    text-align: center;
    margin: 20px auto;
    font-size:40px;
    font-weight: 600;
    color: rgb(255, 51, 0);
    font-family: '宋体','Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    line-height: 60px;
}

.login_item{
    display: flex;
    width: 400px;
    height: 40px;
    margin: 40px auto;
}

.login_item>input{
    margin-left: 30px;
    width: 300px;
    border: 1px solid red;
    border-radius: 20px;
    outline-style: none;
}


.login_item>span{
    width: 60px;
    font-size: 20px;
    line-height: 40px;
}

.login_submit{
    width: 100px;
    font-size: 20px;
    line-height: 40px;
    border: 1px solid red;
    border-radius: 30px;
    background-color: white;
    box-shadow: 0px 10px 10px rgb(240,240,240);
    cursor: pointer;
    margin: auto;
}

.login_submit:hover{
    background-image: linear-gradient( white,rgb(255, 106, 106));
}

.to_register{
    color: red;
    font-size: 20px;
    text-decoration: none;
    display: block;
    margin-left: 40px;
    margin-top: 180px;
}

/**去除数字输入框右边的加减 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button { 
    -webkit-appearance: none; 
}
input[type="number"]{ 
    -moz-appearance: textfield; 
}
</style>