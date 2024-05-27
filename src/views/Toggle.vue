<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxButton,
  LxToggle,
  LxTextInput,
  LxValuePicker,
  LxExpander,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.toggle.description');
});

const modelValue = shallowRef(false);
const disabledValue = shallowRef(false);
const invalidValue = shallowRef(false);
const readOnlyValue = shallowRef(false);
const invalidationMessage = shallowRef('Kļūda!');

const slots = [
  {
    id: 'none',
    name: 'without slot',
  },
  {
    id: 'onOff',
    name: 'on and off',
  },
  {
    id: 'indeterminate',
    name: 'indeterminate',
  },
  {
    id: 'default',
    name: 'default',
  },
];
const selectedSlotsId = ref('none');

const sizes = [
  {
    id: 's',
    name: 's',
  },
  {
    id: 'm',
    name: 'm',
  },
];
const selectedSizeId = ref('m');

const templateOnValue = shallowRef('On');
const templateOffValue = shallowRef('Off');
const templateDefaultValue = shallowRef('Default');
const templateIndeterminateValue = shallowRef('Indeterminate');
const inputTooltip = shallowRef('Tooltip');

const propExpander = shallowRef(false);
const propAdditionalExpander = shallowRef(false);
const invalidationExpanded = shallowRef(false);
function nullValue() {
  modelValue.value = null;
}

const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'toggleGuidelines', params: { id: 'toggle' } });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  <DemoView kind="s" :show-value="true" label="LxToggle" :git-link="baseGitUrl + 'Toggle.vue'">
    <LxToggle
      v-if="selectedSlotsId === 'none'"
      v-model="modelValue"
      :size="selectedSizeId"
      :disabled="disabledValue"
      :invalid="invalidValue"
      :invalidationMessage="invalidationMessage"
      :readOnly="readOnlyValue"
      :tooltip="inputTooltip"
    />
    <LxToggle
      v-if="selectedSlotsId === 'onOff'"
      v-model="modelValue"
      :size="selectedSizeId"
      :disabled="disabledValue"
      :invalid="invalidValue"
      :invalidationMessage="invalidationMessage"
      :readOnly="readOnlyValue"
      :tooltip="inputTooltip"
    >
      <template #on>{{ templateOnValue }}</template
      ><template #off>{{ templateOffValue }}</template></LxToggle
    >
    <LxToggle
      v-if="selectedSlotsId === 'indeterminate'"
      v-model="modelValue"
      :size="selectedSizeId"
      :disabled="disabledValue"
      :invalid="invalidValue"
      :invalidationMessage="invalidationMessage"
      :readOnly="readOnlyValue"
      :tooltip="inputTooltip"
    >
      <template #indeterminate>{{ templateIndeterminateValue }}</template></LxToggle
    >
    <LxToggle
      v-if="selectedSlotsId === 'default'"
      v-model="modelValue"
      :size="selectedSizeId"
      :disabled="disabledValue"
      :invalid="invalidValue"
      :invalidationMessage="invalidationMessage"
      :readOnly="readOnlyValue"
      :tooltip="inputTooltip"
    >
      {{ templateDefaultValue }}</LxToggle
    >

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:size</label>
            <LxValuePicker :items="sizes" id="id" v-model="selectedSizeId" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabledValue" />
          </div>
          <div class="lx-row">
            <label>:readOnly</label>
            <LxToggle v-model="readOnlyValue" />
          </div>
          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="inputTooltip" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Slots" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>Choose slots</label>
            <LxValuePicker :items="slots" id="id" v-model="selectedSlotsId" />
          </div>
          <div class="lx-row">
            <label>#default slot</label>
            <LxTextInput v-model="templateDefaultValue" />
          </div>
          <div class="lx-row">
            <label>#on slot</label>
            <LxTextInput v-model="templateOnValue" />
          </div>
          <div class="lx-row">
            <label>#off slot</label>
            <LxTextInput v-model="templateOffValue" />
          </div>
          <div class="lx-row">
            <label>#indeterminate slot</label>
            <LxTextInput v-model="templateIndeterminateValue" />
          </div>
          <div class="lx-row">
            <label>Make value 'null' to check indeterminate slot</label>
            <LxButton @click="nullValue()" label="Null the value" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="invalidationExpanded" label="Invalidation props" icon="info">
        <div class="lx-form">
          <div class="lx-row">
            <label>:invalid</label>
            <LxToggle v-model="invalidValue" />
          </div>
          <div class="lx-row">
            <label>:invalidation-message</label>
            <LxTextInput v-model="invalidationMessage" />
          </div>
        </div>
      </LxExpander>
    </template>
    <template #value>
      <code> {{ modelValue }}</code>
    </template>
  </DemoView>
</template>
