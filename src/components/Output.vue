<template>
  <div>
    <p v-if="formula === ''">Palun valige valem.</p>
    <div v-else>
      <p>Väljund järjendile: {{ formula }}</p>
      <div class="row">
        <p></p>
        <div v-for="i in 48" :key="i" class="cell col-nr">{{i}}</div>
      </div>
      <div v-for="(file, index) in files" :key="index" class="row">
        <p>Samm {{index}}</p>
        <div v-for="i in 48" :key="i" class="cell">-</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Output",
  props: ['fileList'],
  computed: {
    formula: function () {
      return this.fileList;
    },
    files: function () {
      console.log(this.fileList);
      return this.fileList.split(";")
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

</style>