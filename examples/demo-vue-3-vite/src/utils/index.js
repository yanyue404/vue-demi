import { isVue2, Vue, createApp, h as hDemi } from "vue-demi";

function adaptOnsV3(ons) {
  if (!ons) return null;
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;
    return { ...ret, [key]: handler };
  }, {});
}

export function h(type, options, children) {
  if (isVue2) return hDemi(type, options, children);

  const { props, domProps, on, ...extraOptions } = options;

  const ons = adaptOnsV3(on);
  const params = { ...extraOptions, ...props, ...domProps, ...ons };
  return hDemi(type, params, children);
}

// 使用 Vue2 的语法传递 props，支持 Vue2 和 Vu3 渲染组件
export function mount(component, opt, el) {
  if (!component) {
    console.warn("亲，请传入正确的组件");
  }
  if (!el) {
    el = document.createElement("div");
    document.body.appendChild(el);
  }

  if (isVue2) {
    return new Vue({
      el,
      render(h) {
        return h(component, opt);
      },
    });
  } else {
    // vue3
    const app = createApp({
      render() {
        return h(component, opt);
      },
    });
    app.mount(el);
    return app;
  }
}

export function destroy(vm) {
  vm.$el.remove();
  vm.$destroy();
}
