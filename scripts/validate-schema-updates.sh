differences=$(git diff)

if [ "$differences" != "" ]
then
        echo "JSON Schemas have been updated. Please review the changes."
        echo "  ${differences}"
        exit 1
fi
