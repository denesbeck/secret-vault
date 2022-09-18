read -p $'You are about to delete all docker compose related data. Are you sure you want to continue? (y/n)\n' -n 1 -r
if [ $REPLY = "y" ]
then
    docker compose down --rmi all -v && rm -r ./postgres_data
elif [ $REPLY = "n" ]
then echo $'\nOperation cancelled.'
else echo $'\nInvalid input value!'
fi