<script setup>
import { onMounted, ref, computed } from 'vue';
import {
  LxForm,
  LxRow,
  LxTextInput,
  LxList,
  LxSection,
} from '@wntr/lx-ui';
</script>
<template>
  <div style="font-size: 20px;">
    <LxForm
      :column-count="4"
      :show-footer="false"
      :show-header="false"
      >
      <LxRow :column-span="3">
        Dagdas vidusskola ir vieta, kur esmu pavadījis nozīmīgu daļu savas bērnības un pusaudžu gadu.
        Skolas sienās ieguvu ne tikai zināšanas, bet arī daudz neaizmirstamu atmiņu un draugu.
        Varu lepoties ar to, ka esmu aizstāvējis skolas godu, piedaloties dažādās olimpiādēs. Ar skolotāju un klasesbiedru atbalstu esmu guvis vairāku priekšmetu olimpiādēs, kas ne tikai stiprināja manu zināšanu bāzi, bet arī deva pārliecību par saviem spēkiem. Katrs sasniegums bija kā solis ceļā uz manu nākotni. Skolotāju ieguldījums šajā dzīves ceļā ir nenovērtējams.
        Atgriežoties Dagdā un ejot garām skolai, vienmēr iekritu atmiņās. Klases stundas, sporta sacensības un draugu smiekli ir tik labi palikuši atmiņā, it kā tas viss būtu noticis vakar.  Vismīļākais skolas laiks bija otro semestru beigas, kad ārā bija jauks laiks un gaisā virmoja brīvlaika sajūta. Šis bija laiks, kad mēs, skolēni, ar nepacietību gaidījām vasaru, baudot pēdējās skolas dienas siltajos saules staros. Pēc stundām bieži vien pulcējāmies skolas pagalmā vai gājām pastaigās pa tuvējo apkārtni, izbaudot brīvības sajūtu.
        Dagdas vidusskola ir vieta, kur ieguvu ne tikai zināšanas, bet arī komunikācijas prasmes un citas svarīgas iemaņas. Lai gan tagad dzīvoju un studēju Rīgā, Dagdas vidusskola vienmēr būs mans izglītības šūpulis un vieta, kur veidoju savu personību.
      </LxRow>
      <LxRow :column-span="1">
        <img src="./img/Coat_of_Arms_of_Dagda.png" alt="Dagdas ģērbonis">
      </LxRow>
      <LxRow :column-span="4">
        <img src="./img/skola.jpg" alt="Dagdas vidusskola">
      </LxRow>
    </LxForm>
  </div>
</template>