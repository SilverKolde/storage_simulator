<template>
  <div id="app">
    <app-input :input-lines="inputLines" @inputSelected="selectedInput">

    </app-input>
    <Output :file-list="fileList"/>
  </div>
</template>

<script>
import Output from "@/components/Output";
import Input from "@/components/Input";

export default {
  name: 'App',
  components: {
    'app-input': Input,
    Output
  },
  data() {
    return {
      inputLines: inputLineArray(),
      fileList: ''
    }
  },
  methods: {
    selectedInput(fileList) {
      this.fileList = fileList;
    }
  }
}

function inputLineArray() {
  return [
    ['Esimene', 'A,2;B,3;A,-;C,4;B,+3;D,5;E,15;C,-;F,5'],
    ['Teine', 'dsddsddsdsdsdsd'],
    ['Kolmas', 'fddfdfdfgghtre345'],
    ['Enda oma', 'enda oma']
  ];
}

</script>

<style>


</style>
