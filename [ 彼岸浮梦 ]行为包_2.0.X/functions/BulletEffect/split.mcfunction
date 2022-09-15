
#作用: 原版弓箭体系追加特殊效果
#时间 : 2021.10.31

#标记
tag @e[tag=arrow.split,scores={OP=5..}] add arrow.Hit
tag @e[type=arrow,r=5] add arrow.split

#赋值
scoreboard players add @e[tag=arrow.split] OP 1

#侦测
execute at @e [tag=arrow.split] if block ~~1~  air run tag @s remove arrow.Hit
execute at @e [tag=arrow.split] if block ~~-1~ air run tag @s remove arrow.Hit
execute at @e [tag=arrow.split] if block ~1~~  air run tag @s remove arrow.Hit
execute at @e [tag=arrow.split] if block ~-1~~ air run tag @s remove arrow.Hit
execute at @e [tag=arrow.split] if block ~~~1  air run tag @s remove arrow.Hit
execute at @e [tag=arrow.split] if block ~~~-1 air run tag @s remove arrow.Hit

#飞行特效
execute at @e [tag=arrow.split,c=1] run particle minecraft:knockback_roar_particle ~~~

#命中特效
execute at @e [tag=arrow.Hit,tag=arrow.split] run summon 制导飞弹:碎星 ~1 ~ ~
execute at @e [tag=arrow.Hit,tag=arrow.split] run summon 制导飞弹:碎星 ~ ~1 ~
execute at @e [tag=arrow.Hit,tag=arrow.split] run summon 制导飞弹:碎星 ~ ~ ~1

#销毁
kill @e[tag=arrow.split,scores={OP=256..}]
kill @e[tag=arrow.split,tag=arrow.Hit]

#追随