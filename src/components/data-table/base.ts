import { h, defineComponent, ref, nextTick } from "vue";
import { NInput } from "naive-ui";
import useClipboard from "vue-clipboard3";
// 开启可编辑的组件--->编辑后自动提交？自动提交响应过慢怎么办？ 编辑速度过快同事产生多个请求怎么办？
export const ShowOrEdit = defineComponent({
  props: {
    value: [String, Number],
    onUpdateValue: [Function, Array],
  },
  setup(props) {
    const isEdit = ref(false);
    const inputRef = ref<any>(null);
    const inputValue = ref<any>(props.value);
    function handleOnClick() {
      isEdit.value = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    }
    function handleChange() {
      (props.onUpdateValue as any)(inputValue.value);
      isEdit.value = false;
    }
    return () =>
      h(
        "div",
        {
          style: "min-height: 22px",
          onClick: handleOnClick,
        },
        isEdit.value
          ? h(NInput, {
              ref: inputRef,
              value: inputValue.value,
              onUpdateValue: (v) => {
                inputValue.value = v;
              },
              onChange: handleChange,
              onBlur: () => {
                isEdit.value = false;
              },
            })
          : props.value
      );
  },
});
// 复制
const { toClipboard } = useClipboard();
export async function dbclickCopy(msg, succFn: Function, errFN: Function) {
  try {
    await toClipboard(msg);
    succFn();
  } catch (e) {
    errFN();
  }
}
