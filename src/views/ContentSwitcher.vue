<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxTextInput,
  LxExpander,
  lxStringUtils,
  LxModal,
  LxButton,
  LxContentSwitcher,
  LxToggle,
  LxValuePicker,
  LxAutoComplete,
  lxIconUtils,
} from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.contentSwitcher.description');
});

const propExpander = ref(false);
const propAdditionalExpander = ref(false);
const disabled = ref(false);

const items = shallowRef([
  {
    id: 'info',
    name: 'Spēles pamatinformācija',
    icon: 'info',
  },
  {
    id: 'story',
    name: 'Stāsts',
    icon: 'registry',
  },
  {
    id: 'characters',
    name: 'Varoņi',
    icon: 'users',
  },
  {
    id: 'developers',
    name: 'Informācja par izstrādātāju',
    icon: 'policy',
  },
  {
    id: 'download',
    name: 'Lejupielāde',
    icon: 'download',
  },
]);
const kinds = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'icon-only',
    name: 'icon-only',
  },
  {
    id: 'combo',
    name: 'combo',
  },
];
const selectedKindId = ref('default');

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
const selectedIconSetId = ref('cds');

const selectedIcon = shallowRef('flash');
const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons(selectedIconSetId.value)?.map((i) => ({ id: i, name: i }))
);

const inputTooltip = shallowRef('Sadaļas izvēle');
const selectedItemsId = ref(items.value[0].code);
const editItemsModal = ref();
const deletedDataItems = ref([]);

const itemsCopy = ref([
  {
    id: null,
    code: null,
    displayName: null,
    icon: null,
    iconSet: null,
  },
]);
function copyItemsArray() {
  editItemsModal.value.open();
  itemsCopy.value = items.value;
}
function isDeletedItem(fieldId) {
  if (deletedDataItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function saveItems() {
  items.value = items.value.filter((o) => !isDeletedItem(o.id));
  deletedDataItems.value = [];
  copyItemsArray();
}
function removeRowItem(id) {
  if (!isDeletedItem(id)) {
    deletedDataItems.value.push(id);
  }
}
function newItem() {
  const newId = lxStringUtils.generateUUID().slice(16);
  itemsCopy.value.push({
    id: newId,
    code: null,
    displayName: null,
    icon: null,
    iconSet: null,
  });
  saveItems();
}
function returnItem(id) {
  deletedDataItems.value = deletedDataItems.value.filter((o) => o !== id);
}

const selectedContentSwitcherID = ref('Fallout 4');
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'contentSwitcherGuidelines' });
  }
}
const itemsNavigaton = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];

const baseGitUrl = window.config?.gitLxComponentsUrl;
</script>
<template>
  <DemoView
    kind="s"
    :show-value="true"
    label="LxContentSwitcher"
    :git-link="baseGitUrl + 'ContentSwitcher.vue'"
  >
    <div class="lx-region">
      <LxContentSwitcher
        :items="items"
        v-model="selectedItemsId"
        :id="selectedContentSwitcherID"
        :disabled="disabled"
        :kind="selectedKindId"
        :iconSet="selectedIconSetId"
        :icon="selectedIcon"
        :tooltip="inputTooltip"
      />
    </div>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:id</label>
            <LxTextInput v-model="selectedContentSwitcherID" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker group-id="kinds" :items="kinds" id="kinds" v-model="selectedKindId" />
          </div>

          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="inputTooltip" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Edit props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <lx-button @click="copyItemsArray()" kind="secondary" label="Edit items" icon="open" />

            <lx-modal
              ref="editItemsModal"
              label="Items editor"
              size="m"
              button-secondary-label="Close"
              button-primary-label="Save and close"
              :button-secondary-visible="true"
              :button-primary-visible="true"
              @primary-action="saveItems(), editItemsModal.close()"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label class="lx-cell lx-cell-m"> :code </label>
                  <label class="lx-cell lx-cell-m"> :displayName </label>
                  <label class="lx-cell lx-cell-m"> :icon </label>
                  <label class="lx-cell lx-cell-m"> :iconSet </label>
                  <label class="lx-cell lx-cell-s"> Delete </label>
                </header>
                <div class="lx-row" v-for="f in itemsCopy" :key="f.id" title="test">
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.code"
                      v-show="!isDeletedItem(f.id)"
                    />
                    <p v-if="isDeletedItem(f.id)">{{ `Deleted ${f.code}` }}</p>
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.displayName"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.icon"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.iconSet"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m" v-show="isDeletedItem(f.id)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m" v-show="!isDeletedItem(f.id)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="remove-item"
                      :destructive="true"
                      @click="removeRowItem(f.id)"
                    />
                  </div>
                </div>
                <div class="lx-cell lx-cell-xl">
                  <div class="lx-button-set lx-justified-toolbar">
                    <lx-button
                      label="Add element"
                      kind="ghost"
                      icon="add-item"
                      @click="newItem()"
                    />
                  </div>
                  <div class="lx-divider"></div>
                </div>
              </div>
            </lx-modal>
          </div>
        </div>
      </LxExpander>
    </template>
    <template #value>
      <code>{{ JSON.stringify(selectedItemsId) }}</code>
    </template>
  </DemoView>
</template>
