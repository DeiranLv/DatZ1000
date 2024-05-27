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
  LxErrorPage,
  lxStringUtils,
  LxModal,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();
const notificationStore = useNotifyStore();

const propExpander = shallowRef(false);
const propExpanderEdit = shallowRef(false);

const kindValues = [
  {
    id: '400',
    name: '400',
  },
  {
    id: '401',
    name: '401',
  },
  {
    id: '403',
    name: '403',
  },
  {
    id: '404',
    name: '404',
  },
  {
    id: '500',
    name: '500',
  },
  {
    id: 'sessionTimeout',
    name: 'Session Timeout',
  },
];
const selectedKindId = ref('400');

const defaultTitle = shallowRef(true);
const defaultDescription = shallowRef(true);
const iconValue = shallowRef('delete');
const titleValue = shallowRef('Error Title');
const titleValueComputed = computed(() => {
  if (defaultTitle.value) return null;
  return titleValue.value;
});
const descriptionValue = shallowRef('Error Description');
const descriptionValueComputed = computed(() => {
  if (defaultDescription.value) return null;
  return descriptionValue.value;
});
// Action definitons
const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons('cds')?.map((i) => ({ id: i, name: i }))
);
const actionDefinitions = ref([
  {
    id: 'back',
    name: 'Atgriezties atpakaļ',
    icon: 'cancel',
    kind: 'primary',
    enableByAttributeName: 'wasEren',
    destructive: false,
  },
  {
    id: 'start',
    name: 'Atgriezties uz sākumu',
    icon: 'back',
    kind: 'primary',
    enableByAttributeName: 'wasEren',
    destructive: false,
  },
]);
//--------------------
const eventActionClick = shallowRef({});
function actionClicked(actionName) {
  if (actionName === 'back') {
    notificationStore.pushSuccess('Back has been pressed ');
    eventActionClick.value = { actionName };
  } else if (actionName === 'start') {
    notificationStore.pushSuccess('Start has been pressed ');
    eventActionClick.value = { actionName };
  } else {
    notificationStore.pushSuccess('Action has been pressed ');
    eventActionClick.value = { actionName };
  }
}
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
// Action defnitions
onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.errorPage.description');
});

const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'errorPageGuidelines', params: { id: 'toggle' } });
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
    kind="m"
    :show-value="false"
    label="LxErrorPage"
    :git-link="baseGitUrl + 'ErrorPage.vue'"
  >
    <LxErrorPage
      :kind="selectedKindId"
      :title="titleValueComputed"
      :description="descriptionValueComputed"
      :action-definitions="actionDefinitions"
      @action-click="actionClicked"
    ></LxErrorPage>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="kindValues" v-model="selectedKindId" />
          </div>
          <div class="lx-row">
            <label>Use default Title value</label>
            <LxToggle v-model="defaultTitle" />
          </div>
          <div class="lx-row">
            <label>:title</label>
            <LxTextInput v-model="titleValue" />
          </div>
          <div class="lx-row">
            <label>Use default Description value</label>
            <LxToggle v-model="defaultDescription" />
          </div>
          <div class="lx-row">
            <label>:description</label>
            <LxTextInput v-model="descriptionValue" />
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
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
