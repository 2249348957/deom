<template>
	<div class="singerlist">
		<ul v-for="singlist of SingercatList" :key="singlist.id" style="padding: 0.3125rem 0.9375rem;" @click="singgs(singlist.id,singlist.img1v1Url)">
			<li class="d-flex">
				<img :src="singlist.img1v1Url" alt="" style="width: 3.75rem;height: 3.75rem;border-radius: 50%;" />
				<span class="">{{ singlist.name }}</span>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		SingercatList: {
			required: true,
			type: Array
		}
	},
	data() {
		return {};
	},
	components: {},
	methods: {
    singgs(id,img){
      this.$router.push({path: "/musicrank", query: {musicid:id,musicimg:img,istj:3}})
    }
  },
  mounted() {
    console.log(this.SingercatList)
  }
};
</script>

<style scoped="scoped">
  .singerlist{
    width: 100%;
  }
  .singerlist img{
    width: 100%;
  }
  .d-flex{
    display: flex;
    align-items: center;
    padding: 1vh 0;
    width: 100%;
    box-shadow: #909399 0px 0px 5px;
  }
 .d-flex span{
   margin: 0 3vw;
 }
 .d-flex img{
   margin: 0 3vw;
 }
</style>
