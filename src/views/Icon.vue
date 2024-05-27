<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxTextInput,
  LxValuePicker,
  LxExpander,
  LxAutoComplete,
  lxIconUtils,
  LxIcon,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.icon.description');
});

const variants = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'gradient-brand',
    name: 'gradient-brand',
  },
];
const iconSets = [
  {
    id: 'cds',
    name: 'cds',
  },
  {
    id: 'material',
    name: 'material',
  },
  {
    id: 'brand',
    name: 'brand',
  },
];
const selectedVariantId = ref('default');
const selectedIconSetId = ref('cds');

const selectedClass = ref('lx-icon');
const propExpander = ref(false);
const selectedIcon = ref('accept');

const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons(selectedIconSetId.value)?.map((i) => ({ id: i, name: i }))
);
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'iconGuidelines' });
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
  <DemoView kind="s" :show-value="false" label="LxIcon" :git-link="baseGitUrl + 'Icon.vue'">
    <div class="lx-region" style="width: 45px; height: 45px">
      <LxIcon
        :value="selectedIcon"
        :iconSet="selectedIconSetId"
        :variant="selectedVariantId"
        :customClass="selectedClass"
      ></LxIcon>
    </div>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:icon</label>
            <lx-auto-complete
              v-model="selectedIcon"
              :items="dropdownIcons"
              id-attribute="id"
              name-attribute="name"
              placeholder="Choose icon"
              tooltip="Icons"
              query-debounce="200"
            />
          </div>
          <div class="lx-row">
            <label>:icon-set</label>
            <LxValuePicker
              group-id="icon-sets"
              :items="iconSets"
              id="icon-sets"
              v-model="selectedIconSetId"
            />
          </div>
          <div class="lx-row">
            <label>:variant</label>
            <LxValuePicker
              :items="variants"
              id="optionsvaluepicker"
              group-id="options-picker-1"
              v-model="selectedVariantId"
              kind="single"
            />
          </div>
          <div class="lx-row">
            <label>:class</label>
            <LxTextInput v-model="selectedClass" />
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
