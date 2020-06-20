<template>
  <div>
  </div>
</template>
<script>
export default{
  data () {
    return {

    }
  },
  components: {

  },
  methods: {

  },
  created() {
    var spid=this.$route.query.id
    this.$router.push({path: "/article", query: {id: spid}})
  }
}
</script>

<style>
</style>
