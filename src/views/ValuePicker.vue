<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import {
  LxToggle,
  LxTextInput,
  lxStringUtils,
  LxButton,
  LxModal,
  LxExpander,
  LxContentSwitcher,
  LxValuePicker,
} from '@wntr/lx-ui';
import DemoView from '@/components/DemoView.vue';
import { useDemoStore } from '@/stores/useDemoStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.valuePicker.description');
});

const variants = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'default-custom',
    name: 'default-custom',
  },
  {
    id: 'dropdown',
    name: 'dropdown',
  },
  {
    id: 'dropdown-custom',
    name: 'dropdown-custom',
  },
  {
    id: 'tiles',
    name: 'tiles',
  },
  {
    id: 'tiles-custom',
    name: 'tiles-custom',
  },
  {
    id: 'tags',
    name: 'tags',
  },
  {
    id: 'tags-custom',
    name: 'tags-custom',
  },
];
const kinds = [
  {
    id: 'single',
    name: 'single',
  },
  {
    id: 'multiple',
    name: 'multiple',
  },
];
const renderTypes = [
  {
    id: 'row',
    name: 'row',
  },
  {
    id: 'column',
    name: 'column',
  },
];

const selectedItemsIds = ref(1);

const selectedKindsId = ref('single');
const selectedReadOnlyRenderType = ref('row');

const selectedVariantId = ref('default');

const readOnly = ref(false);
const disabled = ref(false);
const invalid = ref(false);
const nullable = ref(false);
const alwaysAsArray = ref(false);
const hasSearch = ref(false);
const editModal = ref();

const invalidationMessage = ref('Kļuda!');
const texts = ref({
  clearChosen: 'Iztīrīt visu',
  clearQuery: 'Iztīrīt meklēšanu',
  notSelected: 'Nav izvēlēts',
  searchPlaceholder: 'Search',
});
const placeholder = ref('Labākā spēle');

const tooltip = ref('Labākā videospēle');
const deletedItems = ref([]);

function isDeleted(fieldId) {
  return deletedItems.value.find((id) => id === fieldId) !== undefined;
}
function save(e) {
  demoStore.videoGames = demoStore.videoGames.filter((o) => !isDeleted(o.id));
  deletedItems.value = [];
  demoStore.updateData(demoStore.videoGames);
  e.close();
}
const randomValue = ref([
  'Rust',
  'FIFA',
  'Fortnite',
  'Rocket League',
  'Overwatch',
  'World of Warcraft',
]);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function valuePickerNewItem() {
  const newId = lxStringUtils.generateUUID();
  const newName = randomValue.value[getRandomInt(6)];
  demoStore.videoGames.push({
    id: Number(newId),
    name: newName,
    popularity: null,
    description: null,
    multiplayer: null,
    rating: null,
    country: null,
    group: null,
  });
}
function returnItem(id) {
  deletedItems.value = deletedItems.value.filter((o) => o !== id);
}
function removeItem(id) {
  if (!isDeleted(id)) {
    deletedItems.value.push(id);
  }
}

const kindForDemoView = computed(() => {
  if (selectedVariantId.value !== 'dropdown' && selectedVariantId.value !== 'dropdown-custom') {
    return 's';
  }
  return 'm';
});

const propExpander = ref(false);
const invalidationExpanded = ref(false);
const propAdditionalExpander = ref(false);

const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'valuePickerGuidelines', params: { id: 'value-picker' } });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];
const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  <DemoView
    :kind="kindForDemoView"
    :show-value="true"
    label="LxValuePicker"
    :git-link="baseGitUrl + 'ValuePicker.vue'"
  >
    <LxValuePicker
      :items="demoStore.videoGamesComputed"
      id="id"
      v-model="selectedItemsIds"
      :read-only="readOnly"
      :disabled="disabled"
      :invalid="invalid"
      :always-as-array="alwaysAsArray"
      :invalidation-message="invalidationMessage"
      :texts="texts"
      :variant="selectedVariantId"
      :placeholder="placeholder"
      :tooltip="tooltip"
      :kind="selectedKindsId"
      :readOnlyRenderType="selectedReadOnlyRenderType"
      :has-search="hasSearch"
      :nullable="nullable"
    >
      <template #customItem="{ id, name }">
        <div>{{ id }} - {{ name }}</div>
      </template>
    </LxValuePicker>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:variant</label>
            <LxValuePicker :items="variants" id="id" v-model="selectedVariantId" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="kinds" id="id" v-model="selectedKindsId" />
          </div>
          <div class="lx-row">
            <label>:has-search</label>
            <LxToggle v-model="hasSearch" />
          </div>

          <div class="lx-row">
            <label>:read-only</label>
            <LxToggle v-model="readOnly" />
          </div>
          <div class="lx-row">
            <label>:read-only-render-type</label>
            <LxValuePicker :items="renderTypes" v-model="selectedReadOnlyRenderType" />
          </div>
          <div class="lx-row">
            <label>:always-as-array</label>
            <LxToggle v-model="alwaysAsArray" />
          </div>
          <div class="lx-row">
            <label>:nullable</label>
            <LxToggle v-model="nullable" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="tooltip" />
          </div>
          <div class="lx-row">
            <label>:texts.clearChosen</label>
            <LxTextInput v-model="texts.clearChosen" />
          </div>
          <div class="lx-row">
            <label>:texts.clearQuery</label>
            <LxTextInput v-model="texts.clearQuery" />
          </div>
          <div class="lx-row">
            <label>:texts.searchPlaceholder</label>
            <LxTextInput v-model="texts.searchPlaceholder" />
          </div>
          <div class="lx-row">
            <label>:placeholder</label>
            <LxTextInput v-model="placeholder" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <lx-button
            @click="editModal.open()"
            kind="primary"
            label="Vērtību redaktors"
            icon="open"
          />
          <lx-modal
            ref="editModal"
            label="Vērtību redaktors"
            size="l"
            button-primary-label="Saglabāt un aizvērt"
            :button-primary-visible="true"
            @primary-action="save(editModal)"
          >
            <div class="lx-pseudo-grid">
              <header class="lx-labels">
                <label class="lx-cell lx-cell-l">Value id</label>
                <label class="lx-cell lx-cell-l">Value name</label>
                <label class="lx-cell lx-cell-l">Value description</label>
                <label class="lx-cell lx-cell-l">Delete</label>
              </header>
              <div class="lx-row" v-for="f in demoStore.videoGames" :key="f.id" title="test">
                <div class="lx-cell lx-cell-l">
                  <div class="lx-cell lx-cell-l" v-show="isDeleted(f.id)">
                    <p>{{ `Deleted ${f.name}` }}</p>
                  </div>
                  <lx-text-input
                    :id="`title-${f.id}`"
                    v-model="f.id"
                    v-show="!isDeleted(f.id)"
                    :placeholder="f.id.toString()"
                  />
                </div>
                <div class="lx-cell lx-cell-l">
                  <lx-text-input
                    :id="`title-${f.name}`"
                    v-model="f.name"
                    v-show="!isDeleted(f.id)"
                    :placeholder="f.name"
                  />
                </div>
                <div class="lx-cell lx-cell-l">
                  <lx-text-input
                    :id="`title-${f.description}`"
                    v-model="f.description"
                    v-show="!isDeleted(f.id)"
                    :placeholder="f.description"
                  />
                </div>

                <div class="lx-cell lx-cell-m" v-show="isDeleted(f.id)">
                  <lx-button
                    :id="f.id"
                    variant="icon-only"
                    kind="ghost"
                    icon="undo"
                    @click="returnItem(f.id)"
                  />
                </div>
                <div class="lx-cell lx-cell-m" v-show="!isDeleted(f.id)">
                  <lx-button
                    :id="f.id"
                    variant="icon-only"
                    kind="ghost"
                    icon="remove-item"
                    :destructive="true"
                    @click="removeItem(f.id)"
                  />
                </div>
              </div>
              <div class="lx-cell lx-cell-xl">
                <div class="lx-button-set lx-justified-toolbar">
                  <lx-button
                    label="Pievienot pogu"
                    kind="ghost"
                    icon="add-item"
                    @click="valuePickerNewItem()"
                  />
                </div>
              </div>
            </div>
          </lx-modal>
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
      <code>{{ JSON.stringify(selectedItemsIds) }}</code>
    </template>
  </DemoView>
</template>
