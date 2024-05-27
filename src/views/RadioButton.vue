<script setup lang="ts">
import { shallowRef, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import { LxToggle, LxTextInput, LxExpander, LxRadioButton, LxContentSwitcher } from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

const propExpander = shallowRef(false);

const modelValueVal = shallowRef(false);
const labelValue = shallowRef('Minecraft');
const valueValue = shallowRef('Minecraft');
const disabledValue = shallowRef(false);

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.radioButton.description');
});
const routerValue = shallowRef('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'radioButtonGuidelines' });
  }
}
const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <LxContentSwitcher
    :items="[
      { id: '', name: 'Smilškaste' },
      { id: 'guidelines', name: 'Vadlīnijas' },
    ]"
    v-model="routerValue"
    @click="contentSwitcherClick()"
  />
  <DemoView
    kind="s"
    :show-value="true"
    label="LxRadioButton"
    :git-link="baseGitUrl + 'RadioButton.vue'"
  >
    <LxRadioButton
      v-model="modelValueVal"
      :label="labelValue"
      :value="valueValue"
      :disabled="disabledValue"
    />
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:modelValue</label>
            <LxToggle v-model="modelValueVal" />
          </div>
          <div class="lx-row">
            <label>:label</label>
            <LxTextInput v-model="labelValue" />
          </div>
          <div class="lx-row">
            <label>:value</label>
            <LxTextInput v-model="valueValue" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabledValue" />
          </div>
        </div>
      </LxExpander>
    </template>
    <template #value>
      <code>{{ JSON.stringify(modelValueVal) }}</code>
    </template>
  </DemoView>
</template>
