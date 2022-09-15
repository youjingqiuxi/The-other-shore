
#作用 :主动攻击魔物的飞弹
#时间 : 2021.08.14

#赋值
scoreboard players random @s OP 0 3
scoreboard players random @s ZX 0 5

#附加协同伤害
#摔落

#地刺
execute as @s [scores={OP=01}] at @e [r=5,family=monster] run summon evocation_fang ~ ~ ~
execute as @s [scores={OP=01}] at @e [r=5,family=monster] run summon evocation_fang ~1 ~ ~1
execute as @s [scores={OP=01}] at @e [r=5,family=monster] run summon evocation_fang ~-1 ~ ~-1
execute as @s [scores={OP=01}] at @e [r=5,family=monster] run summon evocation_fang ~-1 ~ ~1
execute as @s [scores={OP=01}] at @e [r=5,family=monster] run summon evocation_fang ~1 ~ ~-1

#箭矢
execute as @s [scores={OP=02}] run summon arrow ~0  ~15 ~0
execute as @s [scores={OP=02}] run summon arrow ~1  ~14 ~1
execute as @s [scores={OP=02}] run summon arrow ~1  ~13 ~-1
execute as @s [scores={OP=02}] run summon arrow ~-1 ~12 ~1
execute as @s [scores={OP=02}] run summon arrow ~-1 ~11 ~-1

#附加特殊效果
#怪物
execute as @s [scores={ZX=01}] run effect @e[r=5,family=monster] fatal_poison 300 4 true
execute as @s [scores={ZX=02}] run effect @e[r=5,family=monster] slowness 300 4 true
execute as @s [scores={ZX=03}] run effect @e[r=5,family=monster] weakness 300 4 true
execute as @s [scores={ZX=04}] run effect @e[r=5,family=monster] wither 300 4 true
execute as @s [scores={ZX=05}] run effect @e[r=5,family=monster] poison 300 4 true

#天渊
execute as @s [scores={ZX=01}] run effect @e[r=5,family=abyss] fatal_poison 300 4 true
execute as @s [scores={ZX=02}] run effect @e[r=5,family=abyss] slowness 300 4 true
execute as @s [scores={ZX=03}] run effect @e[r=5,family=abyss] weakness 300 4 true
execute as @s [scores={ZX=04}] run effect @e[r=5,family=abyss] wither 300 4 true
execute as @s [scores={ZX=05}] run effect @e[r=5,family=abyss] poison 300 4 true

#释放粒子效果
particle minecraft:knockback_roar_particle ~~~