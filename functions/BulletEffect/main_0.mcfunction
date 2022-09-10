
#作用 :主动袭击玩家的鱼雷导弹
#时间 : 2021.07.18

#赋值
scoreboard players add @s[tag=BZ] ZX 1
scoreboard players add @s CD 1

#标记
tag @s[scores={CD=20}] add FD-0
tag @s[tag=FD-0] add BZ

#运行
execute as @s [scores={CD=00..09}] run tp @s ^ ^0.5 ^
execute as @s [scores={CD=15..99}] run tp @s ^ ^ ^0.5

#检测
execute as @s [tag=FD-0] if block ~~1~ water run tag @s remove BZ
execute as @s [tag=FD-0] if block ~~1~ flowing_water run tag @s remove BZ
execute as @s [tag=FD-0] run execute as @e [r=5,family=!abyss] run tag @e[r=5,tag=FD-0] add BZ

#爆炸
#execute as @s [scores={ZX=2}] ~~~ effect @e[r=5,family=!flyer] instant_damage 1 0 true
#execute as @s [scores={ZX=2}] ~~~ effect @e[r=5,family=!flyer] regeneration 1 9 true

execute as @s [scores={ZX=1}] run particle minecraft:knockback_roar_particle ~~~
execute as @s [scores={ZX=2}] run damage @e[r=5,family=!abyss,type=!item] 5 drowning entity @e[type=天渊阁:渊鲸,c=1]

#销毁
event entity @s[scores={ZX=03}] 事件:实体消失
event entity @s[scores={CD=99}] 事件:实体消失

#效果
particle 闪烁粒子:海蓝 ~~~
