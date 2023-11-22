import { useDialog } from "naive-ui";
import { h } from "vue";

export function useMyDialog() {
  const dialog = useDialog();
  function showDialog(
    title: string,
    contentText: string,
    positiveFn: Function
  ) {
    // title vnode props
    const xDivider = h("div", {
      style: { width: "2px", height: "14px", background: "#0083FF" },
    });
    const text = h(
      "div",
      {
        style: {
          color: "#2B2828",
          fontSize: "14px",
          fontFamily: "PingFangSC-Medium",
          fontWeight: "500",
        },
      },
      { default: () => title }
    );
    //  content vnode props
    const contentBox = h(
      "div",
      {
        style: {
          fontSize: "16px",
          fontWeight: "500",
          color: "#2B2828",
          fontFamily: "PingFangSC-Medium",
        },
      },
      { default: () => contentText }
    );

    // btns style
    const cancelStyle = {
      border: "1px solid #D7D8DC",
      borderRadius: "4px",
      padding: "9px 45px",
      background: "white",
      color: "#000000",
      fontSize: "14px",
      cursor: "pointer",
    };
    const confirmStyle = {
      borderRadius: "4px",
      padding: "9px 45px",
      background: "#F11515",
      color: "white",
      fontSize: "14px",
      cursor: "pointer",
    };
    // btn vnode
    const confirmbtn = h(
      "div",
      {
        onClick: () => {
          positiveFn(), dialog.destroyAll();
        },
        style: confirmStyle,
      },
      { default: () => "确认" }
    );
    const cancel = h(
      "div",
      { onClick: () => dialog.destroyAll(), style: cancelStyle },
      { default: () => "取消" }
    );

    return dialog.info({
      title: () =>
        h(
          "div",
          {
            style: {
              display: "flex",
              gap: "8px",
              alignItems: "center",
              margin: "16px",
            },
          },
          [xDivider, text]
        ),
      content: () =>
        h(
          "div",
          {
            style: {
              padding: "45.5px 0 48px 0",
              borderTop: "1px solid #F1F1F1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          [contentBox]
        ),
      showIcon: false,
      style: { width: "370px" },
      action: () =>
        h(
          "div",
          {
            style: {
              width: "100%",
              marginBottom: "4rem",
              display: "flex",
              gap: "36px",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          [cancel, confirmbtn]
        ),
    });
  }

  function closeAllDialog() {
    dialog.destroyAll();
  }
  return {
    showDialog,
    closeAllDialog,
  };
}
