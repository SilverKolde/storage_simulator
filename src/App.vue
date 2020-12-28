<template>
  <div id="app">
    <app-input :input-lines="inputLines" @inputSelected="inputSelected" :percents="percents">

    </app-input>
    <Output :file-list="fileList" @percentsDone="passPercents"/>
  </div>
</template>

<script>
import Output from "@/components/Output";
import Input from "@/components/Input";

//TODO  Mis saab siis kui ruumi pole??

export default {
  name: 'App',
  components: {
    'app-input': Input,
    Output
  },
  data() {
    return {
      inputLines: inputLineArray(),
      fileList: '',
      percents: []
    }
  },
  methods: {
    inputSelected(fileList) {
      this.fileList = fileList;
    },
    passPercents(percents) {
      this.percents = percents;
    }
  }
}

function inputLineArray() {
  return [
    ['Esimene', 'A,2;B,3;A,-;C,4;B,+3;D,5;E,15;C,-;F,5'],
    ['Teine',   'A,4;B,3;C,6;D,5;C,+2;B,-;E,5;A,-;F,10'],
    ['Kolmas', 'A,2;B,3;C,4;D,5;B,-;E,7;D,-;E,+3;F,10'],
    ['Enda oma', 'enda oma']
  ];
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap');
  body {
    background-color: #dbe7ff;
    font-family: "Roboto Light",sans-serif;
  }
</style>
