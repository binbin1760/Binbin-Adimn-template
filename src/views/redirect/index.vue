<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Redirect",
  setup() {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      const { query } = route;
      const { pathdata, data } = query;
      if (data) {
        router.replace({ path: pathdata as string, query: { data } });
      } else {
        router.replace({ path: pathdata as string });
      }
    });
  },
});
</script>
