
<template>
	<RouterView />
</template>

<script setup lang="ts">
//import { watch } from 'vue';
import { RouterView, useRouter,useRoute } from 'vue-router'
//import services from './services';

// const router = useRouter()
// const route = useRoute()

// console.log("create router",route)

// watch(() => route.path, async () => {
// 	console.log("route",route.path)
// 	if (route.meta.hasAuth) {
// 		const token = window.localStorage.getItem('token')
// 		console.log("token",token)
// 		if (!token) {
// 			router.push({ name: "Login" })
// 			return
// 		}

// 	 	const { data } = await services.users.getMe()
// 		console.log("data",data)
		
// 	}
// })

</script>

