<template>
	<Dialog v-if="isModalOpened" :open="isModalOpened"
		class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ">
		<DialogPanel class="bg-azul rounded-lg shadow-md text-white py-8">
			<DialogTitle class="text-center text-2xl font-bold border-b pb-4 px-6">Agendamento de corretor</DialogTitle>
			<div class="text-left my-4 px-4">
				<p> Faça aqui seu agendamento</p>
			</div>
			<div v-if="!listaCorretor">
				<div class="text-center">
					<p>Não há corretor cadastrado no sistema para atendimento</p>
				</div>
			</div>
			<form @submit.prevent="handleScheduling" v-if="listaCorretor" class="flex flex-col justify-center gap-4">
				<div class="flex justify-center items-center w-full gap-4">
					<div class="text-end">
						<p>Corretor</p>
					</div>
					<div class="w-3/5 text-black">
						<select
						    v-model="corretorSelecionado"
						    name="corretorSelecionado"
						    class="px-2 py-1 w-full capitalize"
						    @change="cleanData"
						>
							<option
							    class="p-2 capitalize"
							    v-for="corretor in listaCorretor"
							    :key="corretor.id"
							    :value="corretor.id"
							>
								{{ corretor.name }}
							</option>
						</select>
					</div>
				</div>

				<div class="flex justify-center items-center gap-4 px-8">
					<div class="flex flex-col justify-center items-center gap-4 w-full">
						<div class=" text-end">
							<p>Hora Inicio</p>
						</div>
						<div class="">
							<TimePicker
							    :disabled-dates="disabledDates"
							    v-model.string="horaInicioSelecionada"
							    mode="datetime"
							/>
						</div>
					</div>
					<div class="flex flex-col justify-center items-center gap-4 w-full">
						<div class=" text-end">
							<p>Hora Final</p>
						</div>
						<div class="">
							<TimePicker @change="capturarHoraFinal" :disabled-dates="disabledDates" mode="datetime"
								v-model.string="horaFinalSelecionada" />
						</div>
					</div>
				</div>
				<div class="flex justify-center pt-6">
					<button @click="$emit('close')"
						class="bg-gray-300 hover:bg-gray-400 transition-colors text-gray-800 font-bold py-2 px-4 rounded mr-2">
						Cancelar
					</button>
					<button
						class="bg-green-400 capitalize hover:bg-green-700 transition-colors text-white font-bold py-2 px-4 rounded">
						Cadastrar
					</button>
				</div>
			</form>
		</DialogPanel>
	</Dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import TimePicker from './TimePicker.vue';
import services from "@/services";
import * as Toast from "vue-toastification/dist/index.mjs"
import type { list } from "postcss";
const { useToast } = Toast

const toast = useToast()

interface Props {
	isModalOpened: boolean;
}
const listaCorretor = ref();

const corretorSelecionado = ref<string | null>(null);
const horaInicioSelecionada = ref<string | null>(null);
const horaFinalSelecionada = ref<string | null>(null);

defineProps<Props>();

const disabledDates = ref([
	{
		end: new Date(new Date().setDate(new Date().getDate() - 1)),
	},
]);

const cleanData = () => {
	horaInicioSelecionada.value = null;
	horaFinalSelecionada.value = null;
};

const capturarHoraFinal = () => {
	const agora = Date.now();
	const horaInicio = Date.parse(horaInicioSelecionada.value!);
	const horaFinal = Date.parse(horaFinalSelecionada.value!);

	if (horaInicio < agora) {
		toast.error("Não é possível marcar reuniões para horários anteriores ao atual. Por favor, selecione um horário futuro.");
		horaInicioSelecionada.value = "";
		horaFinalSelecionada.value = "";
		return false;
	}
	if (horaFinal < horaInicio) {
		toast.error("A hora final não pode ser anterior à hora inicial. Por favor, selecione novamente.");
		horaFinalSelecionada.value = "";
		return false;
	}

	const duracaoReuniao = horaFinal - horaInicio;
	const menorTempo = 1740000; // 29:59 minutos
	const maiorTempo = 7201000; // 2:00:01 horas

	if (duracaoReuniao <= menorTempo) {
		toast.error("A duração da reunião não pode ser inferior a 30 minutos. Por favor, ajuste o horário.");
		horaFinalSelecionada.value = "";
		return false;
	}

	if (duracaoReuniao >= maiorTempo) {
		toast.error("A duração da reunião não pode exceder 2 horas. Por favor, ajuste o horário.");
		horaFinalSelecionada.value = "";
		return false;
	}

	return true;
};

async function handleScheduling() {
	try {
		toast.clear()
		const { data, errors } = await services.schedulings.create({
			corretor_id: corretorSelecionado.value,
            //cliente_id: ,
            horaInicio: horaInicioSelecionada.value,
            horaFinal: horaInicioSelecionada.value,
			status: "ATIVO"
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

// const verificaConflito = (corretorSelecionado: string, horaInicioSelecionada: string, horaFinalSelecionada: string) => {

// 	const corretorID = corretorSelecionado
// 	const horaInicio = Date.parse(horaInicioSelecionada)
// 	const horaFinal = Date.parse(horaFinalSelecionada)

// 	for (const agendamento of listaAgendamentos) {
// 		if (agendamento.corretor_id === corretorID) {
// 			const horaInicioAgendamento = new Date(agendamento.horaInicio);
// 			const horaFinalAgendamento = new Date(agendamento.horaFinal);

// 			const horaInicioExternaDate = new Date(horaInicio);
// 			const horaFinalExternaDate = new Date(horaFinal);

// 			if (
// 				(horaInicioExternaDate >= horaInicioAgendamento && horaInicioExternaDate < horaFinalAgendamento) ||
// 				(horaFinalExternaDate > horaInicioAgendamento && horaFinalExternaDate <= horaFinalAgendamento)
// 			) {
// 				alert("Conflito detectado! O corretor já possui um agendamento neste horário.");
// 				cleanData()
// 				return;
// 			}
// 		}
// 	}
// }

async function getCorretor() {
	try {
		const { data, errors } = await services.users.getCorretor()

		if (!errors) {
			listaCorretor.value = data
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

onMounted(getCorretor)

const emit = defineEmits(["cadastrarAgendamento"]);

const cadastrar = (corretorSelecionado: string, horaInicioSelecionada: string, horaFinalSelecionada: string) => {
	capturarHoraFinal();
	verificaConflito(corretorSelecionado, horaInicioSelecionada, horaFinalSelecionada);
	emit('cadastrarAgendamento', [corretorSelecionado, horaInicioSelecionada, horaFinalSelecionada]);
	cleanData()
};

</script>
