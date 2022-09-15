
#作用 : 生成沿 ZY轴线 绘制的平面边框效果

#赋值
scoreboard players add @s[scores={set_Y=1..}] set_Y -1
scoreboard players add @s[scores={set_Y=..-1}] set_Y 1

#运行
tp @s[scores={set_Y=1..}] ~ ~1 ~
tp @s[scores={set_Y=..-1}] ~ ~-1 ~

#标记
tag @s[scores={set_Y=0}] add draw_1

#重置
scoreboard players operation @s[tag=draw_1] set_Z -= @s SR
scoreboard players operation @s[tag=draw_1] set_Y -= @s CC