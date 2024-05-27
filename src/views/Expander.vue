<script setup lang="ts">
import { onMounted, computed, shallowRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import {
  LxToggle,
  LxTextInput,
  LxExpander,
  LxAutoComplete,
  lxIconUtils,
  LxValuePicker,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import DemoView from '@/components/DemoView.vue';
import { useDemoStore } from '@/stores/useDemoStore';
import { useDebounceFn } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();

const data = shallowRef(demoStore.videoGames);
const labelValue = shallowRef(data.value[0].name);
const modelValueVal = shallowRef(false);
const regionValue = shallowRef(false);
const tooltipValue = shallowRef('Videospēle');
const selectedIcon = shallowRef('flash');
const disabledValue = shallowRef(false);
const invalidValue = shallowRef(false);
const invalidMessageValue = shallowRef('Kļūda!!!');

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
const kindValues = [
  {
    id: 'row',
    name: 'row',
  },
  {
    id: 'column',
    name: 'column',
  },
];
const variantValues = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'highlighted',
    name: 'highlighted',
  },
];

const iconSetId = shallowRef('cds');

const kindSelectedId = shallowRef('row');

const variantSelectedId = shallowRef('default');

const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons(iconSetId.value)?.map((i) => ({ id: i, name: i }))
);

const propExpander = shallowRef(false);
const badgePropExpander = shallowRef(false);
const invalidationExpanded = shallowRef(false);

const debouncedSearchReq = useDebounceFn(async (newValue) => {
  data.value[0].name = newValue;
  demoStore.updateData(data.value);
}, 500);
watch(
  labelValue,
  async (newValue) => {
    await debouncedSearchReq(newValue);
  },
  { immediate: true }
);

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.expander.description');
});
const routerValue = shallowRef('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'expanderGuidelines', params: { id: 'expander' } });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];

const badgeTypes = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'info',
    name: 'info',
  },
  {
    id: 'good',
    name: 'good',
  },
  {
    id: 'warning',
    name: 'warning',
  },
  {
    id: 'important',
    name: 'important',
  },
];
const selectedBadgeTypeId = shallowRef('default');
const buttonBadge = shallowRef();

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <!--
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  -->
  <DemoView kind="l" :show-value="false" label="LxExpander" :git-link="baseGitUrl + 'Expander.vue'">
    <LxExpander
      v-model="modelValueVal"
      :label="labelValue"
      :region="false"
      :icon="selectedIcon"
      :icon-set="iconSetId"
      :tooltip="tooltipValue"
      :badge="buttonBadge"
      :badge-type="selectedBadgeTypeId"
      :kind="kindSelectedId"
      :disabled="disabledValue"
      :variant="variantSelectedId"
      :invalid="invalidValue"
      :invalidation-message="invalidMessageValue"
    >
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <label>Apraksts:</label>
          <p class="lx-data">
            {{ data[0].description }}
          </p>
        </div>
        <div class="lx-row">
          <label>Vērtējums:</label>
          <p class="lx-data">
            {{ data[0].rating }}
          </p>
        </div>
      </div>
    </LxExpander>

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
            <label>:region</label>
            <LxToggle v-model="regionValue" />
          </div>
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
            <LxValuePicker :items="iconSets" v-model="iconSetId" />
          </div>
          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="tooltipValue" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="kindValues" v-model="kindSelectedId" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabledValue" />
          </div>
          <div class="lx-row">
            <label>:variant</label>
            <LxValuePicker :items="variantValues" v-model="variantSelectedId" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="badgePropExpander" label="Badge props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:badge</label>
            <LxTextInput v-model="buttonBadge"></LxTextInput>
          </div>
          <div class="lx-row">
            <label>:badge-type</label>
            <LxValuePicker
              :items="badgeTypes"
              id="badge-types"
              group-id="badge-types"
              v-model="selectedBadgeTypeId"
              kind="single"
            />
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
            <label>:invalidation-message </label>
            <LxTextInput v-model="invalidMessageValue" />
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
