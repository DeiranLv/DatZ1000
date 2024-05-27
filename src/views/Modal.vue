<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import useNotifyStore from '@/stores/useNotifyStore';
import DemoView from '@/components/DemoView.vue';
import {
  LxToggle,
  LxTextInput,
  LxModal,
  LxButton,
  LxValuePicker,
  LxExpander,
  LxContentSwitcher,
} from '@wntr/lx-ui';
import { useDemoStore } from '@/stores/useDemoStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const demoStore = useDemoStore();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
  viewStore.description = translate.t('pages.modal.description');
});
const notificationStore = useNotifyStore();

const primaryLabel = ref('Vou!');
const secondaryLabel = ref('Aizvērt');
const primaryButtonShow = ref(true);
const secondaryButtonShow = ref(true);
const secondaryButtonClose = ref(true);
const escEnabled = ref(true);
const primaryButtonDestructive = ref(false);
const closeButtonHide = ref(false);
const testModal = ref();
const primaryButtonDisabled = ref(false);

const sizes = [
  {
    id: 's',
    name: 's',
  },
  {
    id: 'm',
    name: 'm',
  },
  {
    id: 'l',
    name: 'l',
  },
  {
    id: 'xl',
    name: 'xl',
  },
];
const kinds = [
  {
    id: 'default',
    name: 'default',
  },
  {
    id: 'native',
    name: 'native',
  },
];
const selectedKindId = ref(kinds[0].name);

const selectedSizeId = ref('s');

const propExpander = ref(false);
const eventsExpander = ref(false);
const propAdditionalExpander = ref(false);

function primaryAction(e) {
  notificationStore.pushInfo('@primary-action lietots');
  e.close();
}
function secondaryAction() {
  notificationStore.pushInfo('@secondary-action lietots');
}
function closed() {
  notificationStore.pushInfo('@closed lietots');
}
const randomValue = ref(0);
function getRandomInt(max) {
  randomValue.value = Math.floor(Math.random() * max);
}
let rowsCopy = [
  {
    id: null,
  },
];
const editRowModal = ref();
function copyRowArray() {
  editRowModal.value.open();
  rowsCopy = demoStore.videoGames;
}
function saveRows() {
  demoStore.updateData(demoStore.videoGames);
  copyRowArray();
}
const routerValue = ref('');
function contentSwitcherClick() {
  if (routerValue.value === 'guidelines') {
    router.push({ name: 'modalGuidelines' });
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
  <DemoView
    kind="s"
    :show-value="false"
    :show-modal-button="false"
    label="LxModal"
    :git-link="baseGitUrl + 'Modal.vue'"
  >
    <div class="lx-region">
      <lx-button
        @click="
          testModal.open();
          getRandomInt(demoStore.videoGames.length);
        "
        kind="primary"
        label="Skatīt nejaušu videospēli!"
        icon="open"
      />
      <lx-modal
        ref="testModal"
        :size="selectedSizeId"
        :label="demoStore.videoGames[randomValue].name"
        :button-primary-label="primaryLabel"
        :button-primary-visible="primaryButtonShow"
        :button-primary-disabled="primaryButtonDisabled"
        :button-secondary-label="secondaryLabel"
        :button-secondary-visible="secondaryButtonShow"
        :button-secondary-is-cancel="secondaryButtonClose"
        :button-primary-is-destructive="primaryButtonDestructive"
        :disable-closing="closeButtonHide"
        :kind="selectedKindId"
        :escEnabled="escEnabled"
        @primary-action="primaryAction(testModal)"
        @secondary-action="secondaryAction"
        @closed="closed"
      >
        <p>
          {{ demoStore.videoGames[randomValue].description }}
        </p>
      </lx-modal>
    </div>

    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:button-primary-visible</label>
            <LxToggle v-model="primaryButtonShow" />
          </div>
          <div class="lx-row">
            <label>:button-primary-disabled</label>
            <LxToggle v-model="primaryButtonDisabled" />
          </div>
          <div class="lx-row">
            <label>:button-primary-label </label>
            <LxTextInput v-model="primaryLabel" />
          </div>
          <div class="lx-row">
            <label>:button-secondary-visible</label>
            <LxToggle v-model="secondaryButtonShow" />
          </div>
          <div class="lx-row">
            <label>:button-secondary-label</label>
            <LxTextInput v-model="secondaryLabel" />
          </div>
          <div class="lx-row">
            <label>:button-secondary-is-cancel</label>
            <LxToggle v-model="secondaryButtonClose" />
          </div>
          <div class="lx-row">
            <label>:kind</label>
            <LxValuePicker :items="kinds" id="id" v-model="selectedKindId" />
          </div>
          <div class="lx-row">
            <label>:escEnabled</label>
            <LxToggle v-model="escEnabled" />
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="propAdditionalExpander" label="Additional props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:button-primary-is-destructive</label>
            <LxToggle v-model="primaryButtonDestructive" />
          </div>
          <div class="lx-row">
            <label>:disable-closing</label>
            <LxToggle v-model="closeButtonHide" />
          </div>
          <div class="lx-row">
            <label>:size</label>
            <LxValuePicker :items="sizes" id="id" v-model="selectedSizeId" />
          </div>
          <div class="lx-row">
            <LxButton label="Vērtību redaktors" @click="copyRowArray" icon="open" />
            <LxModal
              ref="editRowModal"
              label="Rindu redaktors"
              size="xl"
              button-secondary-label="Aizvērt"
              button-primary-label="Saglabāt un aizvērt"
              :button-secondary-visible="true"
              :button-primary-visible="true"
              @primary-action="saveRows(), editRowModal.close()"
            >
              <div class="lx-pseudo-grid">
                <header class="lx-labels">
                  <label class="lx-cell lx-cell-l"> Name </label>
                  <label class="lx-cell lx-cell-l"> Description </label>
                </header>
                <div class="lx-row" v-for="f in rowsCopy" :key="f.id" title="test">
                  <div class="lx-cell lx-cell-l">
                    <LxTextInput v-model="f.name" />
                  </div>
                  <div class="lx-cell lx-cell-l">
                    <LxTextInput v-model="f.description" />
                  </div>
                </div>
              </div>
            </LxModal>
          </div>
        </div>
      </LxExpander>
      <LxExpander v-model="eventsExpander" label="Events" icon="at">
        <div class="lx-form">
          <div class="lx-row">
            <label>@primary-action</label>
            <code>-</code>
          </div>
          <div class="lx-row">
            <label>@secondary-action</label>
            <code>-</code>
          </div>
          <div class="lx-row">
            <label>@closed</label>
            <code>-</code>
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
