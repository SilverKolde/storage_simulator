<template>
  <div id="top">
    <formulas :inputLines="inputLines" @inputSelected="inputSelected" @clearState="clearState"/>
    <calculations :percents="passPercents"/>
  </div>
</template>

<script>
import Formulas from "@/components/Formulas";
import Calculations from "@/components/Calculations";

export default {
  name: "Input",
  components: {
    Formulas,
    Calculations
  },
  props: ['inputLines', 'percents'],
  computed: {
    passPercents: function () {
      return this.percents;
    }
  },
  methods: {
    inputSelected(fileList) {
      this.$emit('inputSelected', fileList)
    },
    clearState() {
      this.$emit('clearState')
    }
  }
}
</script>

<style scoped>
  #top {
    background-color: #a8e4f7;
    display: flex;
    justify-content: flex-start;
    min-height: 200px;
    border-radius: 10px;
    -webkit-box-shadow: 1px 1px 2px 2px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -moz-box-shadow:    1px 1px 2px 2px #ccc;  /* Firefox 3.5 - 3.6 */
    box-shadow:         1px 1px 2px 2px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
  }
  #main-container {
    width: 50%;
    margin: 20px;
  }
</style>