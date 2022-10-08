
#作用 : 凝岩聚矿的随机矿物生成机制

#获得随机赋值
execute if block ~~~ stone run scoreboard players random @s OP 0 255

#随机生成矿物

#___概率:10___
#煤矿石
execute as @s [scores={OP=00..09}] run setblock ~~~ coal_ore
#铁矿石
execute as @s [scores={OP=09..19}] run setblock ~~~ iron_ore
#金矿石
execute as @s [scores={OP=19..29}] run setblock ~~~ gold_ore

#___概率:05___
#青金石
execute as @s [scores={OP=30..34}] run setblock ~~~ lapis_ore
#红石矿
execute as @s [scores={OP=35..39}] run setblock ~~~ redstone_ore
#石英矿
execute as @s [scores={OP=40..44}] run setblock ~~~ quartz_ore

#___概率:02___
#钻石矿
execute as @s [scores={OP=45..46}] run setblock ~~~ diamond_ore
#翡翠矿
execute as @s [scores={OP=47..48}] run setblock ~~~ emerald_ore
#残骸块
execute as @s [scores={OP=49..50}] run setblock ~~~ amethyst_cluster

#___概率:01___
#紫水晶
execute as @s [scores={OP=51}] run setblock ~~~ amethyst_cluster
#铜矿石
execute as @s [scores={OP=52}] run setblock ~~~ copper_ore

#复位
scoreboard players set @s OP 1024

#销毁
event entity @s[scores={OP=00..52}] 事件:闪烁退场