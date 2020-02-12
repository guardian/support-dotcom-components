differences=$(git diff --name-only src/schemas/)

if [ "$differences" != "" ]
then
        tput setab 7;
        tput setab 0;
        echo "  ${differences}"
        tput setab 0;
        tput setaf 1;
        echo "One or move JSON Schemas have been updated. Please review and commit the changes."
        exit 1
fi
