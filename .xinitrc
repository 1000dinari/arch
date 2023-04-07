#exec startxfce4


conky -c ~/.config/conky/LSD-Conky-master/.conkyrc &
systemctl --user import-environment DISPLAY
systemctl --user start xfce4-notifyd
xset r rate 300 50; 
xset -b
xrdb ~/.Xresources
# redshift -l 30.73629:76.7884 &
picom --config ~/.config/picom/picom.conf &
~/battery.sh &
feh --bg-scale --no-fehbg ~/wallpapers/ancient.png &

while [ "$(cat /sys/class/power_supply/BAT0/capacity)" -le 10 ] && [ "$(cat /sys/class/power_supply/BAT0/status)" = 'Discharging' ]; do
		notify-send "CONNECT THE FRICKING CHARGER YOU BLITHERING IDIOT"
		sleep 10s
done &

while [ "$(cat /sys/class/power_supply/BAT0/capacity)" -ge 99 ] && [ "$(cat /sys/class/power_supply/BAT0/status)" = 'Charging' ]; do
		notify-send "battery full"
		sleep 10s
done &

exec dwm
#exec i3
#exec xmonad
[[ -f ~/.Xresources ]] && xrdb -merge -I$HOME ~/.Xresources

export _JAVA_AWT_WM_NONREPARENTING=1
