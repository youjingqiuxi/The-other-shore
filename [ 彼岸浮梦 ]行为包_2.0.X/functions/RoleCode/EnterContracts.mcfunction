
#作用 : 签订契约后的提示文本
#时间 : 2021.08.1

#提示
title @a[r=5] actionbar 恭喜你< @p >, 您与< @s >已成功缔结契约

#标签
tag @s add contract

#效果
particle minecraft:knockback_roar_particle ~1~~
particle minecraft:knockback_roar_particle ~~1~
particle minecraft:knockback_roar_particle ~~~1

particle minecraft:totem_particle ~1~~
particle minecraft:totem_particle ~~1~
particle minecraft:totem_particle ~~~1

#启用
execute as @p [tag=!ambient] run function Data/ambient
