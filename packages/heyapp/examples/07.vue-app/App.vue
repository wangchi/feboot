<template>
  <div id="app">
    <page-header></page-header>
    hello vue
    <div class="box">heyapp</div>
  </div>
</template>
<script>
import PageHeader from './components/Header';

export default {
  components: {
    PageHeader,
  },
};
</script>
<style>
.box {
  color: #f80;
}
</style>
