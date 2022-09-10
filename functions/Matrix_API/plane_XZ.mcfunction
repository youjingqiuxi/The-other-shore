
#作用 : 生成沿 一个 平面 的效果

#赋值
scoreboard players add @s[scores={set_X=0,set_Z=1..}] set_Z -1
scoreboard players add @s[scores={set_X=0,set_Z=..-1}] set_Z 1

scoreboard players operation @s[scores={set_X=0}] set_X = @s HC

scoreboard players operation @s[tag=!Matrix_API.draw_set] HC = @s set_X

scoreboard players add @s[scores={set_X=1..}] set_X -1
scoreboard players add @s[scores={set_X=..-1}] set_X 1

#销毁
event entity @s[scores={set_Z=0}] 事件:实体消失

#标记
tag @s[tag=!Matrix_API.draw_set] add Matrix_API.draw_set

#运行
tp @s[scores={set_X=1..}] ^1 ^ ^

tp @s[scores={set_X=..-1}] ^-1 ^ ^

#换行
tp @s[scores={set_X=0,set_Z=2..}] ~ ~ ~1
tp @s[scores={set_X=0,set_Z=1..}] ^^^ ~180

tp @s[scores={set_X=0,set_Z=..-2}] ~ ~ ~-1
tp @s[scores={set_X=0,set_Z=..-1}] ^^^ ~180