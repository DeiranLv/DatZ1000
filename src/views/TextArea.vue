<script setup lang="ts">
import { ref, onMounted, watch, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import { LxToggle, LxTextInput, LxTextArea, LxExpander, LxContentSwitcher } from '@wntr/lx-ui';
import { useDemoStore } from '@/stores/useDemoStore';
import { useDebounceFn } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.textArea.description');
});
const data = ref(demoStore.videoGames);
const outputData = ref(data.value[1].description);
const debouncedSearchReq1 = useDebounceFn(async (newValue) => {
  data.value[1].description = newValue;
  demoStore.updateData(data.value);
}, 750);
watch(
  outputData,
  async (newValue) => {
    await debouncedSearchReq1(newValue);
  },
  { immediate: true }
);
const placeholder = ref('Spēles apraksts');
const rows = ref(3);
const disabled = ref(false);
const invalid = ref(false);
const invalidationMessage = ref('Kļūda!');
const maxLength = ref(225);
const dynamicHeight = ref(false);

const mainExpanded = ref(false);
const additionalExpanded = ref(false);
const invalidationExpanded = ref(false);
const readOnly = ref(false);
const routerValue = ref('');
const inputTooltip = shallowRef('Labākā videospēle');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'textAreaGuidelines', params: { id: 'text-area' } });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <!--
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  -->
  <DemoView label="LxTextArea" :git-link="baseGitUrl + 'TextArea.vue'">
    <LxTextArea
      v-model="outputData"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :invalid="invalid"
      :invalidationMessage="invalidationMessage"
      :maxlength="maxLength"
      :dynamic-height="dynamicHeight"
      :readOnly="readOnly"
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
            <label>:rows</label>
            <LxTextInput v-model="rows" mask="integer" />
          </div>

          <div class="lx-row">
            <label>:maxlength</label>
            <LxTextInput v-model="maxLength" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:readOnly</label>
            <LxToggle v-model="readOnly" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="additionalExpanded" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:dynamic-height</label>
            <LxToggle v-model="dynamicHeight" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="inputTooltip" />
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
      <code>{{ JSON.stringify(outputData) }}</code>
    </template>
  </DemoView>
</template>
