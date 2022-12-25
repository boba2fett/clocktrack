#!/usr/bin/env bash

cp public/manifest.json public/manifest.json.bak
sed -i "s/--VERSION--/$VERSION/" public/manifest.json
npm ci
npm run build-all
mkdir source
cp -r src source
cp -r public source
cp package.json source
cp package-lock.json source
cp tsconfig.json source
cp rollup.config.js source
cp README.md README.md.bak
sed -i "s/--NODE_VERSION--/$(node -v)/" README.md
sed -i "s/--NPM_VERSION--/$(npm -v)/" README.md
cp README.md source
rm README.md
mv README.md.bak README.md
cat README.md
zip -r "source-$VERSION.zip" source
mv source-*.zip artifacts
rm public/manifest.json
mv public/manifest.json.bak public/manifest.json
rm -r source