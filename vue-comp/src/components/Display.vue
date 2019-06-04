<template>
  <div ref="display"></div>
</template>

<script>
import Vue from 'vue'
import random from '../utils/random_str'
export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      html: '',
      css: '',
      js: '',
      component: null,
      id: random()
    }
  },
  mounted () {
    this.renderCode()
  },
  methods: {
    getSources (source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)

      if (!openingTag) return ''
      else openingTag = openingTag[0]

      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`))
    },
    splitCode () {
      const script = this.getSources(this.code, 'script').replace(/export default/, 'return')
      const style = this.getSources(this.code, 'style')
      const template = '<div id="app">' + this.getSources(this.code, 'template') + '</div>'

      this.js = script
      this.css = style
      this.html = template
    },
    renderCode () {
      this.splitCode()

      if (this.html !== '' && this.js !== '') {
        /* eslint-disable */
        const parseStrToFunc = new Function(this.js)()

        parseStrToFunc.template = this.html

        const Component = Vue.extend(parseStrToFunc)
        this.component = new Component().$mount()

        this.$refs.display.appendChild(this.component.$el)
      }

      if (this.css !== '') {
        const style = document.createDocument('style')
        style.type = 'text/css'
        style.id = this.id
        style.innerHtml = this.css
        document.getElementsByTagName('head')[0].appendChild(style)
      }
    },
    destoryCode () {
      const $target = document.getElementById(this.id)
      if ($target) $target.parentNode.removeChild($target)

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el)
        this.component.$destroy()
        this.component = null
      }
    }
  },
  beforeDestroy () {
    this.destoryCode()
  },
  watch: {
    code () {
      this.destoryCode()
      this.renderCode()
    }
  }
}
</script>

<style>

</style>
