differences=$(git diff --name-only src/schemas/)

if [ "$differences" != "" ]
then
        echo "  ${differences}"
        tput setaf 1;
        echo "One or move JSON Schemas have been updated. Please review and commit the changes."
        exit 1
fi
