#!/usr/bin/env bash

VERSION=$1
ZIP_FILE="okcupid-flagmod-plus-${VERSION}.zip"
PROJECT_DIR="$(pwd)"
OUT_DIR=$(dirname "${PROJECT_DIR}")

if [[ ${VERSION} == "" ]] ; then
    echo "Version string required"
    exit 1
fi

pushd dist/ 2>&1 > /dev/null

echo ${VERSION}
echo ${PROJECT_DIR}
echo ${OUT_DIR}

rm -f "${OUT_DIR}/${ZIP_FILE}"

zip -9 -r "${OUT_DIR}/${ZIP_FILE}" . --exclude app/*.json

popd 2>&1 > /dev/null
