<template>
	<HeaderPage />
	<div class="container xl:max-w-6xl mx-auto mt-12">
		<div class="mt-8">
			<h1 class="text-4xl font-medium">
				Agendamentos
			</h1>
		</div>
		<div class="text-end">
			<button @click="handleModalAgendamento()"
				class="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded">
				Agendar nova reunião
			</button>
		</div>
		<div class="mx-auto">
			<table v-if="listaAgendamentos" class="mt-8 table-auto border-collapse rounded-tl-lg rounded-tr-lg bg-zinc-300 w-full border-zinc-400">
				<thead class="border-b border-black ">
					<tr class="text-left capitalize">
						<th class="px-2 py-2">corretor</th>
						<th class="px-2 border-l border-black">cliente</th>
						<th class="px-2 border-l border-black">inicio</th>
						<th class="px-2 border-l border-black">final</th>
						<th class="px-2 border-l border-black">status</th>
						<th class="px-2 border-l border-black">excluir</th>
					</tr>
				</thead>
				<tbody class="rounded-lg">
					<tr v-for="(line, index) in listaAgendamentos" :key="index"
						:class="index % 2 === 1 ? 'bg-zinc-200' : 'bg-zinc-100'" class="py-2">
						<td class="px-2 py-2 capitalize">{{ line.corretor_nome }}</td>
						<td class="px-2 py-2 border-l border-black capitalize">{{ line.cliente_nome }}</td>
						<td class="px-2 py-2 border-l tabular-nums border-black">{{ formatarData(line.horaInicio) }}</td>
						<td class="px-2 py-2 border-l tabular-nums border-black">{{ formatarData(line.horaFinal) }}</td>
						<td class="px-2 py-2 border-l border-black">
							{{ status }}
						</td>
						<td class="px-2 py-2 border-l border-black text-center">
							<button @click="openExcluirModal(line.id)" class="font-bold">
								<XMarkIcon class="w-5" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<ModalAgendamento
	    :open="isModalOpened"
	    :isModalOpened="isModalOpened"
	    @close="isModalOpened = false"
	    @cadastrarAgendamento="cadastrarAgendamento"
	    class="transition-opacity"
	    name="agendamentoModal"
	>
	</ModalAgendamento>

	<Teleport to="body">
		<ModalExcluir :open="isExcluirModalAgendamentoOpen" :isExcluirModalOpen="isExcluirModalAgendamentoOpen"
			@close="isExcluirModalAgendamentoOpen = false" @excluirData="excluirAgendamento()" class="transition-opacity"
			name="excluirAgendamentoModal">
			<template #title>
				<h3 class="text-center text-2xl font-bold border-b pb-4">Excluir Agendamento</h3>
			</template>
			<template #principalText>
				<div class="text-center p-4">
					<p>
						Atenção <br />
						Deseja excluir este agendamento da sua base de dados?
					</p>
				</div>
			</template>
		</ModalExcluir>
	</Teleport>
</template>

<script setup lang="ts">

import { XMarkIcon } from "@heroicons/vue/24/outline";
import { onMounted, reactive, ref } from "vue";
import ModalAgendamento from '../components/ModalAgendamento.vue'
import ModalExcluir from "../components/ModalExcluir.vue";
import HeaderPage from "@/components/HeaderPage.vue";

import services from "@/services";
import * as Toast from "vue-toastification/dist/index.mjs"
const { useToast } = Toast

const toast = useToast()

const isModalOpened = ref(false);
const isExcluirModalAgendamentoOpen = ref(false);
const listaAgendamentos = ref([]);

const state = reactive({
	hasErrors: false,
})

onMounted(getListaAgendamento)

async function getListaAgendamento() {
	const agendamentos = await readAllSchedulings()
	const users = await readAllUsers()

	const usersMap = users.reduce((acc, user) => {
		acc[user.id] = user;
		return acc;
	}, {});

	// adiciona os campos cliente_nome e corretor_nome
	listaAgendamentos.value = agendamentos.map(item => {
		const corretor = usersMap[item.corretor_id];
		const cliente = usersMap[item.cliente_id];

		return {
			...item,
			corretor_nome: corretor ? corretor.name : null,
			cliente_nome: cliente ? cliente.name : null
		};
	});
}

async function readAllSchedulings() {
	try {
		const { data, errors } = await services.schedulings.readAllSchedulings()
		if (!errors) {
			return data
		}
		if (errors.status === 400) {
			toast.error('Erro ao listar dados de usuário')
		}
	} catch (error) {
		state.hasErrors = !!error
		toast.error('Erro ao listar')
	}
}

async function readAllUsers() {
	try {
		const { data, errors } = await services.users.readAllUsers()
		if (!errors) {
			return data
		}
		if (errors.status === 400) {
			toast.error('Erro ao listar dados de usuário')
		}
	} catch (error) {
		state.hasErrors = !!error
		toast.error('Erro ao listar')
	}
}

function formatarData(date) {

	const data = new Date(parseInt(date));
	const dia = String(data.getDate()).padStart(2, "0");
	const mes = String(data.getMonth() + 1).padStart(2, "0");
	const ano = data.getFullYear();
	const horas = String(data.getHours()).padStart(2, "0");
	const minutos = String(data.getMinutes()).padStart(2, "0");
	const segundos = String(data.getSeconds()).padStart(2, "0");
	return `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
}

function handleModalAgendamento() {
	isModalOpened.value = !isModalOpened.value;
};

function openExcluirModal(item) {
	idSelecionado.value = item
	isExcluirModalAgendamentoOpen.value = true
}


</script>
