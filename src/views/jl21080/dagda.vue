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
        Dagda, mazpilsēta Latgales sirdī, vienmēr būs manas mājas. Lai gan tagad dzīvoju un studēju Rīgā,
        Dagda ir vieta, kur pavadīju visu savu bērnību, un tā joprojām ir mana sirds vieta. Šeit, starp zaļajiem mežiem un zilajiem ezeriem,
        manas dienas pagāja burvīgi, pavadot laiku ar draugiem, ejot makšķerēt un izzinot dabas noslēpumus.
        Katru reizi, kad atgriežos Dagdā, jūtos kā laika mašīnā – viss šķiet tik pazīstams, tomēr ar katru apmeklējumu es pamanu arī pārmaiņas.
        Vecie draugi ir pieauguši, daži pārcēlušies uz citām pilsētām, bet daži palikuši turpat. Pilsētas parks, kur agrāk skrējām un spēlējāmies,
        joprojām ir vieta, kur var satikties, atpūsties un uzzināt, kas dzīvē ir noticis jauns.
        Dagda ir ne tikai manas bērnības atmiņas, bet arī vieta, kur izaugu un ieguvu iemaņas, kas nepieciešamas pieauguša cilvēka dzīvē.
        Dagdā cilvēki ir sirsnīgi, viesmīlīgi un vienmēr gatavi palīdzēt. Katru reizi, kad atgriežos, mani sagaida ar prieku,
        un tas rada sajūtu, ka esmu atgriezies mājās.
        Lai gan Rīga piedāvā plašas iespējas izglītībai un karjerai, Dagda vienmēr būs mana miera un prieka oāze.
        Šeit ir mana pagātne, manas saknes un vieta, kur vienmēr atgriezīšos ar prieku.
      </LxRow>
      <LxRow :column-span="1">
        <img src="./img/Coat_of_Arms_of_Dagda.png" alt="Dagdas ģērbonis">
      </LxRow>
      <LxRow :column-span="4">
        <img src="./img/dome.jpg" alt="Dagdas dome">
      </LxRow>
    </LxForm>
  </div>
</template>