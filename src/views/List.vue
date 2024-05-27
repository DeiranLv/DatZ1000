<script setup lang="ts">
import { ref, shallowRef, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxExpander,
  LxAutoComplete,
  lxIconUtils,
  lxStringUtils,
  LxModal,
  LxButton,
  LxList,
  LxValuePicker,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { useDemoStore } from '@/stores/useDemoStore';
import { useRouter } from 'vue-router';
import useNotifyStore from '@/stores/useNotifyStore';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();
const notificationStore = useNotifyStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.list.description');
});
const items = ref(demoStore.videoGames);

const hasSearch = ref(true);
const busyValue = shallowRef(false);
const loadingValue = shallowRef(false);
const showLoadMoreValue = shallowRef(false);
const groupDefinitions = ref(null);
const hasSelecting = shallowRef(false);

// const groupDefinitions = ref([
//   {
//     name: 'Vairākspēlētāju tiešsaistes kaujas arēnas spēles (MOBA)',
//     id: '1',
//     expanded: true,
//   },
//   { name: 'Asa sižeta lomu spēles (Action RPG)', id: '2', badgeType: 'good', expanded: true },
//   { name: 'Pirmās personas šaušanas spēles (FPS)', id: '3', badgeType: 'warning', expanded: true },
//   { name: 'Citu žanru spēles', id: '4', badgeType: 'important', expanded: true },
// ]);

const icon = ref('open');
const itemIdAttributeName = ref('id');
const itemPrimaryAttributeName = ref('name');
const itemSecondaryAttributeName = ref('description');
const itemOrderAttributeName = ref('order');
const itemHrefAttributeName = ref('href');
const itemGroupAttributeName = ref('group');
const itemClickableAttributeName = ref('clickable');
const itemIconAttributeName = ref('icon');
const itemIconSetAttributeName = ref('cds');
const itemCategoryAttributeName = ref('category');

const showActions = ref(false);
const hideFilteredItemsValue = shallowRef(false);
const actionDefinitions = ref([]);
const listVariants = [
  {
    name: '1',
    id: '1',
  },
  {
    name: '2',
    id: '2',
  },
  {
    name: '3',
    id: '3',
  },
];
const listKinds = [
  {
    name: 'default',
    id: 'default',
  },
  {
    name: 'draggable',
    id: 'draggable',
  },
];

const selectingKindList = [
  {
    id: 'single',
    name: 'single',
  },
  {
    id: 'multiple',
    name: 'multiple',
  },
];
const searchSideVariants = [
  {
    name: 'client',
    id: 'client',
  },
  {
    name: 'server',
    id: 'server',
  },
];
const selectedVariantId = ref('1');
const selectedListKind = ref('default');

const selectedSearchSideId = ref('client');
const searchString = ref('');
const selectedKind = shallowRef('multiple');

const propExpander = ref(false);
const propAdditionalExpander = ref(false);
const editExpander = shallowRef(false);
const slotsExpander = ref(false);

const selectedIconSetId = ref('cds');
const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons(selectedIconSetId.value)?.map((i) => ({ id: i, name: i }))
);
const dropdownCategories = ref([
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
    id: 'orange',
    name: 'orange',
  },
  {
    id: 'purple',
    name: 'purple',
  },
]);

const editGroupModal = ref();
const editItemsModal = ref();
const editActionsModal = ref();
const deletedGroupItems = ref([]);
const deletedDataItems = ref([]);
const deletedActions = ref([]);

const texts = ref({
  clear: 'Notīrīt',
  placeholder: 'Ievadiet nosaukuma vai apraksta daļu, lai sameklētu ierakstus',
  notFoundSearch: 'Nav atrasts:',
  noItems: 'Nav ierakstu',
  noItemsDescription: 'Mēģiniet pārlādēt lapu',
  loadMore: 'Ielādēt vēl',
  search: 'Meklēt',
  items: {
    singular: 'ieraksts',
    plural: 'ieraksti',
    endingWith234: 'ieraksti',
    endingWith1: 'ieraksts',
  },
  ofItems: {
    label: 'Ieraksti',
    singular: 'ieraksta',
    plural: 'ierakstiem',
    endingWith234: 'ierakstiem',
    endingWith1: 'ieraksta',
  },
  selected: {
    singular: 'Izvēlēts',
    plural: 'Izvēlēti',
    endingWith234: 'Izvēlēti',
    endingWith1: 'Izvēlēts',
  },
  of: 'no',
});
const eventActionClick = shallowRef({});
function actionClicked(actionName, itemId) {
  if (actionName === 'edit') {
    notificationStore.pushSuccess(`Edit has been pressed on row ${itemId}`);
    eventActionClick.value = { actionName, itemId };
  } else if (actionName === 'click') {
    notificationStore.pushSuccess(`Clicked on item with id ${itemId}`);
    eventActionClick.value = { actionName, itemId };
  } else if (actionName === 'open') {
    notificationStore.pushSuccess(`Open has been pressed on row ${itemId}`);
    eventActionClick.value = { actionName, itemId };
  } else if (actionName === 'delete') {
    notificationStore.pushWarning(`Delete has been pressed on row ${itemId}`);
    eventActionClick.value = { actionName, itemId };
  } else {
    notificationStore.pushSuccess(`Action has been pressed on row ${itemId}`);
    eventActionClick.value = { actionName, itemId };
  }
}
let actionsCopy = [
  {
    id: null,
    name: null,
    icon: null,
    enableByAttributeName: null,
    isDestructive: null,
  },
];
const itemsCopy = ref([
  {
    id: null,
    name: null,
    popularity: null,
    description: null,
    multiplayer: null,
    rating: null,
    country: null,
    group: null,
    href: null,
    icon: null,
    clickable: false,
    category: null,
  },
]);
const groupsCopy = ref([
  {
    id: null,
    name: null,
  },
]);

function copyActionsArray() {
  editActionsModal.value.open();
  actionsCopy = actionDefinitions.value;
}
function copyItemsArray() {
  editItemsModal.value.open();
  itemsCopy.value = demoStore.videoGames;
}
function copyGroupsArray() {
  editGroupModal.value.open();
  groupsCopy.value = groupDefinitions.value;
}
function isDeletedAction(fieldId) {
  if (deletedActions.value.find((id) => id === fieldId)) return true;
  return false;
}
function isDeletedItem(fieldId) {
  if (deletedDataItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function isDeletedGroup(fieldId) {
  if (deletedGroupItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function saveActions() {
  actionDefinitions.value = actionDefinitions.value.filter((o) => !isDeletedAction(o.id));
  copyActionsArray();
}
function saveItems() {
  const res = demoStore.videoGames.filter((o) => !isDeletedItem(o.id));
  deletedDataItems.value = [];
  demoStore.updateData(res);
  items.value = demoStore.videoGames;
  copyItemsArray();
}
function saveGroups() {
  groupDefinitions.value = groupDefinitions.value.filter((o) => !isDeletedGroup(o.id));
  deletedGroupItems.value = [];
  copyGroupsArray();
}
function newActionItem() {
  actionsCopy.push({
    id: lxStringUtils.generateUUID().slice(16),
    name: null,
    icon: 'bug',
    enableByAttributeName: null,
    isDestructive: false,
  });
  saveActions();
}
function newItem() {
  const newId = Math.floor((1 + Math.random()) * 0x10000);
  itemsCopy.value.push({
    id: newId,
    name: '',
    popularity: 0,
    description: '',
    multiplayer: null,
    rating: 0,
    country: '',
    group: null,
    href: null,
    icon: null,
    clickable: null,
    category: null,
  });
  saveItems();
}
function newGroup() {
  const newId = lxStringUtils.generateUUID().slice(28);
  groupsCopy.value.push({
    id: newId,
    name: null,
  });
  saveGroups();
}
function returnActionItem(id) {
  deletedActions.value = deletedActions.value.filter((o) => o !== id);
}
function returnItem(id) {
  deletedDataItems.value = deletedDataItems.value.filter((o) => o !== id);
}
function returnGroup(id) {
  deletedGroupItems.value = deletedGroupItems.value.filter((o) => o !== id);
}
function removeActionItem(id) {
  if (!isDeletedAction(id)) {
    deletedActions.value.push(id);
  }
}
function removeRowItem(id) {
  if (!isDeletedItem(id)) {
    deletedDataItems.value.push(id);
  }
}
function removeGroupItem(id) {
  if (!isDeletedGroup(id)) {
    deletedGroupItems.value.push(id);
  }
}
watch(
  () => showActions.value,
  () => {
    if (!showActions.value) {
      actionDefinitions.value = [];
    } else {
      actionDefinitions.value = [
        {
          id: 'open',
          name: 'Open item',
          icon: 'open',
          enableByAttributeName: 'canEdit',
          destructive: false,
        },
        {
          id: 'edit',
          name: 'Edit item',
          icon: 'edit',
          enableByAttributeName: 'canEdit',
          destructive: false,
        },
        {
          id: 'delete',
          name: 'Delete item',
          icon: 'delete',
          enableByAttributeName: 'canEdit',
          destructive: true,
        },
      ];
    }
  }
);
function serverSearch(searchStringValue) {
  notificationStore.pushSuccess(`Server side search: ${searchStringValue}`);
}
function loadMoreFunc() {
  notificationStore.pushSuccess('LoadMore has been pressed');
}
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'listGuidelines' });
  }
  if (routerValue.value === 'apiData') {
    router.push({ name: 'apiList' });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'apiData', name: 'Piemērs' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];

const baseGitUrl = window.config.gitLxComponentsUrl;

const emptyStateActionDefinitions = ref([
  {
    id: 'add',
    name: 'Pievienot elementu',
    icon: 'add-item',
    destructive: false,
  },
]);
function emptyStateActionClicked(actionName) {
  notificationStore.pushSuccess(`Empty state action was pressed: ${actionName}`);
}
const selectActionDefinitions = [
  {
    id: 'open',
    name: 'Open item',
    icon: 'open',
    enableByAttributeName: 'canEdit',
    destructive: false,
  },
  {
    id: 'edit',
    name: 'Edit item',
    icon: 'edit',
    enableByAttributeName: 'canEdit',
    destructive: false,
  },
  {
    id: 'delete',
    name: 'Delete item',
    icon: 'delete',
    enableByAttributeName: 'canEdit',
    destructive: true,
  },
];

function selectionActionClicked(action, params) {
  notificationStore.pushSuccess(`${action} was pressed: with params: ${params}`);
}
</script>
<template>
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  <DemoView
    kind="m"
    :show-value="false"
    :show-modal-button="true"
    label="LxList"
    :git-link="baseGitUrl + 'List.vue'"
  >
    <LxList
      id="id"
      v-model:items="items"
      :kind="selectedListKind"
      :has-search="hasSearch"
      :group-definitions="groupDefinitions"
      :icon="icon"
      :id-attribute="itemIdAttributeName"
      :primary-attribute="itemPrimaryAttributeName"
      :secondary-attribute="itemSecondaryAttributeName"
      :order-attribute="itemOrderAttributeName"
      :href-attribute-="itemHrefAttributeName"
      :group-attribute="itemGroupAttributeName"
      :clickable-attribute="itemClickableAttributeName"
      :icon-attribute="itemIconAttributeName"
      :icon-set-attribute="itemIconSetAttributeName"
      :category-attribute="itemCategoryAttributeName"
      :action-definitions="actionDefinitions"
      :list-type="selectedVariantId"
      :hide-filtered-items="hideFilteredItemsValue"
      :emptyStateActionDefinitions="emptyStateActionDefinitions"
      :busy="busyValue"
      :loading="loadingValue"
      :showLoadMore="showLoadMoreValue"
      :searchSide="selectedSearchSideId"
      :texts="texts"
      v-model:search-string="searchString"
      :hasSelecting="hasSelecting"
      :selecting-kind="selectedKind"
      :selectionActionDefinitions="selectActionDefinitions"
      @empty-state-action-click="emptyStateActionClicked"
      @action-click="actionClicked"
      @selection-action-click="selectionActionClicked"
      @searched="serverSearch"
      @load-more="loadMoreFunc"
    >
      <template #toolbar>
        <lx-button icon="add" label="Pievienot" />
      </template>
    </LxList>

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:list-type</label>
            <LxValuePicker :items="listVariants" id="id" v-model="selectedVariantId" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="listKinds" v-model="selectedListKind" />
          </div>
          <div class="lx-row">
            <label>:hasSelecting</label>
            <LxToggle v-model="hasSelecting" />
          </div>
          <div class="lx-row">
            <label>:selectingKind</label>
            <LxValuePicker :items="selectingKindList" v-model="selectedKind" />
          </div>
          <!--
          <div class="lx-row">
            <label>Allow actions</label>
            <LxToggle v-model="showActions" />
          </div>
          -->
        </div>
      </LxExpander>
      <LxExpander label="Search props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:has-search</label>
            <LxToggle v-model="hasSearch" />
          </div>
          <div class="lx-row">
            <label>:search-string</label>
            <LxTextInput v-model="searchString" />
          </div>
          <div class="lx-row">
            <label>:search-side</label>
            <LxValuePicker
              :items="searchSideVariants"
              id="idSearch"
              v-model="selectedSearchSideId"
            />
          </div>
          <div class="lx-row">
            <label>:hide-filtered-items</label>
            <LxToggle v-model="hideFilteredItemsValue" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:loading</label>
            <LxToggle v-model="loadingValue" />
          </div>
          <div class="lx-row">
            <label>:busy</label>
            <LxToggle v-model="busyValue" />
          </div>
          <div class="lx-row">
            <label>:show-load-more</label>
            <LxToggle v-model="showLoadMoreValue" />
          </div>
        </div>
      </LxExpander>
      <LxExpander label="Text props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:texts.placeholder</label>
            <LxTextInput v-model="texts.placeholder" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="editExpander" label="Edit props" icon="settings">
        <div class="lx-form">
          <div class="lx-row">
            <lx-button @click="copyItemsArray()" kind="secondary" label="Edit items" icon="open" />

            <lx-modal
              ref="editItemsModal"
              label="Items editor"
              size="xl"
              button-secondary-label="Aizvērt"
              button-primary-label="Saglabāt un aizvērt"
              :button-secondary-visible="true"
              :button-primary-visible="true"
              @primary-action="saveItems(), editItemsModal.close()"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label class="lx-cell lx-cell-m"> :idAttribute </label>
                  <label class="lx-cell lx-cell-m"> :primaryAttribute</label>
                  <label class="lx-cell lx-cell-m"> :secondaryAttribute</label>
                  <label class="lx-cell lx-cell-m"> :hrefAttribute </label>
                  <label class="lx-cell lx-cell-m"> :groupAttribute </label>
                  <label class="lx-cell lx-cell-m"> :clickableAttribute </label>
                  <label class="lx-cell lx-cell-m"> :categoryAttribute </label>
                  <label class="lx-cell lx-cell-m"> :icon </label>
                  <label class="lx-cell lx-cell-s"> Delete </label>
                </header>
                <div class="lx-row" v-for="f in itemsCopy" :key="f.id" title="test">
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.id"
                      v-show="!isDeletedItem(f.id)"
                    />
                    <p v-if="isDeletedItem(f.id)">{{ `Deleted ${f.name}` }}</p>
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.name"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.description"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.href"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-auto-complete
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.group"
                      :items="groupDefinitions"
                      id-attribute="id"
                      name-attribute="name"
                      placeholder="Choose group"
                      tooltip="Groups"
                      query-debounce="200"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-toggle
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.clickable"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-auto-complete
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.category"
                      :items="dropdownCategories"
                      id-attribute="id"
                      name-attribute="name"
                      placeholder="Choose category"
                      tooltip="Categories"
                      query-debounce="200"
                      v-show="!isDeletedItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-auto-complete
                      :id="lxStringUtils.generateUUID()"
                      v-model="f.icon"
                      :items="dropdownIcons"
                      id-attribute="id"
                      name-attribute="name"
                      placeholder="Choose icon"
                      tooltip="Icons"
                      query-debounce="200"
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
                    <lx-button label="Add row" kind="ghost" icon="add-item" @click="newItem()" />
                  </div>
                  <div class="lx-divider"></div>
                </div>
              </div>
            </lx-modal>
          </div>
          <div class="lx-row">
            <lx-button
              @click="copyGroupsArray()"
              kind="secondary"
              label="Edit groups"
              icon="open"
            />

            <lx-modal
              ref="editGroupModal"
              label="Group editor"
              size="s"
              button-secondary-label="Close"
              button-primary-label="Save"
              :button-secondary-visible="true"
              :button-primary-visible="true"
              @primary-action="saveGroups()"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label class="lx-cell lx-cell-m"> :id </label>
                  <label class="lx-cell lx-cell-m"> :name </label>
                  <label class="lx-cell lx-cell-s"> Delete </label>
                </header>
                <div class="lx-row" v-for="g in groupsCopy" :key="g.id" title="test">
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="g.id"
                      v-show="!isDeletedGroup(g.id)"
                      :read-only="true"
                    />
                    <p v-if="isDeletedGroup(g.id)">{{ `Deleted ${g.name}` }}</p>
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="lxStringUtils.generateUUID()"
                      v-model="g.name"
                      v-show="!isDeletedGroup(g.id)"
                    />
                  </div>

                  <div class="lx-cell lx-cell-m" v-show="isDeletedGroup(g.id)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnGroup(g.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m" v-show="!isDeletedGroup(g.id)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="remove-item"
                      :destructive="true"
                      @click="removeGroupItem(g.id)"
                    />
                  </div>
                </div>
                <div class="lx-cell lx-cell-xl">
                  <div class="lx-button-set lx-justified-toolbar">
                    <lx-button label="Add row" kind="ghost" icon="add-item" @click="newGroup()" />
                  </div>
                  <div class="lx-divider"></div>
                </div>
              </div>
            </lx-modal>
          </div>

          <div class="lx-row">
            <lx-button
              @click="copyActionsArray()"
              kind="secondary"
              label="Edit actions"
              icon="open"
              :disabled="!showActions"
            />

            <lx-modal
              ref="editActionsModal"
              label="Actions editor"
              size="l"
              button-secondary-label="Close"
              button-primary-label="Save"
              :button-secondary-visible="true"
              :button-primary-visible="true"
              @primary-action="saveActions()"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label class="lx-cell lx-cell-m">id</label>
                  <label class="lx-cell lx-cell-m">name</label>
                  <label class="lx-cell lx-cell-m">icon</label>
                  <label class="lx-cell lx-cell-m">enableByAttributeName</label>
                  <label class="lx-cell lx-cell-m">destructive</label>
                </header>
                <div class="lx-row" v-for="i in actionsCopy" :key="i.id" title="test">
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="i.id"
                      v-show="!isDeletedAction(i.id)"
                      :read-only="true"
                    />
                    <p v-if="isDeletedAction(i.id)">{{ `Deleted ${i.id}` }}</p>
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="i.name"
                      v-show="!isDeletedAction(i.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-auto-complete
                      :id="lxStringUtils.generateUUID()"
                      v-model="i.icon"
                      :items="dropdownIcons"
                      id-attribute="id"
                      name-attribute="name"
                      placeholder="Choose icon"
                      tooltip="Icons"
                      query-debounce="200"
                      v-show="!isDeletedAction(i.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="i.enableByAttributeName"
                      v-show="!isDeletedAction(i.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-toggle
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="i.isDestructive"
                      v-show="!isDeletedAction(i.id)"
                    />
                  </div>

                  <div class="lx-cell lx-cell-s" v-show="isDeletedAction(i.id)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnActionItem(i.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-s" v-show="!isDeletedAction(i.id)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="remove-item"
                      :destructive="true"
                      @click="removeActionItem(i.id)"
                    />
                  </div>
                </div>
                <div class="lx-cell lx-cell-xl">
                  <div class="lx-button-set lx-justified-toolbar">
                    <lx-button
                      label="Add action"
                      kind="ghost"
                      icon="add-item"
                      @click="newActionItem()"
                    />
                  </div>
                  <div class="lx-divider"></div>
                </div>
              </div>
            </lx-modal>
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="slotsExpander" label="Slots" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <code>#toolbar</code>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
