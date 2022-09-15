
#作用 : 生成沿 Z轴线 绘制的效果

#赋值
scoreboard players add @s[scores={set_Z=1..}] set_Z -1
scoreboard players add @s[scores={set_Z=..-1}] set_Z 1

#运行
tp @s[scores={set_Z=1..}] ~ ~ ~1
tp @s[scores={set_Z=..-1}] ~ ~ ~-1
