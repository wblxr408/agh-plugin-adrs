# 深度研究任务台 · ADRS Research Desk

提交经所有者确认的研究题目，查看进度，读取报告版本和原文证据。

市场版本提供配置和启动入口，运行权限通过独立组件或 MCP 单独授权。

## 配置 MCP

先下载固定版本的运行组件。

```sh
git clone --branch runtime-v1.0.0 --single-branch https://github.com/wblxr408/agh-plugin-adrs.git adrs-runtime
```

在 AGH「连接（MCP）」建立 ID 为 `adrs` 的 stdio 连接。命令为 Node.js 24，参数依次是 `<运行组件绝对目录>/adrs.mjs`、`--url`、已运行 ADRS 的 HTTPS 或本机 HTTP 源站。运行文件和数据目录需满足 AGH 宿主策略。核对配置后测试并启用连接。

将 ADRS 的访问凭据保存为 AGH 密钥并绑定到 `ADRS_TOKEN`。默认提供状态、报告与原文查询。需要发起新任务时，由所有者追加 `--allow-writes` 并重新审核配置。ADRS 继续负责自身的预算、权限、确认和审批。 [ADRS](https://github.com/wblxr408/Agentic-Deep-Research-System)

从「智能体」启动「深度研究任务台」，在草稿中填写实际问题。 [AGH MCP 配置](https://github.com/AgnesAI-Labs/agnes-harness/blob/main/docs/guide/mcp.zh-CN.md)
