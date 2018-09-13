<template>
    <div class="edit-post">
        <label class="edit-post-title">编辑博客</label>
        <router-link to="/posts" style="float: right;"><Icon type="ios-arrow-back" />返回</router-link>
        <div class="edit-post-content">
            <Form ref="postForm" :model="postForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="title">
                    <Input v-model="postForm.title"  style="width: 300px;"/>
                </FormItem>
                <!--<FormItem label="头图" prop="photo">
                    <div class="demo-upload-list" v-if="postForm.photo&&postForm.photo!=''">
                        <img :src="postForm.photo">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove"></Icon>
                        </div>
                    </div>
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        type="drag"
                        name="upfile"
                        action="/actfiles"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="md-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>-->
                <FormItem label="分类" prop="tag">
                    <Select v-model="postForm.tag" style="width:300px">
                        <Option v-for="item in tags" :key="item._id" :value="item._id">{{item.title}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="简介" prop="info">
                    <md-editer v-model="postForm.info" v-if="showEditer"/>
                </FormItem>
                <FormItem label="内容" prop="content">
                    <md-editer v-model="postForm.content" v-if="showEditer"/>
                </FormItem>
                <FormItem>
                    <Button style="margin-left: 20px;" type="primary" @click="save">保存</Button>
                </FormItem>
            </Form>
        </div>
        <Modal title="预览" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
import mdEditer from './md-editer'
export default {
    data() {
        return {
            tags:[],
            showEditer: false,
            imgUrl: '',
            visible: false,
            postForm:{
                _id: '',
                title: '',
                tag: '',
                // photo: '',
                info: '',
                content: ''
            },
            ruleValidate:{
                title:[
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                tag:[
                    { required: true, message: '分类不能为空', trigger: 'change' }
                ]
            }
        }
    },
    components:{
        mdEditer
    },
    created(){
        this.featchTags();
        this.postForm._id = this.$route.query.id;
        if(this.postForm._id){
            this.getData();
        }else{
            this.showEditer = true;
        }
    },
    methods: { 
        save(){
            this.$refs.postForm.validate(isOk=>{
                if(isOk){
                    this.$ajaxFetch.post('/addblog', this.postForm, res=>{
                        if(res.code==0){
                            this.$Message.success('保存成功');
                            this.$router.push('/posts');
                        }else{
                            this.$Message.error(res.msg);
                        }
                    },error=>{
                        this.$Message.error(error);
                    },'保存中');
                }
            });
        },
        getData(){
            this.$ajaxFetch.post('/getblog', {_id: this.postForm._id}, res=>{
                if(res.code==0){
                    this.postForm = res.data;
                    this.showEditer = true;
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
        },
        // handleView () {
        //     this.imgUrl = this.postForm.photo;
        //     this.visible = true;
        // },
        // handleRemove(){
        //     this.postForm.photo = '';
        // },
        // handleSuccess (res, file) {
        //     if(res.code==0){
        //         file.url=res.data.path;
        //         file.name = res.data.id;
        //         this.$Message.success('上传成功！');
        //         this.postForm.photo = file.url;
        //     }else{
        //         this.$refs.upload.fileList.splice(this.$refs.upload.fileList.length-1,1);
        //         this.$Message.error('上传失败！');
        //     }
        // },
        // handleFormatError (file) {
        //     this.$Message.error('上传文件格式错误！');
        // },
        // handleMaxSize (file) {
        //     this.$Message.error('文件大小不能超过2M！');
        // }
    }
}
</script>


<style  lang="less" scoped>
    .edit-post{
        width: 100%;
        background-color: #fff;
        padding: 20px;
        .edit-post-title{
            font-size: 18px;
        }
        .edit-post-content{
            min-height: 300px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            .demo-upload-list{
                display: inline-block;
                width: 60px;
                height: 60px;
                text-align: center;
                line-height: 60px;
                border: 1px solid transparent;
                border-radius: 4px;
                overflow: hidden;
                background: #fff;
                position: relative;
                box-shadow: 0 1px 1px rgba(0,0,0,.2);
                margin-right: 4px;
            }
            .demo-upload-list img{
                width: 100%;
                height: 100%;
            }
            .demo-upload-list-cover{
                display: none;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0,0,0,.6);
            }
            .demo-upload-list:hover .demo-upload-list-cover{
                display: block;
            }
            .demo-upload-list-cover i{
                color: #fff;
                font-size: 20px;
                cursor: pointer;
                margin: 0 2px;
            }
        }
    }
</style>
