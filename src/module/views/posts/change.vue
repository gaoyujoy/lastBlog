<template>
    <div class="change-pwd">
        <label class="change-pwd-title">修改密码</label>
        <div class="change-pwd-content">
            <Form ref="userForm" :model="userForm" :rules="ruleValidate" label-position="top" style="width: 300px;">
                <FormItem label="旧密码" prop="oldpwd">
                    <Input type="password" v-model="userForm.oldpwd"/>
                </FormItem>
                <FormItem label="新密码" prop="pwd">
                    <Input type="password" v-model="userForm.pwd"/>
                </FormItem>
                <FormItem label="确认密码" prop="repwd">
                    <Input type="password" v-model="userForm.repwd"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="changePwd">修改</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userForm:{
                oldpwd: '',
                pwd: '',
                repwd: ''
            },
            ruleValidate:{
                oldpwd: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' }
                ],
                repwd: [
                    { required: true, message: '重复密码不能为空', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                        if(value!=this.userForm.pwd){
                            callback('两次密码不一致')
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
            }
        }
    },
    methods: { 
        changePwd(){
            this.$refs.userForm.validate(isOk =>{
                if(isOk){
                    this.$ajaxFetch.post('/changepwd', this.userForm, res=>{
                        if(res.code==0){
                            this.$Message.success('修改成功');
                            setTimeout(()=>{
                                location.reload();
                            }, 1000);
                        }else{
                            this.$Message.error(res.msg);
                        }
                    },error=>{
                        this.$Message.error(error);
                    },'登录中');
                }
            })
        }
    }
}
</script>


<style  lang="less" scoped>
    .change-pwd{
        width: 100%;
        background-color: #fff;
        padding: 20px;
        .change-pwd-title{
            font-size: 18px;
        }
        .change-pwd-content{
            min-height: 300px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            
        }
    }
</style>
