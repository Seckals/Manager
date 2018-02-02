// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import login from './loginBox'
import router from './router'
import store from './store'
import vueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/reset.css'
import '../static/css/style.css'
import '../static/js/sockjs.min.js'
import '../static/js/stomp.min.js'
import print from 'jQuery.print'

Vue.use(vueResource)
Vue.use(ElementUI)
Vue.use(print)
// vueResource.http.options.emulateJSON = true;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<login/>',
	components: { login }
})



Vue.prototype.$ajax = function (type,url,data,option,fn){
	switch(type){
		case 'get':
			this.$http.get(url).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					fn(res)
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
			break;
		case 'post':
			this.$http.post(url,data,option).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					fn(res)
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
			break;
		case 'put':
			this.$http.put(url,data,option).then(response => {
					var res = response.data
					if(res.code === 400 || res.code === 401){
						this.$message.error(res.msg)
						this.$router.push("/login")
					}else if(res.code === 0){
						fn(res)
					}else{
						this.$message.error(res.msg)
					}
				},response => {
					this.$message.error("网络异常")
				}
			);
			break;
		case 'delete':
			this.$http.delete(url).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					fn(res)
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			});
			break;
	}
}
