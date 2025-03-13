导出为其他格式允许自定义模版时，模版内可以加入变量，执行实际导出时真正的内容会自动替换掉。所有支持的变量如下：

## 系统

- `[app:name]` 系统的国际化名称
- `[app:version]` 系统当前版本
- `[app:description]` 系统的描述

## 用户

- `[user:uid]` 当前用户 ID
- `[user:name]` 当前用户名
- `[user:mail]` 当前用户邮箱
- `[user:avatar]` 当前用户头像地址
- `[user:url]` 当前用户主页地址

## 内容

- `[node:cover]` 当前正文的主图地址
- `[node:word_count]`当前正文的字数统计
- `[node:read_time]`阅读当前正文耗时
- `[node:excerpt]`当前正文的摘要
- `[node:published]`当前正文的发布时间
- `[node:modified]`当前正文的更新时间
- `[node:domain]`当前正文的域名
- `[node:url]`当前正文的原始地址
- `[node:author]`当前正文的作者
- `[node:tags]` 当前正文的标签
- `[node:text]`当前正文的纯文本格式
- `[node:content]`当前正文的 HTML 格式
- `[node:title]`当前正文的标题
- `[node:rtl]`当前正文的排版方向
- `[node:lang]`当前正文的语言
- `[node:next]`当前正文的下一页地址
- `[node:from]` 当前正文的来源

以上时目前支持所有的变量。设置变量时还可以截取一定的长度，如 `[node:title:0:10]` 的意思是截取标题的前十个字符。

## 示例

为了更快速的掌握模版的定制，我们以当前网页作为一个 ? 来讲解。

### 导出当前正文为 HTML 文件

文件名设定为：导出成其他格式... - 由染河通过 Circle 阅读助手导出

正文设定为：【HTML 格式正文】 - 由 Circle 阅读助手生成

为了实现上面的要求，撰写模版如下：

**文件名**

    [node:title:0:7] - 由[user:name]通过[app:name]导出

**正文**

    [node:content] - 由[app:name]生成
