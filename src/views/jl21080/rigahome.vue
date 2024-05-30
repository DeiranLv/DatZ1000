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
        Uzsākot studijas universitātē, bija jāmaina dzīves vieta, jo nav iespējams studēt 250 km attālumā no universitātes.
        Bija divi varianti: dzīvot kojās vai dzīvot dzīvokli. Izvēlējos otro variantu. Šobrīd nevar spriest, kāds no variantiem labāks,
        jo kojās nebiju dzīvojis, bet esmu dzirdējis, ka tur ir diezgan jautri, ja apkārt ir labi cilvēki, tomēr arī savā dzīvoklī ir labi dzīvot.
        Protams, šī dzīves vieta nespēja man aizstāt māju Dagdā, bet šeit es arī jūtos labi un komfortabli. Dzīvoju diezgan tuvu Mežaparkam,
        tāpēc bieži eju pastaigā uz šo parku, kur arī var atpūsties no straujās pilsētas dzīves. Iespējams, ka pēc studijām būs jāmeklē jaunu dzīves vietu,
        bet vēl ir laiks visu apdomāt un izlemt, kur ir labāk dzīvot, ņemot vērā, ka, strādājot kā programmētājs, var rakstīt kodu attālināti,
        kaut no citas valsts. Bet noteikti varu teikt, ka esmu priecīgs, pavadot savus studiju gadus šajā mājā Rīgas nomalē.
      </LxRow>
      <LxRow :column-span="1">
        <img src="./img/Coat_of_Arms_of_Riga_small.png" alt="Rīgas ģērbonis">
      </LxRow>
      <LxRow :column-span="4">
        <img src="./img/rigahome.jpg" alt="Mājas Rīgā">
      </LxRow>
    </LxForm>
  </div>
</template>