sudo pacman -Syyuu awesome gimp firefox openvpn uget deluge clementine thunderbird irssi ristretto vlc terminator pcmanfm ark git gparted filelight nitrogen geany dmenu fortune-mod qt5-base qt5-svg qt5-declarative qt5-quickcontrols xfce4 xfce4-whiskermenu-plugin
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
yay -S sflock-git
touch ~/.xinitrc
echo exec startxfce4 >> ~/.xinitrc
cp ./.config/* ~/.config/
