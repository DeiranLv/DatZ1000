<script setup>
import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
import { LxButton, LxForm, LxRow, LxSteps, LxErrorPage, LxLoader, LxIcon } from '@wntr/lx-ui';
import eSignService from '@/services/eSignService';
import { useRouter, useRoute } from 'vue-router';
import { useStorage } from '@vueuse/core';
import useViewStore from '@/stores/useViewStore';

const documents = useStorage('lx-sign-documents', {}, sessionStorage, {
  deep: true,
  listenToStorageChanges: true,
});
const route = useRoute();
const router = useRouter();
const viewStore = useViewStore();

async function getFile(sessionId) {
  try {
    await eSignService.getFile(sessionId);
  } catch (error) {
    console.log(error);
  }
}
async function getFiles(JSON) {
  try {
    await eSignService.getFiles(JSON);
  } catch (error) {
    console.log(error);
  }
}

const stepsItems = ref([
  {
    code: 1,
    name: 'Datņu izvēle',
    state: 'complete',
  },
  {
    code: 2,
    name: 'E-paraksta iestatījumi',
    state: 'complete',
  },
  {
    code: 3,
    name: 'Parakstīšana',
    state: 'complete',
  },
  {
    code: 4,
    name: 'Rezultāts',
    state: 'current',
  },
]);

const stepsModel = ref(4);

function errorButtonClick() {
  router.push({ name: 'esign' });
}

const returnedGuid = computed(() => documents.value[route?.params?.id]);

async function getFileTest() {
  await getFile(returnedGuid.value);

  // TODO: Implement multiple file download

  // if (Object.keys(documents.value).length > 1) {
  //   const result = Object.entries(documents.value).map(([key, value]) => ({
  //     sessionId: value,
  //   }));
  //   console.info(result);
  //   // await getFiles(result);
  // } else {
  //   // await getFile(returnedGuid.value);
  // }
}
onMounted(async () => {
  viewStore.hideBack();
  if (!returnedGuid.value) {
    stepsModel.value = 3;
    stepsItems.value[2].state = 'invalid';
  }
});
onBeforeUnmount(() => {
  // TODO: Clear the storage properly
  documents.value = {};
});
</script>

<template>
  <div>
    <LxForm :showHeader="false" :showFooter="false" :column-count="2">
      <LxRow column-span="2">
        <LxSteps :items="stepsItems" v-model="stepsModel" />
      </LxRow>
      <LxRow v-if="stepsModel === 3 || stepsModel === 4" column-span="2">
        <div class="lx-sign-result-wrapper">
          <div class="lx-sign-result-display">
            <template v-if="returnedGuid">
              <LxIcon value="accept" />
              <p>Parakstīšana ir notikusi veiksmīgi!</p>
              <LxButton label="Lejupielādēt datni" icon="download" @click="getFileTest" />
            </template>
            <template v-else>
              <LxIcon value="notification-warning" class="error-icon" />
              <p>Parakstīšanas laikā ir notikusi kļūda. Mēģiniet vēlreiz!</p>
              <LxButton label="Mēģināt vēlreiz" icon="undo" @click="errorButtonClick" />
            </template>
          </div>
        </div>
      </LxRow>
    </LxForm>
  </div>
</template>
