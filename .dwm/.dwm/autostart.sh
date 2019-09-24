#! /bin/bash

xscreensaver &
conky -c ~/.config/conky/LSD-Conky-master/.conkyrc &
systemctl --user import-environment DISPLAY
systemctl --user start xfce4-notifyd
xset r rate 300 50; 
xset -b
xrdb ~/.Xresources
redshift -l 30.73629:76.7884 &
compton --config ~/.config/compton/compton.conf &

MUS(){
	MUS="$(mpc -f "[[%artist% - ]%title%]|[%file%]" 2>/dev/null | grep -v "volume:" | head -n 1)"
	echo "$MUS"
}

Bat(){
  Bat="$(acpi -b | awk '{print "⚡" $4}' | sed "s/\,//g")"
  echo "$Bat"
}

dte(){
  dte="$(date +"%a, %b %d | 🕒 %I:%M:%S")"
  echo "$dte"
}

#mem(){
  #mem=`free | awk '/Mem/ {printf "%d MiB/%d MiB\n", $3 / 1024.0, $2 / 1024.0 }'`
  #echo -e "🖪 $mem"
#}

Vol(){
  Vol="$(amixer get Master | awk -F'[][]' 'END{ print $2 }')"
  echo "$Vol"
}

Mut(){
	if [ "$(pacmd list-sinks | awk '/muted/ { print $2 }')" = 'no' ]
	then Mut=
	else Mut=
	fi
	echo "$Mut"
}

#Vol(){
	#Vol="$(amixer get Master | grep -o "[0-9]*%\|\[on\]\|\[off\]"  | sed "s/\[on\]//;s/\[off\]//")"
	#echo "$Vol"
#}

Wifi(){
	Wifi="$(grep "^\s*w" /proc/net/wireless | awk '{ print "", int($3 * 100 / 70) "%" }' && sed "s/down//;s/up//" /sys/class/net/e*/operstate)"
	echo "$Wifi"
}

cpu(){
  read cpu a b c previdle rest < /proc/stat
  prevtotal=$((a+b+c+previdle))
  sleep 0.5
  read cpu a b c idle rest < /proc/stat
  total=$((a+b+c+idle))
  cpu=$((100*( (total-prevtotal) - (idle-previdle) ) / (total-prevtotal) ))
  echo -e "💻 $cpu%"
}

charg(){
	if [ "$(cat /sys/class/power_supply/BAT0/status)" = 'Charging' ]
	then 
		echo "(ac)"
	fi
}

while true; do
     xsetroot -name " $(MUS) | $(cpu) | $(Bat)$(charg) | $(Wifi) | $(Mut) $(Vol) | $(dte)"
     sleep 1s    # Update time every one second
done &

while [ "$(cat /sys/class/power_supply/BAT0/capacity)" -le 10 ] && [ "$(cat /sys/class/power_supply/BAT0/status)" = 'Discharging' ]; do
		notify-send "CONNECT THE FRICKING CHARGER YOU BLITHERING IDIOT"
		sleep 10s
done &

while [ "$(cat /sys/class/power_supply/BAT0/capacity)" -ge 99 ] && [ "$(cat /sys/class/power_supply/BAT0/status)" = 'Charging' ]; do
		notify-send "battery full"
		sleep 10s
done &

while true; do
	feh --bg-scale --no-fehbg --randomize ~/wallpapers
	sleep 600s
done &
