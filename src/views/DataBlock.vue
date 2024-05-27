<script setup lang="ts">
import { ref, onMounted, computed, shallowRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import {
  LxToggle,
  LxTextInput,
  LxValuePicker,
  LxButton,
  LxModal,
  lxStringUtils,
  LxExpander,
  lxIconUtils,
  LxAutoComplete,
  LxDataBlock,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import DemoView from '@/components/DemoView.vue';
import useNotifyStore from '@/stores/useNotifyStore';
import { useDemoStore } from '@/stores/useDemoStore';
import { useDebounceFn } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();
const notificationStore = useNotifyStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.dataBlock.description');
});
const actionDefinitions = ref([
  {
    id: 'download',
    name: 'Lejupielādēt',
    icon: 'download',
    enableByAttributeName: 'wasEren',
  },
  {
    id: 'edit',
    name: 'Rediģēt',
    icon: 'edit',
    enableByAttributeName: 'wasEren',
  },
  {
    id: 'delete',
    name: 'Dzēst ',
    icon: 'delete',
    enableByAttributeName: 'wasEren',
    destructive: true,
  },
]);
const eventActionClick = shallowRef({});
function actionClicked(actionName, selectedItemId) {
  if (actionName === 'edit') {
    notificationStore.pushSuccess('Edit has been pressed ');
    eventActionClick.value = { actionName, selectedItemId };
  } else if (actionName === 'delete') {
    notificationStore.pushSuccess('Delete has been pressed ');
    eventActionClick.value = { actionName, selectedItemId };
  } else if (actionName === 'open') {
    notificationStore.pushSuccess('Open has been pressed ');
    eventActionClick.value = { actionName, selectedItemId };
  } else {
    notificationStore.pushSuccess('Other has been pressed ');
    eventActionClick.value = { actionName, selectedItemId };
  }
}
const isExpandable = shallowRef(false);
const propExpander = shallowRef(false);
const propExpanderEvents = shallowRef(false);
const propExpanderEdit = shallowRef(false);
const propExpanderAdditional = shallowRef(false);
const isDisabled = shallowRef(false);
const isLoading = shallowRef(false);
const isBusy = shallowRef(false);

const size = [
  { id: 'm', name: 'm' },
  { id: 'l', name: 'l' },
];
const selectedSize = shallowRef('m');

const data = shallowRef(demoStore.videoGames);
const inputName = shallowRef(data.value[0].name);
const inputDescription = shallowRef(data.value[0].description);

const debouncedSearchReq = useDebounceFn(async (newValue) => {
  data.value[0].name = newValue;
  demoStore.updateData(data.value);
}, 500);
const debouncedSearchReq1 = useDebounceFn(async (newValue) => {
  data.value[0].description = newValue;
  demoStore.updateData(data.value);
}, 500);

watch(
  inputName,
  async (newValue) => {
    await debouncedSearchReq(newValue);
  },
  { immediate: true }
);
watch(
  inputDescription,
  async (newValue) => {
    await debouncedSearchReq1(newValue);
  },
  { immediate: true }
);

const selectedIcon = shallowRef('info');
const selectedIconSetId = ref('cds');

const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons(selectedIconSetId.value)?.map((i) => ({ id: i, name: i }))
);
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

const editActionsModal = ref();
const deletedActions = ref([]);
const deletedRowItems = ref([]);
let actionsCopy = [
  {
    actionName: null,
    label: null,
    icon: null,
    enableByAttributeName: null,
    isDestructive: null,
  },
];
function copyActionsArray() {
  editActionsModal.value.open();
  actionsCopy = actionDefinitions.value;
}
function isDeletedAction(fieldId) {
  if (deletedActions.value.find((id) => id === fieldId)) return true;
  return false;
}
function saveActions() {
  actionDefinitions.value = actionDefinitions.value.filter((o) => !isDeletedAction(o.actionName));
  deletedActions.value = [];
  copyActionsArray();
}
function isDeletedRow(fieldId) {
  if (deletedRowItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function returnActionItem(id) {
  deletedActions.value = deletedActions.value.filter((o) => o !== id);
}
function removeActionItem(id) {
  if (!isDeletedAction(id)) {
    deletedActions.value.push(id);
  }
}
function newActionItem() {
  actionsCopy.push({
    actionName: lxStringUtils.generateUUID().slice(16),
    label: null,
    icon: 'bug',
    enableByAttributeName: null,
    isDestructive: false,
  });
  saveActions();
}
const actionDefinitionsIsNull = ref(true);
const allowedActionDefinitions = computed(() => {
  if (!actionDefinitionsIsNull.value) {
    return [];
  }
  return actionDefinitions.value;
});
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'dataBlockGuidelines' });
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
  <DemoView :show-value="false" label="LxDataBlock" :git-link="baseGitUrl + 'DataBlock.vue'">
    <div class="lx-region"></div>
    <LxDataBlock
      id="databloks"
      :size="selectedSize"
      :icon="selectedIcon"
      :icon-set="selectedIconSetId"
      :name="inputName"
      :description="inputDescription"
      :expandable="isExpandable"
      :action-definitions="allowedActionDefinitions"
      :disabled="isDisabled"
      :loading="isLoading"
      :busy="isBusy"
      @action-click="actionClicked"
    >
      <div class="lx-form">
        <div class="lx-row">
          <label>Spēlētāju skaits mēnesī:</label>
          <p class="lx-data">{{ demoStore.videoGames[0].popularity }}</p>
          <label>Vērtējums:</label>
          <p class="lx-data">{{ demoStore.videoGames[0].rating }}</p>
        </div>
      </div>

      <template #toolbar>
        <LxButton label="Lejupielādēt spēli" icon="download" kind="tertiary" />
      </template>
    </LxDataBlock>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:size</label>
            <LxValuePicker :items="size" kind="single" v-model="selectedSize" />
          </div>
          <div class="lx-row">
            <label>:expandable</label>
            <LxToggle v-model="isExpandable" />
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
            <label>:name</label>
            <LxTextInput v-model="inputName" />
          </div>
          <div class="lx-row">
            <label>:description</label>
            <LxTextInput v-model="inputDescription" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propExpanderAdditional" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="isDisabled" />
          </div>
          <div class="lx-row">
            <label>:loading</label>
            <LxToggle v-model="isLoading" />
          </div>
          <div class="lx-row">
            <label>:busy</label>
            <LxToggle v-model="isBusy" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propExpanderEdit" label="Edit block" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <lx-button
              @click="copyActionsArray()"
              kind="ghost"
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
                  <label class="lx-cell lx-cell-m">actionName</label>
                  <label class="lx-cell lx-cell-m">label</label>
                  <label class="lx-cell lx-cell-m">icon</label>
                  <label class="lx-cell lx-cell-m">enableByAttributeName</label>
                  <label class="lx-cell lx-cell-m">isDestructive</label>
                </header>
                <div class="lx-row" v-for="f in actionsCopy" :key="f.actionName" title="test">
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.actionName"
                      v-show="!isDeletedAction(f.actionName)"
                      :read-only="true"
                    />
                    <p v-if="isDeletedAction(f.actionName)">{{ `Deleted ${f.actionName}` }}</p>
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.label"
                      v-show="!isDeletedAction(f.actionName)"
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
                      v-model="f.enableByAttributeName"
                      v-show="!isDeletedAction(f.actionName)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-toggle
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.isDestructive"
                      v-show="!isDeletedRow(f.actionName)"
                    />
                  </div>

                  <div class="lx-cell lx-cell-s" v-show="isDeletedAction(f.actionName)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnActionItem(f.actionName)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-s" v-show="!isDeletedAction(f.actionName)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="remove-item"
                      :destructive="true"
                      @click="removeActionItem(f.actionName)"
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
          <div class="lx-row">
            <label>Allow actions</label>
            <LxToggle v-model="actionDefinitionsIsNull" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propExpanderEvents" label="Events" icon="at">
        <div class="lx-form">
          <div class="lx-row">
            <label>@action-click</label>
            <code>actionName: {{ JSON.stringify(eventActionClick.actionName) }},</code>
            <code>id: {{ JSON.stringify(eventActionClick.selectedItemId) }},</code>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
