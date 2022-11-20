
#深渊迷途 的 传送门 寻找到 另一个 传送门 时, 将玩家进行传送的机制

#标记
tag @s add Reach_the_target

#传送
execute as @e [y=~128,dy=-256] if block ~~~ 伺服机关:魔晶上传 run tp @s @e[c=1,tag=Reach_the_target]
execute as @e [y=~128,dy=-256] if block ~~~ 伺服机关:魔晶下传 run tp @s @e[c=1,tag=Reach_the_target]

#销毁
event entity @s 实体消失