<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import {
  LxButton,
  LxDateTimePicker,
  lxStringUtils,
  lxDateUtils,
  LxTextInput,
  LxValuePicker,
  lxFormatUtils,
  LxToggle,
} from '@wntr/lx-ui';

const translate = useI18n();
const viewStore = useViewStore();

const inputAscii = ref('$$$123$%^&*67ŌĀ89asdfĶŪ');
const outputAscii = computed(() => lxStringUtils.foldToAscii(inputAscii.value));

const resultUUID = ref(lxStringUtils.generateUUID());
const inputUrl = ref('https://intra.zzdats.lv/');
const outputUrl = computed(() => lxStringUtils.isUrl(inputUrl.value));
const inputSearchQuery = ref('bugs');
const inputSearchText = ref('Why do programmers prefer dark mode? Because light attracts bugs.');
const outputSearch = computed(() =>
  lxStringUtils.textSearch(inputSearchQuery.value, inputSearchText.value)
);
const inputPhone = ref('+37112345678');
const inputEmail = ref('Paraugs.Paraudzins@zzdats.lv');
const outputPhone = computed(() => lxStringUtils.isPhone(inputPhone.value));
const outputEmail = computed(() => lxStringUtils.isEmail(inputEmail.value));
const inputJoinValues = ref([
  {
    id: 'Es',
    name: 'Es',
  },
  {
    id: 'esmu',
    name: 'esmu',
  },
  {
    id: 'ļoti',
    name: 'ļoti',
  },
  {
    id: 'labs',
    name: 'labs',
  },
  {
    id: 'programmētājs',
    name: 'programmētājs',
  },
]);
const inputJoinValuesSelected = ref([]);
const inputJoinValuesSep = ref(', ');
const outputJoinValues = computed(() =>
  lxStringUtils.joinValues(inputJoinValuesSelected.value, inputJoinValuesSep.value)
);
const inputCutString = ref('Programmētājs');
const inputCutStringCount = ref(4);
const outputCutString = computed(() =>
  lxStringUtils.cutString(inputCutString.value, inputCutStringCount.value)
);
const inputShortenUserName = ref('Paraugs');
const inputShortenUserLastName = ref('Paraudziņš');
const outputShortenUserName = computed(() =>
  lxStringUtils.shortenUserName(inputShortenUserName.value, inputShortenUserLastName.value)
);
const inputGetFileNameFromPath = ref('X:/Paraugs/Faili/Personigi/test.txt');
const outputGetFileNameFromPath = computed(() =>
  lxStringUtils.getFileNameFromPath(inputGetFileNameFromPath.value)
);
const inputCamelToKebab = ref('EsEsmuKamielis');
const outputCamelToKebab = computed(() => lxStringUtils.camelToKebab(inputCamelToKebab.value));
const inputRemoveExtension = ref('test.txt');
const outputRemoveExtension = computed(() =>
  lxStringUtils.removeExtension(inputRemoveExtension.value)
);

const currentDate = new Date();
const currentYear = new Date().getFullYear();
const currentDateForParse = lxDateUtils.formatJSON(currentDate).substring(0, 10);

const inputDateTimeJSON = ref(currentDate);
const outputDateTimeJSON = computed(() => lxDateUtils.formatJSON(inputDateTimeJSON.value));
const inputFormatDate = ref(currentDate);
const outputFormatDate = computed(() => lxDateUtils.formatDate(inputFormatDate.value));
const inputFormatDateTime = ref(currentDate);
const outputFormatDateTime = computed(() => lxDateUtils.formatDateTime(inputFormatDateTime.value));
const inputParseDate = ref(currentDateForParse);
const outputParseDate = computed(() => lxDateUtils.parseDate(inputParseDate.value));

const inputFormatFull = ref(currentDate);
const outputFormatFull = computed(() => lxDateUtils.formatFull(inputFormatFull.value));
const inputIsLeapYear = ref(currentYear);
const outputIsLeapYear = computed(() => lxDateUtils.isLeapYear(inputIsLeapYear.value));

function getUniqueUuid() {
  resultUUID.value = lxStringUtils.generateUUID();
}
onMounted(() => {
  viewStore.goBack = false;
  viewStore.description = translate.t('pages.utility.description');
});

const inputDateValid = ref(currentDate);
const outputDateValid = computed(() => lxDateUtils.isDateValid(inputDateValid.value));
const inputFormatDateJSON = ref('22.05.2022');
const outputFormatDateJSON = computed(() => lxDateUtils.formatDateJSON(inputFormatDateJSON.value));

const inputFormatValueDefault = ref('Paraugs');
const outputFormatValueDefault = computed(() =>
  lxFormatUtils.formatValueDefault(inputFormatValueDefault.value)
);

const inputFormatValueDate = ref(currentDate);
const outputFormatValueDate = computed(() =>
  lxFormatUtils.formatValueDate(inputFormatValueDate.value)
);
const inputFormatValueDateTime = ref(currentDate);
const outputFormatValueDateTime = computed(() =>
  lxFormatUtils.formatValueDateTime(inputFormatValueDateTime.value)
);
const inputFormatValuesArraySelected = ref([]);

function stringToObject(pass) {
  const objectArray = [];
  pass.forEach((x) => objectArray.push({ name: x }));
  return objectArray;
}
const outputFormatValuesArray = computed(() =>
  lxFormatUtils.formatValueArray(stringToObject(inputFormatValuesArraySelected.value))
);
const inputFormatValueBool = ref(false);
const outputFormatValueBool = computed(() =>
  lxFormatUtils.formatValueBool(inputFormatValueBool.value)
);

const inputFormatValues = ref([
  {
    id: 'default',
    name: 'Default',
  },
  {
    id: 'date',
    name: 'Date',
  },
  {
    id: 'dateTime',
    name: 'DateTime',
  },
  {
    id: 'array',
    name: 'Array',
  },
  {
    id: 'bool',
    name: 'Bool',
  },
]);
const inputFormatValuesSelected = ref(['default']);
const inputFormatValuesInput = ref('Paraugs');
const inputFormatValuesInputDate = ref(currentDate);
const inputFormatValuesInputDateTime = ref(currentDate);
const inputFormatValuesInputBool = ref(false);
const inputFormatValuesInputDefault = ref('Paraugs');
const dict = ref({ yes: 'Jā', no: 'Nē' });

const outputFormatValue1 = computed(() =>
  lxFormatUtils.formatValue(inputFormatValuesInputDate.value, inputFormatValuesSelected.value[0])
);
const outputFormatValue2 = computed(() =>
  lxFormatUtils.formatValue(
    inputFormatValuesInputDateTime.value,
    inputFormatValuesSelected.value[0]
  )
);
const inputFormatValuesInputArraySelected = ref([]);
const outputFormatValue3 = computed(() =>
  lxFormatUtils.formatValue(
    stringToObject(inputFormatValuesInputArraySelected.value),
    inputFormatValuesSelected.value[0]
  )
);
const outputFormatValue4 = computed(() =>
  lxFormatUtils.formatValue(inputFormatValuesInputBool.value, inputFormatValuesSelected.value[0])
);
const outputFormatValue5 = computed(() =>
  lxFormatUtils.formatValue(inputFormatValuesInputDefault.value, inputFormatValuesSelected.value[0])
);
const inputFormatFieldName = ref('Field Name');
const outputFormatFieldName = computed(() =>
  lxFormatUtils.formatFieldName(inputFormatFieldName.value)
);
const inputFormatUrl = ref('www.google.com');
const outputFormatUrl = computed(() => lxFormatUtils.formatUrl(inputFormatUrl.value));
</script>
<template>
  <div class="lx-form lx-form-2">
    <h2>lxStringUtils</h2>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>foldToAscii</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputAscii"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputAscii }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>generateUUID</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <lx-button label="Ģenerēt UUID" icon="next" @click="getUniqueUuid()" />
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ resultUUID }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>isUrl</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputUrl"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputUrl }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>textSearch</h4>
          <label>{{ translate.t('pages.utility.query') }} </label>
          <input class="lx-text-input" v-model="inputSearchQuery" />
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.text') }} </label>
          <input class="lx-text-input" v-model="inputSearchText" />
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputSearch }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>isPhone</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputPhone"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputPhone }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>isEmail</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputEmail"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputEmail }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>joinValues</h4>
          <label>{{ translate.t('pages.utility.cutString') }} </label>
          <LxValuePicker
            :items="inputJoinValues"
            v-model="inputJoinValuesSelected"
            kind="multiple"
            variant="dropdown"
          ></LxValuePicker>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.joinValuesSep') }} </label>
          <LxTextInput v-model="inputJoinValuesSep"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputJoinValues }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>cutString</h4>
          <label>{{ translate.t('pages.utility.cutString') }} </label>
          <LxTextInput v-model="inputCutString"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.cutStringCount') }} </label>
          <LxTextInput v-model="inputCutStringCount"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputCutString }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>shortenUserName</h4>
          <label>{{ translate.t('pages.utility.shortenUserNameFirst') }} </label>
          <LxTextInput v-model="inputShortenUserName"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.shortenUserNameLast') }} </label>
          <LxTextInput v-model="inputShortenUserLastName"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputShortenUserName }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>getFileNameFromPath</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputGetFileNameFromPath"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputGetFileNameFromPath }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>camelToKebab</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputCamelToKebab"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputCamelToKebab }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>removeExtension</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputRemoveExtension"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputRemoveExtension }}</code>
        </div>
      </div>
    </div>
    <h2>lxDateUtils</h2>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatJSON</h4>
          <label class="lx-label" for="date-time-picker">{{
            translate.t('pages.utility.input')
          }}</label>
          <lx-date-time-picker id="date-time-picker" v-model="inputDateTimeJSON" kind="dateTime" />
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputDateTimeJSON }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatDate</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <lx-date-time-picker id="date-time-picker" v-model="inputFormatDate" kind="date" />
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatDate }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>parseDate</h4>
          <label class="lx-label" for="date-time-picker">{{
            translate.t('pages.utility.input')
          }}</label>
          <LxTextInput v-model="inputParseDate"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code :class="[{ wrong: Number.isNaN(outputParseDate) }]">{{ outputParseDate }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatDateTime</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <lx-date-time-picker
            id="date-time-picker"
            v-model="inputFormatDateTime"
            kind="dateTime"
          />
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatDateTime }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatFull</h4>
          <label class="lx-label" for="date-time-picker">{{
            translate.t('pages.utility.input')
          }}</label>
          <lx-date-time-picker id="date-time-picker" v-model="inputFormatFull" kind="dateTime" />
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatFull }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>isLeapYear</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput mask="integer" v-model="inputIsLeapYear"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputIsLeapYear }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>isDateValid</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <lx-date-time-picker id="date-time-picker" v-model="inputDateValid"></lx-date-time-picker>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputDateValid }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatDateJSON</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputFormatDateJSON"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatDateJSON }}</code>
        </div>
      </div>
    </div>
    <h2>lxFormatUtils</h2>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatValue</h4>
          <label>{{ translate.t('pages.utility.inputType') }} </label>
          <LxValuePicker
            :items="inputFormatValues"
            v-model="inputFormatValuesSelected"
            kind="single"
            variant="dropdown"
          ></LxValuePicker>
        </div>
        <div class="lx-row" v-if="inputFormatValuesSelected[0] === 'date'">
          <label>{{ translate.t('pages.utility.input') }} </label>
          <lx-date-time-picker v-model="inputFormatValuesInputDate"></lx-date-time-picker>
        </div>
        <div class="lx-row" v-if="inputFormatValuesSelected[0] === 'date'">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValue1 }}</code>
        </div>
        <div class="lx-row" v-else-if="inputFormatValuesSelected[0] === 'dateTime'">
          <label>{{ translate.t('pages.utility.input') }} </label>
          <lx-date-time-picker
            id="date-time-picker"
            v-model="inputFormatValuesInputDateTime"
            kind="dateTime"
          ></lx-date-time-picker>
        </div>
        <div class="lx-row" v-if="inputFormatValuesSelected[0] === 'dateTime'">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValue2 }}</code>
        </div>
        <div class="lx-row" v-else-if="inputFormatValuesSelected[0] === 'array'">
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxValuePicker
            :items="inputJoinValues"
            v-model="inputFormatValuesInputArraySelected"
            kind="multiple"
            variant="dropdown"
          ></LxValuePicker>
        </div>
        <div class="lx-row" v-if="inputFormatValuesSelected[0] === 'array'">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValue3 }}</code>
        </div>
        <div class="lx-row" v-else-if="inputFormatValuesSelected[0] === 'bool'">
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxToggle v-model="inputFormatValuesInputBool"></LxToggle>
        </div>
        <div class="lx-row" v-if="inputFormatValuesSelected[0] === 'bool'">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValue4 }}</code>
        </div>
        <div class="lx-row" v-else-if="inputFormatValuesSelected[0] === 'default'">
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputFormatValuesInputDefault"></LxTextInput>
        </div>
        <div class="lx-row" v-if="inputFormatValuesSelected[0] === 'default'">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValue5 }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatValueDefault</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputFormatValueDefault"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValueDefault }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatValueDate</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <lx-date-time-picker v-model="inputFormatValueDate"></lx-date-time-picker>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValueDate }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatValueDateTime</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <lx-date-time-picker
            id="date-time-picker"
            kind="dateTime"
            v-model="inputFormatValueDateTime"
          ></lx-date-time-picker>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValueDateTime }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatValueArray</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxValuePicker
            :items="inputJoinValues"
            v-model="inputFormatValuesArraySelected"
            kind="multiple"
            variant="dropdown"
          ></LxValuePicker>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValuesArray }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatValueBool</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxToggle v-model="inputFormatValueBool"></LxToggle>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatValueBool }}</code>
        </div>
      </div>
    </div>

    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatFieldName</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputFormatFieldName"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatFieldName }}</code>
        </div>
      </div>
    </div>
    <div class="lx-column">
      <div class="lx-form lx-form-region">
        <div class="lx-row">
          <h4>formatUrl</h4>
          <label>{{ translate.t('pages.utility.input') }} </label>
          <LxTextInput v-model="inputFormatUrl"></LxTextInput>
        </div>
        <div class="lx-row">
          <label>{{ translate.t('pages.utility.answer') }} </label>
          <code>{{ outputFormatUrl }}</code>
        </div>
      </div>
    </div>
  </div>
</template>
