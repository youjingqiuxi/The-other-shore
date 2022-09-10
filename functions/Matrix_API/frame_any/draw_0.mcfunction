
#作用 : 生成沿 XYZ轴线 绘制的平面边框效果

#赋值
scoreboard players operation @s[tag=!Matrix_API.draw_set] HC = @s set_X
scoreboard players operation @s[tag=!Matrix_API.draw_set] SR = @s set_Z
scoreboard players operation @s[tag=!Matrix_API.draw_set] CC = @s set_Y

scoreboard players add @s[scores={set_Z=1..}] set_Z -1
scoreboard players add @s[scores={set_Z=..-1}] set_Z 1

scoreboard players add @s[scores={set_X=1..}] set_X -1
scoreboard players add @s[scores={set_X=..-1}] set_X 1

#运行
tp @s[scores={set_Z=1..}] ~ ~ ~1
tp @s[scores={set_Z=..-1}] ~ ~ ~-1

tp @s[scores={set_X=1..}] ~1 ~ ~
tp @s[scores={set_X=..-1}] ~-1 ~ ~

#标记
tag @s add Matrix_API.draw_set
tag @s[scores={set_Z=0,set_X=0}] add draw_0