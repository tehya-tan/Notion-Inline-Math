( cd /Applications/Notion.app/Contents/Resources; asar extract app.asar app )

# cp inlinemath.js /Applications/Notion.app/Contents/Resources/app/renderer/inlinemath.js

# sed -i '' 's/<\/head>/<script src="inlinemath.js"><\/script><\/head>/g' /Applications/Notion.app/Contents/Resources/app/renderer/index.html

echo "\n" >> /Applications/Notion.app/Contents/Resources/app/renderer/preload.js
cat inlinemath.js >> /Applications/Notion.app/Contents/Resources/app/renderer/preload.js
