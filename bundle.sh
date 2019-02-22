#!/usr/bin/env bash

VERSION=$1
ZIP_FILE="okcupid-flagmod-plus-${VERSION}.zip"
SRC_FILE="okcupid-flagmod-plus-source.zip"
PROJECT_DIR="$(pwd)"
OUT_DIR=$(dirname "${PROJECT_DIR}")

if [[ ${VERSION} == "" ]] ; then
    echo "Version string required"
    exit 1
fi

yarn install
yarn build

pushd dist/ 2>&1 > /dev/null

echo "Creating version: ${VERSION}"
echo "Project directory: ${PROJECT_DIR}"
echo "Output directory: ${OUT_DIR}"

rm -f "${OUT_DIR}/${ZIP_FILE}"
zip -9 -r "${OUT_DIR}/${ZIP_FILE}" . --exclude app/*.json

popd 2>&1 > /dev/null

rm -f "${OUT_DIR}/${SRC_FILE}"
zip -9 -r "${OUT_DIR}/${SRC_FILE}" package.json src/ scss/ dist/manifest.json dist/html/ dist/images/
