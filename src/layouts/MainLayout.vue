<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// ToDo: develop login & get session
// eslint-disable-next-line no-unused-vars
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

// ToDo: develop login & get session
// eslint-disable-next-line no-unused-vars

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
    label: translate.t('pages.dashboard.title'),
    icon: 'dashboard',
    to: { name: 'dashboard' },
  },
  {
    label: translate.t('pages.sandbox.titleShort'),
    icon: 'tools',
    to: { name: 'sandbox' },
  },

  {
    label: translate.t('pages.forms.title'),
    icon: 'form',
    to: { name: 'forms' },
  },

  {
    label: translate.t('pages.utility.titleShort'),
    icon: 'registry-settings',
    to: { name: 'utility' },
  },
  {
    label: translate.t('pages.icons.title'),
    icon: 'icons',
    to: { name: 'icons' },
  },
  {
    label: translate.t('pages.showroom.title'),
    icon: 'star',
    to: { name: 'showroom' },
  },
  {
    label: translate.t('pages.esign.title'),
    icon: 'sign',
    to: { name: 'esign' },
  },
  {
    label: 'Skatīt profilu',
    icon: 'user-profile',
    to: { name: 'userProfile' },
    type: 'user-menu',
  },
  {
    label: 'Mainīt lomu',
    icon: 'role',
    to: { name: 'roleSelection' },
    type: 'user-menu',
  },
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

function languageChanged(locale) {
  console.log(`Language changed to ${locale.id}`);
}
function alertItemClicked(alert) {
  console.log(`Clicked on alert id: ${alert.id}`);
}
function alertsClicked() {
  console.log('Alerts opened');
}
function helpClicked() {
  console.log('Help opened');
}
const languages = ref([
  {
    id: 'lv',
    name: 'Latviešu',
  },
  {
    id: 'eng',
    name: 'Angļu (English)',
  },
  {
    id: 'ua',
    name: 'Ukraiņu (Українська)',
  },
  {
    id: 'jp',
    name: 'Japāņu (日本語)',
  },
]);
const alerts = computed(() => {
  if (route.path !== '/') {
    return [
      {
        id: '1',
        name: 'Viss labi',
        level: 'success',
        description: 'Šis ir paziņojums, ka viss ir labi',
        clickable: false,
      },

      {
        id: '2',
        name: 'Briesmoņi neguļ!',
        level: 'warning',
        description: 'Esi uzmanīgs! Briesmoņi var būt jebkur!',
        clickable: false,
      },
      {
        id: '3',
        name: 'Demo API nav pieejams',
        level: 'error',
        description: 'Žēl, bet demo API nav pieejams. Varbūt, kādreiz...',
        clickable: false,
      },
      {
        id: '4',
        name: 'Atceries!',
        level: 'info',
        description: 'LX ≠ 60',
        clickable: false,
      },
      {
        id: '5',
        name: 'Es esmu klikšķināms paziņojums',
        level: 'info',
        description: 'Un nekas slikts nenotiks',
        clickable: true,
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
const systemIcon = ref('zz-lx');
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

const closeModal = () => {
  idleModalOpened.value = false;
};

const openModal = () => {
  idleModalOpened.value = true;
};

async function logout() {
  try {
    const resp = await authStore.logout();
    if (resp.status === 200 && resp.data !== '') {
      window.location.href = resp.data;
    } else {
      notify.pushSuccess(translate.t('shell.notifications.logOut'));
    }
  } catch (err) {
    const error = errors.get(err);
    if (error.status !== 401 && error.data) {
      notify.pushError(error.data);
    }
  } finally {
    closeModal();
  }
}

function primary() {
  logout();
  confirmStore.$state.isOpen = false;
}
function secondary() {
  confirmStore.$state.isOpen = false;
}

function openConfirmModal() {
  confirmStore.push('Iziet', 'Vai tiešām vēlaties iziet?', 'Jā', 'Nē', primary, secondary);
}

function confirmModalClosed() {
  confirmStore.$state.isOpen = false;
}

async function getSession() {
  try {
    await authStore.fetchSession();
  } catch (err) {
    const error = errors.get(err);
    if (error.status === 401) {
      logout();
    } else if (error.data) {
      notify.pushError(error.data);
    }
  }
}

async function callKeepAlive() {
  try {
    await authStore.keepAlive();
  } catch (err) {
    const error = errors.get(err);
    if (error.status === 401) {
      logout();
    } else if (error.data) {
      notify.pushError(error.data);
    }
  }
}

const checkApiSession = () => {
  if (idle.value || idleModalOpened.value) {
    getSession();
  } else {
    callKeepAlive();
  }
};

useIntervalFn(() => {
  if (!authStore.session.active) {
    if (idleModalOpened.value) {
      closeModal();
      router.push({ name: 'sessionEnded' });
    }
    return;
  }
  if (authStore.session.secondsToLive < 1) {
    logout();
    closeModal();
    return;
  }
  if (authStore.session.secondsToLive < authStore.session.secondsToCountdown) {
    if (!idleModalOpened.value) {
      openModal();
    }
  } else if (idleModalOpened.value) {
    closeModal();
    return;
  }
  const refreshIntervals = authStore.session.secondsToLive % secondsCheckApiInterval === 0;
  const refreshBeforeWarn =
    authStore.session.secondsToLive - 3 < authStore.session.secondsToCountdown && !idle.value;
  const refreshBeforeLogout = authStore.session.secondsToLive === 3;
  if (refreshIntervals || refreshBeforeWarn || refreshBeforeLogout) {
    checkApiSession();
  }
  authStore.session.secondsToLive -= 1;
}, 1000);

async function continueSession() {
  try {
    await authStore.keepAlive();
    notify.pushSuccess(translate.t('shell.notifications.sessionContinued'));
  } catch (err) {
    notify.pushError(translate.t('shell.notifications.sessionContinuedFailed'));
    if (err.response.status === 401) {
      logout();
    }
  } finally {
    closeModal();
  }
}

invoke(async () => {
  // @ts-ignore
  await until(() => authStore.showSessionEndCountdown).toBe(true);
  notify.pushWarning(translate.t('shell.notifications.sessionEndingSoon'));
});

function idleModalPrimary() {
  continueSession();
}
function idleModalSecondary() {
  logout();
}
</script>
<template>
  <div>
    <div>
      <LxShell
        :system-name="translate.t('title.fullName')"
        :system-subheader="translate.t('title.subheader')"
        :system-name-short="systemName"
        :user-info="userInfo"
        :nav-items="nav"
        :nav-items-selected="selectedNavItems"
        :mode="shellMode"
        :page-label="pageTitle"
        :page-back-button-visible="showBackButton"
        :page-breadcrumbs="breadcrumbs"
        :page-index-path="{ name: 'home' }"
        :has-language-picker="true"
        :languages="languages"
        :system-icon="systemIcon"
        :has-cover-logo="false"
        :cover-image="null"
        :cover-image-dark="null"
        :cover-logo="null"
        :has-alerts="true"
        :has-help="true"
        :has-theme-picker="true"
        :alerts-kind="alertsKind"
        :alerts="alerts"
        :navigating="appStore.$state.isNavigating"
        :showIdleModal="idleModalOpened"
        :secondsToLive="authStore.session.secondsToLive"
        :confirmDialogData="confirmStore"
        :confirmPrimaryButtonBusy="false"
        :confirmPrimaryButtonDestructive="true"
        v-model:notifications="notify.notifications"
        v-model:selected-language="selectedLanguage"
        v-model:theme="theme"
        :hideNavBar="!viewStore.navBar"
        @confirmModalClosed="confirmModalClosed"
        @language-changed="languageChanged"
        @alert-item-click="alertItemClicked"
        @alerts-click="alertsClicked"
        @help-click="helpClicked"
        @go-home="goHome"
        @go-back="goBack"
        @log-out="openConfirmModal"
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
