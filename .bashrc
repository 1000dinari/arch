#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

#[[ "$PS1" ]] && /usr/bin/fortune

#[[ "$PS1" ]] && neofetch | lolcat

export PS1="\[\033[38;5;196m\]\u\[$(tput sgr0)\]\[\033[38;5;15m\]@\[$(tput sgr0)\]\[\033[38;5;46m\]\H\[$(tput sgr0)\]\[\033[38;5;15m\]:: \[$(tput sgr0)\]\[\033[38;5;11m\]\\$\[$(tput sgr0)\]"

alias ..='cd ..'
alias aaja='sudo pacman -S --noconfirm'
alias aja='sudo pacman -S'
alias allpackages='pacman -Qeq'
alias aurpackages='pacman -Qeqm'
alias autism='curl parrot.live'
alias bsrc='source .bashrc'
alias btc='curl rate.sx'
alias bye='shutdown -h now'
alias c='clear'
alias cnk='conky -c ~/.config/conky/LSD-Conky-master/.conkyrc &'
alias cp='cp -r'
alias df='df -h'
alias diff='colordiff'
alias disable-vnc='sudo systemctl disable vncserver@:1.service'
alias disable='sudo systemctl disable'
alias disapprove='echo ಠ_ಠ'
alias du='du -d 1 -h'
alias egrep='egrep --color=auto'
alias enable-vnc='sudo systemctl enable vncserver@:1.service'
alias enable='sudo systemctl enable'
alias etn='curl rate.sx/etn'
alias faltudeps='pacman -Qdt'   #shows unneeded dependancies 
alias fgrep='fgrep --color=auto'
alias g='startx'
alias gdt='sudo gedit'
alias get='sudo apt-get install'
alias grep='grep --color=auto'
alias grub='sudo grub-mkconfig -o /boot/grub/grub.cfg'
alias h='history'
alias ip-bata='dig +short myip.opendns.com @resolver1.opendns.com'
alias irc='weechat'
alias ix="curl -F 'f:1=<-' http://ix.io" 
alias kali='sudo /home/barbarik/kali.sh'
alias la='ls -A'
alias lal='ls -alh'
alias ll='ls -lh'
alias lll='ls -alh'
alias ls='ls -ah --color=auto'
alias lsd='ls -ld */'
alias mac-spoof='sudo ifconfig wlp2s0 down; sudo macchanger -r wlp2s0; sudo ifconfig wlp2s0 up'
alias mcd='mkdircd'
alias mictest='arecord -vv -f dat /dev/null'
alias myip='curl http://ifconfig.me/ip'
alias n='nmtui'
alias nyan='telnet -e ^c nyancat.dakko.us'
alias nyay='echo Ññ'
alias pacvac='sudo pacman -Rs $(sudo pacman -Qtdq)'
alias pico='vi'
alias please='sudo $(history -p !!)'
alias ports='netstat -tulanp'
alias ptpb='curl -F c=@- https://ptpb.pw'
alias py='python'
alias quit='exit'
alias rbt='reboot'
alias remove='sudo apt-get --purge remove'
alias repopackages='pacman -Qeqn'
alias rfk='robotfindskitten'
alias rid='shred -v -n 10 -u -z'
alias root='sudo -i'
alias s='sudo "$BASH" -c "$(history -p !!)"'
alias scan-ip='nmap -sP 192.168.0.0/24'
alias sl='sl -ael'
alias start='sudo systemctl start'
alias stop='sudo systemctl stop'
alias su='sudo -i'
alias swap='/home/barbarik/bofh.sh'
alias systemd-list='sudo systemctl list-unit-files'
alias u='uptime && users'
alias up='uptime'
alias update='sudo pacman -Syyuu --noconfirm && yay -Syyuu --sudoloop --noconfirm'
alias whoami='/home/barbarik/ip.sh'
alias why='fortune'
alias why?='fortune'
alias wps-shutter='sudo reaver -i wlp2s0mon -b 78:44:76:DC:45:70 -c 10 -vvv K 1 -f'
alias wtr='curl wttr.in'
alias x='exit'
alias y='yes'
alias yayslay='yay -Rs $(yay -Qtdq)'
alias yeet='sudo pacman -Rns'

if [ $TILIX_ID ] || [ $VTE_VERSION ]; then
        source /etc/profile.d/vte.sh
fi