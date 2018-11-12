<template>
  <div id="app">
    <TabContent />
  </div>
</template>

<script>
import TabContent from './components/TabContent';

export default {
  name: 'App',
  components: {
    TabContent
  }
}
</script>

<style lang="css">
    @import './css/bootstrap-grid.min.css';
    @import './css/styles.css';
    @import url('https://fonts.googleapis.com/css?family=Francois+One');
    @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
</style>
