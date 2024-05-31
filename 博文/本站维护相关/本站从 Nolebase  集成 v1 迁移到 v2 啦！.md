---
tags:
    - 本站维护记录
---
# 本站从 Nolebase v1 迁移到 v2 啦！

## 从 v1 到 v2 主要有些什么改动？

以下内容摘自 Nolebase 集成的[迁移文档](https://nolebase-integrations.ayaka.io/pages/zh-CN/releases/migrations/v1-to-v2)：

> 将版本更新为 `v2` 的主要目标是：
>
>1. 更新 VitePress 至 `1.0.0`.
>2. 确保所有集成，插件和模块和模块都遵循相同的代码结构、命名规则和导入/导出模式。
>
因此
>
>1. 所有更新的集成，插件和模块将不再与 VitePress RC 版本兼容。
>2. 所有更新的集成，插件和模块都将遵循以下规定： 
    - 如果是 Vue 组件、Vue 插件、客户端代码、样式等，导出的入口文件为 `{packageName}/client`。
    - 如果是 i18n 模块，则导出入口文件为 `{packageName}/locales`。
    - 如果是 VitePress 专用插件（如构建钩子、"buildEnd"、"transformHTML "等），则导出入口文件为 `{packageName}/vitepress`。
    - 如果是 markdown-it 插件，则导出入口文件为 `{packageName}/markdown-it` 。
    - 如果是 Vite 插件，则导出入口文件为 `{packageName}/vite`。
>3. 所有更新的集成，插件和模块都将遵循 Nolebase 集成，插件和模块的 i18n 指南。
>4. 所有更新的集成，插件和模块都将尝试复用 `@nolebase/ui` 集成，插件和模块中的 Vue 组件。

## 手动迁移时的注意事项

### 确认 Vitepress 的版本

首先确保你知识库工程中安装 Vitepress 的版本在 1.0.0 以上，我使用的依赖管理工具是 pnpm 所以我通过以下命令查看我 Vitepress 的版本

> pnpm list "vitepress*"

### 确认 Nolebase 集成各插件的版本

其次，我们需要确认知识库工程中安装的 Nolebase 集成各插件的版本。

> pnpm list "\*nolebase\*"

如果你的 Nolebase 集成插件版本在 2.0.0-rc14 以下（例如笔者在更新前的版本是 1.2.8）则需要将他们升级到 2.0.0-rc14 以上的版本，接着再根据迁移文档的提示在 Vitepress 主题配置文件中把相关插件的 Vue组件和样式的入口文件路径修改过来即可。


