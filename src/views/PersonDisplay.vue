<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useViewStore from '@/stores/useViewStore';
import DemoView from '@/components/DemoView.vue';
import { LxTextInput, LxExpander, LxPersonDisplay, LxValuePicker } from '@wntr/lx-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const translate = useI18n();
const viewStore = useViewStore();

onMounted(() => {
  viewStore.goBack = true;
});

const propExpander = shallowRef(true);

const value = ref('Gabe Newell');
const description = ref('@gaben');
const role = ref('Co-founder and president');
const institution = ref('Valve Software');

const size = ref('m');
const sizes = ref([
  { id: 's', name: 's' },
  { id: 'm', name: 'm' },
  { id: 'l', name: 'l' },
]);

const baseGitUrl = window.config.gitLxComponentsUrl;
</script>
<template>
  <!--
  <LxContentSwitcher :items="itemsNav" v-model="routerValue" @click="contentSwitcherClick()" />
  -->
  <DemoView
    kind="s"
    :show-value="false"
    label="LxStateDisplay"
    :git-link="baseGitUrl + 'PersonDisplay.vue'"
  >
    <LxPersonDisplay
      :value="value"
      :description="description"
      :role="role"
      :institution="institution"
      :size="size"
    />
    <template #menu>
      <LxExpander v-model="propExpander" label="Main props" icon="config">
        <div class="lx-form">
          <div class="lx-row">
            <label>:value</label>
            <LxTextInput v-model="value" label=":value" />
          </div>
          <div class="lx-row">
            <label>:size</label>
            <LxValuePicker :items="sizes" v-model="size" />
          </div>
          <div class="lx-row">
            <label>:description</label>
            <LxTextInput v-model="description" label=":description" />
          </div>
          <div class="lx-row">
            <label>:role</label>
            <LxTextInput v-model="role" label=":description" />
          </div>
          <div class="lx-row">
            <label>:institution</label>
            <LxTextInput v-model="institution" label=":description" />
          </div>
        </div>
      </LxExpander>
    </template>
  </DemoView>
</template>
