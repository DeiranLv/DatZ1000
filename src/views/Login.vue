<script setup>
import { useI18n } from 'vue-i18n';
import { LxButton } from '@wntr/lx-ui';
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore();
const i18n = useI18n();
const vpmClientID = window.config.clientId;
const pkipClientID = window.config.pkipClientId;
</script>

<template>
  <LxButton
    :href="{ name: 'dashboard' }"
    :label="i18n.t('pages.home.buttons.loginAuthorized')"
    icon="arrow-right"
  />
</template>
