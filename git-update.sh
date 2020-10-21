#! /bin/bash
#this is a script to output all packages installed in an arch system, 
# write them to a file and push it to a github repo, for backup, and a quick arch setup

#step 1: reading all the packages installed, writing them to a file and appending install commands at the beginning

rm -vf repo.sh
pacman -Qeqn >> repo-temp.sh
echo 'sudo pacman -S ' | cat - repo-temp.sh > temp && mv temp repo-temp.sh 
tr '\n' ' ' < repo-temp.sh >> repo.sh
rm -v repo-temp.sh


rm -vf aur.sh
pacman -Qeqm >> aur-temp.sh
echo 'yay -S ' | cat - aur-temp.sh > temp && mv temp aur-temp.sh
tr '\n' ' ' < aur-temp.sh >> aur.sh
rm -v aur-temp.sh

cp -v repo.sh ~/arch/repo.sh
cp -v aur.sh ~/arch/aur.sh
cp -v ~/.bashrc ~/arch/.bashrc

# step 2: adding changes to the arch 

rm -rf ~/arch/.config
cp -r ~/.config ~/arch/.config
rm -rf ~/arch/.config/discord
rm -rf ~/arch/.config/libreoffice
rm -rf ~/arch/dwm-6.2
rm -rf ~/arch/.config/hexchat
cp -r ~/dwm-6.2 ~/arch/dwm-6.2
rm -rf ~/arch/st-0.8.2
cp -r ~/st-0.8.2 ~/arch/st-0.8.2
cp -r ~/.dwm ~/arch/.dwm
rm -rf ~/arch/git-update.sh
cp -rf ~/.bashrc ~/arch/.bashrc
rm -rf ~/arch/git-push.sh
cp -r ~/git-update.sh ~/arch/git-update.sh
cp -r ~/git-push.sh ~/arch/git-push.sh
cp ~/.xinitrc ~/arch/.xinitrc
cp ~/.Xresources ~/arch/.Xresources 
rm -rf ~/arch/.config/Standard\ Notes/
cd ~/arch
git init
git add ~/arch
git commit -m "updating files"
git push origin master
cd
