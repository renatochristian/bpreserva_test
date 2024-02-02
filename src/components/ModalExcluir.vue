<template>
	<Dialog v-if="isExcluirModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ">
		<DialogPanel class="bg-azul rounded-lg shadow-md text-white max-w-lg py-8">
			<slot name="title">default text</slot>
			<slot name="principalText">
				default text
			</slot>
			<div class="flex justify-center">
				<button
					class="bg-gray-300 hover:bg-gray-400 transition-colors text-gray-800 font-bold py-2 px-4 rounded mr-2"
					@click="$emit('close')">Desistir</button>
				<button class="bg-red-700 hover:bg-red-800 transition-colors text-white font-bold py-2 px-4 rounded"
					@click="$emit('excluirData')">
					Excluir
				</button>
			</div>
		</DialogPanel>
	</Dialog>
</template>

<script setup lang="ts">

import {
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogDescription,
} from '@headlessui/vue'
function openExcluirModal(value) {
	isExcluirModalOpen.value = value
}
const props = defineProps({
	isExcluirModalOpen: Boolean
});

</script>