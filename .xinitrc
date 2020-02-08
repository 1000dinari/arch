#exec startxfce4

chmod +x ~/battery.sh
conky -c ~/.config/conky/LSD-Conky-master/.conkyrc &
systemctl --user import-environment DISPLAY
systemctl --user start xfce4-notifyd
xset r rate 300 50; 
xset -b
xrdb ~/.Xresources
redshift -l 30.73629:76.7884 &
compton --config ~/.config/compton/compton.conf &
~/battery.sh &
feh --bg-scale --no-fehbg --randomize ~/wallpapers/pink.png &

exec dwm
#exec i3

[[ -f ~/.Xresources ]] && xrdb -merge -I$HOME ~/.Xresources
