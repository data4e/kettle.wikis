# AMQP生产者

高级消息队列协议（AMQP）生成器步骤创建AMQP消息流并将其发布到兼容的AMQP 0-9-1代理。 

### Before You Begin

在使用AMQP Consumer步骤之前，请注意以下条件：

- 此步骤使用并要求AMQP 0-9-1消息传递协议。
- 在配置此步骤之前，您必须具有AMQP 0-9-1兼容代理（例如  RabbitMQ）。
- 在转换中，您只需使用[AMQP Consumer](./ampqConsumer.md )步骤即可从任何AMQP生产者或代理中获取消息。该AMQP生产者不是必要步骤。如果要同时使用这两个步骤
（无论是在相同的转换中还是在单独的转换中），则在“amqp消费者”步骤中指定的某些设置必须与“生产者”步骤中定义的某些设置相匹配。下面的标签部分说明了哪些设置必须匹配。

### General

在以下字段中输入以下信息：
- 步骤名称：指定画布上转换的唯一名称。默认情况下，步骤名称设置为AMQP Producer。

![](/image/PDI_TransStep_Dialog_AMQP-Producer.png)

### Options
AMQP Producer步骤需要“设置”和“安全”选项卡中的定义才能流式传输消息。每个选项卡如下所述。

### 设置(setup)

![](/image/PDI_TransStep_Tab_Setup2_AMQP-Producer.png)

“设置”选项卡定义用于发布消息，队列名称，交换名称和类型以及路由键或标头的连接。


### 安全(Security)
![](/image/PDI_TransStep_Tab_Security_AMQP-Producer.png)

### 元数据注入支持


此步骤的所有字段都支持元数据注入。您可以将此步骤与[ETL元数据注入]一起使用，以在运行时将元数据传递给转换。 ```//TODO``` 

### 你可能需要看

[AMQP消费者](./ampqConsumer.md)


