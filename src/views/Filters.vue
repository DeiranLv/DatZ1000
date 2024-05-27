<script setup lang="ts">
import { ref, onMounted, shallowRef, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import useNotifyStore from '@/stores/useNotifyStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxFilters,
  LxDateTimePicker,
  LxExpander,
  LxContentSwitcher,
  LxButton,
  LxModal,
  lxStringUtils,
  lxDateUtils,
  LxValuePicker,
} from '@wntr/lx-ui';
import { useDemoStore } from '@/stores/useDemoStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();
const notification = useNotifyStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.filters.description');
});

const usesFilters = ref(false);
const expanded = ref(true);
const disabled = ref(false);
const fastFilters = ref(demoStore.filterData);
const editModal = ref();
const filterName = ref(demoStore.videoGames[0].name);
const filterRating = ref(demoStore.videoGames[0].rating);
const filterDate = ref('2009-10-27');
const columnCount = ref(2);
const integerColumnCount = computed(() => Number(columnCount.value));

const texts = ref({
  filters: 'Filtri',
  search: 'Meklēt',
  clear: 'Notīrīt',
  fastFiltersLabel: 'Ātrie filtri',
});
const propExpander = ref(false);
const propAdditionalExpander = ref(false);
const badgePropExpander = ref(false);
const eventsExpander = ref(false);

const eventFilter = shallowRef({});
const eventResetFilters = shallowRef({});
const eventUpdateExpander = shallowRef({});
const eventFastFilterChanged = shallowRef({});

const buttonBadge = shallowRef();

const badgeTypes = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'info',
    name: 'info',
  },
  {
    id: 'good',
    name: 'good',
  },
  {
    id: 'warning',
    name: 'warning',
  },
  {
    id: 'important',
    name: 'important',
  },
];
const selectedBadgeTypeId = shallowRef('default');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getRandomDate(startDate, endDate) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;

  const randomDate = new Date(randomTimestamp);
  return randomDate;
}
function clearFilters() {
  filterName.value = null;
  filterRating.value = null;
  filterDate.value = null;
}
function fillFilters() {
  const startDate = new Date('2000-01-01');
  const endDate = new Date('2024-12-31');
  filterName.value = demoStore.videoGames[getRandomInt(demoStore.videoGames?.length)].name;
  filterRating.value = demoStore.videoGames[getRandomInt(demoStore.videoGames?.length)].rating;
  filterDate.value = lxDateUtils.formatDateJSON(getRandomDate(startDate, endDate));
}
function filterSearch(e) {
  notification.pushInfo('Filtrs', JSON.stringify(e));
  eventFilter.value = e;
}
function filterReset(e) {
  notification.pushInfo('Filtra atiestatīšana', JSON.stringify(e));
  eventResetFilters.value = e;
  clearFilters();
}
function updateExpanded(e) {
  notification.pushInfo('Atjauninājums paplašināts', JSON.stringify(e));
  eventUpdateExpander.value = e;
}
function fastFilterChanged(e) {
  notification.pushInfo('fastFilter changed to ', JSON.stringify(e));
  eventFastFilterChanged.value = e;
  fillFilters();
}

const deletedItems = ref([]);

const randomValue = ref([
  'Date filter',
  'Rating filter',
  'Popularity filter',
  'Name filter',
  'Description filter',
  'First filter',
]);

function isDeleted(fieldId) {
  if (deletedItems.value.find((id) => id === fieldId)) return true;
  return false;
}
function save(e) {
  fastFilters.value = fastFilters.value.filter((o) => !isDeleted(o.id));
  deletedItems.value = [];
  demoStore.updateFiltersData(fastFilters.value);
  e.close();
}
function returnItem(id) {
  deletedItems.value = deletedItems.value.filter((o) => o !== id);
}
function removeItem(id) {
  if (!isDeleted(id)) {
    deletedItems.value.push(id);
  }
}
function valuePickerNewItem() {
  const newId = lxStringUtils.generateUUID();
  const newName = randomValue.value[getRandomInt(6)];
  fastFilters.value.push({
    id: newId,
    name: newName,
  });
}

const kindItems = [
  { id: 'default', name: 'default' },
  { id: 'form', name: 'form' },
];
const selectedKind = shallowRef('default');

const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'filtersGuidelines', params: { id: 'filters' } });
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
  <DemoView kind="l" :show-value="false" label="LxFilters" :git-link="baseGitUrl + 'Filters.vue'">
    <lx-filters
      id="id"
      :texts="texts"
      v-model:expanded="expanded"
      :column-count="integerColumnCount"
      :uses-filters="usesFilters"
      :disabled="disabled"
      :fast-filters="fastFilters"
      id-attribute="id"
      name-attribute="name"
      :badge="buttonBadge"
      :badge-type="selectedBadgeTypeId"
      :kind="selectedKind"
      @filter="filterSearch"
      @reset-filters="filterReset"
      @update:expanded="updateExpanded"
      @fast-filter-click="fastFilterChanged"
    >
      <div class="lx-column">
        <div class="lx-row">
          <label>Nosaukums</label>
          <LxTextInput v-model="filterName" />
        </div>
      </div>
      <div class="lx-column">
        <div class="lx-row">
          <label>Vērtējums</label>
          <LxTextInput mask="decimal" v-model="filterRating" />
        </div>
      </div>
      <div class="lx-column">
        <div class="lx-row">
          <label>Izdošanas datums</label>
          <LxDateTimePicker v-model="filterDate" />
        </div>
      </div>
    </lx-filters>

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:texts.filters</label>
            <LxTextInput v-model="texts.filters" />
          </div>
          <div class="lx-row">
            <label>:texts.search</label>
            <LxTextInput v-model="texts.search" />
          </div>
          <div class="lx-row">
            <label>:texts.clear</label>
            <LxTextInput v-model="texts.clear" />
          </div>
          <div class="lx-row">
            <label>:column-count</label>
            <LxTextInput v-model="columnCount" mask="integer" />
          </div>
          <div class="lx-row">
            <label>:fastFilters</label>
            <lx-button
              @click="editModal.open()"
              kind="primary"
              label="Vērtību redaktors"
              icon="open"
            />
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
                  <label class="lx-cell lx-cell-l">:id</label>
                  <label class="lx-cell lx-cell-l">:name</label>
                  <label class="lx-cell lx-cell-l">Delete</label>
                </header>
                <div class="lx-row" v-for="f in fastFilters" :key="f.id" title="test">
                  <div class="lx-cell lx-cell-l">
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
                      @click="valuePickerNewItem()"
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
            <label>:disabled</label>
            <LxToggle v-model="disabled" />
          </div>

          <div class="lx-row">
            <label>v-model:expanded</label>
            <LxToggle v-model="expanded" />
          </div>

          <div class="lx-row">
            <label>:uses-filters</label>
            <LxToggle v-model="usesFilters" />
          </div>
          <div class="lx-row">
            <label>kind</label>
            <LxValuePicker :items="kindItems" v-model="selectedKind" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="badgePropExpander" label="Badge props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:badge</label>
            <LxTextInput v-model="buttonBadge"></LxTextInput>
          </div>
          <div class="lx-row">
            <label>:badge-type</label>
            <LxValuePicker
              :items="badgeTypes"
              id="badge-types"
              group-id="badge-types"
              v-model="selectedBadgeTypeId"
              kind="single"
            />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="eventsExpander" label="Events" icon="at">
        <div class="lx-form">
          <div class="lx-row">
            <label>@filter</label>
            <code>(e) : {{ JSON.stringify(eventFilter) }} </code>
          </div>
          <div class="lx-row">
            <label>@reset-filters</label>
            <code>(e) : {{ JSON.stringify(eventResetFilters) }} </code>
          </div>
          <div class="lx-row">
            <label>@update:expanded</label>
            <code>Update expander : {{ JSON.stringify(eventUpdateExpander) }} </code>
          </div>
          <div class="lx-row">
            <label>@fast-filter-changed</label>
            <code>(e) : {{ JSON.stringify(eventFastFilterChanged) }} </code>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
