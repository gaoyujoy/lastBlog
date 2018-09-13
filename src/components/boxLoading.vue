<template>
    <transition name="loading-fade">
        <div class="loading-base" v-if="isShow">
            <div class="loading">
                <div>
                    <img class="loading-gif" src="../assets/img/loading.png"/>
                    <span>{{message}}</span>
                </div>
            </div>
        </div>
    </transition> 
</template>
<script>
    export default {
      data() {
        return {
            isShow: false,
            message: ''
        }
      },
      methods:{
          show(message){
              this.message = message || '加载中...';
              document.getElementsByTagName('body')[0].style.overflow="hidden";
              this.isShow = true;
          },
          hide(){
              document.getElementsByTagName('body')[0].style.overflow="inherit";
              this.isShow = false;
          }
      }
    }
</script>
<style>
    .loading-fade-enter-active, .loading-fade-leave-active {
        transition: opacity .5s
    }
    .loading-fade-enter, .loading-fade-leave-to {
        opacity: 0
    }
    .loading-gif{
        animation: ani-load-loop 1s linear infinite;
    }
</style>

<style lang="less" scoped>
    .loading-base{
        position: fixed;
        top: 0;
        z-index: 1001;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.3);
    }
    .loading{
        position: absolute;
        top: 50%;
        left: 50%;
        &>div{ 
            position: relative;
            padding-top: 1px;
            margin: -50%; 
            height: 120px;
            width: 150px;
            background-color: #7f7f7f;
            span{
                color: #ffffff;
                font-size: 14px; 
                text-align: center;
                display: block;
                position: absolute;
                margin-top: -15px;
                width: 100%;
            }
        }
        .loading-gif{
            display: block;
            margin: 28px auto;
        }
    }
</style>