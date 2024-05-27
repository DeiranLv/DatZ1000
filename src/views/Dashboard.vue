<script setup>
import { LxTile, LxWidget, LxIcon, LxInfoWrapper } from '@wntr/lx-ui';
import useAuthStore from '@/stores/useAuthStore';
import useViewStore from '@/stores/useViewStore';
import { computed, onMounted, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import useNotifyStore from '@/stores/useNotifyStore';
import WizardWidget from '@/components/WizardWidget.vue';

const { lxVersions } = window.config;

const authStore = useAuthStore();
const viewStore = useViewStore();
const translate = useI18n();
const notifications = useNotifyStore();
const router = useRouter();
const notify = useNotifyStore();

function sanitizeVersion(version) {
  return version.replace(/[^0-9.]/g, '');
}

const nodeDescription =
  '<p> Uzsākot jaunu projektu, kas izmanto LX, neaizmirsti palielīties par to <a href="https://mms.zzdats.lv/lx/channels/lx-ui" rel="noopener" target="_blank" >#LX/UI Mattermost kanālā</a >! </p>';

const newProjectMarkup = `<ol><li><p>Nokopē <a href="https://git.zzdats.lv/lx/demo" rel="noopener" target="_blank"><strong>lx/demo</strong> repozitoriju</a>;</p></li><li>Pārliecinies, ka sanāk to uzbūvēt, izmantojot <a href="https://git.zzdats.lv/lx/demo/src/branch/develop/README.md" rel="noopener" target="_blank">README.md</a> instrukcijas;</li><li><p>Pielāgo savu <a href="https://git.zzdats.lv/lx/demo/src/branch/develop/src/layouts/MainLayout.vue" rel="noopener" target="_blank">MainLayout.vue</a> projekta vajadzībām;</p></li><li><p>Pārliecinies, ka <a href="https://git.zzdats.lv/lx/ui/releases" rel="noopener" target="_blank">lx-ui</a> atjaunots uz jaunākām versijām, palaižot terminālī šo komandu:</p><code>pnpm i -w @wntr/lx-ui@${sanitizeVersion(
  lxVersions.ui
)}</code></li><li>Par trūkumiem un uzlabojumu ierosinājumiem ziņo <a href="https://git.zzdats.lv/lx/ui/issues" rel="noopener" target="_blank">lx/ui issues sadaļā</a>. </li></ol>`;

const existingVueMarkup = `<ol><li><p>Pievieno savai lietotnei <a href="https://git.zzdats.lv/lx/ui/releases" rel="noopener" target="_blank">lx-ui</a> pakotņu jaunāko versiju, izmantojot komandu: </p><code>pnpm i -w @wntr/lx-ui@${sanitizeVersion(
  lxVersions.ui
)}</code> </li><li> <p>Tagad vari veidot skatus un komponentes, izmantojot LX!</p></li><li> Par trūkumiem un uzlabojumu ierosinājumiem ziņo <a href="https://git.zzdats.lv/lx/ui/issues" rel="noopener" target="_blank" >lx/ui issues sadaļā</a >.</li></ol>`;

const existingOtherMarkup = `<ol> <li> <p> <a href="https://vuejs.org/guide/quick-start.html#creating-a-vue-application" target="_blank" >Izveido Vue.js 3 lietotni</a > iekš sava portāla; </p></li><li> <p> Pārliecinies, ka lietotne izmanto <a href="https://nodejs.org/en/about" rel="noopener" target="_blank">node.js</a> un <a href="https://pnpm.io/installation" rel="noopener" target="_blank">pnpm</a> </p></li><li> <p> Pievieno jaunizveidotai Vue.js 3 lietotnei <a href="https://git.zzdats.lv/lx/ui/releases" rel="noopener" target="_blank">lx-ui</a> pakotņu jaunāko versiju, izmantojot komandu: </p><code>pnpm i -w @wntr/lx-ui@${sanitizeVersion(
  lxVersions.ui
)}</code> </li><li> <p>Tagad vari veidot skatus un komponentes, izmantojot LX!</p></li><li> Par trūkumiem un uzlabojumu ierosinājumiem ziņo <a href="https://git.zzdats.lv/lx/ui/issues" rel="noopener" target="_blank" >lx/ui issues sadaļā</a >. </li></ol>`;

const existingStylesMarkup = `<ol><li><p> Pievieno savam projektam <a href="https://git.zzdats.lv/lx/ui/releases" rel="noopener" target="_blank">lx-ui</a> pakotnes jaunāko versiju, izmantojot komandu: </p><code>pnpm i -w @wntr/lx-ui@${sanitizeVersion(
  lxVersions.ui
)}</code> </li><li> <p> Piesaisti LX ekspertus, lai izdomātu, kā var izmantot LX stilus tavā projektā, ierakstot ziņu <a href="https://mms.zzdats.lv/lx/channels/lx-ui" rel="noopener" target="_blank" >#LX/UI Mattermost kanālā</a></p></li></ol>`;

const existingApiMarkup =
  '<p>LX/UI ir komponentes un stili, kas ir domāti <em>front-end</em> lietotnēm.</p><p> Skati un portāli, kas ir veidoti, izmantojot LX, spēj strādāt ar praktiski jebkādās tehnoloģijās veidotiem API. </p><p> Ja Tavs API ir veidots, implementējot <a href="https://www.openapis.org/" rel="noopener" target="_blank">OpenAPI specifikāciju</a>, tad LX portāls visdrīzāk pat nepamanīs, ka viņa API nav veidots Go valodā (mums pat ir veiksmīgi piemēri, kad API ir veidots uz <em>.NET Core</em> bāzes). </p><p> Tiesa, cīnoties par standartizēšanu, pārizmantojamību un piemēru esamību, rekomendējam klienta API veidot, izmantojot Go un OpenAPI. </p>';

// item summary string part starts with "&" example --> "&item summary text"
// layout markup string part starts with "*" example --> "*minified layout markup"
// all main section titles should be wrapped with [brackets]

const GRAPH_DATA = `A[Izvēlies lietošanas scenāriju: &${nodeDescription}] -->|Man ir jātaisa <strong>jauns</strong> projekts, kurā gribu izmantot LX| B[Lai izveidotu jaunu LX portālu & *${newProjectMarkup}]
    A -->|Man jau ir <strong>eksistējošs</strong> projekts, kurā gribu izmantot LX| C[Izvēlies LX lietošanas scenāriju: &*]
    A -->|Negribu izmantot LX| D[Kaut kas te ir. & *<div class="really"></div>]
    C -->|Mans projekts izmanto Vue.js 3| E[Lai izmantotu LX komponentes portālos, kas jau izmanto Vue.js 3: & *${existingVueMarkup}]
    C -->|Man ir projekts citās tehnoloģijās un gribu izmantot LX komponentes| F[Lai izmantotu LX komponentes portālos, kas neizmanto Vue.js 3: & *${existingOtherMarkup}]
    C -->|Man ir projekts citās tehnoloģijās un gribu, lai tas izskatās pēc LX| G[Ja gribi, lai tavs portāls izskatās pēc LX, Tev būs jāizmanto CSS datnes no lx/ui bibliotēkas: & *${existingStylesMarkup}]
    C -->|Mana projekta API nav veidots Go valodā, bet es gribu izmantot LX| H[Tā vispār nav problēma. & *${existingApiMarkup}]
    `;

const greetingText = computed(() => {
  let ret = '';
  if (!authStore.isAuthorized) {
    return ret;
  }
  let name = authStore.userFirstName;
  if (name.endsWith('s') && !name.endsWith('us')) {
    name = name.substring(0, name.length - 1);
  }
  let timeOfDayGreeting = translate.t('greeting.default');
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    timeOfDayGreeting = translate.t('greeting.morning');
  } else if (hours >= 12 && hours < 19) {
    timeOfDayGreeting = translate.t('greeting.day');
  } else if (hours >= 19 && hours < 24) {
    timeOfDayGreeting = translate.t('greeting.evening');
  } else if (hours >= 0 && hours < 5) {
    timeOfDayGreeting = translate.t('greeting.night');
  }

  ret = `— ${timeOfDayGreeting}, ${name}!`;
  return ret;
});

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

function handleNodeSelect(node) {
  if (node === 'D') {
    notifications.pushError(
      'Notika kļūda, apstrādājot pieprasījumu',
      'Lūdzu, padomājiet vēlreiz un izvēlaties citu variantu!'
    );
  }
}

onMounted(async () => {
  resize();
  viewStore.showNavBar();
  window.addEventListener('resize', resize);
});
</script>

<template>
  <div>
    <div class="lx-dashboard">
      <LxWidget width="m" height="l" label="Sākam lietot LX!">
        <WizardWidget :graph="GRAPH_DATA" @node-selected="handleNodeSelect" />
      </LxWidget>

      <LxWidget width="m" height="s" label="Bibliotēku versijas">
        <div class="packages-list">
          <div class="package">
            <LxInfoWrapper>
              <a href="https://git.zzdats.lv/lx/ui/releases" target="blank" ref="noopener external">
                <LxIcon value="software" />
                <label>lx/ui</label>
                <p class="lx-description">{{ lxVersions.ui }}</p>
              </a>

              <template #panel>
                <div class="badges">
                  <img
                    alt="Pipeline status"
                    src="https://wp.zzdats.lv/api/badges/lx/ui/status.svg"
                  />
                  <img
                    alt="Maintainability Rating"
                    src="https://sq.zzdats.lv/api/project_badges/measure?project=lx-ui&metric=sqale_rating&token=sqb_047e72505dd2e6cd5e4cd76ca53e5e7e0fb37fec"
                  />
                  <img
                    alt="Reliability Rating"
                    src="https://sq.zzdats.lv/api/project_badges/measure?project=lx-ui&metric=reliability_rating&token=sqb_047e72505dd2e6cd5e4cd76ca53e5e7e0fb37fec"
                  />
                  <img
                    alt="Security Rating"
                    src="https://sq.zzdats.lv/api/project_badges/measure?project=lx-ui&metric=security_rating&token=sqb_047e72505dd2e6cd5e4cd76ca53e5e7e0fb37fec"
                  />

                  <img
                    alt="Lines of Code"
                    src="https://sq.zzdats.lv/api/project_badges/measure?project=lx-ui&metric=ncloc&token=sqb_047e72505dd2e6cd5e4cd76ca53e5e7e0fb37fec"
                  />
                  <img
                    alt="Bugs"
                    src="https://sq.zzdats.lv/api/project_badges/measure?project=lx-ui&metric=bugs&token=sqb_047e72505dd2e6cd5e4cd76ca53e5e7e0fb37fec"
                  />
                  <img
                    alt="Vulnerabilities"
                    src="https://sq.zzdats.lv/api/project_badges/measure?project=lx-ui&metric=vulnerabilities&token=sqb_047e72505dd2e6cd5e4cd76ca53e5e7e0fb37fec"
                  />
                  <img
                    alt="Code Smells"
                    src="https://sq.zzdats.lv/api/project_badges/measure?project=lx-ui&metric=code_smells&token=sqb_047e72505dd2e6cd5e4cd76ca53e5e7e0fb37fec"
                  />
                </div>
              </template>
            </LxInfoWrapper>
          </div>

          <div class="package">
            <a href="https://github.com/vuejs/core/releases" target="blank" ref="noopener external">
              <LxIcon value="none" />
              <label>vue</label>
              <p class="lx-description">{{ lxVersions.vue }}</p>
            </a>
          </div>
          <div class="package">
            <a href="https://github.com/vuejs/vue-router" target="blank" ref="noopener external">
              <LxIcon value="none" />
              <label>vue-router</label>
              <p class="lx-description">{{ lxVersions.vueRouter }}</p>
            </a>
          </div>

          <div class="package">
            <a
              href="https://github.com/vuejs/pinia/releases"
              target="blank"
              ref="noopener external"
            >
              <LxIcon value="none" />
              <label>pinia</label>
              <p class="lx-description">{{ lxVersions.pinia }}</p>
            </a>
          </div>
          <div class="package">
            <a
              href="https://github.com/vitejs/vite/releases"
              target="blank"
              ref="noopener external"
            >
              <LxIcon value="none" />
              <label>vite</label>
              <p class="lx-description">{{ lxVersions.vite }}</p>
            </a>
          </div>
        </div>
      </LxWidget>

      <LxTile
        icon="tools"
        label="Komponenšu smilškaste"
        description="LX komponenšu, servisu un stilu demonstrācija"
        :to="{ name: 'sandbox' }"
      />
      <LxTile
        icon="form"
        :label="$t('pages.forms.title')"
        description="Formu izmantošanas vadlīnijas un piemēri"
        :to="{ name: 'forms' }"
      />
      <LxTile
        icon="registry-settings"
        label="Palīgfunkciju demonstrācija"
        description="LX palīgfunkciju un to pielietojumu piemēri"
        :to="{ name: 'utility' }"
      />
      <LxTile
        icon="icons"
        label="Ikonu galerija"
        description="LX ikonu un to pielietojumu galerija"
        :to="{ name: 'icons' }"
      />
      <LxWidget width="m" height="s" label="Ekrāna informācija">
        <div class="screen-widget">
          <div class="aligner">
            <div class="display-settings">
              <div id="screen" class="screen" :style="screenStyle"></div>
              <div id="viewport" class="viewport" :style="viewportStyle">
                <div class="backdrop"></div>
              </div>
            </div>
          </div>
          <div class="stats">
            <div class="lx-row">
              <label>Skatlauka izmērs punktos:</label>
              <p class="lx-data">{{ viewportWidth }}×{{ viewportHeight }}</p>
            </div>
            <div class="lx-row">
              <label>Ekrāna izšķirtspēja punktos:</label>
              <p class="lx-data">{{ screenWidthPt }}×{{ screenHeightPt }}</p>
            </div>
            <div class="lx-row">
              <label>Ekrāna izšķirtspēja pikseļos:</label>
              <p class="lx-data">{{ screenWidthPx }}×{{ screenHeightPx }}</p>
            </div>

            <div class="lx-row">
              <label>Punktu/pikseļu attiecība:</label>
              <p class="lx-data">{{ dpr }}%</p>
            </div>

            <div class="lx-row">
              <label>Pieejamo krāsu skaits</label>
              <p class="lx-data">{{ colors }} {{ colorbits }}</p>
            </div>
          </div>
        </div>
      </LxWidget>
      <LxTile
        icon="star"
        :label="$t('pages.showroom.title')"
        :description="$t('pages.showroom.description')"
        :to="{ name: 'showroom' }"
      />
      <LxTile
        icon="sign"
        :label="$t('pages.esign.title')"
        :description="$t('pages.esign.description')"
        :to="{ name: 'esign' }"
      />
    </div>
    <div class="lx-divider" style="height: 1rem" />
    <div class="lx-dashboard">
      <LxTile
        v-if="authStore.isAuthorized"
        icon="lock"
        label="Slēgtā sadaļa"
        description="Šī flīze ir redzama tikai lietotājam, kas ir ielogojies"
        :to="{ name: 'secureDemo' }"
      />
      <LxTile
        v-if="authStore.hasPermissionDelete('game/list')"
        icon="lock"
        label="Slēgtā sadaļa"
        description="Šī flīze ir redzama lietotājam, kas ir ielogojies un kuram ir tiesība 'game/list'"
        :to="{ name: 'secureDemo' }"
      />
    </div>
  </div>
</template>
