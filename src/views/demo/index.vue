<template>
  <div>
    <Gauge
      :chartWidth="'400px'"
      :chartHeight="'300px'"
    />
  </div>

</template>
<script>
import Gauge from '@/components/Gauge'
export default {
  data() {
    return {

    }
  },
  components: {
    Gauge
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.yc {
  @include fontSize(18, 25);
}
</style>