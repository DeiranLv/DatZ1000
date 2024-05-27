<script setup lang="ts">
import { ref, onMounted, watch, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import { LxToggle, LxTextInput, LxValuePicker, LxExpander, LxContentSwitcher } from '@wntr/lx-ui';
import DemoView from '@/components/DemoView.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.textInput.description');
});
const masks = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'integer',
    name: 'integer',
  },
  {
    id: 'decimal',
    name: 'decimal',
  },
  {
    id: 'gpslat',
    name: 'gpslat',
  },
  {
    id: 'gpslon',
    name: 'gpslon',
  },
  {
    id: 'time',
    name: 'time',
  },
  {
    id: 'person-code-lv',
    name: 'person-code-lv',
  },
  {
    id: 'newborn-id',
    name: 'newborn-id',
  },
  {
    id: 'currency',
    name: 'currency',
  },
  {
    id: 'email',
    name: 'email',
  },
];
const kinds = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'search',
    name: 'search',
  },
  {
    id: 'password',
    name: 'password',
  },
];
const selectedKindId = ref('default');

const inputData = ref('Fallout 4');
const placeholder = ref('Ievadiet vērtību');
const selectedMaskId = ref('default');

const readOnly = ref(false);
const invalid = ref(false);
const disabled = ref(false);
const upperCase = ref(false);
const invalidationMessage = ref('Kļūda!');
const scale = ref(2);
const maxLength = ref(20);
const storage = ref('');
const convertToString = ref(true);
watch(
  () => upperCase.value,
  () => {
    if (upperCase.value === true) {
      storage.value = inputData.value;
      inputData.value = inputData.value.toUpperCase();
    } else {
      inputData.value = storage.value;
      storage.value = inputData.value;
    }
  }
);
const inputTooltip = shallowRef('Labākā videospēle');

const mainExpanded = ref(false);
const additionalExpanded = ref(false);
const invalidationExpanded = ref(false);

const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'textInputGuidelines', params: { id: 'text-input' } });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];
const signed = ref(false);

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  <DemoView label="LxTextInput" :git-link="baseGitUrl + 'TextInput.vue'">
    <LxTextInput
      v-model="inputData"
      :mask="selectedMaskId"
      :readOnly="readOnly"
      :placeholder="placeholder"
      :invalidationMessage="invalidationMessage"
      :invalid="invalid"
      :disabled="disabled"
      :uppercase="upperCase"
      :kind="selectedKindId"
      :scale="scale"
      :signed="signed"
      :maxlength="maxLength"
      :convert-to-string="convertToString"
      :tooltip="inputTooltip"
    />
    <template #menu>
      <LxExpander v-model="mainExpanded" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:placeholder</label>
            <LxTextInput v-model="placeholder" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker
              :items="kinds"
              id="optionsValuePicker"
              group-id="options-picker-1"
              v-model="selectedKindId"
              kind="single"
            />
          </div>
          <div class="lx-row">
            <label>:mask</label>
            <LxValuePicker :items="masks" id="id" v-model="selectedMaskId" />
          </div>
          <div class="lx-row">
            <label>:readOnly</label>
            <LxToggle v-model="readOnly" />
          </div>
          <div class="lx-row">
            <label>:maxlength</label>
            <LxTextInput v-model="maxLength" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="inputTooltip" mask="default" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="additionalExpanded" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:scale</label>
            <LxTextInput v-model="scale" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:signed</label>
            <LxToggle v-model="signed" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <div class="lx-row">
            <label>:uppercase</label>
            <LxToggle v-model="upperCase" />
          </div>
          <div class="lx-row">
            <label>:convert-to-string </label>
            <LxToggle v-model="convertToString" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="invalidationExpanded" label="Invalidation props" icon="info">
        <div class="lx-form">
          <div class="lx-row">
            <label>:invalid</label>
            <LxToggle v-model="invalid" />
          </div>

          <div class="lx-row">
            <label>:invalidation-message</label>
            <LxTextInput v-model="invalidationMessage" />
          </div>
        </div>
      </LxExpander>
    </template>
    <template #value>
      <code>{{ JSON.stringify(inputData) }}</code>
    </template>
  </DemoView>
</template>
