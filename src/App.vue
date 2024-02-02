
<template>
	<!-- <header class="max-h-screen leading-6 flex container">
		<img alt="Vue logo" class="block mx-auto mt-8" src="@/assets/logo.svg" width="125" height="125" />

		<div class="wrapper flex flex-col">
			<HelloWorld msg="You did it!" />

			<nav class="w-full text-xs text-center mt-8">
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
			</nav>
		</div>
	</header> -->


	<!-- <Login /> -->
	<!-- <Header />
		<Cadastro />
		<Agendamento /> -->

	<RouterView />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterView, useRouter,useRoute } from 'vue-router'
import services from './services';

const router = useRouter()
const route = useRoute()

// console.log("create router",route)

watch(() => route.path, async () => {
	console.log("route",route.path)
	if (route.meta.hasAuth) {
		const token = window.localStorage.getItem('token')
		console.log("token",token)
		if (!token) {
			router.push({ name: "Login" })
			return
		}

	 	const { data } = await services.users.getMe()
		console.log("data",data)
		
	}
})

</script>

