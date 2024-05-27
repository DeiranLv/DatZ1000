<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxDateTimePicker,
  LxValuePicker,
  LxExpander,
  LxContentSwitcher,
  lxDateUtils,
  LxRow,
  LxButton,
  LxModal,
  LxAppendableList,
} from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.dateTimePicker.description');
});

const kinds = [
  {
    id: 'date',
    name: 'date',
  },
  {
    id: 'time',
    name: 'time',
  },
  {
    id: 'date-time',
    name: 'date-time',
  },
  {
    id: 'month',
    name: 'month',
  },
  {
    id: 'year',
    name: 'year',
  },
  {
    id: 'month-year',
    name: 'month-year',
  },
  {
    id: 'quarters',
    name: 'quarters',
  },
];
const currentDate = new Date();
const data = ref(currentDate);
const minDate = ref(new Date());
const maxDate = ref(new Date());
const selectedKindId = ref('date');

const placeholder = ref(lxDateUtils.formatDate(currentDate));
const tooltip = ref('Kāds tagad ir gads? 0_o');
minDate.value.setDate(minDate.value.getDate() - 1);
maxDate.value.setDate(maxDate.value.getDate() + 1);

const required = ref(false);
const readOnly = ref(false);
const disabled = ref(false);
const invalid = ref(false);
const invalidationMessage = ref('Kļūda!');

const texts = ref({ clear: 'Notīrīt', todayButton: 'Šodiena', clearButton: 'Attīrīt vērtību' });
const propExpander = ref(false);
const invalidationExpanded = ref(false);
const propAdditionalExpander = ref(false);
const localeExpanded = ref(false);

const localeItems = [
  {
    id: 'lv-LV',
    name: 'lv-LV',
  },
  {
    id: 'en-EN',
    name: 'en-EN',
  },
  {
    id: 'fr-FR',
    name: 'fr-FR',
  },
  {
    id: 'es-ES',
    name: 'es-ES',
  },
  {
    id: 'lt-LT',
    name: 'lt-LT',
  },
];

const localeValue = ref('lv-LV');
const firstDayOfTheWeekValue = ref(2);
const inputDateTime24hrValue = ref('DD.MM.YYYY HH:mm');
const masksInputValue = ref('DD.MM.YYYY');
const inputTime24hrValue = ref('HH:mm');

const localeValueObj = ref({
  locale: localeValue,
  firstDayOfTheWeek: firstDayOfTheWeekValue,
  masks: {
    inputDateTime24hr: inputDateTime24hrValue,
    input: masksInputValue,
    inputTime24hr: inputTime24hrValue,
  },
});

const variant = ref('default');
const variantItems = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'picker',
    name: 'picker',
  },
  {
    id: 'full',
    name: 'full',
  },
  {
    id: 'full-rows',
    name: 'full-rows',
  },
  {
    id: 'full-columns',
    name: 'full-columns',
  },
];
const realDates = ref([]);
const specialDates = ref([
  { category: 'one', dates: ['2023-12-12', '2023-12-13', '2023-12-14'] },
  { category: 'two', dates: ['2023-12-14', '2023-12-16'] },
  { category: 'three', dates: ['2023-12-14', '2023-12-16'] },
]);
const dictionary = ref([
  { id: 'one', name: 'LX standup', displayType: 'blue' },
  { id: 'two', name: 'LX/UI new release', displayType: 'red-full' },
  { id: 'three', name: 'LX lecture', displayType: 'black' },
]);

const specialModal = ref();
const dictionaryModal = ref();
function openSpecialModal() {
  specialModal.value.open();
}
function closeSpecialModal() {
  specialModal.value.close();
}
function openDictionaryModal() {
  dictionaryModal.value.open();
}
function closeDictionaryModal() {
  dictionaryModal.value.close();
}

function getSurroundingDates() {
  const today = new Date();
  const datesArray = [];

  for (let i = -2; i <= 2; i++) {
    const newDate = new Date();
    newDate.setDate(today.getDate() + i);
    const dateString = newDate.toISOString().slice(0, 10);
    const obj = {
      id: dateString,
      name: dateString,
    };
    datesArray.push(obj);
  }

  return datesArray;
}

const displayTypes = [
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
];

const clearIfNotExact = ref(false);

const routerValue = ref('');
const itemsNav = [
  { id: '', name: 'Smilškaste' },
  { id: 'guidelines', name: 'Vadlīnijas' },
];
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'dateTimePickerGuidelines' });
  }
}

const demoViewSize = computed(() => (variant.value === 'default' ? 's' : 'm'));

onMounted(() => {
  realDates.value = getSurroundingDates();
  specialDates.value[0].dates = [realDates.value[0].id, realDates.value[1].id];
  specialDates.value[1].dates = [realDates.value[1].id, realDates.value[2].id];
  specialDates.value[2].dates = [realDates.value[2].id, realDates.value[4].id];
});

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  <DemoView
    :kind="demoViewSize"
    :show-value="true"
    label="LxDateTimePicker"
    :git-link="baseGitUrl + 'DateTimePicker.vue'"
  >
    <div class="lx-region">
      <LxDateTimePicker
        v-model="data"
        :kind="selectedKindId"
        :placeholder="placeholder"
        :tooltip="tooltip"
        :min-date="lxDateUtils.formatJSON(minDate)"
        :max-date="lxDateUtils.formatJSON(maxDate)"
        :required="required"
        :read-only="readOnly"
        :disabled="disabled"
        :invalid="invalid"
        :invalidation-message="invalidationMessage"
        :texts="texts"
        :locale="localeValueObj"
        :variant="variant"
        :specialDates="specialDates"
        :dictionary="dictionary"
        :clear-if-not-exact="clearIfNotExact"
      />
    </div>

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:placeholder</label>
            <LxTextInput v-model="placeholder" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="kinds" id="id" v-model="selectedKindId" />
          </div>
          <div class="lx-row">
            <label>:read-only</label>
            <LxToggle v-model="readOnly" />
          </div>
          <div class="lx-row">
            <label>:tooltip</label>
            <LxTextInput v-model="tooltip" />
          </div>
          <div class="lx-row">
            <label>:texts.clear</label>
            <LxTextInput v-model="texts.clear" />
          </div>
          <div class="lx-row">
            <label>:texts.todayButton</label>
            <LxTextInput v-model="texts.todayButton" />
          </div>
          <div class="lx-row">
            <label>:texts.clearButton</label>
            <LxTextInput v-model="texts.clearButton" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:min-date</label>
            <LxDateTimePicker v-model="minDate" kind="dateTime" />
          </div>
          <div class="lx-row">
            <label>:max-date</label>
            <LxDateTimePicker v-model="maxDate" kind="dateTime" />
          </div>

          <div class="lx-row">
            <label>:required</label>
            <LxToggle v-model="required" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>
          <div class="lx-row">
            <label>:variant</label>
            <LxValuePicker :items="variantItems" v-model="variant" />
          </div>
          <div class="lx-row">
            <label>:clearIfNotExact</label>
            <LxToggle v-model="clearIfNotExact" />
          </div>
          <div class="lx-row">
            <label>:specialDates</label>
            <LxButton label="Edit specialDates" @click="openSpecialModal()" kind="secondary" />
            <LxModal
              ref="specialModal"
              @primary-action="closeSpecialModal()"
              button-primary-label="Aizvērt"
              :button-primary-visible="true"
              label="specialDates prop"
            >
              <LxAppendableList v-model="specialDates" :column-count="2">
                <template #customItem="{ item }">
                  <LxRow label="category">
                    <LxTextInput v-model="item.category" />
                  </LxRow>
                  <LxRow label="dates">
                    <LxValuePicker
                      v-model="item.dates"
                      kind="multiple"
                      :items="realDates"
                      variant="dropdown"
                    />
                  </LxRow>
                </template>
              </LxAppendableList>
            </LxModal>
          </div>
          <div class="lx-row">
            <label>:dictionary</label>
            <LxButton label="Edit dictionary" @click="openDictionaryModal()" kind="secondary" />
            <LxModal
              ref="dictionaryModal"
              @primary-action="closeDictionaryModal()"
              button-primary-label="Aizvērt"
              :button-primary-visible="true"
              size="m"
              label="dictionary prop"
            >
              <LxAppendableList v-model="dictionary" :column-count="3">
                <template #customItem="{ item }">
                  <LxRow label="id">
                    <LxTextInput v-model="item.id" />
                  </LxRow>
                  <LxRow label="name">
                    <LxTextInput v-model="item.name" />
                  </LxRow>
                  <LxRow label="displayType">
                    <LxValuePicker
                      v-model="item.displayType"
                      :items="displayTypes"
                      variant="dropdown"
                    />
                  </LxRow>
                </template>
              </LxAppendableList>
            </LxModal>
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="localeExpanded" label="Locale prop" icon="config">
        <div class="lx-form">
          <LxRow label=":locale.locale">
            <template #info> These are just few examples. More options are available </template>
            <LxValuePicker :items="localeItems" v-model="localeValue" variant="dropdown" />
          </LxRow>
          <div class="lx-row">
            <label>:locale.firstDayOfTheWeek </label>
            <LxTextInput v-model="firstDayOfTheWeekValue" mask="integer" :convertToString="false" />
          </div>
          <LxRow label=":locale.masks.input">
            <template #info>
              More than one mask can be chosen, but for Demo purposes it is limited to just one
            </template>
            <LxTextInput v-model="masksInputValue" />
          </LxRow>
          <LxRow label=":locale.masks.inputTime24hr">
            <LxTextInput v-model="inputTime24hrValue" />
          </LxRow>
          <LxRow label=":locale.masks.inputDateTime24hr">
            <template #info>
              More than one mask can be chosen, but for Demo purposes it is limited to just one
            </template>
            <LxTextInput v-model="inputDateTime24hrValue" />
          </LxRow>
        </div>
      </LxExpander>
      <LxExpander v-model="invalidationExpanded" label="Invalidation props" icon="info">
        <div class="lx-form">
          <div class="lx-row">
            <label>:invalid</label>
            <LxToggle v-model="invalid" />
          </div>
          <div class="lx-row">
            <label>:invalidation-message </label>
            <LxTextInput v-model="invalidationMessage" />
          </div>
        </div>
      </LxExpander>
    </template>
    <template #value>
      <code>{{ JSON.stringify(data) }}</code>
    </template>
  </DemoView>
</template>
