<script setup lang="ts">
import { ref, onMounted, watch, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxValuePicker,
  LxExpander,
  LxRow,
  LxButton,
  LxModal,
  LxAppendableList,
  LxMap,
  LxNumberSlider,
} from '@wntr/lx-ui';
import useNotifyStore from '@/stores/useNotifyStore';

const notification = useNotifyStore();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.dateTimePicker.description');
});

const propExpander = shallowRef(false);
const slotsExpander = shallowRef(false);

const showSearch = shallowRef(false);
const showToolbar = shallowRef(true);

const colorItems = [
  {
    id: 'blue',
    name: 'blue',
  },
  {
    id: 'red',
    name: 'red',
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
    id: 'green',
    name: 'green',
  },
  {
    id: 'grey',
    name: 'grey',
  },
  {
    id: 'purple',
    name: 'purple',
  },
  {
    id: 'teal',
    name: 'teal',
  },
];

const one = ref({ lat: 56.946285, lng: 24.105078 });
const two = ref({ lat: 56.946285, lng: 23.105078 });
const onetwo = ref([
  [one.value.lat, one.value.lng],
  [two.value.lat, two.value.lng],
]);

const centerLat = ref(56.946285);
const centerLng = ref(24.946285);
const center = ref({ lat: centerLat.value, lng: centerLng.value });

watch([centerLat, centerLng], () => {
  center.value = { lat: centerLat.value, lng: centerLng.value };
});

watch(center, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    centerLat.value = center.value.lat;
    centerLng.value = center.value.lng;
  }
});

const zoom = ref(6);

const objDefinitions = ref([
  {
    id: 'markerOne',
    type: 'marker',
    location: one.value,
    draggable: true,
    value: 'Marker 1',
    color: 'red',
  },
  {
    id: 'markerTwo',
    type: 'marker',
    location: two.value,
    draggable: true,
    color: 'blue',
    value: 'Marker 1',
  },
  {
    id: 'lineOne',
    type: 'line',
    location: onetwo.value,
    color: 'green',
  },
  {
    id: 'polygonOne',
    type: 'polygon',
    location: [
      [57.1, 24.1],
      [57.3, 24.3],
      [57.3, 24.5],
      [57.1, 24.5],
    ],
  },
]);

const search = ref('');
function searchedValue(value) {
  notification.pushSuccess(`Search value: ${value}`);
  search.value = value;
}

const layerDefinitions = ref([
  {
    id: 'random',
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    opacity: 1,
  },
  {
    id: 'CyclOSM',
    name: 'CyclOSM',
    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    opacity: 1,
    attribution:
      '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
]);

const overlayLayerDefinitions = ref([
  {
    id: 'NASASnow',
    name: 'NASAGIBS.ModisTerraSnowCover',
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_NDSI_Snow_Cover/default/2023-12-27/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png',
    opacity: 1,
    attribution:
      'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
  },
  {
    id: 'NASATemp',
    name: 'NASAGIBS.ModisTerraLSTDay',
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Land_Surface_Temp_Day/default/2023-12-27/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png',
    opacity: 1,
    attribution:
      'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
  },
  {
    id: 'NASAAerosol',
    name: 'NASAGIBS.ModisTerraAOD',
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Aerosol/default/2023-12-27/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png',
    opacity: 1,
    attribution:
      'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
  },
]);

const objDefModal = ref();
const cloneObjDefinitions = ref();
function openObjDefModal() {
  cloneObjDefinitions.value = JSON.parse(JSON.stringify(objDefinitions.value));
  objDefModal.value.open();
}
function closeObjDefModal() {
  objDefModal.value.close();
}
function saveObjDefModal() {
  objDefinitions.value = JSON.parse(JSON.stringify(cloneObjDefinitions.value));
  objDefModal.value.close();
}

function toolbarButton() {
  if (objDefinitions.value?.length < 5) {
    objDefinitions.value.push({
      id: 'markerThree',
      type: 'marker',
      location: { lat: 56.957223, lng: 24.112431 },
      draggable: false,
      value: 'Lx HQ',
      color: 'blue',
    });
  }
  center.value = { lat: 56.957223, lng: 24.112431 };
  zoom.value = 17;
}

const selectedBase = ref(layerDefinitions.value[0].id);
const selectedOverlay = ref([overlayLayerDefinitions.value[1]?.id]);
const ignoreThemeChange = shallowRef(false);
const hasUserLocation = ref(false);

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <DemoView kind="m" :show-value="false" label="LxMap" :git-link="baseGitUrl + 'Map.vue'">
    <LxMap
      v-model:zoom="zoom"
      v-model:center="center"
      v-model:selected-base-layer="selectedBase"
      v-model:selected-overlay-layers="selectedOverlay"
      :baseLayerDefinitions="layerDefinitions"
      :overlayLayerDefinitions="overlayLayerDefinitions"
      :objectDefinitions="objDefinitions"
      :show-search="showSearch"
      :show-toolbar="showToolbar"
      :ignoreThemeChange="ignoreThemeChange"
      :hasUserLocation="hasUserLocation"
      @searched="searchedValue"
    >
      <template #toolbar>
        <LxButton
          icon="zz-lx"
          icon-set="brand"
          kind="ghost"
          @click="toolbarButton()"
          title="LX headquarters"
        />
      </template>
    </LxMap>
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>v-model:zoom</label>
            <LxNumberSlider :min="0" :max="18" v-model="zoom" class="map-zoom-slider" />
          </div>
          <div class="lx-row">
            <label>v-model:center</label>
            <div class="map-center-input">
              <label>lat</label>
              <LxTextInput v-model="centerLat" />
            </div>
            <div class="map-center-input">
              <label>lng</label>
              <LxTextInput v-model="centerLng" />
            </div>
          </div>
          <div class="lx-row">
            <label>:showSearch</label>
            <LxToggle v-model="showSearch" />
          </div>
          <div class="lx-row">
            <label>:showToolbar</label>
            <LxToggle v-model="showToolbar" />
          </div>
          <div class="lx-row">
            <label>:ignoreThemeChange</label>
            <LxToggle v-model="ignoreThemeChange" />
          </div>
          <div class="lx-row">
            <label>:hasUserLocation</label>
            <LxToggle v-model="hasUserLocation" />
          </div>
          <div class="lx-row">
            <label>:objectDefinitions</label>
            <LxButton label="Edit objectDefinitions" @click="openObjDefModal()" kind="secondary" />
            <LxModal
              ref="objDefModal"
              @primary-action="saveObjDefModal()"
              @secondary-action="closeObjDefModal()"
              button-primary-label="Saglabāt"
              :button-primary-visible="true"
              button-secondary-label="Aizvērt"
              :button-secondary-visible="true"
              label="objectDefinitions prop"
              size="l"
            >
              <LxAppendableList
                v-model="cloneObjDefinitions"
                :column-count="4"
                :canAddItems="false"
              >
                <template #customItem="{ item }">
                  <LxRow label="type">
                    <p class="lx-data">{{ item.type }}</p>
                  </LxRow>
                  <LxRow label="id">
                    <LxTextInput v-model="item.id" />
                  </LxRow>
                  <LxRow label="color">
                    <LxValuePicker
                      v-model="item.color"
                      :items="colorItems"
                      variant="dropdown"
                      :nullable="true"
                    />
                  </LxRow>
                  <LxRow label="location" v-if="item?.type === 'marker'">
                    <div class="map-coordinate">
                      <span>lat:</span>
                      <LxTextInput v-model="item.location.lat" />
                      <span>lng:</span>
                      <LxTextInput v-model="item.location.lng" />
                    </div>
                  </LxRow>
                  <LxRow label="location" v-if="item?.type === 'line'" rowSpan="2">
                    <div class="map-coordinate">
                      <span>lat:</span>
                      <LxTextInput v-model="item.location[0][0]" />
                      <span>lng:</span>
                      <LxTextInput v-model="item.location[0][1]" />
                    </div>
                    <div class="map-coordinate">
                      <span>lat:</span>
                      <LxTextInput v-model="item.location[1][0]" />
                      <span>lng:</span>
                      <LxTextInput v-model="item.location[1][1]" />
                    </div>
                  </LxRow>
                  <LxRow label="location" v-if="item?.type === 'polygon'" rowSpan="2">
                    <div class="map-coordinate">
                      <span>lat:</span>
                      <LxTextInput v-model="item.location[0][0]" />
                      <span>lng:</span>
                      <LxTextInput v-model="item.location[0][1]" />
                    </div>
                    <div class="map-coordinate">
                      <span>lat:</span>
                      <LxTextInput v-model="item.location[1][0]" />
                      <span>lng:</span>
                      <LxTextInput v-model="item.location[1][1]" />
                    </div>
                    <div class="map-coordinate">
                      <span>lat:</span>
                      <LxTextInput v-model="item.location[2][0]" />
                      <span>lng:</span>
                      <LxTextInput v-model="item.location[2][1]" />
                    </div>
                    <div class="map-coordinate">
                      <span>lat:</span>
                      <LxTextInput v-model="item.location[3][0]" />
                      <span>lng:</span>
                      <LxTextInput v-model="item.location[3][1]" />
                    </div>
                  </LxRow>
                  <LxRow label="value">
                    <LxTextInput v-model="item.value" />
                  </LxRow>
                  <LxRow label="draggable" v-if="item?.type === 'marker'">
                    <LxToggle v-model="item.draggable" />
                  </LxRow>
                </template>
              </LxAppendableList>
            </LxModal>
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="slotsExpander" label="Slots" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <code>#toolbar</code>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
