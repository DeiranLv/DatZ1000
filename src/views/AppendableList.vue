<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxExpander,
  LxValuePicker,
  LxAppendableList,
  LxRow,
  LxRatings,
} from '@wntr/lx-ui';
import { useDemoStore } from '@/stores/useDemoStore';

const demoStore = useDemoStore();

const itemsPrepared = demoStore.videoGames.slice(0, 3);

const items = ref(itemsPrepared);
const expandable = shallowRef(false);
const readOnly = shallowRef(false);
const nameAttributeItems = [
  {
    id: 'id',
    name: 'id',
  },
  {
    id: 'name',
    name: 'name',
  },
  {
    id: 'popularity',
    name: 'popularity',
  },
];
const nameAttribute = shallowRef('name');
const addButtonLabel = shallowRef('Pievienot ierakstu');
const columnCountItems = [
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
  {
    id: '4',
    name: '4',
  },
];
const appendableListColumnCount = shallowRef('2');
const kindItems = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'compact',
    name: 'compact',
  },
];
const kind = shallowRef('default');
const nameRowColumnSpan = shallowRef('1');
const playerRowColumnSpan = shallowRef('1');
const multiplayerRowColumnSpan = shallowRef('1');
const ratingRowColumnSpan = shallowRef('1');

const propExpander = shallowRef(false);
const formPropExpander = shallowRef(false);
const baseGitUrl = window.config.gitLxComponentsUrl;
</script>

<template>
  <DemoView
    kind="m"
    :show-value="false"
    :show-modal-button="true"
    label="LxList"
    :git-link="baseGitUrl + 'forms/' + 'AppendableList.vue'"
  >
    <LxAppendableList
      v-model="items"
      :column-count="Number(appendableListColumnCount)"
      :expandable="expandable"
      :readOnly="readOnly"
      :nameAttribute="nameAttribute"
      :addButtonLabel="addButtonLabel"
      :kind="kind"
    >
      <template #customItem="{ item }">
        <LxRow label="Nosaukums" :column-span="nameRowColumnSpan">
          <LxTextInput v-model="item.name"></LxTextInput>
        </LxRow>
        <LxRow label="Spēlētāju skaits mēnesī" :column-span="playerRowColumnSpan">
          <LxTextInput v-model="item.popularity" mask="integer" />
        </LxRow>
        <LxRow label="Daudzspēlētāju spēle" :column-span="multiplayerRowColumnSpan">
          <LxToggle v-model="item.multiplayer" />
        </LxRow>
        <LxRow label="Vērtējums" :column-span="ratingRowColumnSpan">
          <LxRatings v-model="item.rating" variant="colorful" />
        </LxRow>
      </template>
    </LxAppendableList>

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:expandable</label>
            <LxToggle v-model="expandable" />
          </div>
          <div class="lx-row">
            <label>:readOnly</label>
            <LxToggle v-model="readOnly" />
          </div>
          <div class="lx-row">
            <label>:nameAttribute</label>
            <LxValuePicker v-model="nameAttribute" :items="nameAttributeItems" />
          </div>
          <div class="lx-row">
            <label>:addButtonLabel</label>
            <LxTextInput v-model="addButtonLabel" />
          </div>
          <div class="lx-row">
            <label>:columnCount</label>
            <LxValuePicker v-model="appendableListColumnCount" :items="columnCountItems" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker v-model="kind" :items="kindItems" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="formPropExpander" label="Form props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>LxRow 'Nosaukums' columnSpan</label>
            <LxValuePicker
              v-model="nameRowColumnSpan"
              :items="columnCountItems"
              variant="dropdown"
            />
          </div>
          <div class="lx-row">
            <label>LxRow 'Spēlētāju...' columnSpan</label>
            <LxValuePicker
              v-model="playerRowColumnSpan"
              :items="columnCountItems"
              variant="dropdown"
            />
          </div>
          <div class="lx-row">
            <label>LxRow 'Daudzspēlētāju...' columnSpan</label>
            <LxValuePicker
              v-model="multiplayerRowColumnSpan"
              :items="columnCountItems"
              variant="dropdown"
            />
          </div>
          <div class="lx-row">
            <label>LxRow 'Vērtējums' columnSpan</label>
            <LxValuePicker
              v-model="ratingRowColumnSpan"
              :items="columnCountItems"
              variant="dropdown"
            />
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
