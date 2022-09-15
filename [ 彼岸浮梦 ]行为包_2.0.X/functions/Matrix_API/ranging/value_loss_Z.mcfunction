
#作用 : 沿 Z轴线 检测是否存在特定目标
#时间 : 2022.08.06

#计算目标位置 并 转化为 可直接使用 的数据
scoreboard players operation @s set_Z -= "基准-" SR
scoreboard players operation "Z轴缓存" set_Z = @s set_Z
scoreboard players operation @s set_Z -= "Z轴缓存" set_Z
scoreboard players operation @s set_Z -= "Z轴缓存" set_Z
scoreboard players operation "Z轴缓存" set_Z = @s set_Z

#显示距离发射点行驶过的距离
titleraw @p actionbar {"rawtext":[{"score":{"name":"Z轴缓存","objective":"set_Z"}}]}

#销毁
event entity @s 事件:实体消失