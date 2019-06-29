#exec startxfce4
redshift -03500; xset r rate 300 50; exec dwm
#exec i3

[[ -f ~/.Xresources ]] && xrdb -merge -I$HOME ~/.Xresources
