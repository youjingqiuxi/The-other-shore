
#作用 : 根据 行进距离 释放粒子效果 的机制

#赋值
scoreboard players set @s[scores={GD=5}] GD 0
scoreboard players add @s GD 1

#效果
execute as @s [scores={GD=5}] run particle 提示图标:定位标识 ~~~