<script setup>
import { useMediaQuery } from '@vueuse/core'
import { useRoute } from 'vue-router'

import DetailMobile from './DetailMobile.vue'
import DetailPc from './DetailPc.vue'

import games from '@/data/games.js'

const isLargeScreen = useMediaQuery('(min-width: 473px)')

const { params } = useRoute()
const apps = games
const app = apps.find(({ link }) => link === params.name)
</script>

<template>
  <DetailPc v-bind="{ app, apps }" v-if="isLargeScreen" />
  <DetailMobile v-bind="{ app, apps }" v-else />
</template>
