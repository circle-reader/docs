API 是插件和核心系统交互的桥梁，通过 API 可以执行任何系统允许的操作。

系统相关
----

### v3

类型`boolean`

系统是否运行在 mainfest v3 版本。

### debug

类型`boolean`

是否运行在调试模式。

### version

类型`string`

系统版本号。

### language

类型`string`

当前系统语言。 （目前支持zh\_CN：中文、zh\_TW：繁体中文、en：英文、ja：日文、ko：韩语、th：泰语）

### device

类型

    {
        browser: 'edge' | 'opera' | 'firefox' | '360' | 'chrome' | '';
        apple: {
          phone: boolean;
          ipod: boolean;
          tablet: boolean;
          universal: boolean;
          device: boolean;
        };
        amazon: {
          phone: boolean;
          tablet: boolean;
          device: boolean;
        };
        android: {
          phone: boolean;
          tablet: boolean;
          device: boolean;
        };
        windows: {
          phone: boolean;
          tablet: boolean;
          device: boolean;
        };
        other: {
          blackberry: boolean;
          blackberry10: boolean;
          opera: boolean;
          firefox: boolean;
          chrome: boolean;
          device: boolean;
        };
        phone: boolean;
        tablet: boolean;
      }

运行设备信息。

### user

类型

    {
      uid: string; // 用户唯一的id
      name?: string; // 用户名称
      avatar?: string; // 用户头像
      mail?: string; // 用户邮箱
      roles: Array<string>; // 用户的角色
      is_logged_in?: boolean; // 用户是否已登陆
    }

当前用户信息。

### getURL

类型`(path: string) => string`

获取系统根目录文件地址。

### colorScheme

类型`{value: '' | 'light' | 'dark'}`

系统主题设置（未开启/日间/夜间）。

### tables

类型

    Array<{
     table: 'apps' | 'option' | 'node'; // 表名
     indexs: string | Array<string>; // indexDB 表索引
     freeze: Array<string>; // 锁定的字段，被锁定的字段不允许导出和清除。
    }>

系统数据库表信息。

### url2json

类型`(url: string) => any`

从 url 智能解析正文，生成结构化数据；如输入微信文章，输出标题、作者、创建日期、正文等结构化的数据信息。

### path

类型`(id?: string) => string`

获取官网的地址；如 app.path('download') 是获取地址 ?? [https://circlereader.com/download](https://circlereader.com/download) 

### match

类型`(data: Array<any>, match?: string) => any;`

匹配字符串是否在给定的数据内，内部基于 [minimatch](https://github.com/isaacs/minimatch)

### isExtPage

类型`(url?: string) => boolean`

判断 URL 是否是浏览器自身的页面地址，不传参数则是判断当前页面地址。

### field

类型

    (
        id:
          | string
          | Array<string>
          | {
              [index: string]: any;
            },
        value: any
      ) => any

跨插件临时保存数据，非必要请勿随意使用。传递 id 为string 和对象时为设置单个数据、数组时为批量设置数据。

### data

类型`(id: string, value?: any): any;`

临时保存和获取数据。设置 value 时为设置数据，不设置时为获取数据。

### get

类型`(id: string, table?: string) => Promise<any>`

从数据库查询一条的数据。

### set

类型

    (id: string | Array<{
      id: string;
      changed?: number;
      value: any;
      [index: string]: any;
    }>, value?: any, table?: string) => Promise<any>

写入数据到数据库中。

### remove

类型`(id: string | Array<string>, table?: string) => Promise<any>`

从数据库中删除一条数据。

### list

类型

    (query?: {
      field?: string;
      keyRange?: any | Array<any>;
      searchIn?: string | Array<string>;
      search?: string;
      order?: 'DESC' | 'ASC';
      match?: {
       [index: string]: string | boolean | Array<string>;
     };
    }, pager?: {
      start: number;
      limit: number;
    }, table?: string) => Promise<any>

从数据库查询数据。

### option

类型`(id?: string, value?: any) => Promise<any>`

从数据库查询插件的配置项数据；和 get 的区别是：

*   自动读取插件配置项的默认值，数据库没有从插件提供的默认值获取。
*   自动合并插件配置项的默认值，数据库保存的数据不完整（仅设置了一个选项）时自动合并入插件提供的默认值。
*   自动读取当前主题设置下的值，如当前主题是夜间主题，查询主题和样式时自动查询夜间对应的配置。

当 id 不设置时，读取数据库中 id 为插件 ID 的数据。当设置为 option 时，自动读取当前插件的选项值，设置为 display 时，自动读取当前插件在当前主题下的设置。

比如：ID 为 render 的插件中调用 app.option() 时，获取数据库中 id 为 render 对应的数据；调用 app.option('option') 时获取到的是 id 为 render\_option 对应的数据；调用 app.option('display') 时，当前主题未开启获取到的是 id 为 render\_dispaly 对应的数据，当前主题为日间时获取到的是 id 为 render\_light\_dispaly 对应的数据，当前主题为日间时获取到的是 id 为 render\_dark\_dispaly 对应的数据。设置也同样的逻辑。

### log

类型`(...args: any) => string`

系统调试模式下打印日志，格式为“plugin id” => args；如调试模式下，在 id 为 render的插件下调用app.log('我是染河'); 控制台输出 render => 我是染河

### action

类型`(id?: 'ready' | 'enable' | 'disable' | 'force') => void`

修改浏览器右上角 Circle 阅读助手的图标状态。具体如下：

*   ready 识别成功，绿色可点击。
*   enbale 启用，黑色可点击。
*   disable 禁用，黑色不可点击
*   force 禁用，黑色可点击。（强制解析正文）

### export

类型

    (value?: string | Array<string>) => Promise<{
      version: string;
      data: any;
    }>

导出数据。value 是数据库表名，可选：option、node

### import

类型

    (
        value:
          | string
          | {
              version?: string;
              data: any;
            },
        type?: string
      ) => Promise<any>

 导入数据。type 仅有唯一值：'keep' 表示导入时不清空已有的数据。

### reset

类型`(value?: string) => Promise<any>`

重置系统；设置 value 时表示仅清空数据表为 value 的表。

### contextMenus

类型

    (
        action: 'create' | 'update' | 'remove' | 'destory' | 'rebuild',
        value?:
          | string
          | {
              id: string;
              type?: string;
              label?: string;
              action?: boolean;
              checked?: boolean;
              priority?: number;
              contexts?: [string];
            }
          | Array<{
              id: string;
              type?: string;
              label?: string;
              action?: boolean;
              checked?: boolean;
              priority?: number;
              contexts?: [string];
            }>
      ) => Promise<any>
    
     

更新浏览器右键菜单。参数详情见 [https://developer.chrome.com/docs/extensions/reference/api/contextMenus](https://developer.chrome.com/docs/extensions/reference/api/contextMenus)

### tabs

类型

    (
        action: 'create' | 'update' | 'remove' | 'captureVisibleTab' | 'query',
        value?: any
      ) => Promise<any>

管理浏览器当前标签页。参数详情见 [https://developer.chrome.com/docs/extensions/reference/api/tabs](https://developer.chrome.com/docs/extensions/reference/api/tabs)

### fontSettings

类型

    (
        action: 'list'
      ) => Promise<Array<{ displayName: string; fontId: string }>>;

获取系统安装字体列表。

### windows

类型

    (
        action: 'current' | 'create' | 'get' | 'update' | 'remove',
        value?:
          | number
          | {
              id?: number;
              url?: string;
              state?:
                | 'normal'
                | 'minimized'
                | 'maximized'
                | 'fullscreen'
                | 'locked-fullscreen';
              args?: any;
            }
      ) => Promise<any>

管理浏览器窗口。

### info

类型`(...args: Array<string>) => () => void`

弹窗显示一个普通的通知消息，调用返回函数销毁当前弹窗。

### warning

类型`(...args: Array<string>) => () => void`

弹窗显示一个类型为警告的通知消息，调用返回函数销毁当前弹窗。

### success

类型`(...args: Array<string>) => () => void`

弹窗显示一个类型为成功的通知消息，调用返回函数销毁当前弹窗。

### error

类型`(...args: Array<string>) => () => void`

弹窗显示一个类型为错误的通知消息，调用返回函数销毁当前弹窗。

### loading

类型`(...args: Array<string>) => () => void`

弹窗显示一个加载中提醒状态，调用返回函数销毁当前弹窗。

### syncUser

类型`() => Promise<User>`

同步并获取当前用户信息。

### cron

类型

    (
      callback: () => Promise<any> | boolean | void,
      duration?: number; // 单位：小时
    ) => Promise<boolean>;

定期执行 `callback` 返回 true或者不返回任何信息则为处理成功，否则下次仍然继续执行。`duration` _默认24 小时执行一次。_

### i18n

类型 `(...args: Array<string>) => string`

国际化支持。获取当前系统语言对应的语言，插件只能调用到自身设置的语言。有关国际化设置请查看插件开发部分。

### fetch

类型

    (
     url: string,
     options?: {
      format?: 'json' | 'text' | 'blob';
      [index: string]: any;
     }
    ) => Promise<any>

发起一个请求，底层调用的 window.fetch，内部已经处理了跨域问题。

### on

类型

    (
    
    id: string,// 事件的 id
    
    callback: string | any,//事件发生执行的操作
    
    once?: boolean,//订阅一次，执行后销毁
    
    priority?: number//事件触发执行优先级
    
    ) => () => void // 返回销毁函数，调用会销毁当前订阅

订阅一个事件。

### fire

类型`(id: string, ...args: any): void`

触发一个事件。

### addFilter

类型

    (
    
    id: string | string[],
    
    callback: string | any,
    
    once?: boolean,
    
    priority?: number
    
    ) => () => void

添加一个过滤器，类似于上面的 on。 

### applyFilter

类型

    (id: string, ...args: any[]) => any

执行一个过滤器，类似于上面的 fire，但可以通过返回不同的值改变后续过滤器接收到的参数。

### hasHook

类型`(id: string) => boolean`

判断是否有 id 对应的事件被订阅或者过滤。

###  removeHook

类型`(id: string | string[], callback?: () => void) => void`

移除 id 对应事件的订阅或者过滤

### 偏好设置独有

系统强相关的 API 仅对特定插件开放。

*   listApp 列出已安装插件
*   enable 启用插件
*   disable 禁用插件
*   uninstall 卸载插件
*   install 安装插件
*   apply 运行特定生命周期