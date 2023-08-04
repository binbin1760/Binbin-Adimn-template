# Vue3 + NaiveUI+ alova 模板

# 基础说明

1.html 根节点 font-size: 10px; 所以 1rem=10px

2.layout 未引用组件，是我自己写的 /components/layout

### 个人技术原因问题：

    1.关于自定义样式GlobalThemeOverrides  配置问题
    import { GlobalThemeOverrides } from "naive-ui";// GlobalThemeOverrides
    const customThem：GlobalThemeOverrides={
        common:{}//公共样式
        '组件名':{.
            itemTextColor:'red'//字体样式
            }// 关于组件的样式
    }

    关于如何：

    1.查看样式名可以在浏览器 F12 调试器
    根据 style attribute 中各个样式来获得对应的样式名字例如:item-text-color 对应的就是 itemTextColor:'red'

    2.可以安装 TS 类型提示插件
    在customThem：GlobalThemeOverrides中将鼠标移动到需要自定义的组件名称上就会显示，该组件的样式属性名称
