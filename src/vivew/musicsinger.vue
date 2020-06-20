<template>
	<div class="singer">

				<SingerList :SingercatList="singercatlist"></SingerList>

	</div>
</template>
<script>
import axios from 'axios'
import SingerList from '@/components/singer/SingerList.vue';
import scroll from '@/components/common/Scroll.vue'
export default {
	data() {
		return {
			singercatlist: [],
      action:{
        artist:'api/artist/list?type=-1&area=-1'
      }
		}
	},
	components: {
		SingerList,
		scroll
	},
	methods: {
   artistlist(){
      axios.get(this.action.artist).then((res)=>{
        this.singercatlist = res.data.artists
      })
    }
	},
	created() {
    this.artistlist()
	},
	watch:{
	}
};
</script>

<style scoped="scoped">
  .singer{
    position: relative;
    width: 100%;
    height: 90vh;
  }
</style>
