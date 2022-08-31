#!/bin/bash

set -eux

cd `dirname $0`/../

#
# Closure Compiler
#
function compile(){
    node_modules/.bin/google-closure-compiler \
         --compilation_level=ADVANCED_OPTIMIZATIONS \
         --define 'goog.LOCALE=ja' \
         --define 'goog.DEBUG=false' \
         --define 'CONSOLE_OUTPUT_ENABLED=false' \
         --dependency_mode=PRUNE \
         --entry_point=goog:app.$1 \
         'node_modules/google-closure-library/closure/**.js' \
         '!node_modules/google-closure-library/closure/**_test.js' \
         'node_modules/google-closure-library/third_party/closure/**.js' \
         '!node_modules/google-closure-library/third_party/closure/**_test.js' \
         "js/**.js" \
         '!js/**_test.js' \
         --js_output_file public/$1.js
}

if [ "$#" == "0" ]; then
    compile "main" &
    PID1=$!
    wait $PID1
else 
    compile $1
fi
