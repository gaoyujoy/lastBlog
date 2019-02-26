<template>
    <div class="menu">
        <ul class="menu-ul">
            <li v-for="item in menus" :key="item.title" :class="['menu-ul-li',{'active': isCurrent(item.menus)}]">
                <router-link :to="item.menus[0]"><Icon class="menu-icon" :type="item.icon" />{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menus:[
                {title: '博客管理', menus:['/posts', '/posts/edit', '/posts/detail'], icon:"md-document"},
                {title: '分类管理', menus:['/tags'],icon:'ios-pricetag'},
                {title: '关于管理', menus:['/about'],icon:'ios-body'},
                {title: '修改密码', menus:['/changePwd'],icon:'ios-build'},
            ],
            currentHref:''
        }
    },
    created(){
        this.currentHref = this.$router.history.current.path;
    },
    watch:{
        $route(to, from){
            this.currentHref = to.path;
        }
    },
    methods: {
        isCurrent(list){
            return list.indexOf(this.currentHref)>=0;
        }
    }
}
</script>

<style  lang="less" scoped>
    .menu{
        width: 180px;
        // height: 100%;
        background-color: #eee;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        font-size: 14px;
        border-right: 1px solid #ddd;
        min-height: 100%;
        .menu-ul{
            margin-top: 60px;
            .menu-ul-li{
                list-style: none;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-bottom: 1px solid #ddd;
                a{
                    width: 100%;
                    height: 100%;
                    display: block;
                    color: #000;
                    transition: all .2s;
                }
                &:hover, &.active{
                    a{
                        background-color: #2db7f5;
                        color: #fff;
                        padding-left: 30px;
                    }
                }
                .menu-icon{
                    font-size: 16px;
                    margin-right: 5px;
                }
            }
        }
    }
</style>
