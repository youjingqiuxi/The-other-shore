
#作用:显示模块已充能的粒子效果
#时间 : 2021.01.20

#赋值
scoreboard players add @s CD 1

#运行
tp @s ~ ~0.1 ~ ~20

#效果
particle minecraft:obsidian_glow_dust_particle ^1.0 ^ ^ 
particle minecraft:obsidian_glow_dust_particle ^-1.0 ^ ^ 
particle minecraft:obsidian_glow_dust_particle ^ ^ ^1.0
particle minecraft:obsidian_glow_dust_particle ^ ^ ^-1.0

#销毁
event entity @s[scores={CD=20..}] 事件:实体消失