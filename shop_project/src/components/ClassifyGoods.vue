<template>
    <div class="classify_goods">
        <div class="classify_name">
            <span>{{classifyName}}</span>
        </div>
        <div class="goods_display">
            <router-link class="classify_goods_item" v-for="(item,index) in goods_list" :key="index" to="/index/info">
                <img src="https://s1.ax1x.com/2022/03/28/qDYSL6.png">
                <div class="goods_describe">
                    {{item.describe}}
                </div>
                <div class="goods_price">
                    <small>￥</small>{{item.price}}
                </div>
            </router-link>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'ClassifyGoods',
    data(){
        return {
            goods_list: [
                {describe:'老师的考虑高老师的几个了考试的',price:546},
                {describe:'老打法胜多负少的试的',price:2354},
                {describe:'老师的考水电费所发生的发送到的几个了考试的',price:234},
                {describe:'水电费所发生的速度发送',price:345},
                {describe:'发过火的好和锐仕方达好地方',price:34},
                {describe:'鼓风机恢复计划飞机回复就',price:11},
                {describe:'回房间工具梵蒂冈附近就',price:44},
                {describe:'复活甲浮动好得很附加费好',price:54},
                {describe:'规范化科技化工临沂市股份的',price:356},
                {describe:'双方都韩国电风扇电饭锅',price:222},
                {describe:'的实体店数据是',price:134},
                {describe:'老师的考虑高老师的几个了考试的',price:546},
                {describe:'老打法胜多负少的试的',price:2354},
                {describe:'老师的考水电费所发生的发送到的几个了考试的',price:234},
                {describe:'水电费所发生的速度发送',price:345},
                {describe:'发过火的好和锐仕方达好地方',price:34},
                {describe:'鼓风机恢复计划飞机回复就',price:11},
                {describe:'回房间工具梵蒂冈附近就',price:44},
                {describe:'复活甲浮动好得很附加费好',price:54},
                {describe:'规范化科技化工临沂市股份的',price:356},
                {describe:'双方都韩国电风扇电饭锅',price:222},
                {describe:'的实体店数据是',price:134},
                {describe:'老师的考虑高老师的几个了考试的',price:546},
                {describe:'老打法胜多负少的试的',price:2354},
                {describe:'老师的考水电费所发生的发送到的几个了考试的',price:234},
                {describe:'水电费所发生的速度发送',price:345},
                {describe:'发过火的好和锐仕方达好地方',price:34},
                {describe:'鼓风机恢复计划飞机回复就',price:11},
                {describe:'回房间工具梵蒂冈附近就',price:44},
                {describe:'复活甲浮动好得很附加费好',price:54},
                {describe:'规范化科技化工临沂市股份的',price:356},
                {describe:'双方都韩国电风扇电饭锅',price:222},
                {describe:'的实体店数据是',price:134},
                {describe:'老师的考虑高老师的几个了考试的',price:546},
                {describe:'老打法胜多负少的试的',price:2354},
                {describe:'老师的考水电费所发生的发送到的几个了考试的',price:234},
                {describe:'水电费所发生的速度发送',price:345},
                {describe:'发过火的好和锐仕方达好地方',price:34},
                {describe:'鼓风机恢复计划飞机回复就',price:11},
                {describe:'回房间工具梵蒂冈附近就',price:44},
                {describe:'复活甲浮动好得很附加费好',price:54},
                {describe:'规范化科技化工临沂市股份的',price:356},
                {describe:'双方都韩国电风扇电饭锅',price:222},
                {describe:'的实体店数据是',price:134},
            ],
        }
    },
    computed : {
        classifyName(){
            return this.$route.query.classifyName
        }
    }
}
</script>

<style scoped>

/*分类商品*/
.classify_goods{
    flex: 1;
    background-color: white;
    border-radius: 20px;
    margin: 0px 10px;
    border: 1px solid red;
}


.classify_name{
    color: #F10000;
    font-weight: 600;
    font-family: '楷体','Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    width: 100%;
    font-size: 28px;
    height: 60px;
    line-height: 60px;

}

.classify_name>span{
    margin-left: 20px;
}


.goods_display{
    padding-top: 20px ;
    flex: 1;
    background-color: white;
    border-radius: 20px;
    margin: 0px 0px;
    border-top: 1px solid #aaaaaa;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.classify_goods_item{
    margin-top: 0px;
    display: block;
    width: 240px;
    height: 300px;
    border-radius: 20px;
    margin-bottom: 10px;
}


.classify_goods_item{
    display: block;
    width: 240px;
    height: 300px;
    border-radius: 20px;
    text-decoration: none;
}

.classify_goods_item>img{
    width: 240px;
    height: 240px;
    border-radius: 20px;
}

.goods_describe{
    width: 220px;
    color: #666666;
    font-size: 20px;
    line-height: 30px;
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.goods_price{
    width: 220px;
    color: #EF0900;
    font-size: 18px;
    line-height: 18px;
    margin-left: 5px;
}

.classify_goods_item:hover{
    box-shadow: 0px 2px 10px #bbbbbb;
}

.classify_goods_item:hover .goods_describe{
    color: #F10000;
}

</style>