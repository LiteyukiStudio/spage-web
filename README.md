# Spage 前端源代码仓库

## 建议的配置步骤

### 前端部分

- 包管理工具：pnpm
- 前端构建工具：vite
- 前端框架：vue3
- 前端路由：vue-router
- 页面类型：主要为静态，部分页面为服务端注入元数据。客户端拿到页面后，js通过元数据向后端请求数据完成页面渲染。
- 启动前端开发服务器：pnpm dev

### 后端部分

- 后端仓库：https://github.com/LiteyukiStudio/spage
- 后端技术栈：go，hertz(web框架)，gorm(orm)，postgres/sqlite(数据库)，grpc(RPC)
- 运行后端命令（开发模式）：go run ./cmd/server

前后端启动后，便可正常开发
若修改了后端服务器端口号，请创建.env.dev文件，内容如下：

```env
VITE_API_ROOT=http://localhost:{后端端口号}
```
将此环境变量传递给vite，vite会在开发服务器启动时读取此变量，并将其注入到前端代码中。

## 项目结构

- src/assets：静态资源
- src/components：公共组件
- src/layouts：布局组件
- src/pages：页面组件及视图(Index.vue为页面本身，main.ts为页面入口，其他vue为视图)
- src/router：路由

## CICD模式

前后端分为两个仓库，但是打包是后端仓库工作流负责

1. 前端仓库推送时会触发前端工作流，调用GitHub API dispatch事件，触发后端仓库的工作流（前端工作流本身不负责构建）

2. 后端仓库工作流步骤是
   1. 拉取前端仓库代码
   2. 安装前端依赖
   3. 打包前端代码
   4. 将打包后的代码拷贝到后端仓库的静态资源目录(go embedfs)
   5. 后端开始构建
   6. 上传构建产物