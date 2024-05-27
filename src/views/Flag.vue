<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import { LxTextInput, LxValuePicker, LxExpander, LxFlag, LxContentSwitcher } from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.flag.description');
});

const flagCountry = ref('lv');
const flagSize = ref('normal');
const size = [
  { id: 'small', name: 'small' },
  { id: 'normal', name: 'normal' },
  { id: 'big', name: 'big' },
];

const propExpander = ref(false);
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'flagGuidelines' });
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
  <DemoView kind="s" :show-value="false" label="LxFlag" :git-link="baseGitUrl + 'Flag.vue'">
    <div class="lx-region">
      <LxFlag :value="flagCountry" :size="flagSize"> </LxFlag>
    </div>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:value</label>
            <LxTextInput v-model="flagCountry"></LxTextInput>
          </div>
          <div class="lx-row">
            <label>:size</label>
            <LxValuePicker :items="size" kind="single" v-model="flagSize" />
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
