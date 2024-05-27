<script setup lang="ts">
import { ref, shallowRef, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxTextInput,
  LxValuePicker,
  LxExpander,
  LxStateDisplay,
  LxDropDown,
  LxContentSwitcher,
  LxButton,
  LxModal,
} from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.stateDisplay.description');
});

const propExpander = shallowRef(false);
const editModal = ref();
const displayShapeValues = [
  {
    id: 'circle',
    name: 'circle',
  },
  {
    id: 'diamond',
    name: 'diamond',
  },
];
const valueSelectedId = shallowRef('minecraft');

const dictionaryTypes = ref([
  {
    id: 'draft',
    name: 'draft',
  },
  {
    id: 'new',
    name: 'new',
  },
  {
    id: 'editing',
    name: 'editing',
  },
  {
    id: 'edited',
    name: 'edited',
  },
  {
    id: 'disabling',
    name: 'disabling',
  },
  {
    id: 'inactive',
    name: 'inactive',
  },
  {
    id: 'finishing',
    name: 'finishing',
  },
  {
    id: 'finished',
    name: 'finished',
  },
  {
    id: 'deleting',
    name: 'deleting',
  },
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
    id: 'black',
    name: 'black',
  },
  {
    id: 'purple',
    name: 'purple',
  },
  {
    id: 'orange',
    name: 'orange',
  },
  {
    id: 'yellow',
    name: 'yellow',
  },
  {
    id: 'red-full',
    name: 'red-full',
  },
  {
    id: 'green-full',
    name: 'green-full',
  },
  {
    id: 'blue-full',
    name: 'blue-full',
  },
  {
    id: 'black-full',
    name: 'black-full',
  },
  {
    id: 'purple-full',
    name: 'purple-full',
  },
  {
    id: 'orange-full',
    name: 'orange-full',
  },
  {
    id: 'yellow-full',
    name: 'yellow-full',
  },
]);
const dictionary = [
  {
    value: 'League of Legends',
    displayName: 'League of Legends',
    displayType: 'yellow-full',
    displayShape: 'circle',
  },
  {
    value: 'minecraft',
    displayName: 'Minecraft',
    displayType: 'green-full',
    displayShape: 'diamond',
  },
  {
    value: 'Dota 2',
    displayName: 'Dota 2',
    displayType: 'red',
    displayShape: 'circle',
  },
  {
    value: 'Dishonored',
    displayName: 'Dishonored',
    displayType: 'purple',
    displayShape: 'diamond',
  },
  {
    value: 'Fallout 4',
    displayName: 'Fallout 4',
    displayType: 'blue',
    displayShape: 'diamond',
  },
  {
    value: 'Pokémon Black and White',
    displayName: 'Pokémon Black and White',
    displayType: 'yellow',
    displayShape: 'diamond',
  },
];
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'stateDisplayGuidelines', params: { id: 'state-display' } });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];

const dictionaryRef = ref(dictionary);
const valuesComp = computed(() =>
  dictionaryRef.value.map((item) => ({ id: item.value, name: item.value }))
);
function save(e) {
  e.close();
}
const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <!--
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  -->
  <DemoView
    kind="s"
    :show-value="true"
    label="LxStateDisplay"
    :git-link="baseGitUrl + 'StateDisplay.vue'"
  >
    <LxStateDisplay :value="valueSelectedId" :dictionary="dictionaryRef" />
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:value</label>
            <LxValuePicker v-model="valueSelectedId" :items="valuesComp" />
          </div>
          <div class="lx-row">
            <label>:dictionary</label>
            <LxButton label="Vērtību redaktors" icon="open" @click="editModal.open()" />
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
                  <label class="lx-cell lx-cell-l">value</label>
                  <label class="lx-cell lx-cell-l">displayName</label>
                  <label class="lx-cell lx-cell-m">displayType</label>
                  <label class="lx-cell lx-cell-m">displayShape</label>
                </header>
                <div class="lx-row" v-for="f in dictionaryRef" :key="f.value" title="test">
                  <div class="lx-cell lx-cell-l">
                    <lx-text-input
                      :id="`title-${f.value}`"
                      v-model="f.value"
                      :placeholder="f.value.toString()"
                    />
                  </div>
                  <div class="lx-cell lx-cell-l">
                    <lx-text-input
                      :id="`title-${f.displayName}`"
                      v-model="f.displayName"
                      :placeholder="f.displayName"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <LxDropDown :items="dictionaryTypes" v-model="f.displayType" kind="native" />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <LxDropDown
                      :id="f.value"
                      :items="displayShapeValues"
                      v-model="f.displayShape"
                      kind="native"
                    />
                  </div>
                </div>
              </div>
            </lx-modal>
          </div>
        </div>
      </LxExpander>
    </template>
    <template #value>
      <code>"{{ valueSelectedId }}"</code>
    </template>
  </DemoView>
</template>
