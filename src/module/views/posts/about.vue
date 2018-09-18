<template>
    <div class="about">
        <label class="about-title">关于</label>
        <div class="about-content">
            <Form ref="aboutForm" :model="aboutForm">
                <FormItem>
                    <md-editer v-model="aboutForm.content" v-if="showEditer"/>
                </FormItem>
                <FormItem style="text-align: right;">
                    <Button style="margin-left: 20px;" type="primary" @click="save">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import mdEditer from './md-editer'
export default {
    data() {
        return {
            tags:[],
            deleteImg: false,
            showEditer: false,
            aboutForm:{
                _id: '',
                content: ''
            }
        }
    },
    created(){
        this.getData();
    },
    components:{
        mdEditer
    },
    methods: { 
        save(){
            this.$ajaxFetch.post('/editabout', this.aboutForm, res=>{
                if(res.code==0){
                    this.$Message.success('保存成功');
                }else{
                    this.$Message.error(res.msg);
                }
            },error=>{
                this.$Message.error(error);
            },'保存中');
        },
        getData(){
            this.$ajaxFetch.post('/getabout', {}, res=>{
                if(res.code==0){
                    if(res.data){   
                        this.aboutForm = res.data || {content: ''};
                        this.showEditer = true;
                    }
                }else{
                    this.$Message.error(res.msg);
                }
            },error=>{
                this.$Message.error(error);
            },'查询中');
        }
    }
}
</script>


<style  lang="less" scoped>
    .about{
        width: 100%;
        background-color: #fff;
        padding: 20px;
        .about-title{
            font-size: 18px;
        }
        .about-content{
            min-height: 300px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
    }
</style>
