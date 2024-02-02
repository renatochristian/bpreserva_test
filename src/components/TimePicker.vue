<template>
    <DatePicker
        locale="pt-BR"
        :first-day-of-week="1"
        v-model="date"
        :masks="{ title: 'MMM YYYY' }"
        mode="time"
        is24hr
        class="rounded-lg"
    />
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import { ref } from 'vue'

const date = ref()
</script>
˛
