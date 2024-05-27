<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import {
  LxButton,
  LxToggle,
  LxTextInput,
  LxModal,
  LxExpander,
  LxDropDownMenu,
  LxAutoComplete,
  lxStringUtils,
  lxIconUtils,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import DemoView from '@/components/DemoView.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.dropDownMenu.description');
});

const editActionsModal = ref();
const deletedActions = ref([]);

let actionsCopy = [
  {
    actionName: null,
    label: null,
    icon: null,
    enableByAttributeName: null,
    isDestructive: null,
  },
];

const actionDefinitions = ref([
  {
    actionName: 'open',
    label: 'Atvērt',
    icon: 'open',
    enableByAttributeName: 'wasEren',
    isDestructive: false,
  },
  {
    actionName: 'edit',
    label: 'Rediģēt',
    icon: 'edit',
    enableByAttributeName: 'wasEren',
    isDestructive: false,
  },
  {
    actionName: 'delete',
    label: 'Dzēst ',
    icon: 'delete',
    enableByAttributeName: 'wasEren',
    isDestructive: true,
  },
]);

function returnActionItem(id) {
  deletedActions.value = deletedActions.value.filter((o) => o !== id);
}
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
  copyActionsArray();
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
const selectedIconSetId = ref('cds');
const dropdownIcons = computed(() =>
  lxIconUtils.getAvailableIcons(selectedIconSetId.value)?.map((i) => ({ id: i, name: i }))
);

const buttonLabel = ref('Open');
const safePanel = ref(false);

const editsExpanded = ref(false);
const slotsExpanded = ref(false);
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'dropDownMenuGuidelines' });
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
    label="LxDropDownMenu"
    :git-link="baseGitUrl + 'DropDownMenu.vue'"
  >
    <div class="lx-region">
      <LxDropDownMenu v-if="!safePanel">
        <div class="lx-toolbar">
          <lx-button :label="buttonLabel" kind="primary" icon="overflow-menu" />
        </div>
        <template v-slot:panel>
          <div class="lx-button-set">
            <lx-button
              v-for="action in actionDefinitions"
              :key="action.actionName"
              :icon="action.icon"
              :label="action.label"
              :title="action.label"
              tabindex="0"
              :destructive="action.isDestructive"
            />
          </div>
        </template>
      </LxDropDownMenu>
      <LxDropDownMenu v-if="safePanel">
        <div class="lx-toolbar">
          <lx-button :label="buttonLabel" kind="primary" icon="overflow-menu" />
        </div>
        <template v-slot:clickSafePanel>
          <div class="lx-button-set">
            <lx-button
              v-for="action in actionDefinitions"
              :key="action.actionName"
              :icon="action.icon"
              :label="action.label"
              :title="action.label"
              tabindex="0"
              :destructive="action.isDestructive"
            />
          </div>
        </template>
      </LxDropDownMenu>
    </div>
    <template #menu>
      <LxExpander v-model="editsExpanded" label="Edits" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>Safe slot</label>
            <LxToggle v-model="safePanel"></LxToggle>
          </div>
          <div class="lx-row">
            <label>Button label</label>
            <LxTextInput v-model="buttonLabel"></LxTextInput>
          </div>
          <div class="lx-row">
            <lx-button
              @click="copyActionsArray()"
              kind="secondary"
              label="Open action editor"
              icon="open"
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
                  <label class="lx-cell lx-cell-m">actionName</label>
                  <label class="lx-cell lx-cell-m">label</label>
                  <label class="lx-cell lx-cell-m">icon</label>
                  <label class="lx-cell lx-cell-m">enableByAttributeName</label>
                  <label class="lx-cell lx-cell-m">isDestructive</label>
                </header>
                <div class="lx-row" v-for="i in actionsCopy" :key="i.actionName" title="test">
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="i.actionName"
                      v-show="!isDeletedAction(i.actionName)"
                      :read-only="true"
                    />
                    <p v-if="isDeletedAction(i.actionName)">{{ `Deleted ${i.actionName}` }}</p>
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="i.label"
                      v-show="!isDeletedAction(i.actionName)"
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
                      v-show="!isDeletedAction(i.actionName)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-text-input
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="i.enableByAttributeName"
                      v-show="!isDeletedAction(i.actionName)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-toggle
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="i.isDestructive"
                      v-show="!isDeletedAction(i.actionName)"
                    />
                  </div>

                  <div class="lx-cell lx-cell-s" v-show="isDeletedAction(i.actionName)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnActionItem(i.actionName)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-s" v-show="!isDeletedAction(i.actionName)">
                    <lx-button
                      :id="lxStringUtils.generateUUID()"
                      variant="icon-only"
                      kind="ghost"
                      icon="remove-item"
                      :destructive="true"
                      @click="removeActionItem(i.actionName)"
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
      <LxExpander v-model="slotsExpanded" label="Slots" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <code>#panel</code>
          </div>
          <div class="lx-row">
            <code>#clickSafePanel</code>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
