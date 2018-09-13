<template>
    <div class="login-main">
        <div class="login-body">
            <div class="login-body-title">Micaiah-后台管理系统</div>
            <div class="login-body-content">
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input size="large" type="text" v-model="formInline.user" placeholder="用户名" @on-enter="handleSubmit">
                            <Icon size="20" type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input size="large" type="password" v-model="formInline.password" placeholder="密码" @on-enter="handleSubmit">
                            <Icon size="20"  type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button long size="large" type="primary" @click="handleSubmit">登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formInline:{
                user:'',
                password: ''
            },
            ruleInline:{
                user: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(){
            this.$refs.formInline.validate(isOk=>{
                if(isOk){
                    this.$ajaxFetch.post('/login', this.formInline, res=>{
                        location.href= res.redirect_uri || '/';
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
    .login-main{
        width: 100%;
        height: 100%;
        padding-top: 1px;
        .login-body{
            margin: 200px auto;
            .login-body-title{
                font-size: 24px;
                color: #000000;
                text-align: center;
            }
            .login-body-content{
                width: 400px;
                border-radius: 6px;
                margin: 20px auto 0;
                background-color: #ffffff;
                padding: 40px 20px;
                box-shadow: 0 0 10px 1px #ddd;
            }
        }
    }
</style>
