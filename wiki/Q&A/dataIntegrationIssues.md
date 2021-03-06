# Kettle 常见问题排除

请按照这些主题中的建议来帮助解决与Pentaho数据集成相关的常见问题：

- 转换步骤和作业条目疑难解答
- 排除数据库连接
- Pentaho Server上安排的作业无法在远程Carte服务器上执行转换
- 无法在另一个作业的Carte实例的存储库中运行作业
- 对Pentaho数据服务问题进行故障排除
- Kitchen和Pan无法从ZIP导出中读取文件
- 使用ODBC
- 编写多个文件时提高性能

## 转换步骤和作业条目疑难解答

如果您在转换步骤或作业条目方面遇到问题，请检查这些条件是否适用于您的情况。

### 打开转换或作业时出现“缺少插件”错误

如果您尝试打开包含未在PDI客户端副本中安装的步骤或条目的转换或作业，则会显示以下错误消息：

![](/image/ssPDIMissingPlugins.png)

要解决此问题，请在PDI客户端中添加步骤或条目，或在市场中找到它并进行安装。有关详细信息，请参阅使用Marketplace安装插件一文。

### 无法执行或修改转换或作业

如果您无法执行任何标准转换或作业任务（例如运行，预览，调试，重放，验证，计划，复制，导出或保存），则您没有执行权限。

让管理用户检查您的角色是否已被授予执行权限。

### 步骤已经在画布错误

如果在PDI客户端的画布上隐藏了一个步骤，则在尝试使用其转换时，您可能会收到“Step is Already on Canvas”错误消息。

无论步骤是隐藏还是显示在画布中，它都会在数据集成透视图的“ 视图”选项卡中的  转换下的“ 步骤”文件夹中列出。要重新显示画布上的隐藏步骤，请将其从“ 视图”选项卡中的“ 步骤”文件夹拖到画布上。

## 排除数据库连接问题

如果您在PDI中遇到数据库连接问题，请检查以下条件是否适用于您的情况：

### 不支持的数据库

可以通过ODBC或JDBC连接使用通用数据库驱动程序从不受支持的数据库中读取数据。如果要访问尚未包含在[受支持组件]()列表中的数据库类型，请与Pentaho联系  。

您可以在位于`````... \ design-tools \ data-integration```下的lib 目录中  添加或替换数据库驱动程序文件  。

### 从单个表读取和更新时的数据库锁定

如果您在转换中创建，读取和更新单个表的步骤，您可能会遇到数据库锁定或处理速度变慢。在单个转换中读取和更新表上的行可能导致数据库停止更新。

例如，如果您有一个从表中的行读取的步骤（表输入  步骤），并且您需要使用更新  步骤更新转换，则可能会导致锁定问题，尤其是对于MS SQL数据库。应避免在同一个表中读取和更新同一转换中的行。

与所有数据库兼容的通用解决方案是复制要读取/更新的表，然后创建单独的读取/更新步骤。安排在转换中按顺序执行的步骤，每个步骤在同一个表的不同但相同的版本上。调整数据库行锁定参数或机制也将解决此问题。

### 强制PDI在参数化SQL查询中使用DATE而不是TIMESTAMP

如果查询优化器错误地使用谓词TIMESTAMP，那是因为JDBC驱动程序/数据库将数据类型从TIMESTAMP转换为DATE。在某些情况下，此转换会阻止数据库的查
询优化器使用正确的索引。例如，Oracle可能声明它无法使用索引，并生成以下错误消息：

```$xslt
The predicate DATE used at line ID 1 of the execution plan contains an implicit
   data type conversion on indexed column DATE. This implicit data type conversion prevents
   the optimizer from selecting indices on table A.
  
```

要解决此问题，使用Select Values步骤，并设置Precision到1和Value到DATE。这些更改会强制将参数设置为DATE而不是TIMESTAMP。

### PDI无法识别对表所做的更改

如果在PDI客户端之外编辑表布局，则PDI不会发现任何字段更改，删除或添加。

清除缓存可解决此问题。需要清除缓存中与数据库相关的元信息（每个使用的数据库表中的字段名称及其类型）。PDI具有此缓存以提高处理速度。执行以下步
骤以从PDI客户端中清除缓存中的此信息：

1. 选择连接。
2. **选择工具>数据库>清除缓存或数据库连接>清除完整的数据库缓存。**

### Pentaho Server上安排的作业无法在远程Carte服务器上执行转换

尝试安排作业在远程Carte服务器上运行时，您可能会看到类似于以下消息的错误：

```
ERROR 11-05 09:33:06,031 - !UserRoleListDelegate.ERROR_0001_UNABLE_TO_INITIALIZE_USER_ROLE_LIST_WEBSVC!
        com.sun.xml.ws.client.ClientTransportException: The server sent HTTP status code 401: Unauthorized

```

您需要进行以下配置更改以远程执行预定作业：

> 将Pentaho Server用作动态Carte集群中的负载均衡器也需要此过程。

1. 停止Pentaho和Carte服务器。
2. 将repositories.xml 文件从工作站上的.kettle文件夹复制到Carte slave上的相同位置。如果没有此文件，Carte slave将无法连接到Pentaho Repository以检索PDI内容。
3. 在文本编辑器中打开/pentaho/server/pentaho-server/tomcat/webapps/pentaho/WEB-INF/web.xml文件。
4. 找到该  Proxy Trusting Filter 部分，并将您的Carte服务器的IP地址添加到该param-value 元素。以下代码块是该Proxy Trusting Filter 部分的示例  ：

```
<filter>
    <filter-name>Proxy Trusting Filter</filter-name>
    <filter-class>org.pentaho.platform.web.http.filters.ProxyTrustingFilter</filter-class>
    <init-param>
      <param-name>TrustedIpAddrs</param-name>
      <param-value>127.0.0.1,192.168.0.1</param-value>
      <description>Comma separated list of IP addresses of a trusted hosts.</description>
    </init-param>
    <init-param>
      <param-name>NewSessionPerRequest</param-name>
      <param-value>true</param-value>
      <description>true to never re-use an existing IPentahoSession in the HTTP session; needs to be true to work around code put in for BISERVER-2639</description>
    </init-param>
</filter>
```

5. 取消注释<!-- begin trust -->和<!-- end trust -->标记之间的代理信任过滤器映射，如以下示例代码块所示：

```
<!-- begin trust --> 
<filter-mapping>
  <filter-name>Proxy Trusting Filter</filter-name>
  <url-pattern>/webservices/authorizationPolicy</url-pattern>
</filter-mapping>

<filter-mapping>
  <filter-name>Proxy Trusting Filter</filter-name>
  <url-pattern>/webservices/roleBindingDao</url-pattern>
</filter-mapping>

<filter-mapping>
  <filter-name>Proxy Trusting Filter</filter-name>
  <url-pattern>/webservices/userRoleListService</url-pattern>
</filter-mapping>

<filter-mapping>
  <filter-name>Proxy Trusting Filter</filter-name>
  <url-pattern>/webservices/unifiedRepository</url-pattern>
</filter-mapping>

<filter-mapping>
  <filter-name>Proxy Trusting Filter</filter-name>
  <url-pattern>/webservices/userRoleService</url-pattern>
</filter-mapping>

<filter-mapping>
  <filter-name>Proxy Trusting Filter</filter-name>
  <url-pattern>/webservices/Scheduler</url-pattern>
</filter-mapping>

<filter-mapping>
  <filter-name>Proxy Trusting Filter</filter-name>
  <url-pattern>/webservices/repositorySync</url-pattern>
</filter-mapping>
<!-- end trust -->
```

6. 保存并关闭该文件，然后 在运行Carte服务器的计算机上编辑carte.sh或Carte.bat启动脚本。

7. 添加-Dpentaho.repository.client.attemptTrust=true到文件底部的java行，如下面的示例代码行所示：

```
java $OPT -Dpentaho.repository.client.attemptTrust=true org.pentaho.di.www.Carte "${1+$@}"

```

8. 保存并关闭文件。
9. 启动您的Carte和Pentaho服务器。

**您现在可以安排作业在远程Carte实例上运行。**