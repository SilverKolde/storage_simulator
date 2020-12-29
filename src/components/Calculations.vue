<template>
  <div id="main-container">
    <div v-if="percentsCalculated">
      <p>Arvutused</p>
      <div class="textarea">
        Alles jäänud failidest on fragmenteerunud {{percentsS[0]}}%.<br>
        Fragmenteerunud failidele kuulub {{percentsS[1]}}% kasutatud ruumist.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculations",
  props: ['percents'],
  computed: {
    percentsS: function() {
      return this.percents;
    },
    percentsCalculated: function () {
      return this.percents.length !== 0;
    }
  }
}
</script>

<style scoped>
  .textarea {
    padding: 10px;
    background-color: #dde8f0;
    border-radius: 5px;
    border: 1px solid #77aaff;
    -webkit-box-shadow: 1px 1px 1px 1px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -moz-box-shadow:    1px 1px 1px 1px #ccc;  /* Firefox 3.5 - 3.6 */
    box-shadow:         1px 1px 1px 1px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
  }
</style>