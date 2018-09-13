<template>
    <div class="header">
        <div class="header-head">
            <img class="header-head-img" src="../assets/img/head.jpg"/>
        </div>
        <label class="header-title">Micaiah's Manage</label>
        <Icon class="header-logout" type="md-exit" @click="logout"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        logout(){
            this.$ajaxFetch.post('/logout',{}, res=>{
                location.href="/login";
            },error=>{
                this.$Message.error(error);
            },'登出中')
        }
    }
}
</script>

<style  lang="less" scoped>
    .header{
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        background-color: #000000;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        .header-head{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 40px;
            .header-head-img{
                width: 100%;
            }
        }
        .header-title{
            font-size: 16px;
            margin-left: 10px;
            color: #fff;
        }
        .header-logout{
            cursor: pointer;
            position: absolute;
            right: 30px;
            font-size: 20px;
            transition: all .2s;
            color: #ccc;
            &:hover{
                color: #fff;
            }
        }
    }
</style>
