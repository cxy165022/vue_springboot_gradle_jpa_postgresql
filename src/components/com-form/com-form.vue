<template>
<div id="com-form" @keyup.enter="handleSubmit('submit')">
  <Form ref="form" :model="model" :rules="rules" :inline="inline" :label-width="labelWidth" :label-position="labelPosition" :style="formWidth">
    <slot> </slot>
    <FormItem v-if="!item.visible" element v-for="(item, index) in elem" :key="index" :prop="item.prop" :label="item.label" :label-width="item.labelWidth" :style="item.width">
      <template v-if="!item.button">
        <span v-if="item.name">{{item.name}}:</span>
        <Input v-if="!item.element" :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :icon="item.icon" :number="item.number" :rows="item.rows" :autosize="item.autosize" :class="{yzminput:item.yzm}"></Input>
        <!-- 输入框 -->
        <InputNumber v-if="item.element === 'number'" :max="item.max" :min="item.min" v-model="model[item.prop]" :size="item.size" :disabled="item.disabled"></InputNumber>
        <img src="../../assets/login_ma.jpg" v-if="item.yzm" class="yzm">
        <!-- 数字输入框 -->
        <Select v-if="item.element === 'select'" v-model="model[item.prop]" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :filterable="item.filterable" :multiple="item.multiple" :style="item.selectWidth">
          <Option v-for="(opt, index) in item.option" :key="index" :value="opt.value" :disabled="opt.disabled">{{ opt.label }}</Option>
        </Select>
        <!-- 选择器 -->
        <DatePicker v-if="item.element === 'date'" :type="item.type" v-model="model[item.prop]" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled"></DatePicker>
        <!-- 日期选择器 -->
        <TimePicker v-if="item.element === 'time'" :type="item.type" v-model="model[item.prop]" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled"></TimePicker>
        <!-- 时间选择器 -->
        <RadioGroup v-if="item.element === 'radio'" :type="item.type" v-model="model[item.prop]" :size="item.size" :vertical="item.vertical">
          <Radio v-for="(opt, index) in item.option" :key="index" :label="opt.value" :size="item.size" :disabled="opt.disabled">{{ opt.label }}</Radio>
        </RadioGroup>
        <!-- 单选框 -->
        <CheckboxGroup v-if="item.element === 'checkbox'" v-model="model[item.prop]" :size="item.size">
          <Checkbox v-for="(opt, index) in item.option" :key="index" :label="opt.value" :size="item.size" :disabled="opt.disabled">{{ opt.label }}</Checkbox>
        </CheckboxGroup>
        <!-- 多选框 -->
      </template>
      <template v-else>
        <Button class="button" v-for="(item, index) in item.button" v-if="item.visible" :key="index" :type="item.type === 'ghost' ? 'default' : item.type" :long="item.long" :disabled="item.disabled" :loading="item.name === 'submit' ? btnLoading : false" :icon="item.icon" @click="handleSubmit(item.name)">{{ item.text }}</Button>
        <!-- 按钮 -->
      </template>
    </FormItem>
    <slot name="foot"> </slot>
  </Form>
  <Spin v-if="loading" size="large" fix></Spin>
</div>
</template>
<script>
export default {
  name: 'ComForm',
  props: {
    elem: Array, // 表单元素数组
    model: Object, // 表单数据对象
    rules: Object, // 表单验证对象
    width: Number, // 表单宽度
    labelWidth: Number, // 表单域标签宽度
    labelPosition: {
      validator(value) {
        let validList = ['left', 'right', 'top']
        for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
            return true
          }
        }
        return false
      },
      default: 'right'
    }, // 表单域标签位置
    inline: {
      type: Boolean,
      default: false
    }, // 行内表单模式
    // 表单加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 按钮加载状态
    btnLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formWidth() {
      let style = {}
      if (this.width) {
        style.maxWidth = `${this.width}px`
      }
      return style
    }
  },
  mounted() {
    let elem = this.elem
    for (var i = 0; i < elem.length; i++) {
      let width = elem[i].width
      let selectWidth = elem[i].selectWidth
      if (parseInt(width)) {
        elem[i].width = {
          width: `${width}px`
        }
      }
      if (parseInt(selectWidth)) {
        elem[i].selectWidth = {
          width: `${selectWidth}px`
        }
      }
    }
  },
  methods: {
    validate(callback) {
      let validate = true
      // 对整个表单进行校验
      this.$refs['form'].validate(valid => (validate = valid))
      callback(validate)
    },
    validateField(prop) {
      // 对部分表单字段进行校验的方法
      this.$refs['form'].validateField(prop)
    },
    resetFields() {
      // 对整个表单进行重置
      this.$refs['form'].resetFields()
    },
    handleSubmit(name) {
      switch (name) {
        case 'submit':
          // 对整个表单进行校验
          this.$refs['form'].validate(valid => {
            if (valid) {
              // this.$emit('on-submit')
            }
          })
          this.$emit('on-submit')
          break
        case 'reset':
          // 对整个表单进行重置
          this.resetFields()
          this.$emit('on-reset')
          break
        case 'create':
          // 打开添加表单
          this.$emit('on-create')
          break
        case 'edit':
          // 修改表单
          this.$emit('on-update')
          break
        case 'delete':
          // 批量删除数据
          this.$emit('on-delete')
          break
        case 'export':
          // 导出数据
          this.$emit('on-export')
          break
        case 'import':
          // 导出数据
          this.$emit('on-import')
          break
        default:
          this.$emit('on-click')
      }
    }
  }
}
</script>
<style lang="less" scoped>
#com-form {
    position: relative;
    & .button {
        margin-right: 8px;
        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
