<template>
    <div>
        <div class="time-base">
            <div v-for="i in 60" class="time-base-s">
                <span class="time-s" v-if="i%5!=0">{{getShowNumber(i)}}</span>
                <template v-else>{{getShowNumber(i)}}</template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '首页'
        }
    },
    methods: {
        getShowNumber: function(i){
            if(i%5==0){
                return (i<10 ? `0${i}` : i);
            }else{
                return '|'
            }
        }
    }
}
</script>

<style  lang="less">
    body{
        background-color: black;
        color: white;
        .time-base {
            width: 500px;
            height: 500px;
            border: 1px solid red;
            margin: 0 auto;
            position: relative;
            .time-base-s{
                position: absolute;
                // transform-origin:
            }
        } 
    }
</style>
