<script setup lang="ts">
import { ref, shallowRef, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import useNotifyStore from '@/stores/useNotifyStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxButton,
  LxToggle,
  LxTextInput,
  LxValuePicker,
  LxExpander,
  LxAutoComplete,
  lxIconUtils,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();
const notification = useNotifyStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.button.description');
});

const variants = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'icon-only',
    name: 'icon-only',
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

const kinds = [
  {
    id: 'primary',
    name: 'primary',
  },
  {
    id: 'secondary',
    name: 'secondary',
  },
  {
    id: 'tertiary',
    name: 'tertiary',
  },
  {
    id: 'ghost',
    name: 'ghost',
  },
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

const selectedVariantId = ref('default');
const selectedKindId = ref('primary');
const selectedIconSetId = ref('cds');
const selectedBadgeTypeId = ref('default');

const buttonLabel = ref('Lejupielādēt spēli');
const buttonTitle = ref('Spēles lejupielādes lapa');
const destructiveValue = ref(false);
const buttonActive = ref(false);
const buttonBusy = ref(false);
const buttonLoading = ref(false);
const buttonDisabled = ref(false);
const buttonBadge = ref();

const propExpander = ref(false);
const badgePropExpander = ref(false);
const eventsExpander = ref(false);
const propAdditionalExpander = ref(false);
const selectedIcon = ref('download');
const openInNewTab = shallowRef(false);

const eventParam = shallowRef({});

function click(e, additionalParam) {
  notification.pushInfo('@click', JSON.stringify({ e, additionalParam }));
  eventParam.value = { e, additionalParam };
}
const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons(selectedIconSetId.value)?.map((i) => ({ id: i, name: i }))
);
const baseGitUrl = window.config.gitLxComponentsUrl;
const routerValue = ref('');
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'buttonGuidelines' });
  }
}
</script>
<template>
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  <DemoView kind="s" :show-value="false" label="LxButton" :git-link="baseGitUrl + 'Button.vue'">
    <LxButton
      :label="buttonLabel"
      :kind="selectedKindId"
      :destructive="destructiveValue"
      :title="buttonTitle"
      :variant="selectedVariantId"
      :active="buttonActive"
      :busy="buttonBusy"
      :badge="buttonBadge"
      :badge-type="selectedBadgeTypeId"
      :loading="buttonLoading"
      :disabled="buttonDisabled"
      :icon="selectedIcon"
      :icon-set="selectedIconSetId"
      :openInNewTab="openInNewTab"
      @click="click"
    />

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:label</label>
            <LxTextInput v-model="buttonLabel"></LxTextInput>
          </div>
          <div class="lx-row">
            <label>:title</label>
            <LxTextInput v-model="buttonTitle"></LxTextInput>
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
            <label>:kind</label>
            <LxValuePicker group-id="kinds" id="kinds" :items="kinds" v-model="selectedKindId" />
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
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:active</label>
            <LxToggle v-model="buttonActive" />
          </div>
          <div class="lx-row">
            <label>:busy</label>
            <LxToggle v-model="buttonBusy" />
          </div>
          <div class="lx-row">
            <label>:destructive</label>
            <LxToggle v-model="destructiveValue" />
          </div>
          <div class="lx-row">
            <label>:loading</label>
            <LxToggle v-model="buttonLoading" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="buttonDisabled" />
          </div>
          <div class="lx-row">
            <label>:openInNewTab</label>
            <LxToggle v-model="openInNewTab" />
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
      <LxExpander v-model="eventsExpander" label="Events" icon="at">
        <div class="lx-form">
          <div class="lx-row">
            <label>@click</label>
            <code>(e) : {{ JSON.stringify(eventParam) }} </code>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
  <router-view></router-view>
</template>
