<template>
    <div class="posts">
        <label class="posts-title">博客管理</label>
        <div class="posts-content">
            <div class="posts-content-search">
                <Form :model="searchForm" :label-width="80" inline>
                    <FormItem label="关键字" prop="keyword">
                        <Input v-model="searchForm.keyword" placeholder="关键字"/>
                    </FormItem>
                    <FormItem label="分类" prop="tag">
                        <Select v-model="searchForm.tag" style="width:100px">
                            <Option v-for="item in tags" :key="item._id" :value="item._id">{{item.title}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" shape="circle" icon="ios-search" @click="toSearch"></Button>
                    </FormItem>
                </Form>
            </div>
            <div class="posts-content-action">
                <Button type="primary" @click="addPost">新建博客</Button>
            </div>
            <Table v-if="showTable" border :columns="columns" :data="datas"></Table>
            <div class="posts-content-page">
                <Page :total="total" :current.sync="page" :page-size="10" show-total show-elevator />
            </div>
        </div>
        <Modal
            title="删除确认"
            v-model="deleteModal"
            @on-ok="toDelete"
            :loading="deleteLoading"
            :mask-closable="false">
            <p>确认删除该博客吗？</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchForm:{
                keyword: '',
                tag:'0'
            },
            showTable: false,
            deleteModal:false,
            deleteLoading: false,
            deleteId: '',
            total: 0,
            page: 1,
            tags:[],
            columns:[
                {
                    title: '博客名',
                    key: 'title'
                },
                {
                    title: '所属分类',
                    render: (h, params)=>{
                        var tagName = '';
                        this.tags.forEach(item=>{
                            if(item._id == params.row.tag){
                                tagName = item.title
                            }
                        })
                        return h('div', {},tagName);
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push(`/posts/detail?id=${params.row._id}`);
                                    }
                                }
                            }, 'View'),
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push(`/posts/edit?id=${params.row._id}`);
                                    }
                                }
                            }, 'Edit'),
                            h('a', {
                                on: {
                                    click: () => {
                                        this.deleteId = params.row._id;
                                        this.deleteLoading = false;
                                        this.deleteModal = true;
                                    }
                                }
                            }, 'Delete')
                        ]);
                    }
                }
            ],
            datas:[]
        }
    },
    created(){
        this.featchTags();
        this.featchPosts();
    },
    watch:{
        page(value){
            this.featchPosts();
        }
    },
    methods: { 
        toSearch(){
            this.page = 1;
            this.featchPosts();
        },
        addPost(){
            this.$router.push('/posts/edit');
        },
        featchPosts(){
            var params = {keyword: this.searchForm.keyword, tag: this.searchForm.tag, page: this.page};
            this.$ajaxFetch.post('/blogs', params, res=>{
                if(res.code==0){
                    this.datas = res.data;
                    this.total = res.total;
                }else{
                    this.$Message.error(res.msg);
                }
            },error=>{
                this.$Message.error(error);
            },'查询中');
        },
        toDelete(){
            this.$ajaxFetch.post('/deleteblog', {_id: this.deleteId}, res=>{
                if(res.code==0){
                    this.$Message.success('删除成功');
                    this.featchPosts();
                }else{
                    this.$Message.error(res.msg);
                }
            },error=>{
                this.$Message.error(error);
            });
        },
        featchTags(){
            this.$ajaxFetch.post('/tags', {}, res=>{
                if(res.code==0){
                    this.tags = res.data;
                    this.tags.splice(0,0,{_id: '0', title: '全部'});
                    this.showTable = true;
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
    .posts{
        width: 100%;
        background-color: #fff;
        padding: 20px;
        .posts-title{
            font-size: 18px;
        }
        .posts-content{
            min-height: 300px;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            .posts-content-search{
                margin-top: 15px;
            }
            .posts-content-page{
                text-align: right;
                margin-top: 20px;
            }
            .posts-content-action{
                text-align: right;
                margin-bottom: 15px;
            }
        }
    }
</style>
