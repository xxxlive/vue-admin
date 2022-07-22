<template>
  <div id="app">
    <router-view/>
    <div class="live2d-container">
      <live2d
        :style="style"
        :model="['Potion-Maker/Pio', 'sorceress-costume']"
        :direction="direction"
        :size="size"
      />
    </div>
  </div>
</template>

<script>
import live2d from 'vue-live2d'

export default {
  name: 'App',
  components: {
    live2d
  },
  data() {
    return {
      direction: 'right',
      style: '',
      width: 500,
      height: 500,
      size: 250
    }
  }

}
</script>

<style>
.live2d-container {
  width: 20px;
  opacity: 0;
  position: fixed;
  bottom: 0;
  right: 0;
}
.live2d-container:hover {
  width: unset;
  opacity: 1;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
