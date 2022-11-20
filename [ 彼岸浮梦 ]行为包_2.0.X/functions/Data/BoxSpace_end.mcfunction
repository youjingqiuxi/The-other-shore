
#作用 : 匣里乾坤的功能实现
#时间 : 2022.04.08

#附加 销毁 标记
execute as @e [x=~-5,dx=10,y=~-5,dy=10,z=~-5,dz=10,type=!player] run tag @s add Need_to_clear

#生成 使用特效
execute as @e [x=~-5,dx=10,y=~-5,dy=10,z=~-5,dz=10,tag=Need_to_clear] run particle 烟雾效果:紫影 ~~~

#销毁< 彼岸目标 >
event entity @e[family=Peer,tag=Need_to_clear] 实体消失

#销毁< 香草目标 >
tp @e[family=!Peer,tag=Need_to_clear] ~ -128 ~
kill @e[family=!Peer,tag=Need_to_clear]