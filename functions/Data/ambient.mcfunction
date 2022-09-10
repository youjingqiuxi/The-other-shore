
#作用 : 提供实现功能所必要的计分板环境
#时间 : 2021.01.20

#标记
tag @s add ambient

#常规
scoreboard objectives add MU dummy 能量值
scoreboard objectives add CD dummy 进度值
scoreboard objectives add OP dummy 操作值
scoreboard objectives add ZX dummy 执行值
scoreboard objectives add GD dummy 阶段值

#储存
scoreboard objectives add SR dummy 输入值
scoreboard objectives add CC dummy 存储值
scoreboard objectives add HC dummy 缓存值

#识别
scoreboard objectives add RZ dummy 认证值
scoreboard objectives add YZ dummy 验证值

#绘制
scoreboard objectives add set_X dummy X轴参数
scoreboard objectives add set_Y dummy Y轴参数
scoreboard objectives add set_Z dummy Z轴参数

#游戏规则
gamerule sendcommandfeedback false