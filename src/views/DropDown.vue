<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';

import {
  LxToggle,
  LxTextInput,
  LxExpander,
  LxDropDown,
  LxValuePicker,
  lxStringUtils,
  LxModal,
  LxButton,
} from '@wntr/lx-ui';
import { useDemoStore } from '@/stores/useDemoStore';

const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.dropDown.description');
});

const propExpander = ref(false);
const propAdditionalExpander = ref(false);
const invalidationExpanded = ref(false);

const kinds = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'native',
    name: 'native',
  },
];
const variants = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'state',
    name: 'state',
  },
  {
    id: 'country',
    name: 'country',
  },
  {
    id: 'custom',
    name: 'custom',
  },
];
const selectedKindSetId = ref('default');

const selectedVariantSetId = ref('default');

const items = computed(() => {
  const itemsValue = demoStore.videoGamesComputedCountry;
  itemsValue?.forEach((x) => {
    if (typeof x.country !== 'string') {
      x.country = x.country?.code;
    }
  });
  return itemsValue;
});

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
const dropDownModel = ref(8);

const tooltip = ref('Labāka videospēle');
const placeholder = ref('Videospēles');
const readOnly = ref(false);
const disabled = ref(false);
const invalid = ref(false);
const invalidationMessage = ref('Kļūda!');
const editModal = ref();

const deletedItems = ref([]);
function isDeleted(fieldId) {
  if (deletedItems.value.find((id) => id === fieldId)) return true;
  return false;
}

function save(e) {
  demoStore.videoGames = demoStore.videoGames.filter((o) => !isDeleted(o.id));
  deletedItems.value = [];
  demoStore.updateData(demoStore.videoGames);
  e.close();
}
function returnItem(id) {
  deletedItems.value = deletedItems.value.filter((o) => o !== id);
}
function removeItem(id) {
  if (!isDeleted(id)) {
    deletedItems.value.push(id);
  }
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

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <DemoView
    :show-modal-button="true"
    :show-value="true"
    label="LxDropDown"
    :git-link="baseGitUrl + 'Dropdown.vue'"
  >
    <LxDropDown
      id="dropdown-component"
      v-model="dropDownModel"
      :items="items"
      :tooltip="tooltip"
      :read-only="readOnly"
      :disabled="disabled"
      :invalid="invalid"
      :invalidation-message="invalidationMessage"
      :kind="selectedKindSetId"
      :placeholder="placeholder"
      :variant="selectedVariantSetId"
      :dictionary="dictionary"
    >
      <template #customItem="{ id, name }">
        <div>{{ id }} - {{ name }}</div>
      </template>
    </LxDropDown>

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker
              group-id="icon-sets"
              :items="kinds"
              id="icon-sets"
              v-model="selectedKindSetId"
            />
          </div>
          <div class="lx-row">
            <label>:variant</label>
            <LxValuePicker :items="variants" v-model="selectedVariantSetId" />
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
            <label>:dictionary.displayType</label>
            <LxDropDown :items="dictionaryTypes" v-model="dictionaryTypesModel" />
          </div>
          <div class="lx-row">
            <label>:dictionary.displayShape</label>
            <LxValuePicker :items="dictionaryShapes" v-model="dictionaryShapeId" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:read-only</label>
            <LxToggle v-model="readOnly" />
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
      <LxExpander v-model="invalidationExpanded" label="Invalidation props" icon="config">
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
      <code>{{ JSON.stringify(dropDownModel) }}</code>
    </template>
  </DemoView>
</template>
