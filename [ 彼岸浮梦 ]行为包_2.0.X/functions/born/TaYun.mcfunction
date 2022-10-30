
#作用 :召唤[ 星阁阵营 ]的角色
#时间 : 2021.09.12

#清理所需空间 防止水分入侵结构
execute as @s positioned ~-13 ~-17 ~-13 run fill ~~~ ~26 ~25 ~26 stone
execute as @s positioned ~-14 ~ ~-14 run fill ~~~ ~28 ~ ~28 fence 1 keep

#生成所需的结构
structure load 建筑.星辉雅居 ~-13 ~-16 ~-13 0_degrees none true true

#清除 召唤时 需要消耗 的材料
replaceitem entity @s slot.weapon.offhand 0 air

#生成 一组 用于表示 进行了 召唤 的 粒子效果
summon 矩阵接口:绘制 ~~1~ 标签驱动.图形绘制.旋转
tag @e[c=1,family=Matrix_API] add Matrix_API.rotate.Green_matrix

#文本提示
title @s actionbar 正在召唤 < 特殊建筑 : 星辉雅居 >

#标记 已经进行过 召唤 的玩家
tag @s add call_starry_end