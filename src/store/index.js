import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		haveToDealNumber:0,
		hadConfirmNumber:0
	},
	mutations:{
		updataHaveToDealNumber:function(state,number){
			state.haveToDealNumber = number;
		},
		updataHadConfirmNumber:function(state,number){
			state.hadConfirmNumber = number;
		},
		substractHaveToDealNumber:function(state,number){
			state.haveToDealNumber -= number;
			if(state.haveToDealNumber < 0){
				state.haveToDealNumber = 0
			}
		},
		substractHadConfirmNumber:function(state,number){
			state.hadConfirmNumber -= number;
			if(state.hadConfirmNumber < 0){
				state.hadConfirmNumber = 0
			}
		}
	}
})