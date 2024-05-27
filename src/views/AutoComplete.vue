<script setup lang="ts">
import { ref, onMounted, watch, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import { useUserStore } from '@/stores/useUserStore';
import {
  LxToggle,
  LxTextInput,
  LxValuePicker,
  LxAutoComplete,
  LxExpander,
  LxDropDown,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { getAutocompleteTest } from '@/services/classifiers';
import useNotifyStore from '@/stores/useNotifyStore';
import useErrors from '@/hooks/useErrors';
import { useRouter } from 'vue-router';

const notificationStore = useNotifyStore();

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();
const userStore = useUserStore();
const notification = useNotifyStore();
const autocompletePreselectedFunc = ref(null);

onMounted(async () => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.autoComplete.description');
  await userStore.fetchSettings();
  autocompletePreselectedFunc.value = userStore.settings.autocompletePreselectedFunc.id;
});

const dropdownItems = ref([
  {
    id: 'kr',
    name: 'League of Legends',
  },
  {
    id: 'ar',
    name: 'Fallout 4',
  },
  {
    id: 'br',
    name: 'The Witcher 3: Wild Hunt',
  },
  {
    id: 'lv',
    name: 'Counter-Strike: Global Offensive',
  },
  {
    id: 'mt',
    name: 'Dishonored ',
  },
  {
    id: 'ma',
    name: 'Dota 2 ',
  },
  {
    id: 'jp',
    name: 'Pokémon Black and White',
  },
  {
    id: 'rus',
    name: 'Übersoldier',
  },
]);

const kinds = [
  {
    id: 'search',
    name: 'search',
  },
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'object',
    name: 'object',
  },
  {
    id: 'preloaded',
    name: 'preloaded',
  },
  {
    id: 'preloaded-func',
    name: 'preloaded-func',
  },
];
const selectedKindId = ref('search');

const variants = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'country',
    name: 'country',
  },
  {
    id: 'state',
    name: 'state',
  },
];
const dictionaryTypes = ref([
  {
    id: 'draft',
    name: 'draft',
  },
  {
    id: 'new',
    name: 'new',
  },
  {
    id: 'editing',
    name: 'editing',
  },
  {
    id: 'edited',
    name: 'edited',
  },
  {
    id: 'disabling',
    name: 'disabling',
  },
  {
    id: 'inactive',
    name: 'inactive',
  },
  {
    id: 'finishing',
    name: 'finishing',
  },
  {
    id: 'finished',
    name: 'finished',
  },
  {
    id: 'deleting',
    name: 'deleting',
  },
  {
    id: 'red',
    name: 'red',
  },
  {
    id: 'green',
    name: 'green',
  },
  {
    id: 'blue',
    name: 'blue',
  },
  {
    id: 'black',
    name: 'black',
  },
  {
    id: 'purple',
    name: 'purple',
  },
  {
    id: 'orange',
    name: 'orange',
  },
  {
    id: 'yellow',
    name: 'yellow',
  },
  {
    id: 'red-full',
    name: 'red-full',
  },
  {
    id: 'green-full',
    name: 'green-full',
  },
  {
    id: 'blue-full',
    name: 'blue-full',
  },
  {
    id: 'black-full',
    name: 'black-full',
  },
  {
    id: 'purple-full',
    name: 'purple-full',
  },
  {
    id: 'orange-full',
    name: 'orange-full',
  },
  {
    id: 'yellow-full',
    name: 'yellow-full',
  },
]);
const dictionaryTypesModel = ref('new');

const dictionaryShapes = [
  {
    id: 'circle',
    name: 'circle',
  },
  {
    id: 'diamond',
    name: 'diamond',
  },
];

const dictionaryShapeId = ref('circle');

const dictionary = ref({
  displayType: dictionaryTypesModel,
  displayShape: dictionaryShapeId,
});
const selectedVariantId = ref('default');

const searchStatus = ref(true);
const defaultStatus = ref(false);
const preloadedStatus = ref(false);
const preloadedFuncStatus = ref(false);
const objectStatus = ref(false);
watch(
  () => selectedKindId.value,
  (newValue) => {
    searchStatus.value = newValue === 'search';
    defaultStatus.value = newValue === 'default';
    preloadedStatus.value = newValue === 'preloaded';
    preloadedFuncStatus.value = newValue === 'preloaded-func';
    objectStatus.value = newValue === 'object';
  }
);
const autocompleteModel = ref(null);
const autocompleteObjectModel = ref(null);

const readOnly = ref(false);
const disabled = ref(false);
const invalid = ref(false);
const invalidationMessage = ref('Error!');
const loading = ref(false);
const hasDetails = ref(false);
const queryMinLength = ref(1);
const queryDebounce = ref(200);

const autocompleteFuncModel = ref(null);

const texts = ref({
  clear: 'Notīrīt',
  empty: 'Nav atrasts neviens rezultāts ar tekstu',
  tryEndingWith1: 'Ievadiet vismaz {0} simbolu, lai sāktu meklēšanu',
  try: 'Ievadiet vismaz {0} simbolus, lai sāktu meklēšanu',
});

const autocompleteDebounceHistory = ref(null);
const errorsStore = useErrors();

async function searchDropdownItems(query) {
  autocompleteDebounceHistory.value = `${new Date().toLocaleString('lv', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })} - trigger searching for "${query}"`;
  try {
    const res = await getAutocompleteTest(query);
    return res.data;
  } catch (e) {
    const err = errorsStore.get(e);
    notificationStore.pushError(err.data);
  }

  return [];
}
const propExpander = ref(false);
const invalidationExpanded = ref(false);
const propAdditionalExpander = ref(false);
const eventsExpander = ref(false);
const placeholder = ref('Videospēles');
const tooltip = ref('Labākā videospēle');

const eventFilter = shallowRef({});
const eventUpdateModelValue = shallowRef({});

function filter(e) {
  notification.pushInfo('Filtrs', JSON.stringify(e));
  eventFilter.value = e;
}
function openDetails() {
  notification.pushInfo('Sīkāka informācija atvērta');
}
function updateModelValue(e) {
  notification.pushInfo('Atjaunināta modeļa vērtība', JSON.stringify(e));
  eventUpdateModelValue.value = e;
}
const routerValue = shallowRef('');
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'autoCompleteGuidelines' });
  }
}
const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  <DemoView :show-value="true" label="LxAutoComplete" :git-link="baseGitUrl + 'AutoComplete.vue'">
    <div v-show="defaultStatus">
      <lx-auto-complete
        v-model="autocompleteModel"
        :items="dropdownItems"
        id-attribute="id"
        name-attribute="name"
        :placeholder="placeholder"
        :tooltip="tooltip"
        :readOnly="readOnly"
        :disabled="disabled"
        :loading="loading"
        :variant="selectedVariantId"
        :invalid="invalid"
        :invalidation-message="invalidationMessage"
        :texts="texts"
        :query-min-length="queryMinLength"
        :query-debounce="queryDebounce"
        :has-details="hasDetails"
        :dictionary="dictionary"
        @filter="filter"
        @open-details="openDetails"
        @update:model-value="updateModelValue"
      />
    </div>
    <div v-show="searchStatus">
      <lx-auto-complete
        v-model="autocompleteFuncModel"
        :items="searchDropdownItems"
        id-attribute="id"
        name-attribute="name"
        :placeholder="placeholder"
        :tooltip="tooltip"
        :readOnly="readOnly"
        :disabled="disabled"
        :loading="loading"
        :variant="selectedVariantId"
        :invalid="invalid"
        :invalidation-message="invalidationMessage"
        :texts="texts"
        :query-min-length="queryMinLength"
        :query-debounce="queryDebounce"
        :has-details="hasDetails"
        :dictionary="dictionary"
        @filter="filter"
        @open-details="openDetails"
        @update:model-value="updateModelValue"
      />
    </div>
    <div v-show="objectStatus">
      <lx-auto-complete
        v-model="autocompleteObjectModel"
        :items="searchDropdownItems"
        :id-attribute="['id', 'name']"
        name-attribute="name"
        :placeholder="placeholder"
        :tooltip="tooltip"
        :readOnly="readOnly"
        :disabled="disabled"
        :loading="loading"
        :variant="selectedVariantId"
        :invalid="invalid"
        :invalidation-message="invalidationMessage"
        :texts="texts"
        :query-min-length="queryMinLength"
        :query-debounce="queryDebounce"
        :has-details="hasDetails"
        :dictionary="dictionary"
        @filter="filter"
        @open-details="openDetails"
        @update:model-value="updateModelValue"
      />
    </div>
    <div v-show="preloadedStatus">
      <lx-auto-complete
        v-model="userStore.settings.autocompletePreselected"
        :items="dropdownItems"
        id-attribute="id"
        name-attribute="name"
        :placeholder="placeholder"
        :tooltip="tooltip"
        :readOnly="readOnly"
        :disabled="disabled"
        :loading="loading"
        :variant="selectedVariantId"
        :invalid="invalid"
        :invalidation-message="invalidationMessage"
        :texts="texts"
        :query-min-length="queryMinLength"
        :query-debounce="queryDebounce"
        :has-details="hasDetails"
        :dictionary="dictionary"
        @filter="filter"
        @open-details="openDetails"
        @update:model-value="updateModelValue"
      />
    </div>
    <div v-show="preloadedFuncStatus">
      <lx-auto-complete
        v-model="autocompletePreselectedFunc"
        :preloaded-items="
          userStore.settings.autocompletePreselectedFunc.id
            ? [userStore.settings.autocompletePreselectedFunc]
            : []
        "
        :items="searchDropdownItems"
        id-attribute="id"
        name-attribute="name"
        :placeholder="placeholder"
        :tooltip="tooltip"
        :readOnly="readOnly"
        :disabled="disabled"
        :loading="loading"
        :variant="selectedVariantId"
        :invalid="invalid"
        :invalidation-message="invalidationMessage"
        :texts="texts"
        :query-min-length="queryMinLength"
        :query-debounce="queryDebounce"
        :has-details="hasDetails"
        :dictionary="dictionary"
        @filter="filter"
        @open-details="openDetails"
        @update:model-value="updateModelValue"
      />
    </div>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="kinds" v-model="selectedKindId" />
          </div>
          <div class="lx-row">
            <label>:variant</label>
            <LxValuePicker :items="variants" v-model="selectedVariantId" />
          </div>
          <div class="lx-row">
            <label>:dictionary.displayType</label>
            <LxDropDown :items="dictionaryTypes" v-model="dictionaryTypesModel" />
          </div>
          <div class="lx-row">
            <label>:dictionary.displayShape</label>
            <LxValuePicker :items="dictionaryShapes" v-model="dictionaryShapeId" />
          </div>
          <div class="lx-row">
            <label>:placeholder</label>
            <LxTextInput v-model="placeholder" />
          </div>

          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="tooltip" />
          </div>
          <div class="lx-row">
            <label>:read-only</label>
            <LxToggle v-model="readOnly" />
          </div>
          <div class="lx-row">
            <label>:loading</label>
            <LxToggle v-model="loading" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:texts.empty</label>
            <LxTextInput v-model="texts.empty" />
          </div>
          <div class="lx-row">
            <label>texts.tryEndingWith1</label>
            <LxTextInput v-model="texts.tryEndingWith1" />
          </div>
          <div class="lx-row">
            <label>:texts.clear</label>
            <LxTextInput v-model="texts.clear" />
          </div>
          <div class="lx-row">
            <label>:query-debounce</label>
            <LxTextInput v-model="queryDebounce" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:query-min-length</label>
            <LxTextInput v-model="queryMinLength" mask="integer" :convert-to-string="false" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <div class="lx-row">
            <label>:has-details</label>
            <LxToggle v-model="hasDetails" />
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
      <LxExpander v-model="eventsExpander" label="Events" icon="at">
        <div class="lx-form">
          <div class="lx-row">
            <label>@update:modelValue</label>
            <code>(e) : {{ JSON.stringify(eventUpdateModelValue) }} </code>
          </div>
          <div class="lx-row">
            <label>@filter</label>
            <code>(e) : {{ JSON.stringify(eventFilter) }} </code>
          </div>
          <div class="lx-row">
            <label>@openDetails</label>
            <code>Open details: —</code>
          </div>
        </div>
      </LxExpander>
    </template>
    <template #value>
      <code v-show="defaultStatus">{{ JSON.stringify(autocompleteModel) }}</code>
      <code v-show="searchStatus">{{ JSON.stringify(autocompleteFuncModel) }}</code>
      <code v-show="objectStatus">{{
        JSON.stringify(userStore.settings.autocompletePreselected)
      }}</code>
      <code v-show="preloadedStatus">{{
        JSON.stringify(userStore.settings.autocompletePreselected)
      }}</code>
      <code v-show="preloadedFuncStatus">{{ JSON.stringify(autocompletePreselectedFunc) }}</code>
    </template>
  </DemoView>
</template>
