pacman -S --noconfirm networkmanager grub os-prober efibootmgr intel-ucode sudo
systemctl enable NetworkManager
mkinitcpio -p linux
