<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxExpander,
  LxValuePicker,
  LxInfoWrapper,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { useDemoStore } from '@/stores/useDemoStore';
import { useDebounceFn } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.infoWrapper.description');
});
const propExpander = ref(false);
const propAdditionalExpander = ref(false);
const slotsExpander = ref(false);
const placements = [
  {
    id: 'auto',
    name: 'auto',
  },
  {
    id: 'auto-start',
    name: 'auto-start',
  },
  {
    id: 'auto-end',
    name: 'auto-end',
  },
  {
    id: 'top',
    name: 'top',
  },
  {
    id: 'top-start',
    name: 'top-start',
  },
  {
    id: 'top-end',
    name: 'top-end',
  },
  {
    id: 'bottom',
    name: 'bottom',
  },
  {
    id: 'bottom-start',
    name: 'bottom-start',
  },
  {
    id: 'bottom-end',
    name: 'bottom-end',
  },
  {
    id: 'right',
    name: 'right',
  },
  {
    id: 'right-start',
    name: 'right-start',
  },
  {
    id: 'right-end',
    name: 'right-end',
  },
  {
    id: 'left',
    name: 'left',
  },
  {
    id: 'left-start',
    name: 'left-start',
  },
  {
    id: 'left-end',
    name: 'left-end',
  },
];
const selectedPlacementId = ref('bottom');

const data = ref(demoStore.videoGames);
const content = ref('Simple popper content :)');
const popperDisplayText = ref(data.value[0].name);
const popperBody = ref(data.value[0].description);
const popperLabel = ref('Spēles apraksts');
const hover = ref(true);
const arrow = ref(true);
const disabled = ref(false);
const interactive = ref(true);
const locked = ref(false);
const offsetSkid = ref('0');
const offsetDistance = ref('12');
const arrowPadding = ref('0');
const openDelay = ref('0');
const closeDelay = ref('0');

const debouncedSearchReq = useDebounceFn(async (newValue) => {
  data.value[0].name = newValue;
  demoStore.updateData(data.value);
}, 500);
const debouncedSearchReq1 = useDebounceFn(async (newValue) => {
  data.value[0].description = newValue;
  demoStore.updateData(data.value);
}, 500);

watch(
  popperDisplayText,
  async (newValue) => {
    await debouncedSearchReq(newValue);
  },
  { immediate: true }
);
watch(
  popperBody,
  async (newValue) => {
    await debouncedSearchReq1(newValue);
  },
  { immediate: true }
);
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'infoWrapperGuidelines' });
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
    :show-value="false"
    :show-modal-button="true"
    label="LxInfoWrapper"
    :git-link="baseGitUrl + 'InfoWrapper.vue'"
  >
    <div class="lx-region">
      <LxInfoWrapper
        :placement="selectedPlacementId"
        :offset-skid="offsetSkid"
        :offset-distance="offsetDistance"
        :hover="hover"
        :arrow="arrow"
        :arrow-padding="arrowPadding"
        :disabled="disabled"
        :open-delay="openDelay"
        :close-delay="closeDelay"
        :interactive="interactive"
        :content="content"
        :locked="locked"
      >
        <strong class="lx-data">{{ popperDisplayText }}</strong>
        <template #panel>
          <div class="lx-row">
            <label class="lx-label"> {{ popperLabel }} </label>
            <p class="lx-data">{{ popperBody }}</p>
          </div>
        </template>
      </LxInfoWrapper>
    </div>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:placement</label>
            <LxValuePicker
              variant="dropdown"
              group-id="placements"
              id="placements"
              :items="placements"
              v-model="selectedPlacementId"
            />
          </div>

          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled"></LxToggle>
          </div>
        </div>
      </LxExpander>

      <LxExpander v-model="slotsExpander" label="Slots" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <code>#panel</code>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
