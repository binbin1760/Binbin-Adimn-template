import { VNode } from "vue";
import { useDialog } from "naive-ui";

export function useMyDialog(options: {
  title: string;
  text?: string;
  contentComponent?: VNode;
  action?: VNode;
}) {
  const dialog = useDialog();
  const { title, contentComponent, action } = options;

  function showDialog(
    title: string,
    contentText: string,
    positiveFn: Function
  ) {
    return dialog.warning({
      title: title,
      content: contentText,
      positiveText: "确定",
      negativeText: "取消",
      maskClosable: false,
      onPositiveClick: () => {
        positiveFn();
      },
      onNegativeClick: () => {},
    });
  }

  function customDialog() {
    dialog.warning({
      title: title,
      maskClosable: false,
      content: () => contentComponent,
      action: () => action,
    });
  }
  return {
    showDialog,
    customDialog,
  };
}
