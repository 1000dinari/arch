#! /bin/bash

systemctl --user import-environment DISPLAY
systemctl --user start xfce4-notifyd
xset r rate 300 50; 
xset -b
xrdb ~/.Xresources
redshift -l 30.73629:76.7884 &
compton --config ~/.config/compton/compton.conf &

Bat(){
  Bat="$(acpi -b | awk '{print "⚡" $4}' | sed "s/\,//g")"
  echo "$Bat"
}

dte(){
  dte="$(date +"%a, %b %d | 🕒 %I:%M")"
  echo "$dte"
}

mem(){
  mem=`free | awk '/Mem/ {printf "%d MiB/%d MiB\n", $3 / 1024.0, $2 / 1024.0 }'`
  echo -e "🖪 $mem"
}

Vol(){
  Vol="$(amixer get Master | awk -F'[][]' 'END{ print " 🔊 " $2 }')"
  echo "$Vol"
}


cpu(){
  read cpu a b c previdle rest < /proc/stat
  prevtotal=$((a+b+c+previdle))
  sleep 0.5
  read cpu a b c idle rest < /proc/stat
  total=$((a+b+c+idle))
  cpu=$((100*( (total-prevtotal) - (idle-previdle) ) / (total-prevtotal) ))
  echo -e "💻 $cpu% cpu"
}

while true; do
     xsetroot -name "$(cpu) | $(Bat) | $(mem) | $(Vol) | $(dte)"
     sleep 1s    # Update time every ten seconds
done &

while [ "$(cat /sys/class/power_supply/BAT0/capacity)" -le 10 ] && [ "$(cat /sys/class/power_supply/BAT0/status)" = 'Discharging' ]; do
	notify-send "CONNECT THE FRICKING CHARGER YOU BLITHERING IDIOT"
	sleep 10s
done &

while [ "$(cat /sys/class/power_supply/BAT0/capacity)" -ge 100 ] && [ "$(cat /sys/class/power_supply/BAT0/status)" = 'Charging' ]; do
		notify-send "battery full"
		sleep 10s
done &

while true; do
	feh --bg-scale --no-fehbg --randomize ~/wallpapers
	sleep 600s
done &
