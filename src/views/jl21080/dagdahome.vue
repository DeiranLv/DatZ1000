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
        Mana dzimtā māja ir miers un siltums iesprostots ķieģeļu ēkā. Tā stāv kalna virsotnē, pār slēgtu dārzu, kurā vasarā plaukst krāšņas puķes un ābeles, bet pavasarī skan putniņu dziesmas. Šajā mājā pavadīju visu savu laiku līdz tiku pieņemts Latvijas Universitātē un pārvācos uz Rīgu. Katram stūrim ir savs stāsts, ko esmu piedzīvojis kopā ar saviem ģimenes locekļiem, un katrai istabai ir sava īpašā atmosfēra.
        Atgriežoties uz brīvlaiku, vienmēr esmu priecīgs, ka varu pavadīt vēl kādu laiku savās dzimtajās mājās, kopā ar ģimenes biedriem: vecākiem, vecmammu un brāli, kā arī saviem mājdzīvniekiem, kas vienmēr priecājās, pamanot mani pie mājas sliekšņa. Kad daru kādu darbiņu, vienmēr var iekrist domās un atpūsties no straujās pilsētas dzīves. Pēc darbu izpildes var doties garā pastaigā pa dzimto pilsētu, kur varēs satikties ar draugiem un labi pavadīt laiku kopā.
        Šī māja nav tikai ķieģeļu ēka – tā ir mana pagātne, tagadne, iespējams, arī nākotne, kurā glabājas manas ģimenes sirds un dvēsele.
      </LxRow>
      <LxRow :column-span="1">
        <img src="./img/Coat_of_Arms_of_Dagda.png" alt="Dagdas ģērbonis">
      </LxRow>
      <LxRow :column-span="4">
        <img src="./img/dagdahome.jpg" alt="Dagdas mājas">
      </LxRow>
    </LxForm>
  </div>
</template>