sudo pacman -Syyuu wget awesome gimp firefox openvpn uget deluge clementine thunderbird irssi ristretto vlc terminator pcmanfm ark git gparted filelight nitrogen geany dmenu fortune-mod qt5-base qt5-svg qt5-declarative qt5-quickcontrols xfce4 xfce4-whiskermenu-plugin
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
yay -S sflock-git
touch ~/.xinitrc
echo exec startxfce4 >> ~/.xinitrc
cp ./.config/* ~/.config/
wget https://www.opendesktop.org/p/1136805/startdownload?file_id=1530774688&file_name=ocs-url-3.1.0-1-x86_64.pkg.tar.xz&file_type=application/x-xz&file_size=55500
pacman -U ./ocs-url-3.1.0-1-x86_64.pkg.tar.xz
cd ~/
git clone https://github.com/1000dinari/arch
cp -rf ~/arch/.config/* ~/.config
