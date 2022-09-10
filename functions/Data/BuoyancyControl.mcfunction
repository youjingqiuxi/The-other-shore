
#作用:用于控制< 渊鲸 >的上浮与下潜操作

#赋值
scoreboard players add @s GD 1
scoreboard players set @s[scores={GD=3..}] GD 1

#事件: 1
event entity @s[scores={GD=1}] 事件:下潜模式

#事件: 2
event entity @s[scores={GD=2}] 事件:上浮模式

#交互效果
particle 提示图标:通用提示 ~ ~2.5 ~