<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
  LxButton,
  LxForm,
  LxRow,
  LxSteps,
  LxValuePicker,
  LxFileUploader,
  LxErrorPage,
  LxLoader,
  lxStringUtils,
  LxList,
  LxIcon,
} from '@wntr/lx-ui';

import eSignService from '@/services/eSignService';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';

const router = useRouter();

const documents = useStorage('lx-sign-documents', {}, sessionStorage, {
  deep: true,
  listenToStorageChanges: true,
});

const pageLoader = ref(true);
const maintenance = ref('');
async function loadServiceStatus() {
  try {
    const resp = await eSignService.getMaintenanceStatus();
    if (resp.status === 200) {
      maintenance.value = 'Service is ON';
    } else {
      maintenance.value = 'Service is OFF';
    }
    pageLoader.value = false;
  } catch (error) {
    console.error(error);
  }
}
const mobileResponse = ref();
async function postMobilePrepare(JSON) {
  try {
    const resp = await eSignService.postMobilePrepare(JSON);
    if (resp.status >= 200 && resp.status < 300) {
      mobileResponse.value = resp.data;
    }
  } catch (error) {
    console.log(error);
  }
}

const fileUploaderModel = ref([]);

const stepsItems = ref([
  {
    code: 1,
    name: '1. Datņu izvēle',
    state: 'current',
  },
  {
    code: 2,
    name: '2. E-paraksta iestatījumi',
    state: '',
  },
  {
    code: 3,
    name: '3. Parakstīšana',
    state: '',
  },
  {
    code: 4,
    name: '4. Rezultāts',
    state: '',
  },
]);

const stepsModel = ref(1);
const loading = ref(false);

const canSignBoth = computed(
  () =>
    fileUploaderModel.value?.length === 1 &&
    fileUploaderModel.value[0].name.substr(fileUploaderModel.value[0].name.lastIndexOf('.') + 1) ===
      'pdf'
);

const outputFormatItems = computed(() => {
  if (canSignBoth.value) {
    return [
      {
        id: 'edoc',
        name: 'EDOC',
      },
      {
        id: 'pdf',
        name: 'PDF',
      },
    ];
  }
  return [
    {
      id: 'edoc',
      name: 'eDOC',
    },
  ];
});

const selectedFormat = ref('edoc');

const authItems = ref([
  {
    id: 'eid',
    name: 'eParaksts eID',
  },
  {
    id: 'eparaksts',
    name: 'eParaksts Mobile',
  },
]);
const selectedAuth = ref('eparaksts');

function errorButtonClick(action) {
  if (action === 'back') {
    router.push({ name: 'dashboard' });
  }
}

function removeBeforeBase64(str) {
  const base64Index = str.indexOf('base64,');
  if (base64Index === -1) {
    return str;
  }
  return str.substring(base64Index + 7);
}
const mobileJSON = ref();

async function prepareMobileFile() {
  const guid = lxStringUtils.generateUUID();

  mobileJSON.value = {
    requests: [
      {
        type: selectedFormat.value === 'pdf' ? 'pdf' : 'file',
        files: fileUploaderModel.value.map((file, index) => ({
          ContentType: file.meta.type,
          file: removeBeforeBase64(file.content),
          fileName: file.name,
        })),
      },
    ],
    createNewEdoc: selectedFormat.value !== 'pdf',
    redirectUrl: `${window.config.publicUrl}signDone/${guid}`,
    redirectError: `${window.config.publicUrl}signDone/error`,
  };

  await postMobilePrepare(mobileJSON.value);
  documents.value[guid] = mobileResponse.value?.sessions[0].sessionId;
}

function redirectToUrl(url) {
  window.location = url;
}

// Eid part
// TODO: optimize this part

const EIDResponse = ref();

async function postEIDPrepare(JSON) {
  try {
    const resp = await eSignService.postEIDPrepare(JSON);
    if (resp.status >= 200 && resp.status < 300) {
      EIDResponse.value = resp.data;
    }
  } catch (error) {
    console.log(error);
  }
}
async function postEIDSign(JSON) {
  try {
    const resp = await eSignService.postEIDSign(JSON);
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

const cert = ref();
const eidJSON = ref();
async function prepareEIDFile() {
  cert.value = await getEidCert(false, 'lv');

  eidJSON.value = {
    signRequests: {
      requests: [
        {
          type: selectedFormat.value === 'pdf' ? 'pdf' : 'file',
          requestId: lxStringUtils.generateUUID(),
          files: fileUploaderModel.value.map((file, index) => ({
            ContentType: file.meta.type,
            file: removeBeforeBase64(file.content),
            fileName: file.name,
            id: file.id,
          })),
        },
      ],
      createNewEdoc: selectedFormat.value !== 'pdf',
    },
    certificate: cert.value.base64,
  };

  await postEIDPrepare(eidJSON.value);

  documents.value[eidJSON.value.signRequests.requests[0].requestId] =
    EIDResponse.value?.sessions[0].sessionId;
}
const signEidResponse = ref();
async function signEID() {
  const options = {
    digests: [
      {
        sessionId: EIDResponse.value.digests[0].sessionId,
        digest: EIDResponse.value.digests[0].digest,
      },
    ],
    lang: 'lv',
    isAuth: false,
    cert: cert.value.raw,
  };

  const signedEid = await signEid(options);

  const newAuthCert = await getEidCert(true, 'lv');
  const request = {
    sessionSignatureValues: [
      {
        sessionId: signedEid[0].sessionId,
        signatureValue: signedEid[0].signatureValue,
      },
    ],
    authCertificate: newAuthCert.base64,
  };

  signEidResponse.value = await postEIDSign(request);
}

async function nextStep() {
  stepsModel.value += 1;
  stepsItems.value[stepsModel.value - 1].state = 'current';
  stepsItems.value[stepsModel.value - 2].state = 'complete';
  if (stepsModel.value === 3 && selectedAuth.value === 'eparaksts') {
    loading.value = true;
    await prepareMobileFile();
    redirectToUrl(mobileResponse.value?.redirectUrl);
  }
  if (stepsModel.value === 3 && selectedAuth.value === 'eid') {
    loading.value = true;
    await prepareEIDFile();
    await signEID();
    redirectToUrl(
      `${window.config.publicUrl}signDone/${eidJSON.value.signRequests.requests[0].requestId}`
    );
  }
}

function previousStep() {
  stepsModel.value -= 1;
  stepsItems.value[stepsModel.value - 1].state = 'current';
  stepsItems.value[stepsModel.value].state = '';
}

watch(
  () => canSignBoth.value,
  (value) => {
    if (!value) {
      selectedFormat.value = 'edoc';
    }
  }
);

onMounted(async () => {
  if (!document.querySelector('[src="/V3_0_0_simple-sign.js"]')) {
    const simeSignPlugin = document.createElement('script');
    simeSignPlugin.setAttribute('src', '/V3_0_0_simple-sign.js');
    document.body.appendChild(simeSignPlugin);
  }

  if (!document.querySelector('[src="/V3_0_0_eparaksts-hwcrypto.js"]')) {
    const hwcryptoPlugin = document.createElement('script');
    hwcryptoPlugin.setAttribute('src', '/V3_0_0_eparaksts-hwcrypto.js');
    document.body.appendChild(hwcryptoPlugin);
  }

  loadServiceStatus();
});
// WIP: validation
</script>

<template>
  <div class="sign-form">
    <LxForm v-if="maintenance === 'Service is ON'" :showHeader="false" :column-count="2">
      <LxRow column-span="2">
        <LxSteps :items="stepsItems" v-model="stepsModel" />
      </LxRow>
      <LxRow column-span="2" v-if="loading">
        <div class="lx-sign-loader">
          <LxLoader size="l" :loading="loading" />
          <div class="lx-sign-loader-texts">
            <p>Sagatavojam datus</p>
            <p>Lūdzu uzgaidiet</p>
          </div>
        </div>
      </LxRow>
      <template v-if="!loading">
        <LxRow v-if="stepsModel === 1">
          <LxFileUploader
            v-model="fileUploaderModel"
            kind="multiple"
            :draggable="true"
            dataType="content"
          />
        </LxRow>

        <LxRow v-if="stepsModel === 1">
          <div class="desc">
            <p>
              Šī ir Latvijas E-paraksta rīka demonstrācija, kas izmanto produkcijas
              <em>Simple Sign</em> versiju (un, tātad, arī LVTRC eParaksta platformu), lai
              kvalificēti parakstītu EDOC un PDF datnes.
            </p>
            <p>
              Jā, tas nozīmē, ka šeit parakstītie dokumenti ir "pa īstam" elektroniski parakstīti un
              derīgi izmantošanai ikdienā (to var viegli pārbaudīt, piemēram,
              <a href="https://eparaksts.lv" target="_blank">eParaksts.lv</a> rīkā).
            </p>

            <p>Noderīgas saites:</p>
            <ul>
              <li>
                <a
                  href="https://git.zzdats.lv/lx/demo/src/branch/master/src/views/ESign.vue"
                  target="_blank"
                ><em>Gitea</em> izejas kods šai lapai</a
                >
              </li>
              <li>
                <a
                  href="https://git.zzdats.lv/GatisB/MD_documentation/src/branch/dev_test_jades/simple_sign/docs"
                  target="_blank"
                ><em>Simple Sign</em> dokumentācija</a
                >
              </li>
              <li>
                <a
                  href="https://eparaksts-dev.zzdats.lv/simple-sign/swagger/index.html?urls.primaryName=v2.0"
                  target="_blank"
                ><em>Simple Sign</em> dev vides API <em>swagger</em></a
                >
              </li>
            </ul>
          </div>
        </LxRow>
        <template v-if="stepsModel === 2">
          <LxRow label="Parakstāmie faili" row-span="4">
            <div id="files-to-sign">
              <LxList :items="fileUploaderModel" listType="1" />
            </div>
          </LxRow>
          <LxRow label="Parakstītās datnes formāts">
            <div class="horizontal">
              <LxValuePicker variant="tags" :items="outputFormatItems" v-model="selectedFormat" />
              <div v-if="!canSignBoth" class="lx-tag fake">PDF</div>
            </div>
          </LxRow>
          <LxRow label="Parakstīšanas veids">
            <LxValuePicker variant="tags-custom" :items="authItems" v-model="selectedAuth">
              <template #customItem="{ id, name }">
                <div class="auth-item">
                  <LxIcon
                    :value="id === 'eid' ? 'eparaksts' : 'eparaksts-mobile'"
                    icon-set="brand"
                  />
                  {{ name }}
                </div>
              </template>
            </LxValuePicker>
          </LxRow>
        </template>
      </template>
      <template #footer>
        <div class="lx-sign-footer-buttons">
          <LxButton
            icon="undo"
            label="Atgriezties"
            @click="previousStep"
            :disabled="stepsModel === 1 || loading"
            kind="secondary"
          />
          <LxButton
            icon="next"
            label="Turpināt"
            @click="nextStep"
            :disabled="stepsModel === 3 || loading || fileUploaderModel?.length === 0"
            kind="primary"
          />
        </div>
      </template>
    </LxForm>
    <LxErrorPage
      v-else-if="maintenance === 'Service is OFF'"
      title="Notika negaidīta servera kļūda"
      description="eParaksta serveri šobrīd nav iespējams sasniegt. Lūdzu, mēģiniet vēlāk."
      :actionDefinitions="[{ id: 'back', name: 'Atgriezties uz sākumu', icon: 'undo' }]"
      @actionClick="errorButtonClick"
    />
    <div class="lx-sign-page-loader">
      <LxLoader size="l" :loading="pageLoader" />
    </div>
  </div>
</template>
