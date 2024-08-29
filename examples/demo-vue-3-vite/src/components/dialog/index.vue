<template>
  <div>
    <van-dialog
      v-model:show="show"
      title="标题"
      @confirm="$emit('confirm')"
      @cancel="$emit('cancel')"
      show-cancel-button
    >
      <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { ref } from "vue-demi";
// import "vant/lib/dialog/index.css";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  setup(props) {
    const show = ref(true);
    return {
      show,
    };
  },
};
</script>
<style lang="css" scoped>
img {
  width: 100%;
  height: 270px;
}
</style>
