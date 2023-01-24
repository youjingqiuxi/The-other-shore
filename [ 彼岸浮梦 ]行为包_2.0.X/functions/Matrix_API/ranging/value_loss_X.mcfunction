
#作用 : 沿 X轴线 检测是否存在特定目标
#时间 : 2022.08.06

#计算目标位置 并 转化为 可直接使用 的数据
scoreboard players operation @s set_X -= "基准-" SR
scoreboard players operation "X轴缓存" set_X = @s set_X
scoreboard players operation @s set_X -= "X轴缓存" set_X
scoreboard players operation @s set_X -= "X轴缓存" set_X
scoreboard players operation "X轴缓存" set_X = @s set_X

#显示距离发射点行驶过的距离
titleraw @p actionbar {"rawtext":[{"score":{"name":"X轴缓存","objective":"set_X"}}]}

#销毁
event entity @s 实体消失