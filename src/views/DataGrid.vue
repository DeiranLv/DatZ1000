<script setup lang="ts">
import { ref, onMounted, watch, computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import {
  LxToggle,
  LxTextInput,
  LxDataGrid,
  LxValuePicker,
  LxButton,
  LxModal,
  lxStringUtils,
  LxExpander,
  LxDropDown,
  lxIconUtils,
  LxAutoComplete,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import useNotifyStore from '@/stores/useNotifyStore';
import DemoView from '@/components/DemoView.vue';
import { useDemoStore } from '@/stores/useDemoStore';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();
const notificationStore = useNotifyStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.dataGrid.description');
});

const label = ref('Videospēles');
const description = ref(
  'Videospēle ir interaktīvs elektronisks izklaides veids, kas ietver spēlētāju iesaistīšanos un līdzdalību, izmantojot vizuālos, dzirdes un taustes elementus, lai sasniegtu mērķus, risinātu izaicinājumus vai piedzīvotu virtuālus stāstījumus.'
);

const showHeader = ref(true);
const showToolbar = ref(true);
const scrollable = ref(false);
const showStatusbar = ref(true);
const showAllColumns = ref(false);
const showItemsCountSelector = ref(false);
const hasPaging = ref(true);
const hasSorting = ref(true);
const hasSelecting = ref(false);
const sortingIgnoreEmpty = ref(true);
const loading = ref(false);
const busy = ref(false);
const showActions = ref(true);

const rowCodeAttributeName = ref('id');

const skeletonRowCount = ref(10);
const integerSkeletonRowCount = computed(() => Number(skeletonRowCount.value));

const pageCurrent = ref(0);
const itemsPerPage = ref(10);
const itemsTotal = ref(11);
const actionDefinitions = ref([
  {
    id: 'open',
    name: 'Atvērt',
    icon: 'open',
    destructive: false,
  },

  {
    id: 'edit',
    name: 'Rediģēt',
    icon: 'edit',
    enableByAttribute: 'multiplayer',
    destructive: false,
  },
  {
    id: 'delete',
    name: 'Dzēst ',
    icon: 'delete',
    destructive: true,
  },
]);
const defaultActionName = ref('open');

const checkboxKinds = [
  {
    id: 'multiple',
    name: 'multiple',
  },
  {
    id: 'single',
    name: 'single',
  },
];
const selectedCheckboxKindId = ref('multiple');

const sides = [
  {
    id: 'client',
    name: 'client',
  },
  {
    id: 'server',
    name: 'server',
  },
];
const selectedSideId = ref('client');

const sampleDataList = ref(demoStore.videoGames);
const sampleColumnDefinition = shallowRef([
  {
    id: 'id',
    attributeName: 'id',
    name: 'Id',
    type: 'number',
    size: 's',
  },
  {
    id: 'name',
    name: 'Nosaukums',
    attributeName: 'name',
    type: 'default',
    kind: 'clickable',
    size: '*',
  },
  {
    id: 'description',
    name: 'Apraksts',
    attributeName: 'description',
    type: 'default',
    kind: 'secondary',
    size: '*',
  },
  {
    id: 'popularity',
    name: 'Splēlētāju skaits',
    attributeName: 'popularity',
    title: 'Splēlētāju skaits',
    type: 'decimal',
    kind: 'primary',
    size: 's',
  },

  {
    id: 'multiplayer',
    name: 'Vairāku spēlētāju spēle',
    attributeName: 'multiplayer',
    type: 'bool',
    kind: 'extra',
    size: 's',
  },
  {
    id: 'rating',
    name: 'Novērtējums',
    attributeName: 'rating',
    title: 'Rating',
    type: 'rating',
    kind: 'secondary',
    size: 's',
  },
  {
    id: 'country',
    name: 'Valsts',
    attributeName: 'country',
    title: 'Country',
    type: 'flag',
    kind: 'secondary',
    size: 's',
  },
]);

const columnTypes = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'number',
    name: 'number',
  },
  {
    id: 'decimal',
    name: 'decimal',
  },
  {
    id: 'bool',
    name: 'bool',
  },
  {
    id: 'rating',
    name: 'rating',
  },
  {
    id: 'flag',
    name: 'flag',
  },
  {
    id: 'country',
    name: 'country',
  },
];
const columnKinds = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'primary',
    name: 'primary',
  },
  {
    id: 'secondary',
    name: 'secondary',
  },
  {
    id: 'clickable',
    name: 'clickable',
  },
  {
    id: 'extra',
    name: 'extra',
  },
];
const columnSizes = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'xs',
    name: 'xs',
  },
  {
    id: 's',
    name: 's',
  },
  {
    id: 'm',
    name: 'm',
  },
  {
    id: 'l',
    name: 'l',
  },
  {
    id: 'xl',
    name: 'xl',
  },
  {
    id: '*',
    name: '*',
  },
];

const eventActionClick = shallowRef({});
const eventSelectPage = shallowRef({});
const eventSelectActionClick = ref({});

const sortingColumn = ref();
const sortingDirection = ref();
const eventItemsPerPage = shallowRef({});

function selectionChanged() {
  // notificationStore.pushSuccess('Selection changes');   spam bug
}

function actionClicked(actionName, rowCode, actionAdditionalParameter) {
  if (actionName === 'edit') {
    notificationStore.pushSuccess(
      `Edit has been pressed on row ${rowCode} ${actionAdditionalParameter}`
    );
    eventActionClick.value = { actionName, rowCode, actionAdditionalParameter };
  } else if (actionName === 'delete') {
    notificationStore.pushWarning(
      `Delete has been pressed on row ${rowCode} ${actionAdditionalParameter}`
    );
    eventActionClick.value = { actionName, rowCode, actionAdditionalParameter };
  } else if (actionName === 'open') {
    notificationStore.pushSuccess(`Opening item at row ${rowCode} ${actionAdditionalParameter}`);
    eventActionClick.value = { actionName, rowCode, actionAdditionalParameter };
  } else {
    notificationStore.pushSuccess(`Click on ${rowCode} ${actionAdditionalParameter}`);
    eventActionClick.value = { actionName, rowCode, actionAdditionalParameter };
  }
}
function selectionActionClicked(actionName, selectedRowCodes) {
  if (actionName === 'edit') {
    notificationStore.pushSuccess('Edit has been pressed ');
    eventSelectActionClick.value = { actionName, selectedRowCodes };
  } else if (actionName === 'delete') {
    notificationStore.pushSuccess('Delete has been pressed ');
    eventSelectActionClick.value = { actionName, selectedRowCodes };
  } else {
    notificationStore.pushSuccess('Open has been pressed ');
    eventSelectActionClick.value = { actionName, selectedRowCodes };
  }
}
function selectPage(pageNum) {
  notificationStore.pushSuccess(`Requesting page ${pageNum + 1}`);
  eventSelectPage.value = { pageNum };
}

function sortingChanged(sortInfo) {
  notificationStore.pushInfo(`Sorting by "${sortInfo.columnCode}" - ${sortInfo.direction}`);
  sortingColumn.value = sortInfo.columnCode;
  sortingDirection.value = sortInfo.direction;
}
function itemsPerPageChanged(value) {
  notificationStore.pushSuccess(`Change items per page ${value}`);
  eventItemsPerPage.value = value;
}
const actionAdditionalParameter = ref('Darbības papildu parametrs');
watch(
  () => showActions.value,
  () => {
    if (showActions.value === false) {
      actionDefinitions.value = [];
    } else {
      actionDefinitions.value = [
        {
          id: 'open',
          name: 'Open item',
          icon: 'open',
          enableByAttribute: 'wasEren',
          destructive: false,
        },
        {
          id: 'edit',
          name: 'Edit item',
          icon: 'edit',
          enableByAttribute: 'wasEren',
          destructive: false,
        },
        {
          id: 'delete',
          name: 'Delete item',
          icon: 'delete',
          enableByAttribute: 'wasEren',
          destructive: true,
        },
      ];
    }
  }
);
const texts = ref({
  itemsSelected: {
    singular: 'Izvēlēts',
    plural: 'Izvēlēti',
    endingWith234: 'Izvēlēti',
    endingWith1: 'Izvēlēts',
  },
  valueYes: 'Jā',
  valueNo: 'Nē',
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
  nextPage: 'Nākamā lapa',
  previousPage: 'Iepriekšējā lapa',
  clear: 'Attīrīt izvēles',
  itemsPerPage: 'Ierakstu skaits vienā lapā:',
  itemsPerPageLabel: 'ieraksti lapā',
  selectAllRows: 'Izvēlēties visu',
  noItems: 'Nav ierakstu',
  noItemsDescription: 'Mēģiniet pārlādēt lapu',
});
const propExpander = ref(false);
const propAdditionalExpander = ref(false);
const propInputsExpander = ref(false);
const editExpander = ref(false);
const eventsExpander = ref(false);
const slotsExpander = ref(false);
const editRowModal = ref();
const editColumnModal = ref();
const editActionsModal = ref();
let rowsCopy = [
  {
    id: null,
  },
];
let columnsCopy = [
  {
    id: null,
    name: null,
    attributeName: null,
    title: null,
    type: null,
    kind: null,
    size: null,
  },
];
let actionsCopy = [
  {
    id: null,
    name: null,
    icon: null,
    enableByAttribute: null,
    destructive: null,
  },
];
function copyRowArray() {
  editRowModal.value.open();
  columnsCopy = sampleColumnDefinition.value;
  rowsCopy = demoStore.videoGames;
}
function copyColumnArray() {
  editColumnModal.value.open();
  columnsCopy = sampleColumnDefinition.value;
  rowsCopy = demoStore.videoGames;
}

function copyActionsArray() {
  editActionsModal.value.open();
  actionsCopy = actionDefinitions.value;
}

function isId(value) {
  if (value === 'id') {
    return true;
  }
  return false;
}

function isTypeDefault(type) {
  if (type === 'default') {
    return true;
  }
  return false;
}
function isTypeNumeric(type) {
  if (type === 'number') {
    return true;
  }
  return false;
}
function isTypeDecimal(type) {
  if (type === 'decimal' || type === 'rating') {
    return true;
  }
  return false;
}
function isTypeBool(type) {
  if (type === 'bool') {
    return true;
  }
  return false;
}
function isTypeFlag(type) {
  if (type === 'flag' || type === 'country') {
    return true;
  }
  return false;
}
const deletedRowItems = ref([]);
const deletedColumnItems = ref([]);
const deletedActions = ref([]);
function isDeletedRow(fieldId) {
  if (deletedRowItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function isDeletedColumn(fieldId) {
  if (deletedColumnItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function isDeletedAction(fieldId) {
  if (deletedActions.value.find((id) => id === fieldId)) return true;
  return false;
}
function saveRows() {
  demoStore.videoGames = demoStore.videoGames.filter((o) => !isDeletedRow(o.id));
  deletedRowItems.value = [];
  demoStore.updateData(demoStore.videoGames);
  copyRowArray();
}
function saveColumns() {
  sampleColumnDefinition.value = sampleColumnDefinition.value.filter((o) => !isDeletedColumn(o.id));
  deletedColumnItems.value = [];
  copyColumnArray();
}
function saveActions() {
  actionDefinitions.value = actionDefinitions.value.filter((o) => !isDeletedAction(o.id));
  deletedActions.value = [];
  copyActionsArray();
}
function newRowItem() {
  const newId = Math.floor((1 + Math.random()) * 0x10000);
  rowsCopy.push({
    id: newId,
  });
  saveRows();
}
function newColumnItem() {
  const newId = Math.floor((1 + Math.random()) * 0x10000);
  columnsCopy.push({
    id: newId,
    name: null,
    attributeName: newId,
    title: null,
    type: 'default',
    kind: 'default',
    size: 'm',
  });
  saveColumns();
}
function newActionItem() {
  actionsCopy.push({
    id: lxStringUtils.generateUUID().slice(16),
    name: null,
    icon: 'bug',
    enableByAttribute: null,
    destructive: false,
  });
  saveActions();
}
function removeRowItem(id) {
  if (!isDeletedRow(id)) {
    deletedRowItems.value.push(id);
  }
}
function removeColumnItem(id) {
  if (!isDeletedColumn(id)) {
    deletedColumnItems.value.push(id);
  }
}
function removeActionItem(id) {
  if (!isDeletedAction(id)) {
    deletedActions.value.push(id);
  }
}
function returnRowItem(id) {
  deletedRowItems.value = deletedRowItems.value.filter((o) => o !== id);
}
function returnColumnItem(id) {
  deletedColumnItems.value = deletedColumnItems.value.filter((o) => o !== id);
}
function returnActionItem(id) {
  deletedActions.value = deletedActions.value.filter((o) => o !== id);
}
const selectedIconSetId = ref('cds');

const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons(selectedIconSetId.value)?.map((i) => ({ id: i, name: i }))
);

const baseGitUrl = window.config.gitLxComponentsUrl;
const sortingModeItems = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'strip',
    name: 'strip',
  },
];
const selectedSortingMode = ref(sortingModeItems[0].name);

const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'apiData') {
    router.push({ name: 'apiDataGrid' });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'apiData', name: 'Piemērs' },
];

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

onMounted(() => {
  if (demoStore.videoGames?.length > 10) {
    const res = [...demoStore.videoGames];
    sampleDataList.value = res.splice(0, 10);
  }
});
</script>
<template>
  <LxContentSwitcher
    :items="itemsNav"
    v-model="routerValue"
    @click="contentSwitcherClick()"
    v-if="authStore.session.st === 'authorized'"
  />
  <DemoView kind="l" :show-value="false" label="LxDataGrid" :git-link="baseGitUrl + 'DataGrid.vue'">
    <lx-data-grid
      id="grid1"
      :label="label"
      :description="description"
      :column-definitions="sampleColumnDefinition"
      :id-attribute="rowCodeAttributeName"
      :action-definitions="actionDefinitions"
      :action-additional-parameter="actionAdditionalParameter"
      :default-action-name="defaultActionName"
      :items="sampleDataList"
      :loading="loading"
      :busy="busy"
      :skeleton-row-count="integerSkeletonRowCount"
      :scrollable="scrollable"
      :show-header="showHeader"
      :show-toolbar="showToolbar"
      :show-statusbar="showStatusbar"
      :show-all-columns="showAllColumns"
      :show-items-count-selector="showItemsCountSelector"
      :has-paging="hasPaging"
      :has-sorting="hasSorting"
      :has-selecting="hasSelecting"
      :selecting-kind="selectedCheckboxKindId"
      :sortingSide="selectedSideId"
      :sorting-ignore-empty="sortingIgnoreEmpty"
      :page-current="pageCurrent"
      :items-per-page="itemsPerPage"
      :items-total="itemsTotal"
      :sortingMode="selectedSortingMode"
      :texts="texts"
      :selectionActionDefinitions="actionDefinitions"
      :showItemsCountSelector="true"
      :emptyStateActionDefinitions="emptyStateActionDefinitions"
      @empty-state-action-click="emptyStateActionClicked"
      @action-click="actionClicked"
      @select-page="selectPage"
      @sorting-changed="sortingChanged"
      @selection-changed="selectionChanged"
      @items-per-page-changed="itemsPerPageChanged"
      @selection-action-clicked="selectionActionClicked"
    >
      <template #toolbar>
        <lx-button icon="add" label="Pievienot" />
      </template>
    </lx-data-grid>

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:label</label>
            <LxTextInput v-model="label" />
          </div>
          <div class="lx-row">
            <label>:description</label>
            <LxTextInput v-model="description" />
          </div>
          <div class="lx-row">
            <label>:show-header</label>
            <LxToggle v-model="showHeader" />
          </div>
          <div class="lx-row">
            <label>:show-toolbar</label>
            <LxToggle v-model="showToolbar" />
          </div>
          <div class="lx-row">
            <label>:show-statusbar</label>
            <LxToggle v-model="showStatusbar" />
          </div>
          <div class="lx-row">
            <label>:show-all-columns</label>
            <LxToggle v-model="showAllColumns" />
          </div>
        </div>
      </LxExpander>
      <LxExpander label="Selection props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:has-selecting</label>
            <LxToggle v-model="hasSelecting" />
          </div>
          <div class="lx-row">
            <label>:selecting-kind</label>
            <LxValuePicker
              :items="checkboxKinds"
              id="kindsPicker"
              group-id="options-picker-1"
              v-model="selectedCheckboxKindId"
              kind="single"
            />
          </div>
        </div>
      </LxExpander>
      <LxExpander label="Sorting props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:has-sorting</label>
            <LxToggle v-model="hasSorting" />
          </div>
          <div class="lx-row">
            <label>:sorting-ignore-empty</label>
            <LxToggle v-model="sortingIgnoreEmpty" />
          </div>
          <div class="lx-row">
            <label>:sorting-side</label>
            <LxValuePicker
              :items="sides"
              id="sidesPicker"
              group-id="options-picker-2"
              v-model="selectedSideId"
              kind="single"
            />
          </div>
          <div class="lx-row">
            <label>:sorting-mode</label>
            <LxValuePicker
              :items="sortingModeItems"
              id="modesPicker"
              group-id="options-picker-3"
              v-model="selectedSortingMode"
              kind="single"
            />
          </div>
        </div>
      </LxExpander>
      <LxExpander label="Paging props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:has-paging</label>
            <LxToggle v-model="hasPaging" />
          </div>
          <div class="lx-row">
            <label>:items-per-page</label>
            <LxTextInput v-model="itemsPerPage" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:items-total</label>
            <LxTextInput v-model="itemsTotal" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:page-current</label>
            <LxTextInput v-model="pageCurrent" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:show-items-count-selector</label>
            <LxToggle v-model="showItemsCountSelector" />
          </div>
          <div class="lx-row">
            <label>:skeleton-row-count</label>
            <LxTextInput v-model="skeletonRowCount" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:scrollable</label>
            <LxToggle v-model="scrollable" />
          </div>
          <div class="lx-row">
            <label>:loading</label>
            <LxToggle v-model="loading" />
          </div>
          <div class="lx-row">
            <label>:busy</label>
            <LxToggle v-model="busy" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propInputsExpander" label="Attribute props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:default-action-name</label>
            <LxTextInput v-model="defaultActionName" />
          </div>
          <div class="lx-row">
            <label>:action-additional-parameter</label>
            <LxTextInput v-model="actionAdditionalParameter" />
          </div>

          <div class="lx-row">
            <label>:row-id-attribute-name</label>
            <LxTextInput v-model="rowCodeAttributeName" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="editExpander" label="Edit values" icon="settings">
        <div class="lx-form">
          <div class="lx-row">
            <lx-button
              @click="copyRowArray()"
              kind="secondary"
              label="Rindu redaktors"
              icon="open"
            />

            <lx-modal
              ref="editRowModal"
              label="Rindu redaktors"
              size="xl"
              button-secondary-label="Aizvērt"
              button-primary-label="Saglabāt un aizvērt"
              :button-secondary-visible="true"
              :button-primary-visible="true"
              @primary-action="saveRows(), editRowModal.close()"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label
                    class="lx-cell"
                    v-for="i in sampleColumnDefinition"
                    :class="[
                      {
                        'lx-cell-s':
                          isId(i.id) ||
                          isTypeBool(i.type) ||
                          isTypeDecimal(i.type) ||
                          isTypeNumeric(i.type),
                      },
                      { 'lx-cell-m': isTypeDefault(i.type) || isTypeFlag(i.type) },
                    ]"
                    :key="i.id"
                  >
                    {{ i.name }}
                  </label>
                  <label class="lx-cell"> Delete </label>
                </header>
                <div class="lx-row" v-for="f in rowsCopy" :key="f.id" title="test">
                  <div
                    class="lx-cell"
                    :class="[
                      {
                        'lx-cell-s':
                          isId(i.id) ||
                          isTypeBool(i.type) ||
                          isTypeDecimal(i.type) ||
                          isTypeNumeric(i.type),
                      },
                      { 'lx-cell-m': isTypeDefault(i.type) || isTypeFlag(i.type) },
                    ]"
                    v-for="i in columnsCopy"
                    :key="i.id"
                  >
                    <div v-show="isDeletedRow(f.id)">
                      <p>Deleted</p>
                    </div>
                    <template v-if="!isDeletedRow(f.id)">
                      <lx-text-input
                        v-if="isId(i.id)"
                        :id="lxStringUtils.generateUUID()"
                        v-model="f[i.id]"
                        v-show="!isDeletedRow(f.id)"
                        :read-only="true"
                      />

                      <lx-text-input
                        v-if="isTypeDefault(i.type)"
                        :id="lxStringUtils.generateUUID()"
                        v-model="f[i.id]"
                        v-show="!isDeletedRow(f.id)"
                      />

                      <lx-text-input
                        v-if="isTypeNumeric(i.type) && !isId(i.id)"
                        :id="lxStringUtils.generateUUID()"
                        v-model="f[i.id]"
                        v-show="!isDeletedRow(f.id)"
                        mask="integer"
                      />

                      <lx-text-input
                        v-if="isTypeDecimal(i.type)"
                        :id="lxStringUtils.generateUUID()"
                        v-model="f[i.id]"
                        v-show="!isDeletedRow(f.id)"
                        mask="decimal"
                      />

                      <lx-toggle
                        v-if="isTypeBool(i.type)"
                        :id="lxStringUtils.generateUUID()"
                        v-model="f[i.id]"
                        v-show="!isDeletedRow(f.id)"
                      />
                      <lx-text-input
                        v-if="
                          isTypeFlag(i.type) &&
                            (typeof f[i.id] === 'string' || typeof f[i.id] === 'undefined')
                        "
                        :id="lxStringUtils.generateUUID()"
                        v-model="f[i.id]"
                        v-show="!isDeletedRow(f.id)"
                      />
                      <span>
                        <lx-text-input
                          v-if="isTypeFlag(i.type) && typeof f[i.id] === 'object'"
                          :id="lxStringUtils.generateUUID()"
                          v-model="f[i.id].id"
                          v-show="!isDeletedRow(f.id)"
                        />
                        <lx-text-input
                          v-if="isTypeFlag(i.type) && typeof f[i.id] === 'object'"
                          :id="lxStringUtils.generateUUID()"
                          v-model="f[i.id].name"
                          v-show="!isDeletedRow(f.id)"
                        />
                      </span>
                    </template>
                  </div>

                  <div class="lx-cell lx-cell-m" v-show="isDeletedRow(f.id)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnRowItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m" v-show="!isDeletedRow(f.id)">
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
                    <lx-button label="Add row" kind="ghost" icon="add-item" @click="newRowItem()" />
                  </div>
                  <div class="lx-divider"></div>
                </div>
              </div>
            </lx-modal>
          </div>
          <div class="lx-row">
            <lx-button
              @click="copyColumnArray()"
              kind="secondary"
              label="Kolonnu redaktors"
              icon="open"
            />

            <lx-modal
              ref="editColumnModal"
              label="Kolonnu redaktors"
              size="xl"
              button-secondary-label="Aizvērt"
              button-primary-label="Saglabāt un aizvērt"
              :button-secondary-visible="true"
              :button-primary-visible="true"
              @primary-action="saveColumns(), editColumnModal.close()"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label class="lx-cell lx-cell-s"> id </label>
                  <label class="lx-cell lx-cell-m"> code </label>
                  <label class="lx-cell lx-cell-m"> name </label>
                  <label class="lx-cell lx-cell-m"> attributeName </label>
                  <label class="lx-cell lx-cell-m"> title </label>
                  <label class="lx-cell lx-cell-m"> type </label>
                  <label class="lx-cell lx-cell-m"> kind </label>
                  <label class="lx-cell lx-cell-s"> size </label>
                  <label class="lx-cell lx-cell-s"> Delete </label>
                </header>
                <div class="lx-row" v-for="f in columnsCopy" :key="f.id" title="test">
                  <div class="lx-cell lx-cell-s">
                    <lx-text-input
                      :id="`title-${f.id}`"
                      v-model="f.id"
                      v-show="!isDeletedColumn(f.id)"
                    />
                    <p v-if="isDeletedColumn(f.id)">{{ `Deleted ${f.name}` }}</p>
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.id"
                      v-show="!isDeletedColumn(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.name"
                      v-show="!isDeletedColumn(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.attributeName"
                      v-show="!isDeletedColumn(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.title"
                      v-show="!isDeletedColumn(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-drop-down
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.type"
                      variant="dropdown"
                      :items="columnTypes"
                      kind="native"
                      v-show="!isDeletedColumn(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-drop-down
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.kind"
                      variant="dropdown"
                      :items="columnKinds"
                      kind="native"
                      v-show="!isDeletedColumn(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-s">
                    <lx-drop-down
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.size"
                      variant="dropdown"
                      :items="columnSizes"
                      kind="native"
                      v-show="!isDeletedColumn(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-s" v-show="isDeletedColumn(f.id)">
                    <lx-button
                      :id="f.id"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnColumnItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-s" v-show="!isDeletedColumn(f.id)">
                    <lx-button
                      :id="f.id"
                      variant="icon-only"
                      kind="ghost"
                      icon="remove-item"
                      :destructive="true"
                      @click="removeColumnItem(f.id)"
                    />
                  </div>
                </div>
                <div class="lx-cell lx-cell-xl">
                  <div class="lx-button-set lx-justified-toolbar">
                    <lx-button
                      label="Add column"
                      kind="ghost"
                      icon="add-item"
                      @click="newColumnItem()"
                    />
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
              label="Darbību redaktors"
              icon="open"
            />
            <lx-modal
              ref="editActionsModal"
              label="Darbību redaktors"
              size="l"
              button-secondary-label="Aizvērt"
              button-primary-label="Saglabāt un aizvērt"
              :button-secondary-visible="true"
              :button-primary-visible="true"
              @primary-action="saveActions(), editActionsModal.close()"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label class="lx-cell lx-cell-m">id</label>
                  <label class="lx-cell lx-cell-m">name</label>
                  <label class="lx-cell lx-cell-m">icon</label>
                  <label class="lx-cell lx-cell-m">enableByAttribute</label>
                  <label class="lx-cell lx-cell-m">destructive</label>
                </header>
                <div class="lx-row" v-for="f in actionsCopy" :key="f.name" title="test">
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.id"
                      v-show="!isDeletedAction(f.name)"
                    />
                    <p v-if="isDeletedAction(f.name)">{{ `Deleted ${f.name}` }}</p>
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.name"
                      v-show="!isDeletedAction(f.name)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-auto-complete
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.icon"
                      :items="dropdownIcons"
                      id-attribute="id"
                      name-attribute="name"
                      placeholder="Choose icon"
                      tooltip="Icons"
                      query-debounce="200"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.enableByAttribute"
                      v-show="!isDeletedAction(f.name)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-toggle
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.destructive"
                      v-show="!isDeletedRow(f.name)"
                    />
                  </div>

                  <div class="lx-cell lx-cell-s" v-show="isDeletedAction(f.name)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnActionItem(f.name)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-s" v-show="!isDeletedAction(f.name)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="remove-item"
                      :destructive="true"
                      @click="removeActionItem(f.name)"
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
      <LxExpander v-model="eventsExpander" label="Events" icon="at">
        <div class="lx-form">
          <div class="lx-row">
            <label>@action-click</label>
            <code>actionName: {{ JSON.stringify(eventActionClick.actionName) }},</code>
            <code>rowCode: {{ JSON.stringify(eventActionClick.rowCode) }},</code>
            <code
            >additionalParam:
              {{ JSON.stringify(eventActionClick.actionAdditionalParameter) }}</code
            >
          </div>
          <div class="lx-row">
            <label>@select-page</label>
            <code>(pageNum) : {{ JSON.stringify(eventSelectPage.pageNum) }}</code>
          </div>
          <div class="lx-row">
            <label>@sorting-changed</label>
            <code>columnCode:{{ JSON.stringify(sortingColumn) }},</code>
            <code>direction:{{ JSON.stringify(sortingDirection) }}</code>
          </div>
          <div class="lx-row">
            <label>@selection-changed</label>
            <code>-</code>
          </div>
          <div class="lx-row">
            <label>@items-per-page-changed</label>
            <code>(value) : {{ JSON.stringify(eventItemsPerPage) }}</code>
          </div>
          <div class="lx-row">
            <label>@selection-action-click</label>
            <code>actionName: {{ JSON.stringify(eventSelectActionClick.actionName) }},</code>
            <code>rowCodes: {{ JSON.stringify(eventSelectActionClick.selectedRowCodes) }},</code>
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
