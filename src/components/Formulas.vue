<template>
  <div>
    <p>Vali või sisesta järjend (kujul A,2;B,3;A,-;C,4;B,+3;D,5;E,15;C,-;F,5). Max 10 faili.</p>
    <div v-for="(line, index) in inputLines" :key="index" class="line">
      <input type="radio" @click="selectInput(line[1])" name="formula">
      <span>{{line[0]}}</span>
      <span v-if="line[1]==='enda oma'" ><input type="text" name="custom"/></span>
      <span v-else>{{ line[1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Formulas",
  props: ['inputLines'],
  methods: {
    selectInput(fileList) {
      fileList = (fileList !== 'enda oma') ? fileList : document.querySelector("input[name=custom]").value
      this.$emit('inputSelected', fileList)
    }
  }
}
</script>

<style scoped>
  .line > span {
    margin-left: 20px;
  }
</style>