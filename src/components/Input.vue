<template>
  <div id="top">
    <formulas :inputLines="inputLines" @inputSelected="selectedInput"/>
    <calculations/>
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
  props: ['inputLines'],
  methods: {
    selectedInput(fileList) {
      this.$emit('inputSelected', fileList)
    }
  }
}
</script>

<style scoped>
  #top {
    background-color: rgba(0,0,0,0.15);
    display: flex;
    justify-content: flex-start;
    min-height: 200px;
    border-radius: 10px ;
  }
</style>