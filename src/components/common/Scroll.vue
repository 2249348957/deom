<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
	props:{
		height:{
			type:Number,
			default:0
		},
		list:{
			type:Array,
			required:true
		},
		click: {
			type:Boolean,
			default:true
		}
	},
	data() {
		return {};
	},
	components: {},
	methods: {
		initScroll() {
			this.$refs.wrapper.style.height = this.height + "vh"
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:this.click
			});
		},
		refresh(){
			this.initScroll()
		}
	},
	mounted() {
   this.initScroll();
	},
	watch:{
		list(){
			this.$nextTick(()=>{
				this.scroll.refresh();
			})
		}
	}
};
</script>

<style>
	.wrapper{
    position: absolute;
    left: 0;
    right: 0;
    width:100%;
		overflow: hidden;
   /* height: 83vh; */
    background-color: white;
	}
</style>
