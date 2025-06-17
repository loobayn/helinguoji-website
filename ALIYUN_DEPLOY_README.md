# 合灵国际网站阿里云部署指南

## 部署架构

我们使用阿里云以下服务进行部署：
1. 阿里云 OSS：存放前端静态文件
2. 阿里云 ECS：运行后端服务
3. 阿里云 CDN：加速静态资源访问
4. 阿里云域名服务：管理网站域名

## 部署前准备

### 1. 阿里云账号准备
1. 注册阿里云账号：https://www.aliyun.com/
2. 开通以下服务：
   - 对象存储 OSS
   - 云服务器 ECS
   - 内容分发网络 CDN
   - 域名服务

### 2. 本地环境准备
1. 安装必要的工具：
   ```bash
   # 安装阿里云 CLI
   curl -o aliyun-cli-linux-latest-amd64.tgz https://aliyuncli.alicdn.com/aliyun-cli-linux-latest-amd64.tgz
   tar xzvf aliyun-cli-linux-latest-amd64.tgz
   sudo mv aliyun /usr/local/bin/
   
   # 安装 ossutil
   wget http://gosspublic.alicdn.com/ossutil/1.7.7/ossutil64
   chmod 755 ossutil64
   sudo mv ossutil64 /usr/local/bin/ossutil
   ```

2. 配置阿里云访问凭证：
   ```bash
   aliyun configure
   ```

### 3. 服务器环境准备
1. 购买阿里云 ECS 服务器（建议配置）：
   - 2核4G内存
   - CentOS 7.9 或 Ubuntu 20.04
   - 带宽 5Mbps 以上

2. 服务器初始化：
   ```bash
   # 安装 Node.js（如果后端是 Node.js）
   curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
   sudo yum install -y nodejs
   
   # 安装 Python（如果后端是 Python）
   sudo yum install -y python3 python3-pip
   
   # 安装 PM2（用于 Node.js 进程管理）
   sudo npm install -g pm2
   
   # 安装 Nginx
   sudo yum install -y nginx
   ```

## 部署步骤

### 1. 配置部署脚本
编辑 `deploy-aliyun.sh` 文件，填入您的配置信息：
```bash
# OSS 配置
OSS_BUCKET="your-bucket-name"
OSS_ENDPOINT="oss-cn-hangzhou.aliyuncs.com"
OSS_ACCESS_KEY_ID="your-access-key-id"
OSS_ACCESS_KEY_SECRET="your-access-key-secret"

# ECS 配置
ECS_HOST="your-ecs-host"
ECS_USER="your-ecs-user"
ECS_KEY_PATH="your-ssh-key-path"
```

### 2. 执行部署
```bash
# 添加执行权限
chmod +x deploy-aliyun.sh

# 运行部署脚本
./deploy-aliyun.sh
```

### 3. 配置域名和 CDN
1. 在阿里云控制台添加域名解析
2. 配置 CDN 加速
3. 配置 SSL 证书

## 部署后检查

1. 检查前端访问：
   - 访问您的域名
   - 检查静态资源加载
   - 检查页面功能

2. 检查后端服务：
   - 测试 API 接口
   - 检查日志输出
   - 监控服务器状态

## 常见问题

### 1. 部署失败
- 检查网络连接
- 确认访问凭证是否正确
- 查看错误日志

### 2. 访问速度慢
- 检查 CDN 配置
- 确认服务器带宽
- 优化静态资源

### 3. 服务器负载高
- 检查进程状态
- 优化代码性能
- 考虑升级服务器配置

## 维护建议

1. 定期备份数据
2. 监控服务器状态
3. 及时更新安全补丁
4. 定期检查日志

## 获取帮助

如果您在部署过程中遇到任何问题，可以：
1. 查看阿里云文档：https://help.aliyun.com/
2. 联系阿里云技术支持
3. 联系项目技术支持团队 