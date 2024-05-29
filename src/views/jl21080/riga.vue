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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae efficitur justo, sit amet pharetra lorem. 
        Nam dapibus, quam et rutrum convallis, lacus est consequat massa, et varius arcu risus in nibh. Duis tincidunt 
        dolor mauris, ut elementum nisl auctor sit amet. Fusce fringilla efficitur sem quis imperdiet. Aenean faucibus 
        tincidunt consequat. Sed mi ligula, auctor nec dapibus id, rutrum ut purus. Sed venenatis sed magna gravida cursus. 
        Ut sit amet augue aliquet, porta augue ut, cursus felis. In elementum, massa sit amet porta facilisis, lectus eros 
        congue ante, sollicitudin rhoncus augue ante a libero. Maecenas et dui sit amet odio consectetur mattis. Donec vel 
        dui vitae mauris cursus ultrices rutrum tempor quam. Sed nec odio orci. Morbi quam nibh, auctor sit amet ullamcorper 
        sed, dignissim a erat. Quisque accumsan gravida faucibus. Sed suscipit nibh ac finibus auctor. Mauris lacus neque, 
        volutpat sed libero at, rutrum semper elit. Nam at.
      </LxRow>
      <LxRow :column-span="1">
        <img src="./img/Coat_of_Arms_of_Riga_small.svg.png" alt="Rīgas ģērbonis">
      </LxRow>
      <LxRow :column-span="4">
        <img src="./img/riga.jpg" alt="Rīga">
      </LxRow>
    </LxForm>
  </div>
</template>