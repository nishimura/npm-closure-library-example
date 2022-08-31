#!/bin/bash

set -eux

cd `dirname $0`/../
cd public

ln -f -s ../node_modules/google-closure-library .
ln -f -s ../js .

../node_modules/.bin/closure-make-deps \
    --root js \
    -f google-closure-library/closure/goog/deps.js \
    --closure-path google-closure-library/closure/goog \
    > deps.js
