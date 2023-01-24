
#作用 : 生成沿 XZ轴线 绘制的平面边框效果

#赋值
scoreboard players add @s[scores={set_Z=1..}] set_Z -1
scoreboard players add @s[scores={set_Z=..-1}] set_Z 1

#运行
tp @s[scores={set_Z=1..}] ~ ~ ~1
tp @s[scores={set_Z=..-1}] ~ ~ ~-1

#销毁
event entity @s[scores={set_Z=0}] 实体消失