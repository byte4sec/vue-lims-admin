import Vue from 'vue';

// 自定义指令
const directives = {
  // 边界拖拽 - 在 el-row 上添加 v-move 属性即可
  move: {
    bind(el) {
      // 最小保留宽度
      const minWidth = 0.1;
      // 获取元素宽度
      const getWidth = elem => parseInt(window.getComputedStyle(elem).getPropertyValue('width'), 10);
      // 循环给列绑定事件
      for (let i = 0; i < el.children.length; i++) {
        if (i !== el.children.length - 1) {
          let isResizing = false;
          let lastDownX = 0;
          const elL = el.children[i];
          const elR = el.children[i + 1];
          elL.classList.add('boundary-drag');
          elL.appendChild(document.createElement('span'));
          // 鼠标按下
          elL.lastChild.onmousedown = (e) => {
            isResizing = true;
            lastDownX = e.clientX;
            // 扩大可控制范围
            elL.classList.add('is-extend');
            const rowWidth = getWidth(el);
            const colLiftWidth = getWidth(elL);
            const colRightWidth = getWidth(elR);
            let timeoutd = '';
            // 鼠标移动
            elL.onmousemove = (e) => {
              if (!isResizing || e.buttons === 0) return;
              if (timeoutd) { clearTimeout(timeoutd); }
              timeoutd = setTimeout(() => {
                const offset = e.clientX - lastDownX;
                const colL = (colLiftWidth + offset) / rowWidth;
                const colR = (colRightWidth - offset) / rowWidth;
                // 偏移量
                if (colL >= minWidth && colR >= minWidth) {
                  elL.style.width = `${colL * 99.9}%`;
                  elR.style.width = `${colR * 99.9}%`;
                }
              }, 15);
            };
            // 鼠标弹起
            document.getElementsByTagName('body')[0].onmouseup = () => {
              elL.classList.remove('is-extend');
              elL.onmousemove = null;
              isResizing = false;
            };
          };
        }
      }
    },
  },
};

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});
