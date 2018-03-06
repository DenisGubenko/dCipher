Vagrant

vagrant plugin install vagrant-hostmanager
vagrant plugin install vagrant-bindfs
vagrant plugin install vagrant-triggers

Cipher, examples:

1. Encode
node --max_old_space_size=4096 --optimize_for_size --stack_size=4096 --gc-interval=100 *.js --type=encript --typeInput=file --input=/home/dcipher/config/pdf.pdf --typeOutput=file --output=/home/dcipher/config/1.raw
2. Decode
node --max_old_space_size=4096 --optimize_for_size --stack_size=4096 --gc-interval=100 *.js --type=decript --typeInput=file --input=/home/dcipher/config/1.raw --typeOutput=file --output=/home/dchat/config/1.pdf
