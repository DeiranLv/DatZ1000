<script setup lang="ts">
import { ref, onMounted, shallowRef, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  LxList,
  LxButton,
  LxSearchableText,
  LxContentSwitcher,
  LxWidget,
  lxStringUtils,
} from '@wntr/lx-ui';

import useViewStore from '@/stores/useViewStore';
import { useDemoStore } from '@/stores/useDemoStore';
import useNotifyStore from '@/stores/useNotifyStore';

import WizardWidget from '@/components/WizardWidget.vue';

const demoStore = useDemoStore();
const viewStore = useViewStore();
const { t } = useI18n();
const notificationStore = useNotifyStore();

const searchString = ref();
const selectedVariant = shallowRef('usage');

const usageGroupDefinitions = ref([
  { id: 'featured', name: 'Svarīgākās komponentes', expanded: true },
  { id: 'inputs', name: 'Ievadlauki', expanded: true },
  { id: 'buttons', name: 'Pogas', expanded: true },
  { id: 'lists', name: 'Saraksti', expanded: true },
  { id: 'containers', name: 'Konteineri', expanded: true },
  { id: 'indicators', name: 'Attēlotāji', expanded: true },
]);

const hierarchyGroupDefinitions = ref([
  { id: 'simple', name: 'Vienkāršas komponentes', expanded: true },
  { id: 'combined', name: 'Saliktas komponentes', expanded: true },
]);

const usageItems = ref([
  {
    code: 'textInput',
    name: 'LxTextInput',
    description: 'Teksta ievadlauks',
    href: { name: 'textInput' },
    icon: 'next',
    group: 'featured',
  },
  {
    code: 'textInputClone',
    name: 'LxTextInput',
    description: 'Teksta ievadlauks',
    href: { name: 'textInput' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'textArea',
    name: 'LxTextArea',
    description: 'Vairākrindu teksta ievadlauks',
    href: { name: 'textArea' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'markdownTextArea',
    name: 'LxMarkdownTextArea',
    description: 'Formatētā teksta ievadlauks',
    href: { name: 'markdownTextArea' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'dateTimePicker',
    name: 'LxDateTimePicker',
    description: 'Datuma un laika izvēlne',
    href: { name: 'dateTimePicker' },
    icon: 'next',
    group: 'featured',
  },
  {
    code: 'dateTimePickerClone',
    name: 'LxDateTimePicker',
    description: 'Datuma un laika izvēlne',
    href: { name: 'dateTimePicker' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'dateTimeRange',
    name: 'LxDateTimeRange',
    description: 'Datuma un laika perioda izvēlne',
    href: { name: 'dateTimeRange' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'button',
    name: 'LxButton',
    description: 'Poga',
    href: { name: 'button' },
    icon: 'next',
    group: 'featured',
  },

  {
    code: 'dropDown',
    name: 'LxDropDown',
    description: 'Izkrītošā izvēlne',
    href: { name: 'dropDown' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'autoComplete',
    name: 'LxAutoComplete',
    description: 'Izvēlne ar meklēšanas iespēju',
    href: { name: 'autoComplete' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'modal',
    name: 'LxModal',
    description: 'Modālais dialogs',
    href: { name: 'modal' },
    icon: 'next',
    group: 'containers',
  },

  {
    code: 'valuePicker',
    name: 'LxValuePicker',
    description: 'Vienas vai vairāku vērtību izvēle no saraksta',
    href: { name: 'valuePicker' },
    icon: 'next',
    group: 'featured',
  },
  {
    code: 'valuePickerClone',
    name: 'LxValuePicker',
    description: 'Vienas vai vairāku vērtību izvēle no saraksta',
    href: { name: 'valuePicker' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'checkbox',
    name: 'LxCheckbox',
    description: 'Izvēles rūtiņa',
    href: { name: 'checkbox' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'radioButton',
    name: 'LxRadioButton',
    description: 'Radio poga',
    href: { name: 'radioButton' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'contentSwitcher',
    name: 'LxContentSwitcher',
    description: 'Segmentētā izvēlne',
    href: { name: 'contentSwitcher' },
    icon: 'next',
    group: 'inputs',
  },

  // LxList
  {
    code: 'list',
    name: 'LxList',
    description: 'Saraksta attēlošana',
    href: { name: 'list' },
    icon: 'next',
    group: 'featured',
  },
  {
    code: 'listClone',
    name: 'LxList',
    description: 'Saraksta attēlotājs',
    href: { name: 'list' },
    icon: 'next',
    group: 'lists',
  },
  {
    code: 'dataGrid',
    name: 'LxDataGrid',
    description: 'Saraksta attēlotājs tabulas veidā',
    href: { name: 'dataGrid' },
    icon: 'next',
    group: 'lists',
  },
  {
    code: 'filters',
    name: 'LxFilters',
    description: 'Filtru konteiners',
    href: { name: 'filters' },
    icon: 'next',
    group: 'containers',
  },
  {
    code: 'infoWrapper',
    name: 'LxInfoWrapper',
    description: 'Paskaidre',
    href: { name: 'infoWrapper' },
    icon: 'next',
    group: 'containers',
  },
  {
    code: 'masterDetail',
    name: 'LxMasterDetail',
    description: 'Divu līmeņu izvēlne',
    href: { name: 'masterDetail' },
    icon: 'next',
    group: 'containers',
  },
  {
    code: 'numberSlider',
    name: 'LxNumberSlider',
    description: 'Skaitļu izvēlne',
    href: { name: 'numberSlider' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'steps',
    name: 'LxSteps',
    description: 'Soļu progresa indikators',
    href: { name: 'steps' },
    icon: 'next',
    group: 'indicators',
  },

  {
    code: 'expander',
    name: 'LxExpander',
    description: 'Savēršamais konteiners',
    href: { name: 'expander' },
    icon: 'next',
    group: 'containers',
  },
  {
    code: 'flag',
    name: 'LxFlag',
    description: 'Valsts karoga attēlotājs',
    href: { name: 'flag' },
    icon: 'next',
    group: 'indicators',
  },
  {
    code: 'stateDisplay',
    name: 'LxStateDisplay',
    description: 'Statusu attēlotājs',
    href: { name: 'stateDisplay' },
    icon: 'next',
    group: 'indicators',
  },
  {
    code: 'personDisplay',
    name: 'LxPersonDisplay',
    description: 'Personas attēlotājs',
    href: { name: 'personDisplay' },
    icon: 'next',
    group: 'indicators',
  },
  {
    code: 'icon',
    name: 'LxIcon',
    description: 'Ikonas attēlotājs',
    href: { name: 'icon' },
    icon: 'next',
    group: 'indicators',
  },
  {
    code: 'rating',
    name: 'LxRatings',
    description: 'Vērtējuma izvēlne',
    href: null,
    icon: 'next',
    group: 'input',
  },
  {
    code: 'toggle',
    name: 'LxToggle',
    description: 'Slēdzis. Binārās vērtības izvēlne',
    href: { name: 'toggle' },
    icon: 'next',
    group: 'featured',
  },
  {
    code: 'toggleClone',
    name: 'LxToggle',
    description: 'Slēdzis. Binārās vērtības izvēlne',
    href: { name: 'toggle' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'dropDownMenu',
    name: 'LxDropDownMenu',
    description: 'Izkrītošais konteiners',
    href: { name: 'dropDownMenu' },
    icon: 'next',
    group: 'containers',
  },
  {
    code: 'dataBlock',
    name: 'LxDataBlock',
    description: 'Objekta attēlotājs',
    href: { name: 'dataBlock' },
    icon: 'next',
    group: 'indicators',
  },
  {
    code: 'errorPage',
    name: 'LxErrorPage',
    description: 'Kļūdu lapas attēlotājs',
    href: { name: 'errorPage' },
    icon: 'next',
    group: 'indicators',
  },

  {
    code: 'appendableList',
    name: 'LxAppendableList',
    description: 'Elementu pievienotājs sarakstam',
    href: { name: 'appendableList' },
    icon: 'next',
    group: 'containers',
  },
  {
    code: 'map',
    name: 'LxMap',
    description: 'Ģeogrāfiskā karte',
    href: { name: 'map' },
    icon: 'next',
    group: 'indicators',
  },
  {
    code: 'loader',
    name: 'LxLoader',
    description: 'Loaderis',
    href: { name: 'loader' },
    icon: 'next',
    group: 'indicators',
  },
  {
    code: 'qr',
    name: 'LxQrScanner',
    description: 'QR kodu skenētājs',
    href: { name: 'qrScanner' },
    icon: 'next',
    group: 'inputs',
  },
  {
    code: 'fileUploader',
    name: 'LxFileUploader',
    description: 'Datņu augšupielādes komponente',
    href: { name: 'fileUploader' },
    icon: 'next',
    group: 'inputs',
  },
]);

const hierarchyItems = ref([
  {
    code: 'textInput',
    name: 'LxTextInput',
    description: 'Teksta ievadlauks',
    href: { name: 'textInput' },
    icon: 'next',
    group: 'simple',
    title: 'Teksta ievadlauka attēlošanai',
  },
  {
    code: 'textArea',
    name: 'LxTextArea',
    description: 'Vairākrindu teksta ievadlauks',
    href: { name: 'textArea' },
    icon: 'next',
    group: 'simple',
    title: 'Vairākrindu teksta ievadlauka attēlošanai',
  },
  {
    code: 'markdownTextArea',
    name: 'LxMarkdownTextArea',
    description: 'Formatētā teksta ievadlauks',
    href: { name: 'markdownTextArea' },
    icon: 'next',
    group: 'simple',
    title: 'Formatētā teksta ievadlauka attēlošanai',
  },
  {
    code: 'dateTimePicker',
    name: 'LxDateTimePicker',
    description: 'Datuma un laika izvēlne',
    href: { name: 'dateTimePicker' },
    icon: 'next',
    group: 'simple',
    title: 'Datuma un laika izvēlnes attēlošanai',
  },

  {
    code: 'dateTimeRange',
    name: 'LxDateTimeRange',
    description: 'Datuma un laika perioda izvēlne',
    href: { name: 'dateTimeRange' },
    icon: 'next',
    group: 'combined',
    title: 'Datuma un laika perioda izvēlnes attēlošanai',
  },
  {
    code: 'button',
    name: 'LxButton',
    description: 'Poga',
    href: { name: 'button' },
    icon: 'next',
    group: 'simple',
    title: 'Pogas attēlošanai',
  },

  {
    code: 'dropDown',
    name: 'LxDropDown',
    description: 'Izkrītošā izvēlne',
    href: { name: 'dropDown' },
    icon: 'next',
    group: 'simple',
    title: 'Izkrītošās izvēlnes attēlošanai',
  },
  {
    code: 'autoComplete',
    name: 'LxAutoComplete',
    description: 'Izvēlne ar meklēšanas iespēju',
    href: { name: 'autoComplete' },
    icon: 'next',
    group: 'simple',
    title: 'Izvēlnei ar meklēšanas iespēju',
  },
  {
    code: 'modal',
    name: 'LxModal',
    description: 'Modālais dialogs',
    href: { name: 'modal' },
    icon: 'next',
    group: 'combined',
    title: 'Modāla dialoga attēlošanai',
  },
  {
    code: 'valuePicker',
    name: 'LxValuePicker',
    description: 'Vienas vai vairāku vērtību izvēle no saraksta',
    href: { name: 'valuePicker' },
    icon: 'next',
    group: 'combined',
    title: 'Vienas vai vairāku vērtību izvēlnes attēlošanai',
  },
  {
    code: 'checkbox',
    name: 'LxCheckbox',
    description: 'Izvēles rūtiņa',
    href: { name: 'checkbox' },
    icon: 'next',
    group: 'simple',
    title: 'Izvēles rūtiņas attēlošanai',
  },
  {
    code: 'radioButton',
    name: 'LxRadioButton',
    description: 'Radio poga',
    href: { name: 'radioButton' },
    icon: 'next',
    group: 'simple',
    title: 'Radio pogas attēlošanai',
  },
  {
    code: 'contentSwitcher',
    name: 'LxContentSwitcher',
    description: 'Segmentētā izvēlne',
    href: { name: 'contentSwitcher' },
    icon: 'next',
    group: 'simple',
    title: 'Segmentētās izvēlnes attēlošanai',
  },
  {
    code: 'list',
    name: 'LxList',
    description: 'Saraksta attēlošana',
    href: { name: 'list' },
    icon: 'next',
    group: 'combined',
    title: 'Saraksta attēlošanai',
  },
  {
    code: 'dataGrid',
    name: 'LxDataGrid',
    description: 'Saraksta attēlotājs tabulas veidā',
    href: { name: 'dataGrid' },
    icon: 'next',
    group: 'combined',
    title: 'Saraksta attēlošanai tabulas veidā',
  },
  {
    code: 'filters',
    name: 'LxFilters',
    description: 'Filtru konteiners',
    href: { name: 'filters' },
    icon: 'next',
    group: 'combined',
    title: 'Filtru konteinera attēlošanai',
  },
  {
    code: 'infoWrapper',
    name: 'LxInfoWrapper',
    description: 'Paskaidre',
    href: { name: 'infoWrapper' },
    icon: 'next',
    group: 'combined',
    title: 'Paskaidres attēlošanai',
  },
  {
    code: 'masterDetail',
    name: 'LxMasterDetail',
    description: 'Divu līmeņu izvēlne',
    href: { name: 'masterDetail' },
    icon: 'next',
    group: 'combined',
    title: 'Divu līmeņu izvēlnes attēlošanai',
  },
  {
    code: 'numberSlider',
    name: 'LxNumberSlider',
    description: 'Skaitļu izvēlne',
    href: { name: 'numberSlider' },
    icon: 'next',
    group: 'simple',
    title: 'Skaitļu izvēlnes attēlošanai',
  },
  {
    code: 'steps',
    name: 'LxSteps',
    description: 'Soļu progresa indikators',
    href: { name: 'steps' },
    icon: 'next',
    group: 'combined',
    title: 'Soļu progresa indikatora attēlošanai',
  },
  {
    code: 'expander',
    name: 'LxExpander',
    description: 'Savēršamais konteiners',
    href: { name: 'expander' },
    icon: 'next',
    group: 'combined',
    title: 'Savēršama konteinera attēlošanai',
  },
  {
    code: 'flag',
    name: 'LxFlag',
    description: 'Valsts karoga attēlotājs',
    href: { name: 'flag' },
    icon: 'next',
    group: 'combined',
    title: 'Valsts karoga attēlošanai',
  },
  {
    code: 'stateDisplay',
    name: 'LxStateDisplay',
    description: 'Statusu attēlotājs',
    href: { name: 'stateDisplay' },
    icon: 'next',
    group: 'combined',
    title: 'Statusa attēlošanai',
  },
  {
    code: 'personDisplay',
    name: 'LxPersonDisplay',
    description: 'Personas attēlotājs',
    href: { name: 'personDisplay' },
    icon: 'next',
    group: 'combined',
    title: 'Personas attēlošanai',
  },
  {
    code: 'icon',
    name: 'LxIcon',
    description: 'Ikonas attēlotājs',
    href: { name: 'icon' },
    icon: 'next',
    group: 'combined',
    title: 'Ikonas attēlošanai',
  },
  {
    code: 'toggle',
    name: 'LxToggle',
    description: 'Slēdzis. Binārās vērtības izvēlne',
    href: { name: 'toggle' },
    icon: 'next',
    group: 'simple',
    title: 'Slēdža attēlošanai',
  },
  {
    code: 'dropDownMenu',
    name: 'LxDropDownMenu',
    description: 'Izkrītošais konteiners',
    href: { name: 'dropDownMenu' },
    icon: 'next',
    group: 'combined',
    title: 'Izkrītoša konteinera attēlošanai',
  },
  {
    code: 'dataBlock',
    name: 'LxDataBlock',
    description: 'Objekta attēlotājs',
    href: { name: 'dataBlock' },
    icon: 'next',
    group: 'combined',
    title: 'Objekta attēlošanai',
  },
  {
    code: 'errorPage',
    name: 'LxErrorPage',
    description: 'Kļūdu lapas attēlotājs',
    href: { name: 'errorPage' },
    icon: 'next',
    group: 'combined',
    title: 'Kļūdu lapas attēlošanai',
  },

  {
    code: 'appendableList',
    name: 'LxAppendableList',
    description: 'Elementu pievienotājs sarakstam',
    href: { name: 'appendableList' },
    icon: 'next',
    group: 'combined',
    title: 'Elementu apvienošanai sarakstiem',
  },
  {
    code: 'map',
    name: 'LxMap',
    description: 'Ģeogrāfiskā karte',
    href: { name: 'map' },
    icon: 'next',
    group: 'combined',
    title: 'Ģeogrāfiskās kartes attēlošanai',
  },
  {
    code: 'loader',
    name: 'LxLoader',
    description: 'Loaderis',
    href: { name: 'loader' },
    icon: 'next',
    group: 'combined',
    title: 'Ielādes stāvokļa attēlošanai',
  },
  {
    code: 'qr',
    name: 'LxQrScanner',
    description: 'QR kodu skenētājs',
    href: { name: 'qrScanner' },
    icon: 'next',
    group: 'combined',
    title: 'QR koda skenēšanai',
  },
  {
    code: 'fileUploader',
    name: 'LxFileUploader',
    description: 'Datņu augšupielādes komponente',
    href: { name: 'fileUploader' },
    icon: 'next',
    group: 'combined',
    title: 'Datņu augšupielādei',
  },
]);

const variants = [
  { id: 'usage', name: 'Pielietojuma skats' },
  { id: 'hierarchy', name: 'Hierarhiskais skats' },
  { id: 'guide', name: 'Komponenšu palīgs' },
];

function findComponentByName(componentName) {
  const compObj = hierarchyItems.value.find((obj) => obj.name === componentName);

  if (compObj && compObj.href && compObj.name && compObj.title) {
    const { href, name, title } = compObj;
    const componentKebabName = lxStringUtils.camelToKebab(href.name);

    return `<p>${title} tiek izmantota <strong>${name}</strong> komponente.</p><a class=lx-button href=/sandbox/${componentKebabName} tabindex=0 title="Atvērt ${name}"><svg viewBox="0 0 32 32"xmlns=http://www.w3.org/2000/svg><g><path d=M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z></path><polygon points="20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2"></polygon></g>/></svg><div class=lx-loader-container style=display:none><div class=lx-loader-wrapper if=87135ccd98f199bba073668eb4b78209><div class="lx-small lx-loader-indeterminate"><div class="lx-small lx-loader"><svg viewBox="0 0 100 100"><circle class=lx-loader-background cx=50% cy=50% r=44></circle><circle class=lx-loader-stroke cx=50% cy=50% r=44></circle></svg></div></div></div></div><div class=lx-button-content><label>Atvērt ${name}</label></div></a>`;
  }
  return '';
}

const GRAPH_DATA = `A[Kāda ir tava nepieciešamība? &Komponenšu palīgs palīdzēs piemeklēt vēlamo komponenti pēc funkcionalitātes.] -->|Ievadīt| B[Ko tu vēlies izdarīt? &Teksta un objekta ievade, datnes augšupielāde, QR koda nolasīšana, saraksta izveidošana vai citas informācijas ievade *]
    A -->|Attēlot| C[Ko attēlot? &Attēlot statusu, objektus, ikonas, kļūdas paziņojumu, loaderi vai progresa indikatoru *]
    A -->|Izkārtot| D[Ko izkārtot? &Izkārtot paskaidres, divu līmeņu izvēlni, konteinerus, filtrus vai modālo logu *]
    A -->|Izpildīt darbību| E[Kādu darbību izpildīt? &Izpildīt darbību, nospiežot pogu, vai pārslēgt skatu *]
    B --> |Augšupielādēt datni| F[& *${findComponentByName('LxFileUploader')}]
    B --> |Ievadīt ģeotelpisko informāciju| G[& *${findComponentByName('LxMap')}]
    B --> |Nolasīt QR kodu| H[& *${findComponentByName('LxQrScanner')}]
    B --> |Ievadīt objektu| I[Vai jāvar ievadīt vienu objektu vai vairākus? & *]
    I --> |Vairākus| J[& *${findComponentByName('LxAppendableList')}]
    I --> |Vienu| K[& *${findComponentByName('LxDataBlock')}]
    B --> |Norādīt datumu| L[Vai ir nepieciešams norādīt periodu? & *]
    L --> |Jā| M[& *${findComponentByName('LxDateTimeRange')}]
    L --> |Nē| N[& *${findComponentByName('LxDateTimePicker')}]
    B --> |Ievadīt tekstu| O[Vai ir nepieciešams tekstu formatēt Markdown? & *]
    O --> |Jā| R[& *${findComponentByName('LxMarkdownTextArea')}]
    O --> |Nē| P[Vai ir nepieciešams norādīt vairākas rindas? & *]
    P --> |Jā| T[& *${findComponentByName('LxTextArea')}]
    P --> |Nē| S[& *${findComponentByName('LxTextInput')}]
    B --> |Izvēlēties vērtību no saraksta/ izvēlēties no iepriekš definētām vērtībām| U[Vai ir jāvar izvēlēties vairāk par vienu vērtību? & *]
    U --> |Jā| V[& *${findComponentByName('LxValuePicker')}]
    U --> |Nē| Z[Vai pilnais saraksts no kura ir jāizvēlas ir pieejams klientā/formā? & *]
    Z --> |Jā| A1[& *${findComponentByName('LxAutoComplete')}] 
    Z --> |Nē| V1[& *${findComponentByName('LxValuePicker')}]
    B --> |Ievadīt bināru vērtību| A2[& *${findComponentByName('LxToggle')}]
    B --> |Izveidot sarakstu| A3[Vai ierakstiem jābūt labojamiem? & *]
    A3 --> |Jā| J1[& *${findComponentByName('LxAppendableList')}]
    A3 --> |Nē| A4[Vai sarakstu ir nepieciešams attēlot tabulas veidā? & *]
    A4 --> |Jā| A5[& *${findComponentByName('LxDataGrid')}]
    A4 --> |Nē| A6[& *${findComponentByName('LxList')}]
    B --> |Ievadīt veselu skaitli| A7[& *${findComponentByName('LxNumberSlider')}]
    C -->|Personu| C1[& *${findComponentByName('LxPersonDisplay')}]
    C -->|Valsts karogu| C2[& *${findComponentByName('LxFlag')}]
    C -->|Statusu| C3[& *${findComponentByName('LxStateDisplay')}]
    C -->|Kļūdas paziņojumu| C4[& *${findComponentByName('LxErrorPage')}]
    C -->|Ikonu| C5[& *${findComponentByName('LxIcon')}]
    C -->|Karti| C6[& *${findComponentByName('LxMap')}]
    C -->|Soļa progresa indikatoru| C7[& *${findComponentByName('LxSteps')}]
    C -->|Ielādi| C8[& *${findComponentByName('LxLoader')}]
    C -->|Sarakstu| C9[Vai sarakstu ir nepieciešams attēlot tabulas veidā? & *]
    C9 --> |Jā| A8[& *${findComponentByName('LxDataGrid')}]
    C9 --> |Nē| C10[Vai katram saraksta elementam ir nepieciešams attēlot papildu informāciju? & *]
    C10--> |Jā| J2[& *${findComponentByName('LxAppendableList')}]
    C10--> |Nē| A9[& *${findComponentByName('LxList')}]
    D -->|Paskaidri| D1[& *${findComponentByName('LxInfoWrapper')}]
    D -->|Divu līmeņu izvēlni| D2[& *${findComponentByName('LxMasterDetail')}]
    D -->|Savēršamo konteineri| D3[& *${findComponentByName('LxExpander')}]
    D -->|Izkrītošo konteineri| D4[& *${findComponentByName('LxDropDownMenu')}]
    D -->|Filtrus| D5[& *${findComponentByName('LxFilters')}]
    D -->|Modālo logu| D6[& *${findComponentByName('LxModal')}]
    E -->|Pārslēgt dažādus skata režīmus| E1[& *${findComponentByName('LxContentSwitcher')}]
    E -->|Jebkuru citu darbību| E2[& *${findComponentByName('LxButton')}]
`;

function resetData() {
  demoStore.$reset();
  notificationStore.pushSuccess('Demo dati tika atiestatīti');
}

const selectedItems = computed(() => {
  switch (selectedVariant.value) {
    case 'usage':
      return usageItems.value;
    case 'hierarchy':
      return hierarchyItems.value;
    default:
      return [];
  }
});

const selectedGroup = computed(() => {
  switch (selectedVariant.value) {
    case 'usage':
      return usageGroupDefinitions.value;
    case 'hierarchy':
      return hierarchyGroupDefinitions.value;
    default:
      return [];
  }
});

function handleNodeSelect(name) {
  // in case will need to handle node selection
}

onMounted(async () => {
  viewStore.goBack = false;
  viewStore.description = t('pages.sandbox.description');
});
</script>

<template>
  <div class="lx-sandbox">
    <LxContentSwitcher
      :items="variants"
      v-model="selectedVariant"
      idAttribute="id"
      nameAttribute="name"
    />

    <article class="lx-article" v-if="selectedVariant !== 'guide'">
      <LxList
        :has-search="true"
        list-type="3"
        :items="selectedItems"
        :group-definitions="selectedGroup"
        :hide-filtered-items="true"
        v-model:search-string="searchString"
        id-attribute="code"
      >
        <template #toolbar>
          <LxButton
            title="Atiestatīt demo datus"
            icon="reset"
            :destructive="true"
            kind="ghost"
            @click="resetData"
          />
        </template>

        <template #customItem="{ code, name, description, group }">
          <template v-if="group !== 'featured'">
            <p class="lx-primary">
              <LxSearchableText :value="name" :search-string="searchString" />
            </p>
            <p class="lx-secondary">
              <LxSearchableText :value="description" :search-string="searchString" />
            </p>
          </template>

          <template v-else>
            <div class="important-component">
              <div class="illustration">
                <div class="background"></div>
                <svg
                  v-if="code === 'toggle'"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 500 300"
                  style="enable-background: new 0 0 500 300"
                  xml:space="preserve"
                >
                  <svg id="Toggles">
                    <path
                      class="backdrop"
                      d="M500.5,121.7v-5H257.8V0.2h-5v116.5h-57.7V-0.8h-5v117.5H0.5v5h189.7v57.2H0v5h190.2V300h5V183.9h57.7V301h5
		V183.9H500v-5H257.8v-57.2H500.5z M195.2,178.9v-57.2h57.7v57.2H195.2z"
                    />
                    <g>
                      <path
                        d="M276.3,116.9h-52.7c-18.6,0-33.7,15.1-33.7,33.7v0c0,18.6,15.1,33.7,33.7,33.7h52.7c18.6,0,33.7-15.1,33.7-33.7v0
			C310,132,294.9,116.9,276.3,116.9z M223.7,175.2c-13.8,0-25-11.2-25-25s11.2-25,25-25s25,11.2,25,25S237.5,175.2,223.7,175.2z"
                      />
                    </g>
                  </svg>
                </svg>
                <svg
                  v-else-if="code === 'list'"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 500 300"
                  style="enable-background: new 0 0 500 300"
                  xml:space="preserve"
                >
                  <g id="List">
                    <g>
                      <path d="M100,80.2v67.3h300V80.2H100z M395,142.5H105V85.2h290V142.5z" />
                      <path
                        d="M343.8,116.3h29.4l-10.3,10.3c-0.9,0.9-0.9,2.5,0,3.4s2.5,0.9,3.4,0l14.4-14.4c0,0,0,0,0,0c0.9-0.9,0.9-2.5,0-3.4
			l-14.4-14.4c-0.9-0.9-2.5-0.9-3.4,0s-0.9,2.5,0,3.4l10.3,10.3h-29.4c-1.3,0-2.4,1.1-2.4,2.4S342.4,116.3,343.8,116.3z"
                      />
                      <path
                        d="M127.4,121.4h9l1.8,7.8h5.5l-8.1-31h-7.3l-8.3,31h5.5L127.4,121.4z M131,106.1c0.1-0.5,0.3-1,0.3-1.5
			c0.1-0.5,0.2-1,0.2-1.4c0.1-0.5,0.1-0.9,0.2-1.4h0.2c0.1,0.5,0.1,0.9,0.2,1.4c0.1,0.4,0.1,0.9,0.2,1.4c0.1,0.5,0.2,1,0.3,1.5
			l2.6,11.1h-6.9L131,106.1z"
                      />
                      <path
                        d="M153.1,125.1h0.4c0.3,1.4,1,2.6,2.1,3.4c1.1,0.8,2.5,1.2,4.2,1.2c1.2,0,2.4-0.2,3.4-0.6c1-0.4,1.9-1.1,2.6-1.9
			c0.7-0.8,1.2-1.8,1.6-3c0.4-1.2,0.6-2.5,0.6-3.9v-5.9c0-1.4-0.2-2.7-0.6-3.8c-0.4-1.1-0.9-2.1-1.6-2.9c-0.7-0.8-1.6-1.4-2.6-1.8
			s-2.1-0.6-3.4-0.6c-1.7,0-3.1,0.4-4.2,1.2c-1.1,0.8-1.8,1.9-2.1,3.3h-0.4c0-0.5,0.1-1,0.1-1.5c0-0.4,0-0.9,0.1-1.4
			c0-0.5,0-1,0-1.4v-7.6h-5.4v31.4h5.2V125.1z M153.3,114.5c0-1.4,0.4-2.6,1.2-3.4c0.8-0.9,1.9-1.3,3.3-1.3c1.5,0,2.6,0.4,3.4,1.3
			c0.8,0.8,1.2,2,1.2,3.5v5.6c0,1.5-0.4,2.6-1.2,3.5c-0.8,0.9-2,1.3-3.4,1.3c-1.4,0-2.5-0.4-3.3-1.3c-0.8-0.9-1.2-2-1.2-3.4V114.5z"
                      />
                      <path
                        d="M176.3,127.1c0.9,0.8,2,1.4,3.2,1.8c1.3,0.4,2.7,0.6,4.2,0.6c1.4,0,2.6-0.2,3.8-0.6c1.2-0.4,2.2-0.9,3.1-1.7
			s1.6-1.6,2.2-2.6c0.6-1,1-2.2,1.2-3.5h-5.4c-0.2,1.1-0.8,2-1.7,2.6c-0.9,0.7-2,1-3.3,1c-1.5,0-2.7-0.4-3.6-1.2
			c-0.8-0.8-1.3-1.9-1.3-3.3v-6.1c0-1.4,0.4-2.6,1.3-3.4c0.9-0.8,2-1.2,3.6-1.2c1.3,0,2.4,0.3,3.3,1c0.9,0.7,1.4,1.6,1.6,2.6h5.4
			c-0.2-1.3-0.6-2.4-1.2-3.5c-0.6-1-1.3-1.9-2.2-2.6c-0.9-0.7-1.9-1.3-3.1-1.7c-1.2-0.4-2.5-0.6-3.8-0.6c-1.5,0-3,0.2-4.2,0.7
			c-1.3,0.4-2.3,1.1-3.2,1.9c-0.9,0.8-1.6,1.8-2.1,2.9c-0.5,1.1-0.7,2.4-0.7,3.8v6.1c0,1.4,0.2,2.7,0.7,3.8
			C174.7,125.4,175.4,126.3,176.3,127.1z"
                      />
                    </g>
                    <g>
                      <path d="M100,152.5v67.3h300v-67.3H100z M395,214.8H105v-57.3h290V214.8z" />
                      <path
                        d="M343.8,188.7h29.4L362.9,199c-0.9,0.9-0.9,2.5,0,3.4s2.5,0.9,3.4,0l14.4-14.4c0,0,0,0,0,0c0.9-0.9,0.9-2.5,0-3.4
			l-14.4-14.4c-0.9-0.9-2.5-0.9-3.4,0s-0.9,2.5,0,3.4l10.3,10.3h-29.4c-1.3,0-2.4,1.1-2.4,2.4S342.4,188.7,343.8,188.7z"
                      />
                      <path
                        d="M127.1,201.6l4.5-8.6c0.2-0.4,0.4-0.8,0.5-1.1c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.5,0.3-0.8h0.2
			c0.1,0.2,0.2,0.5,0.3,0.8c0.2,0.5,0.5,1.2,0.9,2l4.4,8.6h6l-8.7-16l8.2-15h-5.8l-4,7.7c-0.2,0.4-0.4,0.7-0.5,1.1
			c-0.1,0.3-0.3,0.6-0.4,0.8c-0.1,0.3-0.2,0.5-0.3,0.7h-0.2c-0.1-0.2-0.2-0.5-0.3-0.8c-0.1-0.2-0.2-0.5-0.4-0.8
			c-0.1-0.3-0.3-0.7-0.5-1.1l-4-7.7h-6l8.1,15l-8.7,15.9H127.1z"
                      />
                      <path
                        d="M153.2,208.7h5.7l11.2-30.7h-5.7l-4.4,12.6c-0.2,0.5-0.3,1.1-0.4,1.6c-0.1,0.6-0.2,1.1-0.3,1.6c-0.1,0.6-0.1,1.1-0.2,1.6
			h-0.3c-0.1-0.5-0.1-1.1-0.2-1.6c-0.1-0.5-0.2-1-0.3-1.6c-0.1-0.6-0.3-1.1-0.5-1.6l-4.6-12.6h-5.9l9.1,22.3L153.2,208.7z"
                      />
                      <path
                        d="M194.4,196.9H184c-0.3,0-0.7,0-1.1,0c-0.4,0-0.7,0-1,0.1c-0.4,0.1-0.7,0.1-1.1,0.1l13-14.1V178H175v4.7h9.4
			c0.3,0,0.7,0,1.1,0c0.4,0,0.7,0,1.1-0.1c0.4,0,0.7-0.1,1.1-0.1l-13,14.1v5.1h19.7V196.9z"
                      />
                    </g>
                    <path
                      class="backdrop"
                      d="M524,157.7v-5H400.1v-5.2h113.7v-5H400.1V85.2H521v-5H400.1V-0.5h-5v80.7H105.5V0h-5v80.2H-6.7v5h107.2v57.3
		H-13.8v5h114.3v5.2H-3.7v5h104.2v57.2H-13.3v5h113.8v86.3h5v-86.3h289.7v85.8h5v-85.8h114.2v-5H400.1v-57.2H524z M105.5,85.2h289.7
		v57.3H105.5V85.2z M105.5,147.5h289.7v5.2H105.5V147.5z M395.1,214.8H105.5v-57.2h289.7V214.8z"
                    />
                  </g>
                </svg>
                <svg
                  v-else-if="code === 'valuePicker'"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 500 300"
                  style="enable-background: new 0 0 500 300"
                  xml:space="preserve"
                >
                  <g>
                    <g class="backdrop">
                      <path
                        class="st2"
                        d="M503.1,66.8v-5H277.5v-81.3h-5v81.3h-44.2v-83h-5v83H0v5h223.3v168H-4.2v5h227.5v73.5h5v-73.5h44.2v75.3h5
			v-75.3h221.4v-5H277.5v-168H503.1z M228.3,234.8v-168h44.2v168H228.3z"
                      />
                    </g>
                    <path
                      d="M262.4,142c1.2,1.2,1.2,3.1,0,4.2c0,0,0,0,0,0l-14,14c-1.2,1.2-3.1,1.2-4.2,0c0,0,0,0,0,0l-6-6
		c-1.2-1.2-1.2-3.1,0-4.2c1.2-1.2,3.1-1.2,4.2,0l3.9,3.9l11.9-11.9C259.3,140.8,261.2,140.9,262.4,142
		C262.4,142,262.4,142,262.4,142z M277.2,150.2c0,14.9-12.1,27-27,27s-27-12.1-27-27s12.1-27,27-27
		C265.2,123.2,277.2,135.2,277.2,150.2z M271.2,150.2c0-11.6-9.4-21-21-21c-11.6,0-21,9.4-21,21s9.4,21,21,21
		C261.8,171.1,271.2,161.7,271.2,150.2z"
                    />
                    <path
                      d="M250.2,61.8c-15.2,0-27.5,12.3-27.5,27.5s12.3,27.5,27.5,27.5c15.2,0,27.5-12.3,27.5-27.5
		C277.7,74.1,265.4,61.8,250.2,61.8z M250.2,110.7c-11.8,0-21.4-9.6-21.4-21.4s9.6-21.4,21.4-21.4s21.4,9.6,21.4,21.4
		C271.6,101.1,262.1,110.6,250.2,110.7z"
                    />
                    <path
                      d="M250.2,184.5c-15.2,0-27.5,12.3-27.5,27.5c0,15.2,12.3,27.5,27.5,27.5c15.2,0,27.5-12.3,27.5-27.5
		C277.7,196.9,265.4,184.6,250.2,184.5z M250.2,233.4c-11.8,0-21.4-9.6-21.4-21.4c0-11.8,9.6-21.4,21.4-21.4s21.4,9.6,21.4,21.4
		C271.6,223.8,262.1,233.4,250.2,233.4z"
                    />
                  </g>
                </svg>
                <svg
                  v-else-if="code === 'button'"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 500 300"
                  style="enable-background: new 0 0 500 300"
                  xml:space="preserve"
                >
                  >
                  <svg id="Button">
                    <path
                      class="backdrop"
                      d="M400,183V118h99.9v-5H400V0.5h-5V113H333V-4.9h-5V113H105.2V-2.7h-5V113H-0.1v5h100.3V183H0.5v5h99.7V307h5
		V188H328v116.9h5V188H395v122.4h5V188h100.5v-5H400z M105.2,183V118H328V183H105.2z M333,183V118H395V183H333z"
                    />
                    <g>
                      <ellipse
                        transform="matrix(0.7071 -0.7071 0.7071 0.7071 0.3115 301.7623)"
                        cx="364.4"
                        cy="150.5"
                        rx="4.9"
                        ry="4.9"
                      />
                      <path
                        d="M361.8,158.3c-1.5,3-2.3,5.5-2.3,7c0,2.7,2.2,4.9,4.9,4.9c2.7,0,4.9-2.2,4.9-4.9c0-1.5-0.8-3.9-2.3-7
			C365.3,158.8,363.5,158.8,361.8,158.3z"
                      />
                      <path
                        d="M354.1,138.9C354.1,138.9,354.1,138.9,354.1,138.9c-2.4-1.4-5.4-0.6-6.7,1.8c0,0,0,0,0,0c-1.4,2.3-0.5,5.4,1.8,6.7
			c1.3,0.7,3.8,1.3,7.2,1.5c0.4-1.7,1.3-3.3,2.6-4.5C357.1,141.6,355.4,139.6,354.1,138.9z"
                      />
                      <path
                        d="M349.2,153.6c-2.3,1.4-3.2,4.4-1.8,6.7c1.4,2.3,4.4,3.2,6.7,1.8c1.3-0.7,3-2.7,4.9-5.5c-1.3-1.2-2.2-2.7-2.6-4.5
			C353,152.4,350.5,152.9,349.2,153.6z"
                      />
                      <path
                        d="M381.4,140.7c-1.4-2.3-4.4-3.2-6.7-1.8c-1.3,0.7-3,2.7-4.9,5.5c1.3,1.2,2.2,2.7,2.6,4.5c3.4-0.2,5.9-0.7,7.2-1.5
			C382,146,382.8,143,381.4,140.7z"
                      />
                      <path
                        d="M100,113v75h300v-75H100z M146.5,165.4l-1.8-7.8h-9l-1.8,7.8h-5.5l8.3-31h7.3l8.1,31H146.5z M176.3,156.5
			c0,1.4-0.2,2.7-0.6,3.9c-0.4,1.2-0.9,2.2-1.6,3c-0.7,0.8-1.6,1.4-2.6,1.9s-2.1,0.6-3.4,0.6c-1.7,0-3.1-0.4-4.2-1.2
			c-1.1-0.8-1.8-1.9-2.1-3.4h-0.4v4.1h-5.2v-31.4h5.4v7.6c0,0.4,0,0.9,0,1.4c0,0.5,0,1-0.1,1.4c-0.1,0.5-0.1,1-0.1,1.5h0.4
			c0.3-1.4,1-2.5,2.1-3.3c1.1-0.8,2.5-1.2,4.2-1.2c1.2,0,2.4,0.2,3.4,0.6s1.9,1,2.6,1.8c0.7,0.8,1.2,1.8,1.6,2.9
			c0.4,1.1,0.6,2.4,0.6,3.8V156.5z M188.5,160c0.8,0.8,2,1.2,3.6,1.2c1.3,0,2.4-0.3,3.3-1c0.9-0.7,1.5-1.6,1.7-2.6h5.4
			c-0.2,1.3-0.6,2.4-1.2,3.5c-0.6,1-1.3,1.9-2.2,2.6c-0.9,0.7-1.9,1.3-3.1,1.7c-1.2,0.4-2.4,0.6-3.8,0.6c-1.5,0-3-0.2-4.2-0.6
			c-1.3-0.4-2.3-1-3.2-1.8c-0.9-0.8-1.6-1.8-2.1-2.9c-0.5-1.1-0.7-2.4-0.7-3.8v-6.1c0-1.4,0.2-2.7,0.7-3.8c0.5-1.1,1.2-2.1,2.1-2.9
			c0.9-0.8,2-1.4,3.2-1.9c1.3-0.4,2.7-0.7,4.2-0.7c1.4,0,2.7,0.2,3.8,0.6c1.2,0.4,2.2,0.9,3.1,1.7c0.9,0.7,1.6,1.6,2.2,2.6
			c0.6,1,1,2.2,1.2,3.5H197c-0.2-1.1-0.7-2-1.6-2.6c-0.9-0.7-2-1-3.3-1c-1.5,0-2.7,0.4-3.6,1.2c-0.9,0.8-1.3,1.9-1.3,3.4v6.1
			C187.2,158.1,187.6,159.2,188.5,160z M381.3,150.8L381.3,150.8c1.9,1.1,3.3,2.9,3.8,5c1.2,4.4-1.4,8.9-5.8,10
			c-0.7,0.2-1.4,0.3-2.1,0.3c-1.4,0-2.8-0.4-4.1-1.1c-0.2-0.1-0.3-0.2-0.5-0.3c0,0.2,0,0.4,0,0.6c0,4.5-3.7,8.2-8.2,8.2
			c-4.5,0-8.2-3.7-8.2-8.2c0-0.2,0-0.4,0-0.6c-0.2,0.1-0.3,0.2-0.5,0.3c0,0-0.1,0-0.1,0.1c-3.9,2.2-8.9,0.9-11.2-3.1
			c-2.2-3.9-0.9-8.9,3.1-11.2c0.2-0.1,0.3-0.2,0.5-0.3c-0.2-0.1-0.4-0.2-0.5-0.3c0,0-0.1,0-0.1-0.1c-3.9-2.3-5.2-7.3-2.9-11.2
			c2.3-3.9,7.3-5.2,11.2-2.9c0.2,0.1,0.3,0.2,0.5,0.3c0-0.2,0-0.4,0-0.6c0-4.5,3.7-8.2,8.2-8.2c4.5,0,8.2,3.7,8.2,8.2
			c0,0.2,0,0.4,0,0.6c0.2-0.1,0.3-0.2,0.5-0.3c0,0,0.1,0,0.1-0.1c3.9-2.2,8.9-0.9,11.2,3.1c2.2,3.9,0.9,8.9-3.1,11.2
			c-0.2,0.1-0.3,0.2-0.5,0.3C380.9,150.6,381.1,150.7,381.3,150.8z"
                      />
                      <path
                        d="M140.7,140.8c-0.1-0.5-0.2-1-0.2-1.4c-0.1-0.5-0.1-0.9-0.2-1.4h-0.2c-0.1,0.5-0.1,0.9-0.2,1.4c-0.1,0.4-0.1,0.9-0.2,1.4
			c-0.1,0.5-0.2,1-0.3,1.5l-2.6,11.1h6.9l-2.6-11.1C140.9,141.8,140.8,141.3,140.7,140.8z"
                      />
                      <path
                        d="M166.2,146c-1.4,0-2.5,0.4-3.3,1.3c-0.8,0.9-1.2,2-1.2,3.4v5.8c0,1.4,0.4,2.5,1.2,3.4c0.8,0.9,1.9,1.3,3.3,1.3
			c1.5,0,2.6-0.4,3.4-1.3c0.8-0.9,1.2-2,1.2-3.5v-5.6c0-1.5-0.4-2.6-1.2-3.5C168.8,146.4,167.7,146,166.2,146z"
                      />
                      <path
                        d="M379.6,153.6c-1.3-0.7-3.8-1.3-7.2-1.5c-0.4,1.7-1.3,3.3-2.6,4.5c1.9,2.8,3.6,4.8,4.9,5.5c0,0,0,0,0,0
			c2.3,1.4,5.4,0.5,6.7-1.8c0,0,0,0,0,0C382.8,158,382,155,379.6,153.6z"
                      />
                      <path
                        d="M364.4,130.9c-2.7,0-4.9,2.2-4.9,4.9c0,1.5,0.8,3.9,2.3,7c1.7-0.6,3.5-0.6,5.2,0c1.5-3,2.3-5.5,2.3-7
			C369.3,133.1,367.1,130.9,364.4,130.9z"
                      />
                    </g>
                  </svg>
                </svg>
                <svg
                  v-else-if="code === 'dateTimePicker'"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 500 300"
                  style="enable-background: new 0 0 500 300"
                  xml:space="preserve"
                >
                  >
                  <g id="DateTime">
                    <path
                      d="M395,121.8v57.3H105v-57.3H395 M400,116.8H100v67.3h300V116.8L400,116.8z"
                    />
                    <path
                      class="st4"
                      d="M379.9,134.9h-3.4v-0.7c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2v0.7h-12.2v-0.7c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2
		v0.7h-3.4c-1.9,0-3.4,1.5-3.4,3.4v27.2c0,1.9,1.5,3.4,3.4,3.4h27.2c1.9,0,3.4-1.5,3.4-3.4v-27.2
		C383.3,136.4,381.8,134.9,379.9,134.9z M356.1,138.9c0,1.1,0.9,2,2,2c1.1,0,2-0.9,2-2h12.2c0,1.1,0.9,2,2,2c1.1,0,2-0.9,2-2h2.7
		v4.1h-25.8v-4.1H356.1z M353.4,164.8v-17.7h25.8v17.7H353.4z"
                    />
                    <g>
                      <path
                        d="M120.7,166v-31h6.4l3.4,9.8c0.1,0.3,0.2,0.7,0.3,1c0.1,0.4,0.2,0.7,0.2,1c0.1,0.4,0.2,0.7,0.2,1.1h0.3
			c0.1-0.3,0.1-0.7,0.2-1.1c0.1-0.3,0.2-0.7,0.3-1c0.1-0.4,0.2-0.7,0.3-1l3.1-9.8h6.5v31H137v-20.1c0-0.7,0-1.3,0.1-2.1
			c0.1-0.7,0.1-1.4,0.2-2c0.1-0.7,0.1-1.4,0.2-2.1h-0.4c-0.1,0.7-0.3,1.3-0.5,1.9c-0.1,0.5-0.3,1.1-0.4,1.7
			c-0.1,0.6-0.3,1.1-0.4,1.6l-2.2,7.4H129l-2.4-7.4c-0.1-0.5-0.3-1-0.4-1.6c-0.1-0.6-0.3-1.2-0.4-1.7c-0.1-0.6-0.3-1.3-0.4-1.9H125
			c0.1,0.7,0.2,1.4,0.3,2.1c0.1,0.6,0.1,1.3,0.2,2c0,0.7,0.1,1.4,0.1,2.1V166H120.7z"
                      />
                      <path
                        d="M146.5,166v-31h6.4l3.4,9.8c0.1,0.3,0.2,0.7,0.3,1c0.1,0.4,0.2,0.7,0.2,1c0.1,0.4,0.2,0.7,0.2,1.1h0.3
			c0.1-0.3,0.1-0.7,0.2-1.1c0.1-0.3,0.2-0.7,0.3-1c0.1-0.4,0.2-0.7,0.3-1l3.1-9.8h6.5v31h-4.8v-20.1c0-0.7,0-1.3,0.1-2.1
			c0.1-0.7,0.1-1.4,0.2-2c0.1-0.7,0.1-1.4,0.2-2.1h-0.4c-0.1,0.7-0.3,1.3-0.5,1.9c-0.1,0.5-0.3,1.1-0.4,1.7
			c-0.1,0.6-0.3,1.1-0.4,1.6l-2.2,7.4h-4.5l-2.4-7.4c-0.1-0.5-0.3-1-0.4-1.6c-0.1-0.6-0.3-1.2-0.4-1.7c-0.1-0.6-0.3-1.3-0.4-1.9
			h-0.4c0.1,0.7,0.2,1.4,0.3,2.1c0.1,0.6,0.1,1.3,0.2,2c0,0.7,0.1,1.4,0.1,2.1V166H146.5z"
                      />
                      <path
                        d="M178.6,162.2c0-1.3,0.4-2.3,1.1-3.1c0.8-0.8,1.8-1.1,3-1.1c1.3,0,2.3,0.4,3.1,1.1c0.7,0.8,1.1,1.8,1.1,3.1
			c0,1.3-0.4,2.3-1.1,3.1c-0.7,0.8-1.8,1.2-3.1,1.2c-1.3,0-2.3-0.4-3-1.2C179,164.5,178.6,163.5,178.6,162.2z"
                      />
                      <path
                        d="M198.9,166v-31h9.5c1.6,0,3,0.2,4.3,0.7s2.4,1.1,3.3,2c0.9,0.9,1.6,1.9,2.1,3.1c0.5,1.2,0.8,2.5,0.8,4v11.3
			c0,1.5-0.3,2.8-0.8,4s-1.2,2.3-2.1,3.1c-0.9,0.9-2,1.5-3.3,2c-1.3,0.5-2.7,0.7-4.3,0.7H198.9z M208.4,161.1c1.5,0,2.8-0.5,3.7-1.4
			c0.9-0.9,1.4-2.1,1.4-3.5v-11.3c0-1.5-0.5-2.6-1.4-3.5c-0.9-0.9-2.1-1.3-3.7-1.3h-4.1v21.1H208.4z"
                      />
                      <path
                        d="M224.7,166v-31h9.5c1.6,0,3,0.2,4.3,0.7s2.4,1.1,3.3,2c0.9,0.9,1.6,1.9,2.1,3.1c0.5,1.2,0.8,2.5,0.8,4v11.3
			c0,1.5-0.2,2.8-0.8,4c-0.5,1.2-1.2,2.3-2.1,3.1c-0.9,0.9-2,1.5-3.3,2c-1.3,0.5-2.7,0.7-4.3,0.7H224.7z M234.2,161.1
			c1.5,0,2.8-0.5,3.7-1.4c0.9-0.9,1.4-2.1,1.4-3.5v-11.3c0-1.5-0.5-2.6-1.4-3.5c-0.9-0.9-2.1-1.3-3.7-1.3h-4.1v21.1H234.2z"
                      />
                      <path
                        d="M256,162.2c0-1.3,0.4-2.3,1.1-3.1c0.8-0.8,1.8-1.1,3-1.1c1.3,0,2.3,0.4,3.1,1.1c0.7,0.8,1.1,1.8,1.1,3.1
			c0,1.3-0.4,2.3-1.1,3.1c-0.7,0.8-1.8,1.2-3.1,1.2c-1.3,0-2.3-0.4-3-1.2C256.4,164.5,256,163.5,256,162.2z"
                      />
                      <path
                        d="M274,135h5.7l5.3,12.1c0.2,0.5,0.4,0.9,0.5,1.3s0.2,0.8,0.3,1.2c0.1,0.4,0.1,0.8,0.2,1.2h0.3c0.1-0.4,0.1-0.8,0.2-1.2
			c0.1-0.3,0.2-0.7,0.3-1.2s0.3-0.9,0.5-1.3l5.2-12.1h5.6l-9.3,20.2V166h-5.4v-10.8L274,135z"
                      />
                      <path
                        d="M299.8,135h5.7l5.3,12.1c0.2,0.5,0.4,0.9,0.5,1.3s0.2,0.8,0.3,1.2c0.1,0.4,0.1,0.8,0.2,1.2h0.3c0.1-0.4,0.1-0.8,0.2-1.2
			c0.1-0.3,0.2-0.7,0.3-1.2s0.3-0.9,0.5-1.3l5.2-12.1h5.6l-9.3,20.2V166h-5.4v-10.8L299.8,135z"
                      />
                    </g>
                    <g>
                      <path
                        class="backdrop"
                        d="M500.5,122v-5h-99.8V-4.2h-5V117H105.8V-4.2h-5V117H0.5v5h100.3v57.3H-0.5v5h101.3v123.5h5V184.3h289.9v123.5
			h5V184.3h98.8v-5h-98.8V122H500.5z M395.7,179.3H105.8V122h289.9V179.3z"
                      />
                    </g>
                  </g>
                </svg>
                <svg
                  v-else-if="code === 'textInput'"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 500 300"
                  style="enable-background: new 0 0 500 300"
                  xml:space="preserve"
                >
                  <g>
                    <g>
                      <g>
                        <path d="M100,116.8v67.5h300v-67.5H100z M395,179.2H105v-57.5h290V179.2z" />
                        <path
                          d="M133.2,157.8h9l1.8,7.8h5.5l-8.1-31h-7.3l-8.3,31h5.5L133.2,157.8z M136.8,142.5c0.1-0.5,0.3-1,0.3-1.5
				c0.1-0.5,0.2-1,0.2-1.4c0.1-0.5,0.1-0.9,0.2-1.4h0.2c0.1,0.5,0.1,0.9,0.2,1.4c0.1,0.4,0.1,0.9,0.2,1.4c0.1,0.5,0.2,1,0.3,1.5
				l2.6,11.1h-6.9L136.8,142.5z"
                        />
                        <path
                          d="M158.9,161.5h0.4c0.3,1.4,1,2.6,2.1,3.4c1.1,0.8,2.5,1.2,4.2,1.2c1.2,0,2.4-0.2,3.4-0.6s1.9-1.1,2.6-1.9
				c0.7-0.8,1.2-1.8,1.6-3c0.4-1.2,0.6-2.5,0.6-3.9v-5.9c0-1.4-0.2-2.7-0.6-3.8c-0.4-1.1-0.9-2.1-1.6-2.9c-0.7-0.8-1.6-1.4-2.6-1.8
				s-2.1-0.6-3.4-0.6c-1.7,0-3.1,0.4-4.2,1.2c-1.1,0.8-1.8,1.9-2.1,3.3h-0.4c0-0.5,0.1-1,0.1-1.5c0-0.4,0-0.9,0.1-1.4
				c0-0.5,0-1,0-1.4v-7.6h-5.4v31.4h5.2V161.5z M159.2,150.9c0-1.4,0.4-2.6,1.2-3.4c0.8-0.9,1.9-1.3,3.3-1.3c1.5,0,2.6,0.4,3.4,1.3
				c0.8,0.8,1.2,2,1.2,3.5v5.6c0,1.5-0.4,2.6-1.2,3.5c-0.8,0.9-2,1.3-3.4,1.3c-1.4,0-2.5-0.4-3.3-1.3c-0.8-0.9-1.2-2-1.2-3.4V150.9z
				"
                        />
                        <path
                          d="M182.1,163.6c0.9,0.8,2,1.4,3.2,1.8c1.3,0.4,2.7,0.6,4.2,0.6c1.4,0,2.6-0.2,3.8-0.6c1.2-0.4,2.2-0.9,3.1-1.7
				c0.9-0.7,1.6-1.6,2.2-2.6c0.6-1,1-2.2,1.2-3.5h-5.4c-0.2,1.1-0.8,2-1.7,2.6c-0.9,0.7-2,1-3.3,1c-1.5,0-2.7-0.4-3.6-1.2
				c-0.8-0.8-1.3-1.9-1.3-3.3v-6.1c0-1.4,0.4-2.6,1.3-3.4c0.9-0.8,2-1.2,3.6-1.2c1.3,0,2.4,0.3,3.3,1c0.9,0.7,1.4,1.6,1.6,2.6h5.4
				c-0.2-1.3-0.6-2.4-1.2-3.5c-0.6-1-1.3-1.9-2.2-2.6c-0.9-0.7-1.9-1.3-3.1-1.7c-1.2-0.4-2.5-0.6-3.8-0.6c-1.5,0-3,0.2-4.2,0.7
				c-1.3,0.4-2.3,1.1-3.2,1.9c-0.9,0.8-1.6,1.8-2.1,2.9c-0.5,1.1-0.7,2.4-0.7,3.8v6.1c0,1.4,0.2,2.7,0.7,3.8
				C180.5,161.8,181.2,162.8,182.1,163.6z"
                        />
                        <rect x="204.7" y="128" width="5" height="44.4" />
                      </g>
                      <path
                        class="backdrop"
                        d="M499.8,121.8v-5H400V-4.4h-5v121.2H105.1V-4.5h-5v121.2H-0.2v5h100.3v57.3H-1.2v5h101.3v123.5h5V184.1H395
			v123.5h5V184.1h98.8v-5H400v-57.3H499.8z M395,179.1H105.1v-57.3H395V179.1z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <header>
                <p class="lx-primary">
                  <LxSearchableText :value="name" :search-string="searchString" />
                </p>
                <p class="lx-secondary">
                  <LxSearchableText :value="description" :search-string="searchString" />
                </p>
              </header>
            </div>
          </template>
        </template>
      </LxList>
    </article>

    <article class="lx-article" v-else>
      <div class="lx-dashboard">
        <LxWidget width="l" height="l" label="Komponenšu palīgs">
          <WizardWidget :graph="GRAPH_DATA" @node-selected="handleNodeSelect" />
        </LxWidget>
      </div>
    </article>
  </div>
</template>
