# Vue3 + NaiveUI+ axios 模板

# 基础说明

1.html 根节点 font-size: 10px; 所以 1rem=10px

2.放弃使用 alova 原因：不稳定， github 上 star 数量过少

3.关于 naive ui 样式， 引入 Less 进行样式注入修改组件样式

4.关于 menu 组件无限递归的问题,该模板在当 children.length===1 时, 会开启折叠.

5.关于 架子的刷新功能说明： 全部的路由传参 query 参数名称必须为 data，因为刷新功能向空白页面传递的参数为
query 参数`data:Route.query.data`，路径参数`pathData:Route.path`

6.token 过期返回值 与 注册无权限 返回值

7.需要优化前后端菜单映射函数（无限递归+外加同步 meta 配置）

### 个人技术原因问题暂时无法实现：

    1.data-tabale：
        （1）虚拟滚动
        （2）设置： 动态未某列添加功能 例如： 开启斑马条 ，排序 ，过滤....
        （3）内容超出提示
        （4）可编辑
        （5）右边菜单
    2.自制简单表单生成器
