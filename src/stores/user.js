import { reactive } from 'vue'

const state = reactive({
	currentUser:{}
})

export default state

export function setCurrentUser(user){
	state.currentUser = user
}

export function cleanCurrentUser(){
	state.currentUser = {}
}

