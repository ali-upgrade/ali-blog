# link与@import

## 区别

### 加载时机的不同
link是html加载dow时会同步加载link标签的内容，@import引入的资源需要等dom加载完成之后加载

### js的可操作性不同
link标签可以通过js动态插入到文档中，@import不可以


## 基于link的性能优化
*link rel的属性值可以为preload,prefetch,dns-prefesh*

### preload

```
MDN官方说明
<link>元素的rel属性的属性值为preload,表示用户十分有肯需要在当前浏览中加载目标资源，所以浏览器必须预先获取和缓存对于资源
```
优先加载

### prefetch

```
关键字 prefetch 作为元素 <link> 的属性 rel 的值，是为了提示浏览器，用户未来的浏览有可能需要加载目标资源，所以浏览器有可能通过事先获取和缓存对应资源，优化用户体验。
```
其他页面需要这个资源，可以让它优先加载

### dns-prefetch

```
DNS-prefetch (DNS 预获取) 是尝试在请求资源之前解析域名。这可能是后面要加载的文件，也可能是用户尝试打开的链接目标。
```
### 为什么要使用dns-prefetch

当浏览器从第三方服务器请求资源时，必须先将该跨域域名解析为IP地址，然后浏览器才能发出请求。此过程称为DNS解析。DNS缓存可以帮助减少此延迟，而DNS解析可以导致请求增加明显的延迟。对于打开了与许多第三方的链接的网站，此延迟可能会大大降低加载性能。
`dns-prefetch`可帮助开发人员掩盖DNS解析延迟。 HTML <link>元素 通过 dns-prefetch 的 rel 属性 (en-US)值提供此功能。然后在 href 属性中指要跨域的域名：


来源
```

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types/prefetch
https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types/preload
https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch
```

