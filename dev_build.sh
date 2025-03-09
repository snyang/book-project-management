#!/bin/bash

python ./format_markdown.py

mdbook build --dest-dir docs
