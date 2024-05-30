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
        Latvijas Universitāte (LU) ir viena no vadošajām augstākās izglītības iestādēm Latvijā, piedāvājot plašu akadēmisko programmu klāstu dažādās zinātņu nozarēs.
        Izvēlējos studēt datorzinātnes un šobrīd jau kā 3. kursa students LU Datorikas fakultātē, esmu guvis daudzpusīgu un padziļinātu zināšanu bāzi informācijas tehnoloģiju un programmēšanas jomās.
        Mūsu fakultāte ir pazīstama ar augstu izglītības kvalitāti, modernu mācību vidi un ciešu sadarbību ar nozares uzņēmumiem, kas īpaši jūtama prakses periodā.
        Studijas Datorikas fakultātē man ir devušas iespēju apgūt dažādas programmēšanas valodas, datu bāzu pārvaldību, tīkla administrēšanu un citas būtiskas prasmes. Mēs bieži piedalāmies dažādos projektos un laboratorijas darbos, kas palīdz attīstīt praktiskās iemaņas un sagatavo mūs reālajai darba videi.
        Šāda vide sekmēja to, ka bez priekšzināšanām spēju atrast darbu Latvijas IT uzņēmumā "ZZ Dats" un pēc prakses palikt tur kā pilnvērtīgs programmētājs. 
        Fakultātē strādā pieredzējuši pasniedzēji, kuri vienmēr ir gatavi sniegt atbalstu un padomus.
        Līdz šim studijas Latvijas Universitātē ir bijušas vērtīgas gan akadēmiskajā, gan personīgajā izaugsmē.
        Esmu lepns būt daļa no LU kopienas un ceru turpināt savu izglītību un karjeru IT jomā, balstoties uz stipro pamatu, ko esmu ieguvis šeit.
      </LxRow>
      <LxRow :column-span="1">
        <img src="./img/Coat_of_Arms_of_Riga_small.png" alt="Rīgas ģērbonis">
      </LxRow>
      <LxRow :column-span="4">
        <img src="./img/lu.jpg" alt="Latvijas Universitāte">
      </LxRow>
    </LxForm>
  </div>
</template>