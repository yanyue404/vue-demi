import { defineComponent, isVue2, ref } from "vue-demi";
import { h } from "../../utils";
import "./style.css";
if (isVue2) {
  // Vue 2 only
  console.log("now is vue2");

  const state = ref("hello");

  console.log("state: ", state);
} else {
  // Vue 3 only
  console.log("now is vue3");
}

export default defineComponent({
  name: "Test",
  emits: ["load"],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    display() {
      return this.show;
    },
  },
  watch: {},
  emits: ["load", "confirm", "cancel", "close"],
  mounted() {
    this.$emit("load", "mounted");
  },
  methods: {
    handler(action) {
      this.$emit(action, action);
    },
  },
  render() {
    const confirmHandler = {
      click: () => this.handler("confirm"),
    };

    const cancelHandler = {
      click: () => {
        this.handler("cancel");
        this.handler("close");
      },
    };
    let display = this.show;
    if (display) {
      return h("div", { class: "dialog-wrap" }, [
        h("p", {}, "代码是写给人看的，附带放在机器上可以运行！"),
        h("div", { class: "dialog-btns" }, [
          h("button", { class: "dialog-button-confirm", on: confirmHandler }, "确定"),
          h("button", { class: "dialog-button-cancel", on: cancelHandler }, "取消"),
        ]),
      ]);
    } else {
      return h("div", {});
    }
  },
});
