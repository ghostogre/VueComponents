<template>
  <label>
    <span>
      <!-- 复选框 -->
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="change"
        v-model="model">
      <!-- 单选框 -->
      <input
        v-else
        type="checkbox"
        :checked="currentValue"
        :disabled="disabled"
        @change="change">
    </span>
    <slot></slot>
  </label>
</template>

<script>
import { findComponentUpward } from '../utils/assist.js'
import Emitter from '../mixins/emitter.js'
export default {
  name: 'iCheckbox',
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    }
  },
  data () {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'iCheckboxGroup')

    if (this.parent) {
      this.group = true
    }

    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  },
  methods: {
    change (event) {
      if (this.disabled) {
        return false
      }

      const checked = event.target.checked
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)
      if (this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        // 开启form校验
        this.dispatch('iFormItem', 'on-form-change', value)
      }
    },
    // 更新数据
    updateModel () {
      this.currentValue = this.value === this.trueValue
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        throw new Error('Value should be trueValue or falseValue')
      }
    }
  }
}
</script>

<style>

</style>
