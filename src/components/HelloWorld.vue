<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p @click="showTemperatureInput">
      点击进入体温录入模块
    </p>
    <p>
      点击进入监管展示模块
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    showTemperatureInput(){
      this.$router.push({
        name: "temperatureinput",
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
