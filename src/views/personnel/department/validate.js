import { validEmail, validPhone } from '@/utils/validate'
export default {
  data() {
    return {
      rules: {
        parentId: [
          { required: true, message: '请输入上级部门', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入1-15位字符' }
        ],
        code: [
          { required: true, message: '请输入部门代码', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入1-15位字符' }
        ],
        phone: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validEmail, trigger: 'blur' }
        ],
        properties: [
          { required: true, message: '请输入部门性质', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入1-15位字符' }
        ],
        fax: [
          { required: true, message: '请输入传真', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入1-15位字符' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  }
}
