
#作用 : <魔法卷宗 - 林木植伐>的功能实现
#时间 : 2022.08.04

#原木
execute if block ~~~ log run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ log2 run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ warped_stem run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ mangrove_log run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ crimson_stem run fill ~~~ ~~~ air 0 destroy

#树叶
execute if block ~~~ leaves run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ leaves2 run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ azalea_leaves run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ mangrove_leaves run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ azalea_leaves_flowered run fill ~~~ ~~~ air 0 destroy

#效果
particle 闪烁粒子:叶绿 ~~~