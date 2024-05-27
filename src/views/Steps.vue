<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import {
  LxToggle,
  LxTextInput,
  LxModal,
  LxExpander,
  LxButton,
  lxStringUtils,
  LxDropDown,
  LxSteps,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import DemoView from '@/components/DemoView.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.steps.description');
});

const stepsItems = ref([
  {
    code: 'start',
    name: 'Spēles lejupielāde',
    description: 'Notiek lejupielāde...',
    state: 'complete',
  },
  {
    code: 'current',
    name: 'Servera izvēle',
    state: 'current',
  },
  {
    code: 'null1',
    name: 'Reģistrācija',
    description: 'Reģistrācijas veikšana',
  },
  {
    code: 'invalid',
    name: 'Pieteikšanās',
    description: 'Piesakaties profilā, ko izveidojāt iepriekšējā solī',
    state: 'invalid',
  },
]);

const stepsStates = [
  {
    id: 'null',
    name: 'null',
  },
  {
    id: 'current',
    name: 'current',
  },
  {
    id: 'complete',
    name: 'complete',
  },
  {
    id: 'invalid',
    name: 'invalid',
  },
];
const stepsModel = ref('start');

const step = ref(0);
const disabled = ref(false);
const loading = ref(false);
const busy = ref(false);

const mainExpanded = ref(false);
const editExpanded = ref(false);
const editModal = ref();
const baseGitUrl = window.config.gitLxComponentsUrl;

function nextStep() {
  if (step.value < stepsItems.value.length - 1) {
    step.value += 1;
    stepsModel.value = stepsItems.value[step.value].code;
  }
}
function previousStep() {
  if (step.value > 0) {
    step.value -= 1;
    stepsModel.value = stepsItems.value[step.value].code;
  }
}
const deletedItems = ref([]);

function isDeleted(fieldCode) {
  if (deletedItems.value.find((code) => code === fieldCode)) return true;
  return false;
}
function save(e) {
  stepsItems.value = stepsItems.value.filter((o) => !isDeleted(o.code));
  deletedItems.value = [];
  e.close();
}

function valuePickerNewItem() {
  stepsItems.value.push({
    code: lxStringUtils.generateUUID(),
    name: '',
    description: '',
    state: '',
  });
}
function returnItem(code) {
  deletedItems.value = deletedItems.value.filter((o) => o !== code);
}
function removeItem(code) {
  if (!isDeleted(code)) {
    deletedItems.value.push(code);
  }
}
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'stepsGuidelines', params: { id: 'steps' } });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];
</script>
<template>
  <!--
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  -->
  <DemoView kind="l" :show-value="false" label="LxSteps" :git-link="baseGitUrl + 'Steps.vue'">
    <LxSteps
      id="id"
      v-model="stepsModel"
      :items="stepsItems"
      :disabled="disabled"
      :loading="loading"
      :busy="busy"
      id-attribute="code"
    />

    <template #menu>
      <LxExpander v-model="mainExpanded" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <div class="lx-row">
            <label>:loading</label>
            <LxToggle v-model="loading" />
          </div>
          <div class="lx-row">
            <label>:busy </label>
            <LxToggle v-model="busy" />
          </div>
        </div>
      </LxExpander>

      <LxExpander v-model="editExpanded" label="Edit props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>Step forward</label>
            <LxButton variant="icon-only" kind="primary" icon="next" @click="nextStep" />
          </div>
          <div class="lx-row">
            <label>Step back</label>
            <LxButton variant="icon-only" kind="secondary" icon="back" @click="previousStep" />
          </div>
          <div class="lx-row">
            <lx-button
              @click="editModal.open()"
              kind="tertiary"
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
                  <label class="lx-cell lx-cell-l">Value code</label>
                  <label class="lx-cell lx-cell-l">Value name</label>
                  <label class="lx-cell lx-cell-l">Value description</label>
                  <label class="lx-cell lx-cell-m">Value state</label>
                  <label class="lx-cell lx-cell-l">Delete</label>
                </header>
                <div class="lx-row" v-for="f in stepsItems" :key="f.code" title="test">
                  <div class="lx-cell lx-cell-l">
                    <div class="lx-cell lx-cell-l" v-show="isDeleted(f.code)">
                      <p>{{ `Deleted ${f.name}` }}</p>
                    </div>
                    <lx-text-input
                      :id="`title-${f.code}`"
                      v-model="f.code"
                      v-show="!isDeleted(f.code)"
                      :placeholder="f.code"
                    />
                  </div>
                  <div class="lx-cell lx-cell-l">
                    <lx-text-input
                      :id="`title-${f.name}`"
                      v-model="f.name"
                      v-show="!isDeleted(f.code)"
                      :placeholder="f.name"
                    />
                  </div>
                  <div class="lx-cell lx-cell-l">
                    <lx-text-input
                      :id="`title-${f.description}`"
                      v-model="f.description"
                      v-show="!isDeleted(f.description)"
                      :placeholder="f.description"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <lx-drop-down
                      :id="`title-${lxStringUtils.generateUUID()}`"
                      v-model="f.state"
                      variant="dropdown"
                      :items="stepsStates"
                      v-show="!isDeleted(f.code)"
                    />
                  </div>

                  <div class="lx-cell lx-cell-m" v-show="isDeleted(f.code)">
                    <lx-button
                      :id="f.code"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnItem(f.code)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m" v-show="!isDeleted(f.code)">
                    <lx-button
                      :id="f.code"
                      variant="icon-only"
                      kind="ghost"
                      icon="remove-item"
                      :destructive="true"
                      @click="removeItem(f.code)"
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
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
