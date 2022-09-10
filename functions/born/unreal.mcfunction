
#作用 :召唤[ 幻生阵营 ]的角色
#时间 : 2021.09.12

#赋值
scoreboard players random @s ZX 0 20

#生成 一组 用于表示 进行了 召唤 的 粒子效果
summon 矩阵接口:规划 ~~1~ 标签驱动.图形绘制.旋转
tag @e[r=2,family=Matrix_API] add Matrix_API.rotate.Green_matrix

#进行随机的召唤
execute as @s [scores={ZX=00..03}] positioned ~ ~2 ~ run summon 幻生阁:九九
execute as @s [scores={ZX=04..07}] positioned ~ ~2 ~ run summon 幻生阁:雪隐
execute as @s [scores={ZX=08..11}] positioned ~ ~2 ~ run summon 幻生阁:星砂
execute as @s [scores={ZX=12..16}] positioned ~ ~2 ~ run summon 幻生阁:幽蓝
execute as @s [scores={ZX=17..20}] positioned ~ ~2 ~ run summon 明镜阁:珍珠

#效果
summon minecraft:lightning_bolt ~ ~5 ~
particle minecraft:totem_particle ~ ~1 ~
particle minecraft:knockback_roar_particle ~~~