#!/bin/bash
FILES=./images/*
for file in $FILES
do
  new_file="${file/images/moz_images}"
  echo "butteraugli $file $new_file > "
  butteraugli $file $new_file
done
