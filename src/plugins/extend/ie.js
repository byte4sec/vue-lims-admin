// IE兼容处理解决方案

// 支持classList属性 IE9+
if (!('classList' in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, 'classList', {
    get() {
      const me = this;
      const update = fn => (value) => {
        const classes = me.className.split(/\s+/g);
        const index = classes.indexOf(value);
        fn(classes, index, value);
        me.className = classes.join(' ');
      };
      return {
        /* eslint-disable no-bitwise */
        add: update((classes, index, value) => {
          if (!~index) classes.push(value);
        }),
        remove: update((classes, index) => {
          if (~index) classes.splice(index, 1);
        }),
        toggle: update((classes, index, value) => {
          if (~index) { classes.splice(index, 1); } else { classes.push(value); }
        }),
        contains(value) {
          return !!~me.className.split(/\s+/g).indexOf(value);
        },
        item(i) {
          return me.className.split(/\s+/g)[i] || null;
        },
      };
    },
  });
}
