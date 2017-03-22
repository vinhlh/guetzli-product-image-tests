#!/bin/bash
FILES=./images/*
for file in $FILES
do
  echo "Processing $file file..."
  new_file="${file/images/moz_images}"
  /usr/local/opt/mozjpeg/bin/jpegtran -optimize -outfile $new_file $file
done
