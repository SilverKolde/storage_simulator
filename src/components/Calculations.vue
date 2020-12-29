<template>
  <div id="container">
    <div id="img-container">
      <img src="../assets/question-circle-regular.svg"
           @mouseenter="showHelp" @mouseleave="showHelp">
    </div>
    <div v-show="active" class="help-container textarea">
      <small>
        This app aims to visualize how storage gets fragmented.<br><br>
        A list of files to be stored on drive is given as a string.<br>
        File names are A, B, C, ... and numbers represent the units of storage space they will need.<br>
        This very basic algorithm allocates units always from the start.<br><br>
        Example:<br>
        At the first step, a file [A,2] is registered. 2 units allocated.<br>
        At step 2, file [B,3] is registered, 3 units allocated<br>
        At step 3, file [A,-] is registered, which means that file A will be deleted<br>
        At step 4, ...
      </small>
    </div>
    <div v-if="percentsCalculated">
      <p>Calculations</p>
      <div class="textarea">
        Out of all files that were written to disk (last row), {{percentsS[0]}}% are fragmented.<br>
        Fragmented files take up {{percentsS[1]}}% of all used space.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculations",
  props: ['percents'],
  data() {
    return {
      active: false
    }
  },
  computed: {
    percentsS: function() {
      return this.percents;
    },
    percentsCalculated: function () {
      return this.percents.length !== 0;
    }
  },
  methods: {
    showHelp() {
      this.active = !this.active;
    }
  }
}
</script>

<style scoped>
  .textarea {
    padding: 10px;
    margin-right: 20px;
    background-color: #dde8f0;
    border-radius: 5px;
    border: 1px solid #77aaff;
    -webkit-box-shadow: 1px 1px 1px 1px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -moz-box-shadow:    1px 1px 1px 1px #ccc;  /* Firefox 3.5 - 3.6 */
    box-shadow:         1px 1px 1px 1px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
  }

  #container {
    width: 50%;
  }

  img {
    height: 30px;
    margin:6px 6px 0 0;
  }

  #img-container {
    display: flex;
    justify-content: flex-end;
  }

  p {
    margin-top: 0;
  }

  .help-container {
    float: left;
    position: absolute;
    margin-left: 60px;
  }

</style>