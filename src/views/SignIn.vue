<script setup>
import { onMounted } from 'vue';
import { LxList } from '@wntr/lx-ui';
import useViewStore from '@/stores/useViewStore';
import useAuthStore from '@/stores/useAuthStore';
import { useRouter } from 'vue-router';

const viewStore = useViewStore();
const authStore = useAuthStore();
const router = useRouter();

const vpmClientID = window.config.clientId;
const pkipClientID = window.config.pkipClientId;

function actionClicked(id, itemId) {
  const retPath = router.currentRoute.value?.query?.returnPath;

  if (itemId === 'VPM') {
    authStore.login(retPath, 'VPM', vpmClientID);
  } else if (itemId === 'PKIP') {
    authStore.login(retPath, 'PKIP', pkipClientID);
  }
}

onMounted(() => {
  viewStore.showBack();
  if (authStore.isAuthorized) {
    viewStore.showNavBar();
  } else {
    viewStore.hideNavBar();
  }
});
</script>
<template>
  <LxList
    :items="[
      {
        id: 'VPM',
        name: 'VPM',
        description: 'Izmantot VPM idAuth dev adapteri',
        clickable: true,
        icon: 'next',
      },
      {
        id: 'PKIP',
        name: 'PKIP',
        description: 'Izmantot PKIP idAuth adapteri',
        clickable: true,
        icon: 'next',
      },
    ]"
    @actionClick="actionClicked"
  />
</template>
