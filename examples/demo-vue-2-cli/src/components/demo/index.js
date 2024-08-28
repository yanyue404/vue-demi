import {
  computed,
  defineComponent,
  getCurrentInstance,
  h as hDemi,
  isVue2,
  isVue3,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
  watchEffect,
} from "vue-demi";
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

function adaptOnsV3(ons) {
  if (!ons) return null;
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;
    return { ...ret, [key]: handler };
  }, {});
}

function h(type, options, children) {
  if (isVue2) return hDemi(type, options, children);

  const { props, domProps, on, ...extraOptions } = options;

  const ons = adaptOnsV3(on);
  const params = { ...extraOptions, ...props, ...domProps, ...ons };
  return hDemi(type, params, children);
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
