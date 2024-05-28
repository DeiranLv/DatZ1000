<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { LxShell, LxModal } from '@wntr/lx-ui';
import CoverBackground from '@/components/CoverBackground.vue';
import { invoke, until, useIdle, useIntervalFn } from '@vueuse/core';

import LoginView from '@/views/Login.vue';
import useErrors from '@/hooks/useErrors';
import useAuthStore from '@/stores/useAuthStore';
import useAppStore from '@/stores/useAppStore';
import useNotifyStore from '@/stores/useNotifyStore';
import useConfirmStore from '@/stores/useConfirmStore';
import useViewStore from '@/stores/useViewStore';

const { t } = useI18n();
const authStore = useAuthStore();
const notify = useNotifyStore();
const viewStore = useViewStore();
const errors = useErrors();
const router = useRouter();
const confirmStore = useConfirmStore();
const appStore = useAppStore();

const secondsToIdle = 10;
const secondsCheckApiInterval = 30;

const { idle } = useIdle(secondsToIdle * 1000);

const idleModalOpened = ref(false);

const translate = useI18n();
const route = useRoute();
const shellMode = computed(() => {
  let ret = 'default';
  if (route.path === '/') {
    ret = 'cover';
  }
  return ret;
});

const nav = [
  {
    label: 'Sākums',
    icon: 'collapse-right',
    to: { name: 'dashboard' },
  },  
  {
    label: 'Dagda',
    icon: 'collapse-right',
    to: { name: 'dagda' },
  },
  {
    label: 'Dagdas bērnu dārzs',
    icon: 'collapse-right',
    to: { name: 'dagdabd' },
  },
  {
    label: 'Dagdas vidusskola',    
    icon: 'collapse-right',
    to: { name: 'dagdavsk' },
  },
  {
    label: 'Rīga',
    icon: 'collapse-right',
    to: { name: 'riga' },
  },
  {
    label: 'Latvijas Universitāte',
    icon: 'collapse-right',
    to: { name: 'lu' },
  }
];

const systemName = computed(() => translate.t('title.shortName'));
const pageTitle = computed(() => translate.t(router.currentRoute.value.meta.title));

const breadcrumbs = computed(() => {
  const ret = [];

  if (route.meta.breadcrumbs) {
    route.meta.breadcrumbs.forEach((item) => {
      ret.push({
        label: translate.t(item.text),
        to: item.to,
      });
    });
  }
  return ret;
});

const showBackButton = computed(() => breadcrumbs.value.length > 0);

const selectedNavItems = computed(() => {
  const ret = {};
  ret[router.currentRoute.value.name] = true;
  if (route.meta?.breadcrumbs) {
    route.meta?.breadcrumbs.forEach((item) => {
      ret[item.to?.name] = true;
    });
  }
  return ret;
});

function goBack(path) {
  if (path !== -1) {
    router.push(path);
  } else {
    router.back();
  }
}
function goHome(path) {
  router.push(path);
}

function alertsClicked() {
  console.log('Alerts opened');
}
function helpClicked() {
  console.log('Help opened');
}

const alerts = computed(() => {
  if (route.path !== '/') {
    return [
      {
        id: '1',
        name: 'Lapas autors:',
        level: 'info',
        description: 'Datorikas fakultātes 3. kursa students Jevgēnijs Locs jl21080',
        clickable: false,
      },
    ];
  }
  return null;
});

onMounted(() => {
  if (authStore.session.active) {
    authStore.keepAlive();
  }
});
const selectedLanguage = ref();
const systemIcon = ref('riga');
const alertsKind = ref('combo');

const userInfo = computed(() => {
  if (authStore.isAuthorized) {
    return {
      firstName: authStore.session?.given_name,
      lastName: authStore.session?.family_name,
      description: authStore.session?.role ? t(`roles.${authStore.session?.role}`) : null,
      institution: null,
    };
  }
  return null;
});

const theme = ref('auto');

useIntervalFn(() => {
    logout();
    closeModal();
    return;
    if (err.response.status === 401) {
invoke(async () => {
</script>
<template>
  <div>
    <div>
      <LxShell
        :system-name="'DV uz LU'"
        :system-subheader="'No Dagdas vidusskolas uz Latvijas Universitāti'"
        :system-name-short="'DV uz LU'"
        :user-info="userInfo"
        :nav-items="nav"
        :nav-items-selected="selectedNavItems"
        :mode="shellMode"
        :page-label="pageTitle"
        :page-back-button-visible="showBackButton"
        :page-breadcrumbs="breadcrumbs"
        :page-index-path="{ name: 'home' }"
        :system-icon="systemIcon"
        :has-cover-logo="false"
        :cover-image="null"
        :cover-image-dark="null"
        :cover-logo="true"
        :has-alerts="true"
        :has-theme-picker="true"
        :alerts="alerts"
        :navigating="appStore.$state.isNavigating"
        :showIdleModal="idleModalOpened"
        :confirmPrimaryButtonBusy="false"
        :confirmPrimaryButtonDestructive="true"
        v-model:theme="theme"
        :hideNavBar="!viewStore.navBar"
        @confirmModalClosed="confirmModalClosed"
        @go-home="goHome"
        @go-back="goBack"
        @idleModalPrimary="idleModalPrimary"
        @idleModalSecondary="idleModalSecondary"
      >
        <template #backdrop>
          <CoverBackground />
        </template>
        <template #coverArea>
          <div class="lx-button-set">
            <LoginView></LoginView>
          </div>
        </template>

        <template #logo>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
          >
            <path
              d="M25,1.7C12.1,1.7,1.7,12.1,1.7,25c0,8.4,4.5,15.8,11.2,19.9L25,32.8l0,0l0,0l9.1,9.1c0,0,0,0,0,0l3,3
	c6.7-4.1,11.2-11.5,11.2-20C48.3,12.1,37.9,1.7,25,1.7z M12.6,39.6C8.4,36.1,5.8,30.8,5.8,25c0-3.3,0.8-6.3,2.3-9L22.1,30L12.6,39.6
	z M10.4,12.6c3.5-4.1,8.8-6.8,14.6-6.8c5.8,0,11.1,2.6,14.6,6.8L25,27.2L10.4,12.6z M37.4,39.6L27.8,30l14.1-14.1
	c1.5,2.7,2.3,5.8,2.3,9.1C44.2,30.9,41.5,36.1,37.4,39.6z"
            />
          </svg>
        </template>

        <template #logoSmall>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
          >
            <path
              d="M25,1.7C12.1,1.7,1.7,12.1,1.7,25c0,8.4,4.5,15.8,11.2,19.9L25,32.8l0,0l0,0l9.1,9.1c0,0,0,0,0,0l3,3
	c6.7-4.1,11.2-11.5,11.2-20C48.3,12.1,37.9,1.7,25,1.7z M12.6,39.6C8.4,36.1,5.8,30.8,5.8,25c0-3.3,0.8-6.3,2.3-9L22.1,30L12.6,39.6
	z M10.4,12.6c3.5-4.1,8.8-6.8,14.6-6.8c5.8,0,11.1,2.6,14.6,6.8L25,27.2L10.4,12.6z M37.4,39.6L27.8,30l14.1-14.1
	c1.5,2.7,2.3,5.8,2.3,9.1C44.2,30.9,41.5,36.1,37.4,39.6z"
            />
          </svg>
        </template>

        <router-view />
      </LxShell>
    </div>
  </div>
</template>
