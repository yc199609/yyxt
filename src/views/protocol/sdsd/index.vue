<template>
  <div>
    <Json-editor ref="jsonEditor" v-model="json" />
  </div>
</template>

<script>
import JsonEditor from '@/components/jsonEditor'
export default {
  data(){
    return {
      json:{}
    }
  },
  components:{
    JsonEditor
  }
}
</script>