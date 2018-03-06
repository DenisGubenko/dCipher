#!/usr/bin/env bash

# set locale 
# sudo update-locale LC_ALL=C.UTF-8
# Set non-interactive mode
export DEBIAN_FRONTEND=noninteractive


# abort on nonzero exitstatus
#set -o errexit
# abort on unbound variable
#set -o nounset
# don't mask errors in piped commands
#set -o pipefail

# Color definitions
readonly reset='\e[0m'
readonly cyan='\e[0;36m'
readonly red='\e[0;31m'
readonly yellow='\e[0;33m'	


info() {
 printf "${cyan}>>> %s${reset}\n" "${*}" 
}


if [ ! -e /home/dcipher/vagrant/.provision ];
then
	
    info "updating system packages"
    sudo apt-get update --fix-missing
    sudo apt-get --yes upgrade
    #sudo apt-get dist-upgrade
    echo "."

    info "installing essentials and tools ..."
    sudo apt-get install --yes software-properties-common
    sudo apt-get install --yes python-software-properties
    sudo apt-get install --yes wget curl htop vim nano
    sudo apt-get install --yes ssh
    sudo apt-get install --yes mc
    sudo apt-get install --yes git git-flow
	echo "."

    #--------------------------------------
    # nodejs
    #--------------------------------------
	
    if [ ${INSTALL_NODEJS} = true ]; then
        info "installing NodeJS"
        sudo apt-get install -y nodejs-legacy
        sudo apt-get install -y npm
        sudo npm cache clean -f
        sudo npm install -g n
        sudo n latest
        sudo npm install -g nave
        sudo nave use 6.11.1
        sudo npm install webpack-cli -D

        cd /home/dcipher
        sudo npm install --save-prod --save-dev

        echo "."
    fi

    #--------------------------------------
    # configure fixes, clean and done
    #--------------------------------------

    #configure locales
    export LANGUAGE=en_US.UTF-8
    export LANG=en_US.UTF-8
    export LC_ALL=en_US.UTF-8
    locale-gen en_US.UTF-8
    dpkg-reconfigure locales

    #clean up
    sudo apt-get autoremove > /dev/null
    sudo apt-get autoclean > /dev/null
    sudo apt-get clean > /dev/null

    touch /home/dcipher/vagrant/.provision
    info "Provisioning done."
fi