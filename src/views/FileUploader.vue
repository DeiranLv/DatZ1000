<script setup lang="ts">
import { onMounted, computed, shallowRef, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import {
  LxToggle,
  LxTextInput,
  LxExpander,
  LxValuePicker,
  LxButton,
  LxFileUploader,
} from '@wntr/lx-ui';
import DemoView from '@/components/DemoView.vue';

import useNotifyStore from '@/stores/useNotifyStore';

const notificationStore = useNotifyStore();

const translate = useI18n();
const viewStore = useViewStore();

const mainPropsExpanded = shallowRef(true);
const textsExpanded = shallowRef(false);
const editExpanded = shallowRef(false);

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
const dateTypes = [
  {
    id: 'content',
    name: 'content',
  },
  {
    id: 'meta',
    name: 'meta',
  },
];
const modes = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'compact',
    name: 'compact',
  },
];
const texts = ref({
  clear: 'Notīrīt',
  buttonLabel: 'Izvēlēties datni',
  uploaderDescription: '',
  draggablePlaceholder: 'Ievelciet datnes, vai nospiediet šeit, lai augšupielādētu',
  placeholder: 'Ievadiet nosaukuma vai apraksta daļu, lai sameklētu ierakstus',
  notFoundSearch: 'Nav atrasts:',
  noItems: 'Nav pievienota neviena datne',
  noItemsDescription: '',
});

const draggable = shallowRef(false);
const hasSearch = shallowRef(false);

const selectedKind = shallowRef('single');
const selectedDataType = shallowRef('meta');
const selectedMode = shallowRef('default');

const disabled = shallowRef(false);
const loading = shallowRef(false);
const readOnly = shallowRef(false);

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.fileUploader.description');
});

const baseGitUrl = window.config.gitLxComponentsUrl;

const fileUploader = ref();

const firstFileId = ref();

function getFiles() {
  firstFileId.value = fileUploader.value.getFiles()[0].id;
}

function addInvalid() {
  getFiles();
  fileUploader.value.changeState([
    {
      id: firstFileId.value,
      state: 'invalid',
      description: 'Izvēlieties datni kas nav lielāka par 500kb',
      invalidDescription: 'Datnes lielums pārsniedz ierobezojumus ',
    },
  ]);
}
function addDraft() {
  getFiles();
  fileUploader.value.changeState([
    {
      id: firstFileId.value,
      state: 'draft',
      description: 'Izvēlieties datni kas nav lielāka par 500kb',
      invalidDescription: 'Datnes lielums pārsniedz ierobezojumus ',
    },
  ]);
}
function addLoading() {
  getFiles();
  fileUploader.value.changeState([
    {
      id: firstFileId.value,
      state: 'loading',
      description: 'Izvēlieties datni kas nav lielāka par 500kb',
      invalidDescription: 'Datnes lielums pārsniedz ierobezojumus ',
    },
  ]);
}
function notifyGetFiles() {
  notificationStore.pushInfo(`Called exposed function getFiles() ${fileUploader.value.getFiles()}`);
}

const fileVar = ref([]);

function setNewItem() {
  fileVar.value = [
    new File(['file content 123'], 'filename123.txt', {
      type: 'text/plain',
    }),
  ];
}
</script>
<template>
  <DemoView
    kind="m"
    :show-value="false"
    label="LxFileUploader"
    :git-link="baseGitUrl + 'FileUploader.vue'"
  >
    <LxFileUploader
      ref="fileUploader"
      v-model="fileVar"
      :kind="selectedKind"
      :draggable="draggable"
      :dataType="selectedDataType"
      :mode="selectedMode"
      :hasSearch="hasSearch"
      :disabled="disabled"
      :loading="loading"
      :readOnly="readOnly"
      :texts="texts"
    >
    </LxFileUploader>

    <template #menu>
      <LxExpander v-model="mainPropsExpanded" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker v-model="selectedKind" :items="kinds" />
          </div>
          <div class="lx-row">
            <label>:data-type</label>
            <LxValuePicker v-model="selectedDataType" :items="dateTypes" />
          </div>
          <div class="lx-row">
            <label>:mode</label>
            <LxValuePicker v-model="selectedMode" :items="modes" />
          </div>
          <div class="lx-row">
            <label>:draggable</label>
            <LxToggle v-model="draggable" />
          </div>
          <div class="lx-row">
            <label>:hasSearch</label>
            <LxToggle v-model="hasSearch" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <div class="lx-row">
            <label>:loading</label>
            <LxToggle v-model="loading" />
          </div>
          <div class="lx-row">
            <label>:readOnly</label>
            <LxToggle v-model="readOnly" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="textsExpanded" label="Text props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:texts.buttonLabel</label>
            <LxTextInput v-model="texts.buttonLabel" />
          </div>
          <div class="lx-row">
            <label>:texts.uploaderDescription</label>
            <LxTextInput v-model="texts.uploaderDescription" />
          </div>
          <div class="lx-row">
            <label>:texts.draggablePlaceholder</label>
            <LxTextInput v-model="texts.draggablePlaceholder" />
          </div>
          <div class="lx-row">
            <label>:texts.clear</label>
            <LxTextInput v-model="texts.clear" />
          </div>
          <div class="lx-row">
            <label>:texts.placeholder</label>
            <LxTextInput v-model="texts.placeholder" />
          </div>
          <div class="lx-row">
            <label>:texts.notFoundSearch</label>
            <LxTextInput v-model="texts.notFoundSearch" />
          </div>
          <div class="lx-row">
            <label>:texts.noItems</label>
            <LxTextInput v-model="texts.noItems" />
          </div>
          <div class="lx-row">
            <label>:texts.noItemsDescription</label>
            <LxTextInput v-model="texts.noItemsDescription" />
          </div>
          <div class="lx-row">
            <label>:texts.loadMore</label>
            <LxTextInput v-model="texts.loadMore" />
          </div>
          <div class="lx-row">
            <label>:texts.search</label>
            <LxTextInput v-model="texts.search" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="editExpanded" label="Exposed functions" icon="settings">
        <div class="lx-form">
          <LxButton kind="tertiary" label="Set file" @click="setNewItem" />
          <LxButton kind="tertiary" label="Get Files" @click="notifyGetFiles()" />
          <LxButton kind="tertiary" label="Invalid" @click="addInvalid()" />
          <LxButton kind="tertiary" label="Draft" @click="addDraft()" />
          <LxButton kind="tertiary" label="Loading" @click="addLoading()" />
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
