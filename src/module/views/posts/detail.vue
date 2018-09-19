<template>
    <div class="detail">
        <label class="detail-title">预览博客</label>
        <router-link to="/posts" style="float: right;"><Icon type="ios-arrow-back" />返回</router-link>
        <div class="detail-content">
            <!--<div class="show-photo" v-if="blog.photo&&blog.photo!=''">
                <img :src="blog.photo" alt="头图">
            </div>-->
            <div class="show-title">
                <h1 itemprop="headline">{{blog.title}}</h1>
            </div>
            <div class="article__info clearfix">
                <ul class="left-col menu">
                    <li>{{getTag}}</li>
                </ul>
                <ul class="right-col menu">
                    <li>
                        <Icon type="ios-calendar" />
                        <time itemprop="datePublished">{{blog.created_at}}</time>
                    </li>
                    <li itemprop="interactionStatistic" itemscope="" itemtype="http://schema.org/InteractionCounter">
                        <Icon type="md-eye" /> 
                        <span class="js-pageview" data-page-key="100017">{{blog.view}}</span> 阅读
                    </li>
                </ul>
            </div>
            <div class="detail-content-content" v-html="formatContent"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postId: '',
            blog:{
                info: '',
                content: '',
                // photo: '',
                title: '',
                tag: '',
                view: 0,
                created_at: ''
            },
            tags: []
        }
    },
    created(){
        this.featchTags();
        this.postId = this.$route.query.id;
        if(this.postId){
            this.getData();
        }
    },
    computed:{
        getTag(){
            var tagName = '';
            this.tags.forEach(item=>{
                if(item._id == this.blog.tag){
                    tagName = item.title
                }
            })
            return tagName;
        },
        formatContent(){
            return this.$marked(this.blog.content);
        }
    },
    methods: { 
        getData(){
            this.$ajaxFetch.post('/getblog', {_id: this.postId}, res=>{
                if(res.code==0){
                    this.blog = res.data;
                }else{
                    this.$Message.error(res.msg);
                }
            },error=>{
                this.$Message.error(error);
            },'查询中');
        },
        featchTags(){
            this.$ajaxFetch.post('/tags', {}, res=>{
                if(res.code==0){
                    this.tags = res.data;
                }else{
                    this.$Message.error(res.msg);
                }
            },error=>{
                this.$Message.error(error);
            });
        }
    }
}
</script>


<style  lang="less" scoped>
    .detail{
        width: 100%;
        background-color: #fff;
        padding: 20px;
        .clearfix:after{
            content: "";
            display: table;
            clear: both;
        }
        .detail-title{
            font-size: 18px;
        }
        .detail-content{
            min-height: 300px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            // .show-photo{
            //     width: 100%;
            //     max-height: 350px;
            //     overflow: hidden;
            //     margin-bottom: 30px;
            //     img{
            //         width: 100%;
            //     }
            // }
            .show-title{
                h1{
                    font-size: 40px;
                }
            }
            ul {
                li{
                    list-style-type: none;
                }
            }
            .left-col{
                float: left;
                li{
                    display: inline-block;
                    height: 22px;
                    border-radius: 11px;
                    padding: 2px 5px;
                    color: #333;
                    background-color: #f2f2f2;
                    font-size: 14px;
                }
            }
            .right-col{
                float: right;
                font-size: 14px;
                &.menu{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    flex-wrap: wrap;
                    margin-top: 0;
                    margin-bottom: 0;
                    i{
                        font-size: 16px;
                    }
                    &>&{
                        vertical-align: middle;
                    }
                }
                li:not(:last-child){
                    border: 0 solid #888;
                    border-right-width: 1px;
                    line-height: 1.2;
                    padding-right: .7rem;
                    margin-right: .7rem;
                }
            }   
            .detail-content-content{
                margin-top: 30px;
            }
        }
    }
</style>
