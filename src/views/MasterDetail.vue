<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import useNotifyStore from '@/stores/useNotifyStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxButton,
  LxTextInput,
  LxValuePicker,
  LxExpander,
  lxStringUtils,
  LxMasterDetail,
  LxModal,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { useDemoStore } from '@/stores/useDemoStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();
const notification = useNotifyStore();

const propExpander = ref(false);
const propAdditionalExpander = ref(false);

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.masterDetail.description');
});
const valuePickerDefaultSingleModel = ref(['Adam']);
const valueItems = ref(demoStore.videoGames.map((item) => ({ ...item, description: null })));
const pickedValue = ref({
  id: '---',
  name: '---',
  popularity: '---',
  description: '---',
  multiplayer: '---',
  rating: '---',
  country: '---',
  group: '---',
  icon: '---',
  clickable: '---',
  href: '---',
});
const masterDetail = ref();

function masterDetailSelectionChanged(code) {
  valuePickerDefaultSingleModel.value = [code];
  pickedValue.value = valueItems.value.find((item) => item.id === code);
}

const editModal = ref();
function editDetailData() {
  editModal.value.open();
}

const newLabel = ref('Rediģēt');
const placeholder = ref('Neon Genesis Evangelion');

const invalidItems = ref([]);
const texts = ref({
  add: 'Add',
});
const modes = [
  {
    id: 'edit',
    name: 'edit',
  },
  {
    id: 'read',
    name: 'read',
  },
];
const selectedModeId = ref('edit');

const levels = [
  {
    id: '1',
    name: '1',
  },
  {
    id: '2',
    name: '2',
  },
  {
    id: '3',
    name: '3',
  },
];

const selectedLevelId = ref('2');

const deletedItems = ref([]);
function isDeleted(fieldId) {
  if (deletedItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function isInvalid(fieldId) {
  if (invalidItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function masterDetailNewItem() {
  const newId = lxStringUtils.generateUUID();
  valueItems.value.push({ id: newId, name: newId, pilot: newId, appearance: newId, note: newId });
  notification.pushSuccess('New item added');
  masterDetail.value.selectItem(newId);
}
function returnItem(id) {
  deletedItems.value = deletedItems.value.filter((o) => o !== id);
}
function returnItemFromInvalid(id) {
  invalidItems.value = invalidItems.value.filter((o) => o !== id);
}
function removeItem(id) {
  if (!isDeleted(id)) {
    deletedItems.value.push(id);
  }
}
function itemToInvalid(id) {
  if (!isInvalid(id)) {
    invalidItems.value.push(id);
  }
}
function save(e) {
  valueItems.value = valueItems.value.filter((o) => !isDeleted(o.id));
  deletedItems.value = [];
  demoStore.updateData(valueItems);
  e.close();
}
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'masterDetailGuidelines' });
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
  <DemoView kind="m" :show-value="false" :git-link="baseGitUrl + 'MasterDetail.vue'">
    <div class="lx-region">
      <lx-master-detail
        ref="masterDetail"
        v-model="valueItems"
        :new-label="newLabel"
        :place-holder="placeholder"
        :mode="selectedModeId"
        :level="parseInt(selectedLevelId)"
        :invalid-items="invalidItems"
        :texts="texts"
        id-attribute="id"
        name-attribute="name"
        description-attribute="popularity"
        @selection-changed="masterDetailSelectionChanged"
        @new-item-added="editDetailData"
      >
        <div class="lx-form-grid">
          <main>
            <div class="lx-form-section">
              <div class="lx-row">
                <label>Spēles id:</label>
                <p class="lx-data">{{ pickedValue?.id }}</p>
              </div>
              <div class="lx-row">
                <label>Nosaukums:</label>
                <p class="lx-data">{{ pickedValue?.name }}</p>
              </div>
              <div class="lx-row">
                <label>Spēlētāju skaites mēnesī:</label>
                <p class="lx-data">{{ pickedValue?.popularity }}</p>
              </div>
              <div class="lx-row">
                <label>Vērtējums:</label>
                <p class="lx-data">{{ pickedValue?.rating }}</p>
              </div>
            </div>
          </main>
        </div>
        <lx-modal
          ref="editModal"
          label="Datu redaktors"
          size="m"
          button-primary-label="Saglabāt un aizvērt"
          :button-primary-visible="true"
          @primary-action="save(editModal)"
        >
          <div class="lx-pseudo-grid">
            <header class="lx-labels">
              <label class="lx-cell lx-cell-l">Value name</label>
              <label class="lx-cell lx-cell-s">Invalid</label>
              <label class="lx-cell lx-cell-s">Delete</label>
            </header>
            <div class="lx-row" v-for="f in valueItems" :key="f.id" title="test">
              <div class="lx-cell lx-cell-l">
                <div class="lx-cell lx-cell-l" v-show="isDeleted(f.id)">
                  <p>{{ `Deleted ${f.name}` }}</p>
                </div>
                <lx-text-input
                  :id="`title-${f.name}`"
                  v-model="f.name"
                  v-show="!isDeleted(f.id)"
                  :placeholder="f.name"
                />
              </div>
              <div class="lx-cell lx-cell-s" v-show="isInvalid(f.id)">
                <lx-button
                  :id="f.id"
                  variant="icon-only"
                  kind="ghost"
                  icon="undo"
                  @click="returnItemFromInvalid(f.id)"
                />
              </div>
              <div class="lx-cell lx-cell-s" v-show="!isInvalid(f.id)">
                <lx-button
                  :id="f.id"
                  variant="icon-only"
                  kind="ghost"
                  icon="invalid"
                  :destructive="true"
                  @click="itemToInvalid(f.id)"
                />
              </div>

              <div class="lx-cell lx-cell-s" v-show="isDeleted(f.id)">
                <lx-button
                  :id="f.id"
                  variant="icon-only"
                  kind="ghost"
                  icon="undo"
                  @click="returnItem(f.id)"
                />
              </div>
              <div class="lx-cell lx-cell-s" v-show="!isDeleted(f.id)">
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
                  @click="masterDetailNewItem()"
                />
              </div>
            </div>
          </div>
        </lx-modal>
      </lx-master-detail>
    </div>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:mode</label>
            <LxValuePicker :items="modes" v-model="selectedModeId" kind="single" />
          </div>
          <div class="lx-row">
            <label>:new-label</label>
            <lx-text-input v-model="newLabel" />
          </div>
          <div class="lx-row">
            <label>:place-holder</label>
            <lx-text-input v-model="placeholder" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:level</label>
            <LxValuePicker :items="levels" v-model="selectedLevelId" kind="single" />
          </div>
          <div class="lx-row">
            <label>:texts.add</label>
            <LxTextInput v-model="texts.add" />
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
