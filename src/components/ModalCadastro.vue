<template>
	<div v-if="isModalOpened" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ">
		<div class="bg-azul rounded-lg shadow-md text-white max-w-lg py-8">
			<h2 class="text-center text-2xl font-bold border-b pb-4" v-if="usoModal === 'cadastrar'">Cadastro de
				Usuário</h2>
			<h2 class="text-center text-2xl font-bold border-b pb-4" v-if="usoModal === 'editar'">Editar Usuário
			</h2>
			<div class="px-8 pt-4">
				<form @submit.prevent="handleRegister" class="space-y-4">
					<div class="space-y-2 mb-4">
						<label for="nome" class="text-white">
							Nome:
						</label>
						<input id="nomeCadastro" name="nomeCadastro" type="text" autocomplete="name"
							class="px-2 py-1 w-full text-black" v-model="state.name.value">
						<span class="block font-medium text-red-400" v-if="!!state.name.errorMessage">
							{{ state.name.errorMessage }}
						</span>
					</div>

					<div class="space-y-2 mb-4">
						<label for="email" class="text-white">
							Email:
						</label>
						<input id="email" name="email" type="email" autocomplete="email" class="px-2 py-1 w-full text-black"
							v-model="state.email.value">
						<span class="block font-medium text-red-400" v-if="!!state.email.errorMessage">
							{{ state.email.errorMessage }}
						</span>
					</div>

					<div class="space-y-2 mb-4">
						<label for="telefone" class="text-white">Telefone:</label>
						<input type="tel" id="telefone" class="px-2 py-1 w-full text-black"
							v-model="state.telephone.value" />
						<span class="block font-medium text-red-400" v-if="!!state.telephone.errorMessage">
							{{ state.telephone.errorMessage }}
						</span>
					</div>

					<div class="space-y-2 mb-4">
						<label for="perfil" class="text-white">Perfil:</label>
						<select id="perfil" class="form-select px-2 py-1 w-full text-black" v-model="state.profile.value">
							<option value="corretor">Corretor de Seguro</option>
							<option value="cliente">Cliente</option>
						</select>
						<span class="block font-medium text-red-400" v-if="!!state.profile.errorMessage">
							{{ state.profile.errorMessage }}
						</span>
					</div>

					<div class="space-y-2 mb-4">
						<div class="flex gap-2">
							<label for="password" class="text-white">Senha:</label>
							<!-- <button @click="switchPassword">
								<EyeIcon v-if="passwordFieldType === 'password'" class="w-4" />
								<EyeSlashIcon v-if="passwordFieldType === 'text'" class="w-4" />
							</button> -->
						</div>
						<input type="password" id="password" class="px-2 py-1 w-full text-black"
							v-model="state.password.value" />
						<span class="block font-medium text-red-400" v-if="!!state.password.errorMessage">
							{{ state.password.errorMessage }}
						</span>
					</div>
					<div class="flex justify-around pt-6">
						<button @click="$emit('close')"
							class="bg-gray-300 hover:bg-gray-400 transition-colors text-gray-800 font-bold py-2 px-4 rounded mr-2">
							Cancelar
						</button>
						<button type="submit" ref="completeButtonRef"
							class="bg-blue-400 capitalize hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded">
							{{ usoModal }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import { useField } from 'vee-validate'
import { validateEmptyAndLength, validateEmailLogin, validatePhoneNumber, validateProfile } from '@/utils/validators'
import services from "@/services";
import * as Toast from "vue-toastification/dist/index.mjs"
const { useToast } = Toast

const toast = useToast()

defineProps({
	isModalOpened: Boolean,
	usoModal: String
})

const {
	value: nameValue,
	errorMessage: nameErrorMessage
} = useField('name', validateEmptyAndLength)

const {
	value: emailValue,
	errorMessage: emailErrorMessage
} = useField('email', validateEmailLogin)

const {
	value: telephoneValue,
	errorMessage: telephoneErrorMessage
} = useField('telephone', validatePhoneNumber)

const {
	value: profileValue,
	errorMessage: profileErrorMessage
} = useField('profile', validateProfile)

const {
	value: passwordValue,
	errorMessage: passwordErrorMessage
} = useField('password', validateEmptyAndLength)

const state = reactive({
	hasErrors: false,
	name: {
		value: nameValue,
		errorMessage: nameErrorMessage
	},
	email: {
		value: emailValue,
		errorMessage: emailErrorMessage
	},
	telephone: {
		value: telephoneValue,
		errorMessage: telephoneErrorMessage
	},
	profile: {
		value: profileValue,
		errorMessage: profileErrorMessage
	},
	password: {
		value: passwordValue,
		errorMessage: passwordErrorMessage
	}
})

const emit = defineEmits([
	"close"
])

async function handleRegister() {
	try {
		toast.clear()
		const { data, errors } = await services.auth.register({
			name: state.name.value,
			email: state.email.value,
			telephone: state.telephone.value,
			profile: state.profile.value,
			password: state.password.value
		})

		if (!errors) {
			window.localStorage.setItem('token', data.token)
			toast('Usuário cadastrado com sucesso')
			emit('close')
			return
		}

		if (errors.status === 400) {
			toast.error('Erro ao realizar o cadastro do usuário')
		}

	} catch (error) {
		state.hasErrors = !!error
		toast.error('Erro ao realizar o cadastro')
	}
}

</script>
