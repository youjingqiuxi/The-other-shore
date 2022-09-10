
#作用 : 匣里乾坤的功能实现
#时间 : 2022.04.08

#附加 状态效果
effect @e[r=16,type=!player] slow_falling 1 1 true
effect @e[r=16,type=!player] slowness 2 255 true

#附加 销毁 标记
execute positioned ~-5 ~-2 ~-5 run tag @e[dx=10,dy=4,dz=10,type=!player] add Need_to_clear

#生成 使用特效
execute as @e [r=16,tag=Need_to_clear] run particle 烟雾效果:紫影 ~~~

#清除 待销毁目标
event entity @e[family=Peer,tag=Need_to_clear] 事件:实体消失
tp @e[family=!Peer,tag=Need_to_clear] ~ -128 ~
kill @e[family=!Peer,tag=Need_to_clear]