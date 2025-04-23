## 简介

把经过 Circle 阅读助手排版之后的正文导出其他平台。

推荐搭配 [Web Clipper](https://clipper.website/) 实现把正文导出到第三方平台。

## 版本要求

仅在 `v3.4.5`+ 版本提供。

## 启用

偏好设置的应用市场里面找到内容剪藏，开启右侧的开关。

## 使用

### 常规使用

启用内容剪藏之后，对应的操作按钮会出现在工具栏、快捷键、右键菜单上。如果发现没开启，需要在偏好设置上面启用下。

触发自己偏好的操作按钮，如工具栏上的内容剪藏图标，内容就会被放入合适的位置，此时继续点击其他三方软件即可正常识别到 Circle 阅读助手排版之后的正文。

原理：触发按钮会把 Circle 阅读助手的正文放入 document.body 中，其他三方扩展才能找到内容。

### 搭配 Web Clipper

启用 [Web Clipper](https://clipper.website/) 之后，当阅读模式可以进入即图标变绿色就可以正常操作 [Web Clipper](https://clipper.website/) 实现导出。

原理：当前插件会检测 [Web Clipper](https://clipper.website/) 的点击事件，当你通过 [Web Clipper](https://clipper.website/) 按钮开始剪藏内容时自动把 Circle 阅读助手排版过的正文替换掉原文。所以操作完后记得刷新页面恢复现场哦 😆
