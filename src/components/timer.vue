<template>
  <div>
    {{str}}
  </div>
</template>

<script>
  export default {
    props: {
      time: {
        type: [String, Number]
      }
    },
    data() {
      return {
        str: '',
      }
    },
    methods: {
      getTimestr() {
        let time = new Date(this.time);
        const year = time.getFullYear();
        const months = time.getMonth() +1;
        const day = time.getDate();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        return this.str = `${year}年${months}月${day}日${hour}时${minute}分${second}秒`
      }
    },
    watch: {
      time() {
        this.getTimestr();
      }
    },
    mounted() {
      this.getTimestr();
    }
  };
</script>

<style scoped>

</style>
