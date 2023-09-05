# Vue3 + NaiveUI+ axios 模板

# 基础说明

1.html 根节点 font-size: 10px; 所以 1rem=10px

2.放弃使用 alova 原因：不稳定， github 上 star 数量过少

3.关于 naive ui 样式， 引入 Less 进行样式注入修改组件样式

4.关于 menu 组件无限递归的问题,该模板在当 children.length===1 时, 任然开启了折叠，如果没有 children，那么一定要给队友的页面组件套上 single-page-layout 组件避免没有侧栏菜单

### 个人技术原因问题：

    1.关于自定义样式GlobalThemeOverrides  配置问题
        import { GlobalThemeOverrides } from "naive-ui";// GlobalThemeOverrides
        const customThem：GlobalThemeOverrides={
        common:{}//公共样式
            '组件名':{.
                itemTextColor:'red'//字体样式
                }// 关于组件的样式
             }

        关于如何动态样式控制：

        1.查看样式名可以在浏览器 F12 调试器
        根据 style attribute 中各个样式来获得对应的样式名字例如:item-text-color 对应的就是 itemTextColor:'red'

        2.可以安装 TS 类型提示插件
        在customThem：GlobalThemeOverrides中将鼠标移动到需要自定义的组件名称上就会显示，该组件的样式属性名称

    2.关于路由管理的三种形态（最近搞得有点魔怔！）
        1.路由表放前端， 前后端通过角色的Role来进行菜单的动态渲染

        2.路由放后端， 直接把全部路由相关的信息统一给前端，前端只需要进行组件匹配

        3.路由表放后端,  ps：这里只有用户的路由表。
             这种是纯纯不当人的一种方案，因为路由配置这些需要前端自己去算
                1.进行组件匹配
                2.根据后端给的用户信息进行相应的权限计算
                3.自己配置meta  比如说：name ，userRole , iskeepalive ,isRoot ， isAffix 这些等等都需要前端自己加
    以上三种情况， 如果是前后端分离最好还是路由放前端。便于前后端分开开发，减少扯皮打架。
    如果真要放后端，TMD必须沟通好参数不然大家都别做了，等死吧。（前端一定要有点脾气）

    3.数组循环api（map,foreach...） 与异步操作的关联
