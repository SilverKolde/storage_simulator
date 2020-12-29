<template>
  <div id="container">
    <p>Select or insert the list of files (pattern A,2;B,3;A,-;C,4;B,+3;D,5;E,15;C,-;F,5).</p>
    <div v-for="(line, index) in inputLines" :key="index">
      <input type="radio" @click="selectInput(line[1])" name="formula">
      <span class="label">{{line[0]}}</span>
      <span v-if="line[1]==='custom'" ><input type="text" name="custom"/></span>
      <span v-else >{{ line[1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Formulas",
  props: ['inputLines'],
  methods: {
    selectInput(fileList) {
      // Firstly we'll restore original state of Output component
      this.$emit('clearState')
      // Then we'll pass the list of files to be stored
      fileList = (fileList !== 'custom') ? fileList : document.querySelector("input[name=custom]").value
      this.$emit('inputSelected', fileList)
    }
  }
}
</script>

<style scoped>
  .label{
    margin: 0 20px;
    display: inline-block;
    min-width: 60px;
  }

  #container {
    width: 50%;
    margin: 20px;
  }

  input[type=text] {
    width: 250px
  }
</style>