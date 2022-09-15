
#作用 : 创建一个计分板目标 用于存储测距后产生的数据值
#时间 : 2022.08.06

#创建缓存目标 此处为[ 公共变量值 ]
scoreboard players add "X轴缓存" set_X 0
scoreboard players add "Y轴缓存" set_Y 0
scoreboard players add "Z轴缓存" set_Z 0

#创建代数目标 此处为[ 公共变量值 ]
scoreboard players set "基准+" SR  100
scoreboard players set "基准-" SR -100

#赋予 确定侦测方向 的标签
execute as @s [scores={set_X=1..}]  run tag @s add Matrix_API.function.faceX_just
execute as @s [scores={set_X=..-1}] run tag @s add Matrix_API.function.faceX_loss
execute as @s [scores={set_Z=1..}]  run tag @s add Matrix_API.function.faceZ_just
execute as @s [scores={set_Z=..-1}] run tag @s add Matrix_API.function.faceZ_loss
execute as @s [scores={set_Y=1..}]  run tag @s add Matrix_API.function.faceY_just
execute as @s [scores={set_Y=..-1}] run tag @s add Matrix_API.function.faceY_loss

#赋予 结束设置阶段 的标签
tag @s add Matrix_API.function.set_cache