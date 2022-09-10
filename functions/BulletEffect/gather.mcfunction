
#作用: 原版弓箭体系追加特殊效果
#时间 : 2021.10.31

#标记
tag @e[tag=arrow.gather,scores={OP=5..}] add arrow.Hit
tag @e[type=arrow,r=5] add arrow.gather

#赋值
scoreboard players add @e[tag=arrow.gather] OP 1

#侦测
execute at @e [tag=arrow.gather] if block ~~1~  air run tag @s remove arrow.Hit
execute at @e [tag=arrow.gather] if block ~~-1~ air run tag @s remove arrow.Hit
execute at @e [tag=arrow.gather] if block ~1~~  air run tag @s remove arrow.Hit
execute at @e [tag=arrow.gather] if block ~-1~~ air run tag @s remove arrow.Hit
execute at @e [tag=arrow.gather] if block ~~~1  air run tag @s remove arrow.Hit
execute at @e [tag=arrow.gather] if block ~~~-1 air run tag @s remove arrow.Hit

#飞行特效
execute at @e [tag=arrow.gather,c=1] run particle minecraft:knockback_roar_particle ~~~

#命中特效
execute as @e [tag=arrow.Hit,tag=arrow.gather] run tp @e[r=15,type=!player] @s[tag=arrow.Hit,tag=arrow.gather]

#销毁
kill @e[tag=arrow.gather,scores={OP=256..}]

#追随