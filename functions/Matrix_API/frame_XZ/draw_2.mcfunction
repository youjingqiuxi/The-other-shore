
#作用 : 生成沿 XZ轴线 绘制的平面边框效果

#赋值
scoreboard players add @s[scores={set_X=1..}] set_X -1
scoreboard players add @s[scores={set_X=..-1}] set_X 1

#运行
tp @s[scores={set_X=1..}] ~1 ~ ~
tp @s[scores={set_X=..-1}] ~-1 ~ ~

#标记
tag @s[scores={set_X=0}] add draw_2
