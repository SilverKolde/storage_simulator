<template>
  <div class="output-container">
    <p v-if="filesStr === ''">Palun valige valem.</p>
    <div v-else>
      <p>Väljund järjendile: {{ filesStr }}</p>
      <div class="row">
        <p></p>
        <div v-for="i in 48" :key="i" class="cell col-nr">{{i}}</div>
      </div>
      <div v-for="i in files" :key="i" class="row">
        <p>Samm {{i}}</p>
        <div v-for="j in 48" :key="j" class="cell" :class="pickColor(i, j)">
          {{ resultMatrice[i-1][j-1] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Output",
  props: ['fileList'],
  computed: {
    filesStr: function () {
      return this.fileList;
    },
    files: function () {
      const files = this.fileList.split(";");
      this.calculateResult(files);
      const percents = getPercents(this.resultMatrice);
      this.$emit('percentsDone', percents);
      return files.length;
    }
  },
  data() {
    return {
      resultMatrice: [[]] // to be calculated when input changes -> computed property invoked
    }
  },
  methods: {
    calculateResult(files) {
      this.resultMatrice = getResult(files);
    },
    pickColor(i, j) {
      const fileName = this.resultMatrice[i-1][j-1];
      const fileNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const index = fileNames.indexOf(fileName);
      return "file-name" + index.toString();
    }
  }
}

function getResult(files) {
  let matrice = [];
  let n = (files === undefined) ? 9 : files.length;

  for (let i = 0; i < n; i++) {

    const file = files[i].split(","); // ["A", "2"] and so on
    const name = file[0];
    let size = file[1];
    let action = 'allocate more units';

    if (size.charAt(0) === '-'){
      action = 'remove';
      size = size.substring(1, size.length);
    }
    else if (size.charAt(0) === '+'){
      size = size.substring(1, size.length);
    }
    size = parseInt(size);

    let currentRow = [];

    if (i===0) {
      for (let j = 0; j < 48; j++) {
        if (j < size) currentRow.push(name);
        else currentRow.push("-");
      }
    } else {
      const previousRow = matrice[i-1];
      for (let j = 0; j < 48; j++) {
        if (action === 'remove') {
          const letter = (previousRow[j]===name) ? '-' : previousRow[j];
          currentRow.push(letter);
        }
        else if (size > 0 && previousRow[j] === '-') {
          if (previousRow[j] === '-') {
            currentRow.push(name);
            size--;
          }
        } else {
          currentRow.push(previousRow[j]);
        }
      }
    }
    matrice.push(currentRow);
  }
  return matrice;
}

function getPercents(resultMatrice) {

  let percents = [];

  let allFiles = new Set();
  let fragmentedFiles = new Set();

  let lastRow = resultMatrice[resultMatrice.length-1]
  for (let i = 0; i < lastRow.length; i++) {
    const cellValue = lastRow[i];

    if (i === 1) {
      allFiles.add(cellValue)
    } else {
      const previousValue = lastRow[i-1];
      if (cellValue !== previousValue) {
        if (allFiles.has(cellValue))
          fragmentedFiles.add(cellValue);
        else
          allFiles.add(cellValue);
      }
    }
  }

  allFiles.delete('-');
  fragmentedFiles.delete('-');

  let percent1 = Math.round((fragmentedFiles.size / allFiles.size) * 10000) / 100
  percents.push(percent1);

  let allocatedCells = 0;
  let fragmentedCells = 0;

  for (let i = 0; i < lastRow.length; i++) {
    const cellValue = lastRow[i];
    if (cellValue !== '-') {
      allocatedCells++;
      if (fragmentedFiles.has(cellValue)) {
        fragmentedCells++;
      }
    }
  }

  let percent2 = Math.round(fragmentedCells / allocatedCells * 10000) / 100
  percents.push(percent2)

  return percents
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