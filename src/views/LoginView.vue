<template>
	<div class="h-screen flex bg-gradient-to-r from-[#00e6ff] to-[#019ed8]">
		<div class="container mx-auto flex flex-col items-center justify-center gap-10">
			<img src="/logobemprotege.png" class="w-full max-w-60">
			<div class="bg-azul rounded-lg shadow-md p-6 w-11/12 max-w-96 text-center">
				<h2 class="mb-4 text-2xl font-black italic uppercase text-white">Acesse sua conta</h2>
				<form class="space-y-6" @submit.prevent="handleLogin">
					<div class="w-full text-left">
						<label for="emailLogin" class=" text-sm font-medium leading-6 text-white">E-mail</label>
						<input type="email" autocomplete="email"
							class="px-2 py-1 w-full border-transparent border-2 rounded-sm"
							:class="{ 'border-red-400': !!state.email.errorMessage }" v-model="state.email.value"
							placeholder="email@email.com">
						<span class="block font-medium text-red-400" v-if="!!state.email.errorMessage">
							{{ state.email.errorMessage }}
						</span>
					</div>
					<div class="w-full text-left">
						<div class="flex items-center justify-between">
							<label for="passwordLogin" class=" text-sm font-medium leading-6 text-white">Senha</label>
							<div class="text-sm">
								<a href="#" class="font-semibold text-white hover:text-blue-500">Esqueceu a senha?</a>
							</div>
						</div>
						<input type="password" class="px-2 py-1 w-full border-transparent border-2 rounded-sm"
							v-model="state.password.value" :class="{ 'border-red-400': !!state.password.errorMessage }"
							placeholder="********">
						<span class="block font-medium text-red-400" v-if="!!state.password.errorMessage">
							{{ state.password.errorMessage }}
						</span>
					</div>
					<div class="flex justify-end">
						<button
						    type="submit"
						    class="bg-green-400 hover:bg-green-600 transition-all duration-150 uppercase text-white font-bold rounded-sm px-2 py-1 focus:outline-none"
						>
							Acessar
						</button>
					</div>
				</form>
				<div class="text-left pt-4">
					<p class="text-white font-mediumpy-1">Ou se ainda não possui cadastro,
						<a @click="handleModalCadastro()" class="hover:text-blue-500 font-semibold cursor-pointer focus:outline-none">
							Cadastre-se aqui
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
	<ModalCadastro :open="isCadastrarModalOpened" :usoModal="'cadastrar'" :isModalOpened="isCadastrarModalOpened"
		@close="handleModalCadastro" class="transition-opacity" name="cadastroModal" />
</template>

<script setup lang="ts">

import ModalCadastro from "../components/ModalCadastro.vue";
import { ref, reactive } from "vue";
import { useField } from 'vee-validate'
import { validateEmptyAndLength, validateEmailLogin } from '@/utils/validators'
import services from "@/services";

import * as Toast from "vue-toastification/dist/index.mjs"
const { useToast } = Toast

import { useRouter } from "vue-router";
const router = useRouter()

const isCadastrarModalOpened = ref(false);
const {
	value: emailValue,
	errorMessage: emailErrorMessage
} = useField('email', validateEmailLogin)

const {
	value: passwordValue,
	errorMessage: emailPasswordMessage
} = useField('password', validateEmptyAndLength)

const toast = useToast()

const state = reactive({
	hasErrors: false,
	email: {
		value: emailValue,
		errorMessage: emailErrorMessage
	},
	password: {
		value: passwordValue,
		errorMessage: emailPasswordMessage
	}
})

async function handleLogin() {
	try {
		toast.clear()
		const { data, errors } = await services.auth.login({
			email: state.email.value,
			password: state.password.value
		})

		if (!errors) {
			window.localStorage.setItem('token', data.token)
			router.push({ name: 'Usuarios' })
			return
		}
		if (errors.status === 404) {
			toast.error('E-mail não encontrado')
		}

		if (errors.status === 401) {
			toast.error('E-mail ou senha incorretos')
		}


	} catch (error) {
		state.hasErrors = !!error
		toast.error('erro ao fazer o login')
	}
}

function handleModalCadastro() {
	isCadastrarModalOpened.value = !isCadastrarModalOpened.value;
};
</script>
