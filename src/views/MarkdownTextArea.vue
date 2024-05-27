<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxExpander,
  LxMarkdownTextArea,
  LxContentSwitcher,
  lxStringUtils,
  LxModal,
  LxButton,
  LxDropDown,
} from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.markdownTextArea.description');
});
const propExpander = ref(false);
const propAdditionalExpander = ref(false);
const invalidationExpanded = ref(false);
const markDownValue = ref(
  '"<a target="_blank" rel="noopener noreferrer nofollow" href="https://fallout.fandom.com/wiki/Fallout_4">Fallout 4</a> ir <strong>darbības lomu spēle</strong> <em>postapokaliptiskā</em> atvērtās pasaules vidē, kurā <li>spēlētāji pārvietojas pa tuksnesi,</li> <li>iesaistās kaujās un pieņem kritiskus lēmumus, kas veido sava <s>rakstura</s> ceļa iznākumu.</li>'
);

const placeholder = ref('Pieraksti savu komentāru');
const rows = ref(1);
const maxLength = ref(300);
const disabled = ref(false);
const invalid = ref(false);
const invalidationMessage = ref('Kļūda!');
const toggleHtml = shallowRef(false);
const showLinkEditorValue = shallowRef(true);
const showColorPickerValue = shallowRef(true);
const inputTooltip = shallowRef('Labākā videospēle');
const routerValue = shallowRef('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'markdownTextAreaGuidelines' });
  }
}
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];

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

const baseGitUrl = window.config.gitLxComponentsUrl;

const showPlaceholderPicker = ref(true);

const dictionary = ref([
  {
    id: 1,
    name: 'Nosaukums',
    value: '$Name$',
    description: 'Spēles nosaukums',
    displayType: 'new',
  },
  {
    id: 2,
    name: 'Izstrādātājs',
    value: '#Developer#',
    description: 'Spēles izstrādātājs',
    displayType: 'orange',
  },
  {
    id: 3,
    name: 'Datums',
    value: '/Date/',
    description: 'Spēles izlaišanas datums',
    displayType: 'red',
  },
  {
    id: 4,
    name: 'Vērtējums ',
    value: '=Rating=',
    description: 'Spēles vērtējums',
  },
]);
const deletedItems = ref([]);

const editModal = ref();

function isDeleted(fieldId) {
  return deletedItems.value.find((id) => id === fieldId) !== undefined;
}

function save(e) {
  dictionary.value = dictionary.value.filter((o) => !isDeleted(o.id));
  deletedItems.value = [];
  // demoStore.updateData(demoStore.videoGames);
  e.close();
}
const randomValue = ref([
  'Rust',
  'FIFA',
  'Fortnite',
  'Rocket League',
  'Overwatch',
  'World of Warcraft',
]);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function dictionaryNewItem() {
  const newId = lxStringUtils.generateUUID();
  const newName = randomValue.value[getRandomInt(6)];
  dictionary.value.push({
    id: Number(newId),
    name: newName,
    value: null,
    description: null,
    displayType: null,
  });
}
function returnItem(id) {
  deletedItems.value = deletedItems.value.filter((o) => o !== id);
}
function removeItem(id) {
  if (!isDeleted(id)) {
    deletedItems.value.push(id);
  }
}
</script>
<template>
  <!--
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  -->
  <DemoView
    :show-value="true"
    :show-modal-button="true"
    label="LxMarkdownTextArea"
    :git-link="baseGitUrl + 'MarkdownTextArea.vue'"
  >
    <LxMarkdownTextArea
      id="id"
      v-model="markDownValue"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxLength"
      :disabled="disabled"
      :invalid="invalid"
      :invalidation-message="invalidationMessage"
      :readOnly="toggleHtml"
      :showLinkEditor="showLinkEditorValue"
      :showColorPicker="showColorPickerValue"
      :tooltip="inputTooltip"
      :showPlaceholderPicker="showPlaceholderPicker"
      :dictionary="dictionary"
    >
    </LxMarkdownTextArea>
    <template #value>
      <code>{{ markDownValue }}</code>
    </template>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="inputTooltip" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <div class="lx-row">
            <label>:readOnly</label>
            <LxToggle v-model="toggleHtml" />
          </div>
        </div>
      </LxExpander>
      <LxExpander label="Option props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:showLinkEditor</label>
            <LxToggle v-model="showLinkEditorValue" />
          </div>
          <div class="lx-row">
            <label>:showColorPicker</label>
            <LxToggle v-model="showColorPickerValue" />
          </div>
          <div class="lx-row">
            <label>:showPlaceholderPicker</label>
            <LxToggle v-model="showPlaceholderPicker" />
          </div>
        </div>
      </LxExpander>
      <LxExpander label="Placeholder props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:dictionary</label>
            <lx-button
              @click="editModal.open()"
              kind="secondary"
              label="Edit placeholders"
              icon="open"
            />
            <lx-modal
              ref="editModal"
              label="Vērtību redaktors"
              size="xl"
              button-primary-label="Saglabāt un aizvērt"
              :button-primary-visible="true"
              @primary-action="save(editModal)"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label class="lx-cell lx-cell-s">Value id</label>
                  <label class="lx-cell lx-cell-l">Value name</label>
                  <label class="lx-cell lx-cell-l">Value value</label>
                  <label class="lx-cell lx-cell-l">Value description</label>
                  <label class="lx-cell lx-cell-m">Value displayType</label>
                  <label class="lx-cell lx-cell-l">Delete</label>
                </header>
                <div class="lx-row" v-for="f in dictionary" :key="f.id" title="test">
                  <div class="lx-cell lx-cell-s">
                    <div class="lx-cell lx-cell-l" v-show="isDeleted(f.id)">
                      <p>{{ `Deleted ${f.name}` }}</p>
                    </div>
                    <lx-text-input
                      :id="`title-${f.id}`"
                      v-model="f.id"
                      v-show="!isDeleted(f.id)"
                      :placeholder="f.id.toString()"
                    />
                  </div>
                  <div class="lx-cell lx-cell-l">
                    <lx-text-input
                      :id="`title-${f.name}`"
                      v-model="f.name"
                      v-show="!isDeleted(f.id)"
                      :placeholder="f.name"
                    />
                  </div>
                  <div class="lx-cell lx-cell-l">
                    <lx-text-input
                      :id="`title-${f.value}`"
                      v-model="f.value"
                      v-show="!isDeleted(f.id)"
                      :placeholder="f.value"
                    />
                  </div>
                  <div class="lx-cell lx-cell-l">
                    <lx-text-input
                      :id="`title-${f.description}`"
                      v-model="f.description"
                      v-show="!isDeleted(f.id)"
                      :placeholder="f.description"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m">
                    <LxDropDown :items="dictionaryTypes" v-model="f.displayType" />
                  </div>

                  <div class="lx-cell lx-cell-m" v-show="isDeleted(f.id)">
                    <lx-button
                      :id="f.id"
                      variant="icon-only"
                      kind="ghost"
                      icon="undo"
                      @click="returnItem(f.id)"
                    />
                  </div>
                  <div class="lx-cell lx-cell-m" v-show="!isDeleted(f.id)">
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
                      @click="dictionaryNewItem()"
                    />
                  </div>
                </div>
              </div>
            </lx-modal>
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:rows</label>
            <LxTextInput v-model="rows" />
          </div>
          <div class="lx-row">
            <label>:maxLength</label>
            <LxTextInput v-model="maxLength" />
          </div>
          <dib class="lx-row">
            <label>:placeholder</label>
            <LxTextInput v-model="placeholder" />
          </dib>
        </div>
      </LxExpander>
      <LxExpander v-model="invalidationExpanded" label="Invalidation props" icon="info">
        <div class="lx-form">
          <div class="lx-row">
            <label>:invalid</label>
            <LxToggle v-model="invalid" />
          </div>
          <div class="lx-row">
            <label>:invalidation-message</label>
            <LxTextInput v-model="invalidationMessage" />
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
