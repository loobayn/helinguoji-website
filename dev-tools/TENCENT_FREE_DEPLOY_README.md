# 合灵国际网站腾讯云免费部署指南

## 免费资源说明

腾讯云开发者平台提供以下免费资源：
1. 云服务器（1核2G，每月免费）
2. 对象存储（50GB 免费额度）
3. CDN（每月 10GB 免费流量）
4. 云函数（每月 100 万次免费调用）

## 部署前准备

### 1. 腾讯云账号准备
1. 注册腾讯云账号：https://cloud.tencent.com/
2. 完成实名认证
3. 开通以下免费服务：
   - 云服务器
   - 对象存储 COS
   - 内容分发网络 CDN
   - 云函数 SCF

### 2. 本地环境准备
1. 安装必要的工具：
   ```bash
   # 安装腾讯云 CLI
   pip install tencentcloud-sdk-python
   
   # 安装 COSCMD
   pip install coscmd
   
   # 安装 Serverless Framework
   npm install -g serverless
   ```

2. 配置腾讯云访问凭证：
   ```bash
   # 配置 COSCMD
   coscmd config -a <SecretId> -s <SecretKey> -b <bucket-name> -r <region>
   
   # 配置 Serverless
   serverless config credentials --provider tencent
   ```

## 部署步骤

### 1. 配置部署脚本
编辑 `deploy-tencent-free.sh` 文件，填入您的配置信息：
```bash
# 腾讯云配置
TENCENT_SECRET_ID="your-secret-id"
TENCENT_SECRET_KEY="your-secret-key"
COS_BUCKET="your-bucket-name"
COS_REGION="ap-guangzhou"
FUNCTION_NAME="your-function-name"
FUNCTION_REGION="ap-guangzhou"
```

### 2. 执行部署
```bash
# 添加执行权限
chmod +x deploy-tencent-free.sh

# 运行部署脚本
./deploy-tencent-free.sh
```

### 3. 配置域名和 CDN
1. 在腾讯云控制台添加域名解析
2. 配置 CDN 加速
3. 配置 SSL 证书（可选）

## 免费资源使用建议

1. **云服务器**：
   - 选择 1核2G 配置
   - 使用 Ubuntu 或 CentOS 系统
   - 合理使用资源，避免超出免费额度

2. **对象存储**：
   - 压缩图片和静态资源
   - 定期清理无用文件
   - 使用 CDN 加速访问

3. **CDN**：
   - 合理设置缓存策略
   - 监控流量使用情况
   - 避免大文件直接下载

4. **云函数**：
   - 优化代码执行时间
   - 合理设置内存配置
   - 监控调用次数

## 注意事项

1. **免费额度限制**：
   - 每月检查资源使用情况
   - 设置使用量提醒
   - 避免超出免费额度

2. **性能优化**：
   - 使用 CDN 加速静态资源
   - 压缩图片和文件
   - 优化代码性能

3. **安全防护**：
   - 定期更新系统
   - 配置安全组
   - 使用 HTTPS

## 常见问题

### 1. 超出免费额度
- 及时监控使用情况
- 优化资源使用
- 考虑升级到付费版本

### 2. 访问速度慢
- 检查 CDN 配置
- 优化静态资源
- 选择合适的服务器区域

### 3. 部署失败
- 检查网络连接
- 确认访问凭证
- 查看错误日志

## 维护建议

1. 定期检查资源使用情况
2. 及时更新系统和依赖
3. 备份重要数据
4. 监控服务状态

## 获取帮助

如果您在部署过程中遇到任何问题，可以：
1. 查看腾讯云文档：https://cloud.tencent.com/document/product
2. 联系腾讯云技术支持
3. 在开发者社区寻求帮助 