<template>
    <div class="layout">
        <Header></Header>
        <Menu></Menu>
        <div class="layout-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from './header'
import Menu from './menu'
export default {
    data() {
        return {
        }
    },
    components:{
        Header,
        Menu
    }
}
</script>

<style  lang="less" scoped>
    .layout{
        height: 100%;
        .layout-content{
            padding: 90px 30px 0 210px;
        }
    }
</style>
