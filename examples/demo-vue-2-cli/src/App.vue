<template>
  <div>
    <p>Mouse: {{ x }}x{{ y }}</p>

    <van-button plain type="primary" @click="isShow = !isShow"> 打开自定义的 Demo dialog 弹窗</van-button>

    <Demo :show="isShow" @load="loadFn" @confirm="onConfirm" @cancel="onCancel"></Demo>

    <br />

    <van-button plain type="primary" @click="openDialog"> 打开 vant dialog 弹窗</van-button>
  </div>
</template>

<script>
import { useMouse } from "@vue-demi/use-mouse";
import Vue from "vue";
import { ref } from "vue-demi";
import { Button, Notify } from "vant";
import "vant/lib/button/style";
import "vant/lib/notify/style";
import Demo from "./components/demo/index";
import Dialog from "./components/dialog";

export default {
  name: "App",
  components: {
    Demo: Demo,
    [Button.name]: Button,
  },
  setup(ctx, context) {
    const { x, y } = useMouse();
    const isShow = ref(false);
    const show = ref(false);

    return {
      x,
      y,

      isShow,
      loadFn: (e) => {
        console.log(e);
      },
      onConfirm: (e) => {
        console.log(e);
      },
      onCancel: (e) => {
        console.log(e);
        isShow.value = false;
      },
      openDialog: async () => {
        let el = document.createElement("div");
        document.body.appendChild(el);
        let selectDialog = () => {
          return new Promise((resolve, reject) => {
            new Vue({
              el,
              render(h) {
                return h(Dialog, {
                  on: { confirm: () => resolve("confirm"), cancel: () => resolve("cancel") },
                });
              },
            });
          });
        };

        let ret = await selectDialog();

        setTimeout(() => {
          Notify({ type: { confirm: "success", cancel: "danger" }[ret], message: "通知内容: " + ret });
        }, 300);
      },
    };
  },
  mounted() {
    console.log("App Mounted!");
  },
};
</script>

<style lang="css" scoped></style>
