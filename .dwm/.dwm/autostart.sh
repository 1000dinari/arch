#! /bin/bash

MUS(){
	MUS="$(mpc -f "[[%artist% - ]%title%]|[%file%]" 2>/dev/null | grep -v "volume:" | head -n 1)"
	echo "$MUS"
}

Bat(){
  Bat="$(acpi -b | awk '{print "⚡" $4}' | sed "s/\,//g")"
  echo "$Bat"
}

dte(){
  dte="$(date +"%a, %b %d | %I:%M:%S")"
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
  echo -e "cpu $cpu%"
}

charg(){
	if [ "$(cat /sys/class/power_supply/BAT1/status)" = 'Charging' ]
	then 
		echo "(ac)"
	fi
}

while true; do
     xsetroot -name " $(MUS) | $(cpu) | $(Bat)$(charg) | $(Wifi) | $(Mut) $(Vol) | $(dte)"
     sleep 1s    # Update time every one second
done &


#while true; do
	#feh --bg-scale --no-fehbg --randomize ~/wallpapers
	#sleep 600s
#done &


#while true; do
	#notify-send "PAANI PE LE BHAI MAR JAYEGA"
	#sleep 900s
#done &
