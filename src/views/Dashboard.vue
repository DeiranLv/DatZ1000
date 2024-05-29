<script setup>
import { LxTile, LxWidget, LxIcon, LxInfoWrapper } from '@wntr/lx-ui';
import useAuthStore from '@/stores/useAuthStore';
import useViewStore from '@/stores/useViewStore';
import { computed, onMounted, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ReadmeWizard from '@/components/ReadmeWizard.vue';

const { lxVersions } = window.config;

const viewStore = useViewStore();
const viewportHeight = shallowRef(0);
const viewportWidth = shallowRef(0);
const viewportStyle = shallowRef('');
const screenHeightPt = shallowRef(0);
const screenWidthPt = shallowRef(0);
const screenStyle = shallowRef('');
const screenHeightPx = shallowRef(0);
const screenWidthPx = shallowRef(0);
const colors = shallowRef('');
const colorbits = shallowRef('');
const dpr = shallowRef('');

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\xa0');
}

function resize() {
  const scrW = window.screen.width;
  const scrH = window.screen.height;
  const vpW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vpH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  let sW;
  let sH;
  let vW;
  let vH;

  if (scrW > scrH) {
    sW = 100;
    sH = (100 * scrH) / scrW;
    vH = (100 * vpH) / scrW;
    vW = (100 * vpW) / scrW;
  } else {
    sH = 100;
    sW = (100 * scrW) / scrH;
    vH = (100 * vpH) / scrH;
    vW = (100 * vpW) / scrH;
  }

  screenStyle.value = `width: ${sW}px; height: ${sH}px;`;
  viewportStyle.value = `width: ${vW}px; height: ${vH}px;`;

  const pr = window.devicePixelRatio;
  const prString = (pr * 100).toFixed(0);

  const cd = screen.colorDepth;
  const cdString = 2 ** cd;

  viewportHeight.value = vpH;
  viewportWidth.value = vpW;
  screenHeightPt.value = scrH;
  screenWidthPt.value = scrW;
  screenHeightPx.value = scrH * pr;
  screenWidthPx.value = scrW * pr;
  colors.value = formatNumber(cdString);
  colorbits.value = `(${cd} biti)`;
  dpr.value = prString;
}

onMounted(async () => {
  resize();
  viewStore.showNavBar();
  window.addEventListener('resize', resize);
});
</script>

<template>
  <div>
    <div class="lx-dashboard" width="m" height="s">
      <LxTile icon="open" :label="'Dagda'" description="Dzimtā vieta" :to="{ name: 'dagda' }" style="font-size: 20px;" />
      <LxTile icon="open" :label="'Mājas Dagdā'" description="Pirmās mājas" :to="{ name: 'dagdahome' }" style="font-size: 20px;" />
      <LxTile icon="open" :label="'Dagdas bērnu dārzs'" description="Pirmie dzīves gājuma soļi" :to="{ name: 'dagdabd' }" style="font-size: 20px;" />
      <LxTile icon="open" :label="'Dagdas vidusskola'" description="Gūstot pamatzināšanas un socializējoties" :to="{ name: 'dagdavsk' }" style="font-size: 20px;" />
      <LxTile icon="open" :label="'Rīga'" description="Ceļā uz izaicinājumu pilnu dzīvi" :to="{ name: 'riga' }" style="font-size: 20px;" />
      <LxTile icon="open" :label="'Mājas Rīgā'" description="Otrās mājas" :to="{ name: 'rigahome' }" style="font-size: 20px;" />
      <LxTile icon="open" :label="'Latvijas Universitāte'" description="Vieta, kur kļūt par profesionālu" :to="{ name: 'lu' }" style="font-size: 20px;" />
      <LxWidget width="s" height="s" label="Darba autors:">
        <div class="stats" style="font-size: 18px;">Datorikas fakultātes 3. kursa students <b>Jevgēnijs Locs</b> jl21080</div>
      </LxWidget>
    </div>
  </div>
</template>