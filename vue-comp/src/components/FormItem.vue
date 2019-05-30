<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{label}}</label>
    <div>
      <slot></slot>
      <div class="i-form-item-message" v-if="validateState == 'error'">{{validateMessage}}</div>
    </div>
  </div>
</template>

<script>
import emitter from '../mixins/emitter'
import AsyncValidate from 'async-validator'
export default {
  name: 'iFormItem',
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  inject: [ 'form' ],
  data () {
    return {
      isRequired: false, // 是否为必填
      validateState: '', // 校验状态
      validateMessage: '' // 提示信息
    }
  },
  computed: {
    // 动态获得表单组件的数据
    fieldValue () {
      return this.form.model[this.prop]
    }
  },
  mounted () {
    // 组件渲染的时候将组件渲染到form里面
    if (this.prop) { // 没有传入prop无需校验
      this.dispatch('iForm', 'on-form-item-add', this)

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue

      this.setRules()
    }
  },
  // 组件销毁的时候移除实例
  beforeDestroy () {
    this.dispatch('iForm', 'on-form-item-remove', this)
  },
  methods: {
    setRules () {
      let rules = this.getRules()
      if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.required
        })
      }
      this.$on('on-form-blur', this.onFieldBlur)
      this.$on('on-form-change', this.onFieldChange)
    },
    // 获取校验规则
    getRules () {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || [])
    },
    // 只支持blur和change，筛选适合的规格
    getFilteredRule (trigger) {
      const rule = this.getRules()
      return rule.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    /**
     * 校验数据
     * trigger: 校验类型
     * callback: 回调类型
     */
    validate (trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger)

      if (!rules || rules.length === 0) {
        return true
      }

      // 设置校验中
      this.validateState = 'validating'

      let descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidate(descriptor)

      let model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstField: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage)
      })
    }
  },
  onFieldBlur () {
    this.validate('blur')
  },
  onFieldChange () {
    this.validate('change')
  },
  resetField () {
    this.validateState = ''
    this.validateMessage = ''

    this.form.model[this.prop] = this.initialValue
  }
}
</script>

<style>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>
