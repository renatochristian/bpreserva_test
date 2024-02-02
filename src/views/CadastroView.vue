
<template>
	<HeaderPage />
	<div class="flex">
		<div class="container w-full xl:max-w-6xl mx-auto">
			<div class="mt-8">
				<h1 class="text-4xl font-medium">Lista Usuários</h1>
			</div>

			<div class="mx-auto">
				<table class="mt-8 table-auto border-collapse bg-zinc-300 rounded-lg w-full border-zinc-400">
					<thead class="border-b border-black">
						<tr class="text-left capitalize">
							<th class="px-2 py-2">nome</th>
							<th class="px-2 border-l border-black">e-mail</th>
							<th class="px-2 border-l border-black">telefone</th>
							<th class="px-2 border-l border-black">perfil</th>
							<th class="px-2 border-l border-black">editar</th>
							<th class="px-2 border-l border-black">excluir</th>
						</tr>
					</thead>
					<tbody v-if="userList" class="rounded-lg">
						<tr v-for="(line, index) in userList" :key="index"
							:class="index % 2 === 1 ? 'bg-zinc-200' : 'bg-zinc-100'" class="py-2">
							<td class="px-2 py-2 capitalize">{{ line.name }}</td>
							<td class="px-2 py-2 border-l border-black">{{ line.email }}</td>
							<td class="px-2 py-2 border-l border-black">{{ line.telephone }}</td>
							<td class="px-2 py-2 border-l border-black">{{ line.profile }}</td>
							<td class="px-2 py-2 border-l border-black text-center">
								<button class="font-bold ">
									<PencilSquareIcon class="w-5" />
								</button>
							</td>
							<td class="px-2 py-2 border-l border-black text-center">
								<button class="font-bold ">
									<XMarkIcon class="w-5" />
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<Teleport to="body">
		<ModalExcluir :open="isExcluirCadastroModalOpen" :isExcluirModalOpen="isExcluirCadastroModalOpen"
			@close="isExcluirCadastroModalOpen = false" @excluirData="excluirData()" class="transition-opacity"
			name="excluirCadastroModal">
			<template #title>
				<h3 class="text-center text-2xl font-bold border-b pb-4">Excluir Usuário</h3>
			</template>
			<template #principalText>
				<div class="text-center p-4">
					<p>
						Atenção <br />
						Deseja excluir este usuário da sua base de dados?
					</p>
				</div>
			</template>
		</ModalExcluir>
	</Teleport>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import ModalExcluir from "../components/ModalExcluir.vue";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import HeaderPage from "@/components/HeaderPage.vue";
import services from "@/services";
import * as Toast from "vue-toastification/dist/index.mjs"
const { useToast } = Toast

const toast = useToast()

const isCadastrarModalOpened = ref(false);
const isExcluirCadastroModalOpen = ref(false)
const userList = ref([])

const state = reactive({
	hasErrors: false,
})

async function getUsers() {
	try {
		const { data, errors } = await services.users.readAllUsers()

		if (!errors) {
			userList.value = data
			return
		}

		if (errors.status === 400) {
			toast.error('Erro ao listar dados de usuário')
		}

	} catch (error) {
		state.hasErrors = !!error
		toast.error('Erro ao listar')
	}
}

function handleModalCadastro() {
	isCadastrarModalOpened.value = !isCadastrarModalOpened.value;
};

onMounted(getUsers)

</script>
