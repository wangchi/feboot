<template>
  <div class="header">
    <span>{{ message }}</span>
    <button @click="handleClick">change message</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello heyapp',
    };
  },
  methods: {
    handleClick() {
      this.message = 'Text changed!';
    },
  },
};
</script>
