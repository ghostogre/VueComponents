<template>
 <div>
   <i-form :model="formValidate" :rules="ruleValidate">
     <i-form-item label="用户名" prop="name">
       <i-input v-model="formValidate.name"></i-input>
     </i-form-item>
     <i-form-item label="邮箱" prop="mail">
       <i-input v-model="formValidate.mail"></i-input>
     </i-form-item>
   </i-form>
 </div>
</template>

<script>
import iForm from '../components/IForm'
import iFormItem from '../components/IFormItem'
import iInput from '../components/IInput'
export default {
  components: {
    iForm,
    iFormItem,
    iInput
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'mail', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
