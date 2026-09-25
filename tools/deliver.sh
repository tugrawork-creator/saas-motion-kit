#!/usr/bin/env bash
# Downscale a 4K HyperFrames render to a delivery size.
#   tools/deliver.sh renders/film-2160.mp4 1920x1080 [out.mp4] [filter]
# filter: lanczos (default, for vector/3D) · area (pixel art: exact 2x box filter keeps pixels crisp)
# Audio, if present, is loudness-normalised for social (-14 LUFS, -1.5 dBTP).
set -euo pipefail
in="$1"; size="${2:-1920x1080}"; out="${3:-${in%.*}-${size}.mp4}"; filter="${4:-lanczos}"
w="${size%x*}"; h="${size#*x}"
if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$in" | grep -q .; then
  audio=(-af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 48000)
else
  audio=(-an)
fi
ffmpeg -v error -y -i "$in" -vf "scale=${w}:${h}:flags=${filter}" \
  -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -profile:v high -movflags +faststart \
  "${audio[@]}" "$out"
echo "wrote $out"
