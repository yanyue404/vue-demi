<template>
  <div>
    <p>Mouse: {{ x }}x{{ y }}</p>
    <Test @load="loadFn" @confirm="onConfirm" @cancel="onCancel"></Test>
  </div>
</template>

<script>
import { useMouse } from "@vue-demi/use-mouse";
import Test from "./component";

export default {
  name: "App",
  components: {
    Test: Test,
  },
  setup() {
    const { x, y } = useMouse();
    return {
      x,
      y,
      loadFn: (e) => console.log(e),
      onConfirm: (e) => console.log(e),
      onCancel: (e) => console.log(e),
    };
  },
};
</script>
