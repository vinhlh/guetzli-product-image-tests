#!/bin/bash
FILES=./images/*
for file in $FILES
do
  new_file="${file/images/guetzli_images}"
  echo "guetzli $file $new_file"
  guetzli $file $new_file
done
