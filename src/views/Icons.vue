<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import useViewStore from '@/stores/useViewStore';
import { LxTextInput, lxIconUtils } from '@wntr/lx-ui';
import IconDisplay from '@/components/IconDisplay.vue';

const viewStore = useViewStore();

const iconsDescriptions = ref({
  accept: 'Apstiprināt. Pieņemt. Izmanto darbībām un statusu maiņai!',
  adaptivity: 'Adaptivitāte. Apzīmē adaptivitāti, dažādām auditorijām pielādojamos laukus',
  add: 'Pievienošana. Izmanto objektu (kārtītes) pievienošanai',
  'add-item': 'Apakšelementu pievienošana. Objektu pievienošanas lielākam objektam (kartītei)',
  'add-chat': 'Pievienot čatu, ziņu, paziņojumu',
  admin: 'Administratora darba vieta. Administrēšana',
  applications: 'Pieteikums. Pieteikumu saraksts',
  'arrow-right': 'Bulta pa labi',
  'add-user': 'Pievienot lietotāju',
  at: 'Et simbols. Neizmanto e-pastiem!',
  attachment: 'Pielikums. Pielikumu saraksts',
  audit: 'Audits. Audita žurnāls',
  back: 'Atgriezties atpakaļ',
  bill: 'Rēķins. Rēķinu saraksts',
  bug: 'Kļūda kodā',
  'business-intelligence': 'Biznesa inteliģence. Datu analīze',
  calendar: 'Kalendārs. Datums',
  camera: 'Kamera. Fotoaparāts',
  cancel: 'Atcelt darbību. Atgriezties nesaglabājot',
  chat: 'Čats. Terzēšana',
  check: 'Ķeksis. Jā. Neizmanto dokumentu, objektu apstiptināšanai vai statusu maiņai!',
  checkbox:
    'Izvēles rūtiņa ir izķeksēta. Izķeksēt visas izvēles rūtiņas. Izmanto tad, kad nav iespējams izmantot izvēles rūtiņas komponenti',
  'checkbox-filled':
    'Izvēles rūtiņa ir ieķeksēta, Ieķeksēt visas izvēles rūtiņas. Izmanto tad, kad nav iespējams izmantot izvēles rūtiņas komponenti',
  'checkbox-indeterminate':
    'Izvēles rūtiņas vērtība nav izšķirta. Dažas izvēles rūtiņas ir ieķeksētas, bet ne visas',
  'chevron-down': 'Lejupvērsta bulta. Atvērt uz leju',
  'chevron-up': 'Augšupvērsta bulta. Sakļaut uz augšu',
  classifier: 'Klasifikators. Klasifikatoru saraksts',
  'classifier-settings': 'Klasifikatoru iestatījumi',
  clear: 'Attīrīt teksta lauku',
  close: 'Aizvērt (piem., modālo dialogu). Neizmanto objektu statusa maiņai!',
  'close-panel': 'Sakļaut paneli',
  collapse: 'Atgriezties no pilnekrāna režima',
  'collapse-horizontal': 'Sakļaut visus sakļaujamos paneļus horizontāli',
  'collapse-left': 'Sakļaut pa kreisi',
  'collapse-right': 'Sakļaut pa labi',
  color: 'Krāsa. Krāsas izvēle',
  config: 'Konfigurācija',
  'context-person': 'Konteksta persona. Aizbildnis. Vecāks',
  contract: 'Līgums. Neizmanto dokumentiem!',
  crisis: 'Ārkārtas situācija. Krīze',
  copy: 'Kopēt',
  crop: 'Izgriezt daļu no attēla',
  dashboard: 'Kopskats. Informācijas panelis. Lietotnes galvenais skats',
  default: 'Noklusējuma ikona. Šo ikonu neizmanto nekad!',
  delete:
    'Dzēst. Objektā dzēšana. Izmanto, kad dzēšana ir neatgriezeniska un/vai izraisa objekta dzēšanu no datu bāzes',
  deny: 'Noraidīt. Atteikt. Izmanto darbībām un statusu maiņai!',
  documents: 'Dokumenti. Dokumentu saraksts',
  download: 'Lejupielādēt. Lejupielādēt datni',
  drag: 'Vilkšanas indikators. Neizmanto pogām!',
  edit: 'Rediģēt. Objekta rediģēšana. Pāriešana labošanas režīmā',
  'edit-item':
    'Rediģēt saraksta elementu. Izmanto, kad rediģēšana attiecas uz mazāku elementu, nevis visu objektu vai kartīti',
  email: 'E-pasts. E-pasta sūtīšana',
  electricity: 'Elektrība',
  'email-settings': 'E-pastu iestatījumi',
  'expand-horizontal': 'Izvērst horizontāli',
  'expand-left': 'Izvērst pa kreisi',
  'expand-right': 'Izvērst pa labi',
  exit: 'Iziet ārā. Izlogošanās gadījumos neizmanto!',
  expand: 'Izvērst. Atvērt pilnekrāna režīmā',
  'expand-all': 'Atvērt visus sakļaujamos paneļus',
  export: 'Eksportēt',
  'fill-inputs': 'Aizpildīt laukus',
  filter: 'Filtri. Filtrēt',
  'filters-reset': 'Atiestatīt filtrus',
  flash: 'Zibspuldze. Ātrā darbība',
  'first-page': 'Pāriet uz pirmo lappusi. Izmanto lapošanā. Neizmanto navigācijā!',
  hardware: 'Aparatūra',
  form: 'Forma. Ievadforma',
  gas: 'Dabasgāze. Neizmanto benzīna vai degvielas apzīmēšanai!',
  heating: 'Apkure',
  help: 'Palīdzība. Palīdzības sadaļa',
  'help-settings': 'Palīdzības sadaļas iestatījumi',
  hidden: 'Paslēpt. Paslēpts, neredzams objekts',
  history: 'Vēsture. Vēsturiskie ieraksti',
  icons: 'Ikonu saraksts',
  id: 'Id. Identicējošie dokumenti (piemēram, dienesta apliecības, darbinieka caurlaides, utt). Neizmanto eID kartei un/vai pasēm!',
  incomplete: 'Statuss: nepabeigts',
  idea: 'Ideja',
  image: 'Attēls',
  info: 'Papildu informācija',
  information: 'Informācija',
  institution: 'Iestāde. Organizācija',
  inspection:
    'Pārbaude (kā process - nevis "pārbaudīt dokumentu", bet "inspektors pārbauda iekārtas")',
  integrations: 'Integrācijas',
  'integrations-settings': 'Integrāciju iestatījumi',
  invalid: 'Kļūdainā vērtībā. Lauks ar kļūdainu vērtību. Kļūda',
  'knowledge-database': 'Zināšanu datu bāze. Vārdnīca. Informācijas krātuve',
  'less-grid': 'Rādīt mazāk kolonnu tabulā',
  language: 'Valoda. Valodas izvēle',
  lock: 'Bloķēt. Bloķēt objektu. Aizvērts. Slēgts. Neizmanto dokumenta statusa apzīmēšanai vai maiņai!',
  map: 'Ģeogrāfiskā karte',
  link: 'Saite. Hipersaite. Sasaiste',
  'list-bulleted': 'Saraksts ar aizzīmēm. Nenumurēts saraksts',
  'list-numbered': 'Numurēts saraksts',
  login: 'Ielogoties. Autorizācija. Ieeja sistēmā',
  logout: 'Izlogošanos. Iziet no sistēmas',
  menu: 'Izvēlne',
  message: 'Ziņa. Vēstule. Ziņojums',
  'move-down': 'Pārvietot uz leju',
  'move-up': 'Pārvietot uz augšu',
  'move-first': 'Pārvietot uz sākumu',
  'move-last': 'Pārvietot uz beigām',
  'more-grid': 'Rādīt vairāk kolonnu tabulā',
  next: 'Nākamā lapa. Pāriet dziļāk navigācijā. Uz priekšu',
  'next-item': 'Nākamais elements sarakstā. Pāriet uz nākamo elementu',
  'next-page': 'Nākamā lapaspuse. Pāriet uz nākamo lapu',
  'notification-error': 'Kļūdas paziņojums',
  'notification-info': 'Informācijas paziņojums',
  'notification-success': 'Veiksmīgi izpildītas operācija paziņojums',
  'notification-warning': 'Brīdinājuma paziņojums',
  notifications: 'Paziņojums. Paziņojumu saraksts. Notifikācijas',
  open: 'Atvērt. Atvērt objektu',
  'open-data': 'Atvērtie dati',
  'open-panel': 'Atvērt paneli. Izvērst paneli',
  ok: 'Statuss: viss kārtībā',
  'ok-errors': 'Statuss: Viss kārtībā, bet ar kļūdām',
  'overflow-menu': 'Papildu izvēlne. Izvēlne, kas piedāvā papildu darbības',
  paste: 'Ielīmēt',
  patient: 'Pacients. Pacientu saraksts',
  pause: 'Statuss: iepauzēts. Pauze. Apturēt uz laiku, iepauzēt',
  permission: 'Atļauja. Tiesība. Atļauju saraksts. Tiesību saraksts',
  person: 'Persona. Personu saraksts',
  phone: 'Tālrunis. Zvanīt. Zvanu saraksts',
  place: 'Vieta. Atrašanās vieta',
  price: 'Cena. Cenrādis. Cenu saraksts',
  play: 'Atskaņot',
  policy: 'Politikas. Noteikumi',
  'previous-item': 'Iepriekšējais elements sarakstā. Pāriet uz iepriekšējo elementu',
  'previous-page': 'Iepriekšējā lapaspuse. Pāriet uz iepriekšējo lapu',
  'privacy-policy': 'Privātuma politika',
  print: 'Drukāt',
  recommendation: 'Rekomendācija',
  queue: 'Rinda',
  redo: 'Atkārtot atcelto darbību',
  refresh: 'Atjaunot. Atsvaidzināt. Atlasīt',
  registry: 'Reģistri. Reģistrs. Žurnāls',
  'registry-settings': 'Reģistru iestatījumi',
  remove: 'Attīrīt izvēlēto vērtību',
  'remove-item': 'Noņemt elementu no saraksta. Izdzēst elementu no saraskta',
  reports: 'Atskaites',
  reset: 'Atiestatīt. Atjaunot noklusējuma vērtības',
  role: 'Loma. Lomu saraksts',
  'rotate-clockwise': 'Pagriezt pulksteņrādītāja virzienā',
  'rotate-counterclockwise': 'Pagriezt pretēji pulksteņrādītāja virzienam',
  save: 'Saglabāt. Saglabāt datu bāzē',
  search: 'Meklēt. Meklēšanas lauks',
  'search-details': 'Meklēt sarakstā. Detalizēta meklēšana',
  selected: 'Izvēlēta vērtība',
  'service-catalogue': 'Pakalpojumu katalogs',
  'shopping-catalogue': 'Veikals. Preces. Nopērkamo preču katalogs',
  sign: 'Paraksts. Parakstīt. Elektroniski parakstīt. Paraksta saraksts. Neizmanto statusa apzīmēšanai!',
  settings: 'Iestatījumi',
  share: 'Koplietot. Dalīties',
  'shopping-catalog': 'Iepirkumu katalogs',
  software: 'Programmatūra',
  'sort-default': 'Noklusētā kārtošana',
  'sort-down': 'Kārtot dilstošā secībā',
  'sort-up': 'Kārtot augošā secībā',
  star: 'Zvaigzne. Vērtējums. Vērtēšana',
  'star-filled': 'Aizpildīta zvaigzne. Aizpildīts vērtējums',
  'star-half': 'Daļēji aizpildīta zvaigzne. Daļēji aizpildīts vērtējums',
  'star-settings': 'Vērtējumu iestatījumi',
  stop: 'Apturēt',
  submit: 'Iesniegt',
  switch: 'Mainīt. Samainīt vietām. Nomainīt vienu vērtību pret citu',
  tag: 'Atslēgvārds. Birka. Atzīme',
  task: 'Uzdevums. Uzdevumu saraksts',
  team: 'Komanda. Kolektīvs',
  template: 'Veidne. Šablons',
  'text-bold': 'Treknraksts',
  'text-italic': 'Slīpraksts',
  'text-underline': 'Pasvītrots teksts',
  'text-strikethrough': 'Pārsvītrots teksts',
  theme: 'Tēma. Krāsu režīms',
  'theme-auto': 'Automātiskais krāsu rēžims. Automātiskā tēma',
  'theme-contrast': 'Kontrastainais krāsu režīms. Kontrastainā tēma',
  'theme-dark': 'Tumšais krāsu režīms. Tumšā tēma',
  'theme-light': 'Gaišais krāsu režīms. Gaišā tēma',
  time: 'Laiks. Pulkstenis',
  timer: 'Taimeris',
  tools: 'Rīki',
  translate: 'Tulkot. Tulkojums',
  undo: 'Atcelt darbību',
  unselected: 'Neatzīmēta vērtība',
  unlock: 'Atbloķēt. Atbloķēt objektu. Atslēgt',
  upload: 'Augšupielādēt',
  user: 'Lietotājs',
  'user-profile': 'Lietotāja profils',
  'user-change': 'Mainīt lietotāju',
  users: 'Lietotāji. Lietotāju saraksts',
  visible: 'Redzams',
  warning: 'Brīdinājums. Brīdinājuma paziņojums. Neizmanto validācijas rezultātu attēlošanai!',
  winter: 'Ziema. Sniegs',
  workflows: 'Darbplūsmas',
  'zoom-in': 'Pietuvināt. Palielināt',
  'zoom-out': 'Attālināt. Samazināt',
  apple: 'Apple logotips. Izmanto ar AppleId',
  digives: 'DigiVes logotips. Izmanto DigiVes projektos',
  eid: 'Latvijas eID karte. Elektroniskās identifikācijas karte. Izmanto, kad autorizācija notiek ar Latvijas eID palīdzību, tikai metodes izvēlē',
  eparaksts:
    '"eParaksts logotips". Izmanto Latvijas eParaksta autentifikācijas procesā, tikai metodes izvēlē, kad nav zināma konrēta eParaksta metode',
  'eparaksts-mobile':
    '"eParaksts Mobile" logotips. Izmanto Latvijas eParaksta autentifikācijas procesā, tikai metodes izvēlē',
  passport: 'Pase',
  riga: 'Rīgas pilsētas logotips. Izmanto Rīgas pilsētas projektos',
  facebook: 'Facebook logotips',
  gitea: 'Gitea logotips',
  instagram: 'Instagram logotips',
  google: 'Google logotips',
  'google-color': 'Google krāsainais logotips',
  twitter: 'Twitter logotips',
  x: 'X logotips',
  zz: '"ZZ Dats" logotips',
  'zz-amkr':
    'Latvijas Ārlietu ministrijas logotips. Izmanto Latvijas Ārlietu ministrijas projektos',
  'zz-chill-bill': '"Chill Bill" logotips',
  'zz-drones': '"Dronu" projekta logotips',
  'zz-eikis': '"EIKIS" logotips',
  'zz-gvedis': '"GVEDIS" logotips',
  'zz-iwirom': '"IWiRoM" logotips',
  'zz-kalps': '"Kalps" logotips',
  'zz-lietvaris': '"Lietvaris" logotips',
  'zz-lx': '"LX" logotips',
  'zz-nino': '"NINO" logotips',
  'zz-sairis': '"SAIRIS" logotips',
  'zz-valsts': 'Latvijas Valsts iestāžu logotips',
  'zz-viddis': '"VIDDIS 2023" logotips',
  'zz-virsis': '"VIRŠIS" logotips',
});

const iconsPrepared = shallowRef();
const query = shallowRef('');

onMounted(() => {
  viewStore.goBack = false;
  iconsPrepared.value = lxIconUtils.getAvailableIconsMatrix();
});
</script>

<template>
  <div>
    <div class="lx-toolbar lx-sticky" id="icon-search-bar">
      <LxTextInput
        v-model="query"
        kind="search"
        placeholder="Ievadiet ikonas nosaukumu vai pielietojumu, lai atrastu piemērotāko ikonu"
      />
      <div class="pseudo-header">
        <div class="icon-set-name">CDS</div>
        <div class="icon-set-name">material</div>
        <div class="icon-set-name">brand</div>
        <div class="icon-name">Ikonas nosaukums</div>
      </div>
    </div>
    <icon-display
      v-for="i in iconsPrepared"
      v-bind:key="i"
      :id="i.id"
      :icon="i.icon"
      :description="iconsDescriptions[i.icon]"
      :has-cds="i.inArray1"
      :has-brand="i.inArray2"
      :has-material="i.inArray3"
      :query="query"
    />
  </div>
</template>
