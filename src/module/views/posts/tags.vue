<template>
    <div class="tags">
        <label class="tags-title">分类管理</label>
        <div class="tags-content">
            <div class="tags-content-action">
                <Button type="primary" @click="addTag">新建分类</Button>
            </div>
            <Table border :columns="columns" :data="datas"></Table>
        </div>
        <Modal
            title="分类编辑"
            v-model="editModal"
            @on-ok="toAddTag"
            :loading="editLoading"
            :mask-closable="false">
            <Form ref="editForm" :model="editForm" :label-width="80">
                <FormItem label="分类名称" :rules="editValidate" prop="title">
                    <Input v-model="editForm.title" placeholder="分类名称"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal
            title="删除确认"
            v-model="deleteModal"
            @on-ok="toDelete"
            :loading="deleteLoading"
            :mask-closable="false">
            <p>确认删除该分类吗？</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editModal: false,
            editLoading: false,
            deleteModal: false,
            deleteLoading: false,
            deleteId: '',
            editForm:{
                title: ''
            },
            editId: '',
            editValidate:{
                title:[
                    { required: true, message: '分类名称不能为空', trigger: 'blur' }
                ]
            },
            columns:[
                {
                    title: '分类名',
                    key: 'title'
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
                                        this.editId = params.row._id;
                                        this.editForm.title = params.row.title;
                                        this.editModal = true;
                                    }
                                }
                            }, 'edit'),
                            h('a', {
                                on: {
                                    click: () => {
                                        this.deleteId = params.row._id;
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
        this.featchData();
    },
    methods: { 
        addTag(){
            this.editId = '';
            this.editModal = true;
        },
        toAddTag(){
            this.editLoading = true;
            this.$refs.editForm.validate(isOk=>{
                if(isOk){
                    var params = {title: this.editForm.title};
                    if(this.editId!=''){
                        params._id = this.editId;
                    }
                    this.$ajaxFetch.post('/addtag', params, res=>{
                        if(res.code==0){
                            this.$Message.success('保存成功');
                            this.editLoading=false;
                            this.editModal = false;
                            this.featchData();
                        }else{
                            this.editLoading=false;
                            this.$Message.error(res.msg);
                        }
                    },error=>{
                        this.$Message.error(error);
                    },'保存中');
                }
            })
        },
        toDelete(){
            this.deleteLoading = true;
            this.$ajaxFetch.post('/deletetag', {_id: this.deleteId}, res=>{
                if(res.code==0){
                    this.$Message.success('删除成功');
                    this.deleteId = '';
                    this.deleteLoading = false;
                    this.deleteModal = false;
                    this.featchData();
                }else{
                    this.$Message.error(res.msg);
                }
            },error=>{
                this.$Message.error(error);
            },'删除中');
        },
        featchData(){
            this.$ajaxFetch.post('/tags', {}, res=>{
                if(res.code==0){
                    this.datas = res.data;
                }else{
                    this.$Message.error(res.msg);
                }
            },error=>{
                this.$Message.error(error);
            },'查询中');
        },
    }
}
</script>


<style  lang="less" scoped>
    .tags{
        width: 100%;
        background-color: #fff;
        padding: 20px;
        .tags-title{
            font-size: 18px;
        }
        .tags-content{
            min-height: 300px;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            .tags-content-action{
                text-align: right;
                margin: 15px 0;
            }
        }
    }
</style>
