
#作用 : 沿 Y轴线 检测是否存在特定目标
#时间 : 2022.08.06

#计算目标位置 并 转化为 可直接使用 的数据
scoreboard players operation @s set_Y -= "基准+" SR
scoreboard players operation "Y轴缓存" set_Y = @s set_Y
scoreboard players operation @s set_Y -= "Z轴缓存" set_Y
scoreboard players operation @s set_Y -= "Z轴缓存" set_Y
scoreboard players operation "Y轴缓存" set_Y = @s set_Y

#显示距离发射点行驶过的距离
titleraw @p actionbar {"rawtext":[{"score":{"name":"Y轴缓存","objective":"set_Y"}}]}

#销毁
event entity @s 事件:实体消失