<template>
<div>
    <login-top/>
    <div class="login_page">
        <div class="top_logo">
            <img src="https://s1.ax1x.com/2022/03/28/qDYSL6.png" alt="">
        </div>
        <div class="login_container">
            <div class="login_span"><span>注册</span></div>
            <div class="phone_input login_item">
                <span>手机号</span>
                <input type="number" v-model="phone" placeholder="请输入手机号">
            </div>
            <div class="username_input login_item">
                <span>用户名</span>
                <input type="text" v-model="username" placeholder="请输入用户名">
            </div>
            <div class="password_input login_item">
                <span>密码</span>
                <input type="password" v-model="password" placeholder="请输入密码">
            </div>
            <div class="password_input login_item">
                <span>确认密码</span>
                <input type="password" v-model="confirm" placeholder="请确认密码">
            </div>
            <div class="code_input login_item">
                <span>验证码</span>
                <input type="number" v-model="code" placeholder="请输入验证码"><span>&nbsp;&nbsp;&nbsp;&nbsp;{{receive_code}}</span>
            </div>
            <div class="submit_btn login_item">
                <button class="login_submit" @click="register">注&nbsp;&nbsp;册</button>
            </div>
            <router-link class="to_login" to="/login">已有账号？前往登录</router-link>
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
            username:'',
            phone:'',
            password:'',
            confirm:'',
            code:'',
            receive_code:''
        }
    },
    methods:{
        //注册
        register(){
            if(this.phone === ''){
                alert('手机号不能为空')
                return
            }
            if(this.username === ''){
                alert('用户名不能为空')
                return
            }
            if(this.password === ''){
                alert('密码不能为空')
                return
            }
            if(this.confirm === ''){
                alert('确认密码不能为空')
                return
            }
            if(this.password !== this.confirm){
                alert('两次密码输入不一致')
                return
            }
            if(this.code !== this.receive_code){
                alert('验证码错误')
                return
            }
            this.$API.registerPost(this.phone,this.username, this.password)
            .then(value=>{
                if(value.data === 'phoneed'){
                    alert('手机号已被注册')
                    return
                }
                if(value.data === 'usernameed'){
                    alert('用户名已被注册')
                    return
                }
                sessionStorage.setItem('user',JSON.stringify(value.data))
                this.$router.go(-1)
            },
            reason=>{
                alert('服务器错误',reason.response)
            })
        }
    },
    beforeMount(){
        this.$API.rcodeGet().then((value)=>{
            this.receive_code = value.data.code
        })
    }
}
</script>

<style scoped>

/*登录*/
.login_page{
    background-color: white;
    width: 1280px;
    margin: auto;
    height: auto;
    overflow: hidden;
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
    height: auto;
    border: 1px red solid;
    border-radius: 20px;
    margin: 20px auto;
}
/* 
 <div class="phone_input"></div>
        <div class="password_input"></div>
        <div class="code_input"></div>
        <div class="submit_btn"></div> */


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
    outline: none;
}

.code_input>input{
    width: 210px;
}

.login_item>span{
    width: 90px;
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

.to_login{
    color: red;
    font-size: 20px;
    text-decoration: none;
    display: block;
    margin-left: 40px;
    margin-top: 20px;
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