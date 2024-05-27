<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxTextInput,
  LxExpander,
  LxValuePicker,
  LxToggle,
  LxButton,
  LxModal,
  LxForm,
  LxRow,
} from '@wntr/lx-ui';
import useNotifyStore from '@/stores/useNotifyStore';
import LxQrScanner from '@/components/QrScanner.vue';

const viewStore = useViewStore();
const notification = useNotifyStore();

onMounted(() => {
  viewStore.goBack = true;
});

const formatsItems = [
  {
    id: 'qr_code',
    name: 'qr_code',
  },
  {
    id: 'code_128',
    name: 'code_128',
  },
  {
    id: 'code_39',
    name: 'code_39',
  },
  {
    id: 'code_93',
    name: 'code_93',
  },
  {
    id: 'codebar',
    name: 'codebar',
  },
];
const formats = ref(['qr_code']);

const mainExpanded = shallowRef(false);
const fileUploader = shallowRef(true);
const flashlight = shallowRef(false);
const showAlerts = shallowRef(true);

const model = ref();
function modelUpdate(value) {
  notification.pushSuccess(`Vērtība atjaunināta uz ${value}`);
  model.value = value;
}

const textsModal = ref();
function openTextsModal() {
  textsModal.value.open();
}

function closeTextsModal() {
  textsModal.value.close();
}

const texts = ref({
  notAllowedError: 'Nav piešķirta atļauja izmantot kameru',
  notFoundError: 'Neviena kamera nav atrasta',
  notReadableError: 'Kameru jau izmanto cita lietotne',
  error: 'Nesanāca nolasīt kodu',
  errorLabel: 'Kļūda',
  success: 'Kods veiksmīgi noskenēts',
  continueScanning: 'Turpināt skenēšanu',
  dragHere: 'Ievelciet failu šeit',
  changeCamera: 'Mainīt kameru',
  scanFile: 'Skenēt datni',
  reloadPage: 'Pārlādēt lapu',
  toggleFlashlight: 'Zibspuldze',
});

const kind = ref('single');

const kindItems = [
  {
    id: 'single',
    name: 'single',
  },
  {
    id: 'multiple',
    name: 'multiple',
  },
];

const mode = ref('list');

const modeItems = [
  {
    id: 'list',
    name: 'list',
  },
  {
    id: 'toggle',
    name: 'toggle',
  },
];

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <DemoView kind="m" :show-value="false" label="LxQR" :git-link="baseGitUrl + 'QrScanner.vue'">
    <LxQrScanner
      @update="modelUpdate"
      :file-uploader="fileUploader"
      :formats="formats"
      :kind="kind"
      :texts="texts"
      :flashlight="flashlight"
      :showAlerts="showAlerts"
      :mode="mode"
    />
    <template #menu>
      <LxExpander v-model="mainExpanded" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:fileUploader</label>
            <LxToggle v-model="fileUploader" />
          </div>
          <div class="lx-row">
            <label>:formats</label>
            <LxValuePicker :items="formatsItems" v-model="formats" kind="multiple" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="kindItems" v-model="kind" />
          </div>
          <div class="lx-row">
            <label>:flashlight</label>
            <LxToggle v-model="flashlight" />
          </div>
          <div class="lx-row">
            <label>:showAlerts</label>
            <LxToggle v-model="showAlerts" />
          </div>
          <div class="lx-row">
            <label>:mode</label>
            <LxValuePicker v-model="mode" :items="modeItems" />
          </div>
          <div class="lx-row">
            <label>:texts</label>
            <LxButton label="Open texts editor" @click="openTextsModal()" />
            <LxModal
              ref="textsModal"
              :buttonPrimaryVisible="true"
              button-primary-label="Aizvērt"
              @primary-action="closeTextsModal()"
              size="l"
              label="'texts' prop"
            >
              <LxForm :show-footer="false" :show-header="false" :column-count="3">
                <LxRow label="notAlowerdError">
                  <LxTextInput v-model="texts.notAllowedError" />
                </LxRow>
                <LxRow label="notFoundError">
                  <LxTextInput v-model="texts.notFoundError" />
                </LxRow>
                <LxRow label="notReadableError">
                  <LxTextInput v-model="texts.notReadableError" />
                </LxRow>
                <LxRow label="error">
                  <LxTextInput v-model="texts.error" />
                </LxRow>
                <LxRow label="errorLabel">
                  <LxTextInput v-model="texts.errorLabel" />
                </LxRow>
                <LxRow label="success">
                  <LxTextInput v-model="texts.success" />
                </LxRow>
                <LxRow label="continueScanning">
                  <LxTextInput v-model="texts.continueScanning" />
                </LxRow>
                <LxRow label="dragHere">
                  <LxTextInput v-model="texts.dragHere" />
                </LxRow>
                <LxRow label="changeCamera">
                  <LxTextInput v-model="texts.changeCamera" />
                </LxRow>
                <LxRow label="scanFile">
                  <LxTextInput v-model="texts.scanFile" />
                </LxRow>
                <LxRow label="toggleFlashlight">
                  <LxTextInput v-model="texts.toggleFlashlight" />
                </LxRow>
              </LxForm>
            </LxModal>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
