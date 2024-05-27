<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import { LxToggle, LxTextInput, LxExpander, LxNumberSlider, LxContentSwitcher } from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.numberSlider.description');
});

const min = ref(0);
const max = ref(9999);
const step = ref(1);
const stepMultiplier = ref(5);
const hasInput = ref(true);
const readOnly = ref(false);

const propExpander = ref(false);
const propAdditionalExpander = ref(false);
const sliderValue = ref(5000);
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'numberSliderGuidelines', params: { id: 'number-slider' } });
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
  <DemoView
    kind="s"
    :show-value="true"
    :show-modal-button="true"
    label="LxNumberSlider"
    :git-link="baseGitUrl + 'NumberSlider.vue'"
  >
    <div class="lx-region">
      <LxNumberSlider
        v-model="sliderValue"
        :min="min"
        :max="max"
        :step="step"
        :step-multiplier="stepMultiplier"
        :has-input="hasInput"
        :read-only="readOnly"
      >
      </LxNumberSlider>
    </div>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:has-input</label>
            <LxToggle v-model="hasInput" />
          </div>
          <div class="lx-row">
            <label>:min</label>
            <LxTextInput v-model="min" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:max</label>
            <LxTextInput v-model="max" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:step</label>
            <LxTextInput v-model="step" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:step-multiplier</label>
            <LxTextInput v-model="stepMultiplier" mask="integer" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:read-only</label>
            <LxToggle v-model="readOnly" />
          </div>
        </div>
      </LxExpander>
    </template>
    <template #value>
      <code>{{ JSON.stringify(sliderValue) }}</code>
    </template>
  </DemoView>
</template>
