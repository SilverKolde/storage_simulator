<template>
  <div class="output-container">
<!--    There must be a nicer way to manage state, but I don't have time to dive into that right now. -->
    <small style="display: none">We have tried {{inputCounter}} different inputs.</small>
    <p v-if="filesStr === ''">Please select an algorithm.</p>
    <div v-else>
      <p>Output for the following list of files: {{ filesStr }}</p>
      <div class="row">
        <p></p>
        <div v-for="i in 48" :key="i" class="cell col-nr">{{i}}</div>
      </div>
      <div v-for="i in nrOfSteps" :key="i" class="row">
        <p>Step {{i}}</p>
        <div v-for="j in 48" :key="j" class="cell" :class="pickColor(i, j)">
          {{ resultMatrix[i - 1][j - 1] }}
        </div>
        <div v-if="outOfStorage && i===nrOfSteps" class="error-container">
          Could not
          <span v-if="outOfStorageHelper">allocate extra units for</span>
          <span v-else>store</span>
          file {{unstorable(i)}} at step {{i+1}}. Ran out ouf Storage space.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const MatrixMaker = require('../logic/MatrixMaker');
const PercentsCalculator = require('../logic/PercentsCalculator');

export default {
  name: "Output",
  props: ['fileList', 'counter'],
  computed: {
    filesStr: function () {
      return this.fileList;
    },
    nrOfSteps: function () {
      const files = this.fileList.split(";");
      this.calculateResult(files);
      const lastRow = this.resultMatrix[this.resultMatrix.length-1];
      const percents = PercentsCalculator.getPercents(lastRow);
      this.$emit('percentsDone', percents);
      return this.resultMatrix.length;
    },
    inputCounter: function () {
      this.clearOutput();
      return this.counter;
    }
  },
  data() {
    return {
      resultMatrix: [[]], // input changes -> computed property invoked -> resultMatrix (re)generated
      outOfStorage: false,
      outOfStorageHelper: false
    }
  },
  methods: {
    calculateResult(files) {
      let matrix = MatrixMaker.getResult(files);
      if (matrix[matrix.length-1] === 'Out of storage!') {
        this.outOfStorage = true;
        // determine if couldn't place a new file or extend existing
        const rowBefore = matrix[matrix.length-2];
        const fileNotStored = files[matrix.length-1].charAt(0);
        this.outOfStorageHelper = rowBefore.includes(fileNotStored);
        // remove error message from matrix
        matrix.pop();
      }
      this.resultMatrix = matrix;
    },
    pickColor(i, j) {
      const fileName = this.resultMatrix[i-1][j-1];
      const fileNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const index = fileNames.indexOf(fileName);
      return "file-name" + index.toString();
    },
    unstorable(i) {
      const files = this.fileList.split(';');
      const file = files[i].split(',');
      return file[0];
    },
    clearOutput() {
      this.resultMatrix = [[]];
      this.outOfStorage = false;
      this.outOfStorageHelper = false;
    }
  }
}
</script>

<style scoped>
  .row > p {
    display: inline-block;
    width: 75px;
    height: 25px;
    margin: 0;
  }

  .cell {
    width: 25px;
    height: 25px;
    outline: solid black 1px;
    display: inline-block;
    text-align: center;
  }

  .col-nr {
    outline: none;
  }

  .output-container {
    background-color: #a8e4f7;
    padding: 20px;
    margin-top: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 1px 1px 2px 2px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -moz-box-shadow:    1px 1px 2px 2px #ccc;  /* Firefox 3.5 - 3.6 */
    box-shadow:         1px 1px 2px 2px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
  }

  .error-container {
    padding: 5px 10px;
    margin-top: 10px;
    margin-left: 75px;
    background-color: #E64A19;
    border-radius: 5px;
    max-width: 1180px;
    border: 1px solid rgba(0,1,4,0.8);
    text-align: center;
    -webkit-box-shadow: 1px 1px 2px 2px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -moz-box-shadow:    1px 1px 2px 2px #ccc;  /* Firefox 3.5 - 3.6 */
    box-shadow:         1px 1px 2px 2px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
  }



  /* Dont look down! It will burn your eyes! */


  .file-name0 {
    background-color: #EF5350;
  }

  .file-name1 {
    background-color: #1E88E5;
  }

  .file-name2 {
    background-color: #1DE9B6;
  }

  .file-name3 {
    background-color: #DCE775;
  }

  .file-name4 {
    background-color: #26C6DA;
  }

  .file-name5 {
    background-color: #9CCC65;
  }

  .file-name6 {
    background-color: #F4FF81;
  }

  .file-name7 {
    background-color: #69F0AE;
  }

  .file-name8 {
    background-color: #FFE082;
  }

  .file-name9 {
    background-color: #FFE0B2;
  }

</style>