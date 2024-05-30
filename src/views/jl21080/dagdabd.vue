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
        Dagdas bērnu dārzs ir vieta, kur sākās mans izglītības ceļš un bija pirmā pieredze sabiedriskajā dzīvē.
        Šeit, starp rotaļām un mācībām, es atradu savus pirmos draugus, ar kuriem vēlāk mācījos vidusskolā.
        Bērnu dārzā esmu piedalījies daudzos pasākumos un aktivitātēs, kas veicināja manu radošumu un zinātkāri.
        Mēs zīmējām, dziedājām, mācījāmies skaitīt un lasīt. Katra diena bija pilna jaunu piedzīvojumu.
        Audzinātāju rūpes un pacietība bija nenovērtējamas, un viņu ieguldījums mūsu attīstībā bija milzīgs.
        Vislabākās atmiņas man saistās ar pavasara beigām, kad ārā bija jauks laiks un gaisā virmoja brīvlaika sajūta.
        Šis bija laiks, kad mēs, mazie bērni, ar nepacietību gaidījām brīvdienas.Savas vasaras brīvdienas pavadīju pie vecvecākiem laukos,
        bet rudenī vienmēr ar prieku atgriezos uz bērnu dārzu, kur atkal varēju satikt savus draugus.
        Dagdas bērnu dārzs ir vieta, kur es iemācījos būt draudzīgs, ziņkārīgs un atvērts jauniem izaicinājumiem.
        Lai gan tagad dzīvoju Rīgā un mācos Latvijas Universitātē, Dagdas bērnu dārzs vienmēr paliks vieta, kur sākās mans ceļš uz izglītību.
      </LxRow>
      <LxRow :column-span="1">
        <img src="./img/Coat_of_Arms_of_Dagda.png" alt="Dagdas ģērbonis">
      </LxRow>
      <LxRow :column-span="4">
        <img src="./img/bdarzs.jpg" alt="Dagdas bērnu dārzs">
      </LxRow>
    </LxForm>
  </div>
</template>