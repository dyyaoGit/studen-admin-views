<template>
    <div>
      <h3>
        修改密码
      </h3>
      <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
        }
        return {
          ruleForm2: {
            pass: '',
            checkPass: '',
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm() {
          let params ={
            password:this.ruleForm2.pass,
            new_password:this.ruleForm2.checkPass
          }
          this.$axios.put(this.$api.password,params).then(res=>{
            console.log(res);
          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>

</style>
