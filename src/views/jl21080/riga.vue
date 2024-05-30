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
        Pēc vidusskolas beigšanas vēlējos turpināt studijas Rīgā, tāpēc arī izvēlējos studēt tieši šajā pilsētā.
        Rīga ir Latvijas galvaspilsēta un izglītības, kultūras un inovāciju centrs, piedāvājot plašas iespējas akadēmiskajai un personīgajai izaugsmei.
        Šeit ir koncentrētas daudzas prestižas augstskolas, tostarp arī Latvijas Universitāte, kurā nolēmu studēt.
        Studijas Rīgā man ir devušas iespēju iepazīt daudzveidīgu un dinamisku dzīvi, salīdzinot ar Dagdu.
        Pilsēta piedāvā daudzveidīgas izklaides iespējas, kultūras pasākumus un sporta aktivitātes, kas padarīja manu dzīvi interesantāku un aizraujošāku.
        Papildus akadēmiskajām zināšanām esmu ieguvis arī vērtīgu pieredzi, piedaloties dažādos studentu pasākumos.
        Kā arī esmu atradis darbu IT nozarē, kas ļaus arī turpmāk sasaistīt savu dzīvi tieši ar šo nozari.
        Dzīvojot Rīgā, esmu iepazinis arī dažādus cilvēkus no dažādām Latvijas vietām un ārvalstīm, kas ļāva man paplašināt savu redzesloku.
        Rīga ir pilsēta, kas piedāvā neierobežotas iespējas gan mācībām, gan personīgajai attīstībai. Esmu pārliecināts, ka izvēlējos pareizo vietu savas dzīves turpināšanai.
        Rīga ir kļuvusi par manām otrajām mājām, kurā es ar prieku pavadu savu laiku.
      </LxRow>
      <LxRow :column-span="1">
        <img src="./img/Coat_of_Arms_of_Riga_small.png" alt="Rīgas ģērbonis">
      </LxRow>
      <LxRow :column-span="4">
        <img src="./img/riga.jpg" alt="Rīga">
      </LxRow>
    </LxForm>
  </div>
</template>