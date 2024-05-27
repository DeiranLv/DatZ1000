<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxDateTimePicker,
  LxValuePicker,
  LxExpander,
  lxDateUtils,
  LxDateTimeRange,
  LxRow,
} from '@wntr/lx-ui';

const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.dateTimeRange.description');
});

const kinds = [
  {
    id: 'date',
    name: 'date',
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

const selectedKindId = ref('date');

const placeholder = ref(currentDate.toString());
const tooltip = ref('Kāds tagad ir gads? 0_о');
const minDate = ref('1970-01-01');
const maxDate = ref('2100-01-01');
const required = ref(false);
const readOnly = ref(false);
const disabled = ref(false);
const invalid = ref(false);
const invalidationMessage = ref('Kļūda!');

const texts = ref({
  clear: 'Notīrīt',
  clearButton: 'Notīrīt vērtības',
  todayButton: 'Atgriezties uz šodienu',
});
const propExpander = ref(false);
const invalidationExpanded = ref(false);
const propAdditionalExpander = ref(false);
const localeExpanded = ref(false);

const startDate = ref(lxDateUtils.formatDateJSON(new Date()));
const endDate = ref(lxDateUtils.formatDateJSON(new Date(2023, 7, 22)));
const start = ref();
const refDf = ref();

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

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <DemoView
    :show-value="false"
    label="LxDateTimeRange"
    :git-link="baseGitUrl + 'DateTimeRange.vue'"
  >
    <div class="lx-region">
      <LxDateTimeRange
        ref="refDf"
        v-model:start-date="startDate"
        v-model:end-date="endDate"
        :kind="selectedKindId"
        :placeholder="placeholder"
        :tooltip="tooltip"
        :min-date="minDate"
        :max-date="maxDate"
        :required="required"
        :read-only="readOnly"
        :disabled="disabled"
        :invalid="invalid"
        :invalidation-message="invalidationMessage"
        :texts="texts"
        :locale="localeValueObj"
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
            <label>:texts.clearButton</label>
            <LxTextInput v-model="texts.clearButton" />
          </div>
          <div class="lx-row">
            <label>:texts.todayButton</label>
            <LxTextInput v-model="texts.todayButton" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:min-date</label>
            <LxDateTimePicker v-model="minDate" />
          </div>
          <div class="lx-row">
            <label>:max-date</label>
            <LxDateTimePicker v-model="maxDate" />
          </div>
          <template v-if="selectedKindId === 'date'">
            <div class="lx-row">
              <label>:start-date</label>
              <LxDateTimePicker v-model="startDate" ref="start" />
            </div>
            <div class="lx-row">
              <label>:end-date</label>
              <LxDateTimePicker v-model="endDate" />
            </div>
          </template>
          <div class="lx-row">
            <label>:required</label>
            <LxToggle v-model="required" />
          </div>
          <div class="lx-row">
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
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
  </DemoView>
</template>
