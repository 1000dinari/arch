#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

#[[ "$PS1" ]] && /usr/bin/fortune

#[[ "$PS1" ]] && neofetch | lolcat

export EDITOR=/usr/bin/vim
export RANGER_LOAD_DEFAULT_RC=false

export PS1="\[\033[38;5;196m\]\u\[$(tput sgr0)\]@\[$(tput sgr0)\]\[\033[38;5;82m\]\H\[$(tput sgr0)\] \[$(tput sgr0)\]\[\033[38;5;11m\]\\$\[$(tput sgr0)\]"

#printf '\033[5 q\r'

alias 1start='wg-quick up wgcf-profile'
alias 1stop='wg-quick down wgcf-profile'
alias ..='cd ..'
alias altf='sudo cat /home/barbarik/workresolv > /etc/resolv.conf && sudo systemctl restart NetworkManager'
alias aw='wiki-search'
alias aaja='sudo pacman -S --noconfirm'
alias aja='sudo pacman -S'
alias allpackages='pacman -Qeq'
alias aurpackages='pacman -Qeqm'
alias autism='curl parrot.live'
alias brtns='xbacklight -set'
alias bsrc='source .bashrc'
alias bt='rfkill unblock bluetooth & bluetoothctl'
alias btc='curl rate.sx'
alias btup='sudo rfkill unblock bluetooth'
alias btdown='sudo rfkill block bluetooth'
alias bye='shutdown -h now'
alias cam='qv4l2'
alias c='clear'
alias calc='qalculate'
alias cnk='conky -c ~/.config/conky/LSD-Conky-master/.conkyrc &'
alias compress='tar -czvf'
alias cp='cp -r'
alias def="~/define.sh | sed '/^220/d; /^250/d; /^221/d; /^%/d; /^Dload/d; /^100/d'"
alias df='df -h'
alias disable-vnc='sudo systemctl disable vncserver@:1.service'
alias disable='sudo systemctl disable'
alias disapprove='echo ಠ_ಠ'
alias dwc='cd ~/dwm-6.2 && sudo make install'
alias du='du -d 1 -h'
alias egrep='egrep --color=auto'
alias enable-vnc='sudo systemctl enable vncserver@:1.service'
alias enable='sudo systemctl enable'
alias etn='curl rate.sx/etn'
alias extract='tar -xvf'
alias faltudeps='pacman -Qdt'   #shows unneeded dependancies 
alias fgrep='fgrep --color=auto'
alias fehbh='feh --bg-scale --no-fehbg --randomize ~/wallpapers'
alias g='startx'
alias gcc='gcc -lm'
alias gdt='sudo gedit'
alias get='sudo apt-get install'
alias ggpg='sudo cat /home/barbarik/homeresolv > /etc/resolv.conf && sudo systemctl restart NetworkManager'
alias gitpush='~/git-push.sh'
alias grep='grep --color=auto'
alias grub='sudo grub-mkconfig -o /boot/grub/grub.cfg'
alias h='history'
alias hotspot='sudo create_ap wlan0 wlan0 yele 0987654321'
alias hotspot-bhasad='sudo rm -rf /tmp/create_ap.all.lock'
alias htspt='hotspot-bhasad; sudo create_ap wlan0 wlan0 yele 0987654321'
alias ip-bata='dig +short myip.opendns.com @resolver1.opendns.com'
alias irc='weechat'
alias ix="curl -F 'f:1=<-' http://ix.io"
alias ixp="cat outbuffer.txt | ix"
alias kali='sudo /home/barbarik/kali.sh'
alias la='ls -A'
alias lal='ls -alh'
alias ll='ls -lh'
alias lll='ls -alh'
alias ls='ls -ah'
alias lsd='ls -ld */'
alias mac-spoof='sudo ifconfig wlp2s0 down; sudo macchanger -r wlp2s0; sudo ifconfig wlp2s0 up'
alias mcd='mkdircd'
alias mictest='arecord -vv -f dat /dev/null'
alias mirrors='sudo reflector --verbose --latest 200 --protocol http --protocol https --sort rate --save /etc/pacman.d/mirrorlist'
alias mus='ncmpcpp'
alias myip='curl http://ifconfig.me/ip'
alias n='nmtui'
alias neo='neofetch | lolcat'
alias nyan='telnet -e ^c nyancat.dakko.us'
alias nyay='echo Ññ'
alias p=' > outbuffer.txt'
alias pacvac='sudo pacman -Rs $(sudo pacman -Qtdq)'
alias ptch='patch -p1 <'
alias pico='vi'
alias pipe="~/buffer.txt && ixp"
alias please='sudo $(history -p !!)'
alias ports='netstat -tulanp'
alias ptpb='curl -F c=@- https://ptpb.pw'
alias py='python'
alias quit='exit'
alias r='ranger'
alias rbt='reboot'
alias remove='sudo apt-get --purge remove'
alias repopackages='pacman -Qeqn'
alias rfk='robotfindskitten'
alias rid='shred -v -n 10 -u -z'
alias root='sudo -i'
alias s='sudo "$BASH" -c "$(history -p !!)"'
alias scan-ip='nmap -sP 192.168.0.0/24'
alias sl='sl -ael'
alias smk='sudo make install'
alias sophos='while true; do ~/bin/caa; done'
alias start='sudo systemctl start'
alias stop='sudo systemctl stop'
alias su='sudo -i'
alias swap='/home/barbarik/bofh.sh'
alias systemd-list='sudo systemctl list-unit-files'
alias u='uptime && users'
alias up='uptime'
alias update='sudo pacman -Syyuu --noconfirm && ~/git-update.sh && paccache -rk1'
alias unpatch='patch -p1 -R <'
alias wallp='feh --bg-scale --no-fehbg --randomize ~/wallpapers'
alias warpstart='sudo systemctl start warp-svc && warp-cli connect'
alias warpstop='warp-cli disconnect'
alias whoami='/home/barbarik/ip.sh'
alias why='fortune'
alias why?='fortune'
alias wd='wifidown'
alias wifidown='sudo rfkill block wlan'
alias wifiup='sudo rfkill unblock wlan'
alias wu='wifiup'
alias wps-shutter='sudo reaver -i wlp2s0mon -b 78:44:76:DC:45:70 -c 10 -vvv K 1 -f'
alias wtr='curl wttr.in'
alias x='exit'
alias xmo='startx ~/.startxmonad'
alias bright='xbacklight -set'
alias v='nvim'
alias xres='xrdb .Xresources'
alias xshowkeys='xev'
alias yayslay='yay -Rs $(yay -Qtdq)'
alias yeet='sudo pacman -Rns'

PATH=$PATH:~/.cabal/bin

if [ $TILIX_ID ] || [ $VTE_VERSION ]; then
        source /etc/profile.d/vte.sh
fi
