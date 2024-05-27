<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import { LxTextInput, LxValuePicker, LxExpander, LxToggle, LxLoader } from '@wntr/lx-ui';

const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.loader.description');
});
const loading = ref(true);
const size = ref('l');
const sizes = [
  { id: 's', name: 's' },
  { id: 'l', name: 'l' },
];
const variant = ref('default');
const variants = [
  { id: 'default', name: 'default' },
  { id: 'bar', name: 'bar' },
];
const loaderValue = ref(0);

const kinds = [
  {
    id: 'indeterminate',
    name: 'indeterminate',
  },
  {
    id: 'progress',
    name: 'progress',
  },
];
const states = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'error',
    name: 'error',
  },
  {
    id: 'success',
    name: 'success',
  },
];
const state = ref('default');
const fakedDuration = ref(2000);
const faked = ref(false);
const kind = ref('indeterminate');
const mainPropExpander = ref(true);
const additionalExpander = ref(false);
const label = ref('Notiek datņu ielāde');
const description = ref('Lūdzu uzgaidiet');

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <DemoView kind="s" :show-value="false" label="LxLoader" :git-link="baseGitUrl + 'Loader.vue'">
    <div class="lx-region">
      <div class="lx-divider"></div>
      <LxLoader
        v-model="loaderValue"
        :size="size"
        :variant="variant"
        :kind="kind"
        :loading="loading"
        :label="label"
        :description="description"
        :state="state"
        :faked="faked"
        :faked-duration="fakedDuration"
      >
      </LxLoader>
    </div>
    <template #menu>
      <LxExpander v-model="mainPropExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="kinds" kind="single" v-model="kind" />
          </div>
          <div class="lx-row">
            <label>:value</label>
            <LxTextInput
              v-model="loaderValue"
              :convert-to-string="true"
              mask="decimal"
              :maxlength="4"
            />
          </div>
          <div class="lx-row">
            <label>:size</label>
            <LxValuePicker :items="sizes" kind="single" v-model="size" />
          </div>
          <div class="lx-row">
            <label>:variant</label>
            <LxValuePicker :items="variants" kind="single" v-model="variant" />
          </div>
          <div class="lx-row">
            <label>:loading</label>
            <LxToggle v-model="loading"></LxToggle>
          </div>
          <div class="lx-row">
            <label>:faked</label>
            <LxToggle v-model="faked"></LxToggle>
          </div>

          <div class="lx-row">
            <label>:fakedDuration</label>
            <LxTextInput v-model="fakedDuration" :convertToString="false" mask="integer" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="additionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:label</label>
            <LxTextInput v-model="label" />
          </div>
          <div class="lx-row">
            <label>:description</label>
            <LxTextInput v-model="description" />
          </div>
          <div class="lx-row">
            <label>:state</label>
            <LxValuePicker :items="states" kind="single" v-model="state" />
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
