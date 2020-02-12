differences=$(git diff --name-only src/schemas/)

if [ "$differences" != "" ]
then
        tput setab 0;
        tput setaf 1;
        echo "❌ The following JSON Schemas have been updated:"
        tput setab 7;
        tput setab 1;
        echo "  ${differences}"
        tput setab 0;
        tput setaf 1;
        echo "Please review and commit the changes."
        tput sgr0;
        exit 1
else
    tput setaf 2;
    echo "✅ No uncommitted JSON Schema updates."
    tput sgr0;
    exit 0
fi
