<script setup>
import { shallowRef } from 'vue';
import { LxIcon, LxButton } from '@wntr/lx-ui';
import useNotifyStore from '@/stores/useNotifyStore';

const notifications = useNotifyStore();

const projects = shallowRef([
  {
    id: 'lx',
    name: 'LX Demo',
    icon: 'zz-lx',
    url: 'https://lx-dev.zzdats.lv/',
    brandColor: '#003D97',
    git: 'https://git.zzdats.lv/lx/demo',
  },

  {
    id: 'eikis-bo',
    name: 'EIKIS',
    icon: 'zz-eikis',
    url: 'https://eikis-dev.zzdats.lv/',
    brandColor: '#217391',
    git: 'https://git.zzdats.lv/eikis/portal-backoffice',
  },
  {
    id: 'eikis-ss',
    icon: 'zz-eikis',
    name: 'EIKIS: Self Service',
    url: 'https://eikis-selfservice-dev.zzdats.lv/',
    brandColor: '#217391',
    git: 'https://git.zzdats.lv/eikis/portal-selfservice',
  },
  {
    id: 'viddis',
    name: 'VIDDIS',
    icon: 'zz-valsts',
    url: 'https://viddis-dev.zzdats.lv/',
    brandColor: '#414875',
    git: 'https://git.zzdats.lv/viddis/portal',
  },
  {
    id: 'trading-licences',
    name: 'Tirdzniecības atļaujas',
    icon: 'riga',
    brandColor: '#254CD4',
    git: 'https://git.zzdats.lv/trading-licences/portal',
  },
  {
    id: 'iwirom',
    name: 'IWiRoM',
    icon: 'zz-iwirom',
    url: 'https://iwirom-dev.zzdats.lv/',
    brandColor: '#06283D',
    git: 'https://git.zzdats.lv/iwirom/portal',
  },
  {
    id: 'amkr',
    name: 'AMKR',
    icon: 'zz-amkr',
    url: 'https://amkr-dev.zzdats.lv/',
    brandColor: '#003D97',
    git: 'https://git.zzdats.lv/amkr/backoffice',
  },
  {
    id: 'kim',
    name: 'KIM',
    icon: 'zz-valsts',
    brandColor: '#9D2235',
    git: 'https://git.zzdats.lv/kim/portal',
  },
  {
    id: 'vbtai',
    name: 'VBTAI',
    icon: 'zz-virsis',
    git: 'https://git.zzdats.lv/vbtai/portal',
    brandColor: '#00875A',
  },
  {
    id: 'c19',
    name: 'Digitālais Covid-19 sertifikāts',
    icon: 'zz-virsis',
    git: 'https://git.zzdats.lv/dgc',
    brandColor: '#178935',
  },
  {
    id: 'virsis',
    name: 'VIRSIS',
    icon: 'zz-virsis',
    url: 'https://virsis-dev.zzdats.lv/',
    brandColor: '#268707',
    git: 'https://git.zzdats.lv/virsis/portal',
  },
  {
    id: 'vraa-mm',
    name: 'VRAA Maksājumu modulis',
    icon: 'zz-virsis',
    url: 'https://mm-dev.zzdats.lv/',
    brandColor: '#268707',
    git: 'https://git.zzdats.lv/vraa-mm',
  },
  {
    id: 'eforms',
    name: 'VRAA eFormas',
    icon: 'zz-virsis',
    url: 'https://vraa-eform-dev.zzdats.lv/',
    brandColor: '#268707',
    git: 'https://git.zzdats.lv/vraa-eform/portal',
  },

  {
    id: 'digives-auth',
    name: 'DigiVes: Administrēšana',
    icon: 'digives',
    url: 'https://digives-idauth-dev.lapsa.ciems.visiem/',
    brandColor: '#9F1853',
    git: 'https://git.zzdats.lv/digives/idauth-portal',
  },
  {
    id: 'digives-onko',
    name: 'DigiVes: Onko',
    icon: 'digives',
    url: 'https://digives-onko-tv.lapsa.ciems.visiem/',
    brandColor: '#9F1853',
    git: 'https://git.zzdats.lv/digives-oncology/portal',
  },
  {
    id: 'digives-epid',
    name: 'DigiVes: Epid',
    icon: 'digives',
    url: 'https://digives-epid-tv.lapsa.ciems.visiem/',
    brandColor: '#9F1853',
    git: 'https://git.zzdats.lv/digives-epid/portal',
  },
  {
    id: 'digives-notice',
    name: 'DigiVes: Steidzamais paziņojums',
    icon: 'digives',
    brandColor: '#9F1853',
    git: 'https://git.zzdats.lv/digives-notice/portal',
  },
  {
    id: 'sairis',
    name: 'SAIRIS',
    icon: 'zz-sairis',
    url: 'https://odp-tv.lapsa.ciems.visiem/login',
    brandColor: '#00a0b1',
    git: 'https://git.zzdats.lv/odp/portal',
  },
  {
    id: 'kalps',
    name: 'Kalps',
    icon: 'zz-kalps',
    git: 'https://git.zzdats.lv/kalps/portal',
    brandColor: '#813db0',
  },
]);

function getStyles(project) {
  const styles = `background-image: url("/imgs/showroom/${project.id}.jpg")`;
  const color = project.brandColor ? `--color-brand: ${project.brandColor}` : null;
  return `${styles}; ${color}`;
}

function clickProject(project) {
  if (project.url) {
    window?.open(project.url, '_blank');
  } else {
    notifications.pushInfo(
      `Projektam "${project.name}" nav nopublicētas demo vides`,
      'Sazinieties ar projekta komandu, lai apskatītu projektu!'
    );
  }
}
function openGit(project) {
  window?.open(project.git, '_blank');
}
</script>

<template>
  <div>
    <p>Šobrīd LX izmanto {{ projects.length }} projekti:</p>
    <ol class="lx-dashboard">
      <li
        v-for="project in projects"
        :key="project.id"
        class="lx-showcase"
        :style="getStyles(project)"
        @click="clickProject(project)"
        @keyup.space="clickProject(project)"
        @keyup.enter="clickProject(project)"
        tabindex="0"
      >
        <LxIcon :value="project.icon" icon-set="brand" />
        <div class="lx-toolbar">
          <label>{{ project.name }}</label>
          <LxButton
            v-if="project.git"
            icon="gitea"
            kind="ghost"
            icon-set="brand"
            @click="openGit(project)"
          />
        </div>
      </li>
    </ol>
  </div>
</template>
