
#作用 : 实现生成一个会逐渐上升的一次性魔法阵
#时间 : 2021.10.31

#赋值
scoreboard players add @s CD 1

#召唤实体
execute as @s [scores={CD=001}] run summon 矩阵接口:锚点 ~~~ 实体事件
execute as @s [scores={CD=080}] run summon 矩阵接口:锚点 ~~~ 实体事件
execute as @s [scores={CD=160}] run summon 矩阵接口:锚点 ~~~ 实体事件

#运动轨迹
tp @s ~~~ ~10
tp @e[family=Matrix_Anchor,r=5] ^^^3
execute as @e [family=Matrix_Anchor,r=5] at @e [family=Matrix_Anchor,r=5] run tp @s ~~~ ~-5

#粒子效果
particle minecraft:villager_happy ^ ^ ^6
particle minecraft:villager_happy ^ ^ ^-6
particle minecraft:villager_happy ^5 ^ ^
particle minecraft:villager_happy ^-5 ^ ^
execute as @e [family=Matrix_Anchor,r=5] at @e [family=Matrix_Anchor,r=5]  run particle 动态轨迹:靛蓝 ^ ^ ^-2
execute as @e [family=Matrix_Anchor,r=5] at @e [family=Matrix_Anchor,r=5]  run particle 动态轨迹:靛蓝 ^ ^ ^2

#销毁
execute as @s [scores={CD=240}] run event entity @e[family=Matrix_API,r=5] 实体消失