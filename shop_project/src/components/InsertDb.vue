<template>
  <div>
      插入商品：
      商品名：<input type="text" v-model="goodsname"><br>
      购买选项：<br>
        参数名1  ：  <input type="text" v-model="option1"><br>
                选项1：<input type="text" v-model="opt11">
                选项2：<input type="text" v-model="opt12">
                选项3：<input type="text" v-model="opt13">
                选项4：<input type="text" v-model="opt14">
                选项5：<input type="text" v-model="opt15">
                选项6：<input type="text" v-model="opt16">
                选项7：<input type="text" v-model="opt17">
                选项8：<input type="text" v-model="opt18">
                选项9：<input type="text" v-model="opt19">
        参数名2  ：  <input type="text" v-model="option2"><br>
                选项1：<input type="text" v-model="opt21">
                选项2：<input type="text" v-model="opt22">
                选项3：<input type="text" v-model="opt23">
                选项4：<input type="text" v-model="opt24">
                选项5：<input type="text" v-model="opt25">
                选项6：<input type="text" v-model="opt26">
                选项7：<input type="text" v-model="opt27">
                选项8：<input type="text" v-model="opt28">
                选项9：<input type="text" v-model="opt29">
        商铺id：<input type="text" v-model="shopid"><br>
        商品图片：<input type="text" v-model="pic1"><br>
                <input type="text" v-model="pic2"><br>
                <input type="text" v-model="pic3"><br>
                <input type="text" v-model="pic4"><br>
                <input type="text" v-model="pic5"><br>
                <input type="text" v-model="pic6"><br>
        详细图片：<input type="text" v-model="if1"><br>
                <input type="text" v-model="if2"><br>
                <input type="text" v-model="if3"><br>
                <input type="text" v-model="if4"><br>
                <input type="text" v-model="if5"><br>
                <input type="text" v-model="if6"><br>
        商品参数：<input type="text" v-model="k1">：<input type="text" v-model="v1"><br>
                    <input type="text" v-model="k2">：<input type="text" v-model="v2"><br>
                    <input type="text" v-model="k3">：<input type="text" v-model="v3"><br>
                    <input type="text" v-model="k4">：<input type="text" v-model="v4"><br>
                    <input type="text" v-model="k5">：<input type="text" v-model="v5"><br>
                    <input type="text" v-model="k6">：<input type="text" v-model="v6"><br>
        商品价格：<input type="number" v-model="price"><br>
        商品分类: <input type="text" v-model="classify"><br>
        <button @click="shopsInsert">添加</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            goodsname:'',
            goodsoptions:{},
            shopid:'',
            goodspicture:[],
            infopicture:[],
            goodsparams:[],
            price:0,
            classify:'',
            option1:'',option2:'',
            opt11:'',opt12:'',opt13:'',opt14:'',opt15:'',opt16:'',opt17:'',opt18:'',opt19:'',
            opt21:'',opt22:'',opt23:'',opt24:'',opt25:'',opt26:'',opt27:'',opt28:'',opt29:'',
            pic1:'',pic2:'',pic3:'',pic4:'',pic5:'',pic6:'',
            if1:'',if2:'',if3:'',if4:'',if5:'',if6:'',
            k1:'',k2:'',k3:'',k4:'',k5:'',k6:'',
            v1:'',v2:'',v3:'',v4:'',v5:'',v6:'',
        }   
    },
    methods:{
        shopsInsert(){

            var sendData = {};
            /** */
            sendData['goodsname'] = this.goodsname

            /** */
            var opt1 = []
            var opt2 = []
            if(this.opt11 !== '') opt1.push(this.opt11)
            if(this.opt12 !== '') opt1.push(this.opt12)
            if(this.opt13 !== '') opt1.push(this.opt13)
            if(this.opt14 !== '') opt1.push(this.opt14)
            if(this.opt15 !== '') opt1.push(this.opt15)
            if(this.opt16 !== '') opt1.push(this.opt16)
            if(this.opt17 !== '') opt1.push(this.opt17)
            if(this.opt18 !== '') opt1.push(this.opt18)
            
            
            if(this.opt21 !== '') opt2.push(this.opt21)
            if(this.opt22 !== '') opt2.push(this.opt22)
            if(this.opt23 !== '') opt2.push(this.opt23)
            if(this.opt24 !== '') opt2.push(this.opt24)
            if(this.opt25 !== '') opt2.push(this.opt25)
            if(this.opt26 !== '') opt2.push(this.opt26)
            if(this.opt27 !== '') opt2.push(this.opt27)
            if(this.opt28 !== '') opt2.push(this.opt28)
            if(this.opt29 !== '') opt2.push(this.opt29)

            var goodsoptions = {}
            goodsoptions[this.option1] = opt1
            goodsoptions[this.option2] = opt2
            
            sendData['goodsoptions'] = goodsoptions


            /** */
            sendData['shopid']=this.shopid

            /** */
            var goodspicture = []
            if(this.pic1!=='') goodspicture.push(this.pic1)
            if(this.pic2!=='') goodspicture.push(this.pic2)
            if(this.pic3!=='') goodspicture.push(this.pic3)
            if(this.pic4!=='') goodspicture.push(this.pic4)
            if(this.pic5!=='') goodspicture.push(this.pic5)
            if(this.pic6!=='') goodspicture.push(this.pic6)
            sendData['goodspicture'] = goodspicture

            /** */
            var infopicture = []
            if(this.if1!=='') infopicture.push(this.if1)
            if(this.if2!=='') infopicture.push(this.if2)
            if(this.if3!=='') infopicture.push(this.if3)
            if(this.if4!=='') infopicture.push(this.if4)
            if(this.if5!=='') infopicture.push(this.if5)
            if(this.if6!=='') infopicture.push(this.if6)
            sendData['infopicture'] = infopicture

            /** */
            var goodsparams = []
            if(this.k1!==''){
                let k1=this.k1
                let v1 = this.v1
                goodsparams.push({[k1]:v1})
            }
            if(this.k2!==''){
                let k2=this.k2
                let v2 = this.v2
                goodsparams.push({[k2]:v2})
            }
            if(this.k3!==''){
                let k3=this.k3
                let v3 = this.v3
                goodsparams.push({[k3]:v3})
            }
            if(this.k4!==''){
                let k4=this.k4
                let v4 = this.v4
                goodsparams.push({[k4]:v4})
            }
            if(this.k5!==''){
                let k5=this.k5
                let v5 = this.v5
                goodsparams.push({[k5]:v5})
            }
            if(this.k6!==''){
                let k6=this.k6
                let v6 = this.v6
                goodsparams.push({[k6]:v6})
            }
            sendData['goodsparams'] = goodsparams

            /** */
            sendData['price'] = parseInt(this.price)

            /** */
            sendData['classify'] = this.classify
            /** */
            console.log(sendData)

            axios.post('/api/insert',sendData)
        }
    }
}
</script>

<style>

</style>