#!/bin/bash
# Render Happy 70th Birthday message video. Run from bday/ with sources in src/.
set -euo pipefail
OUT=out; WK=work; mkdir -p $OUT $WK
XF=0.8           # crossfade seconds
FPS=30
enc="-c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -r $FPS -c:a aac -b:a 192k -ar 48000 -ac 2"

card () { # png out dur fadein fadeout
  local png=$1 out=$2 dur=$3
  ffmpeg -y -loglevel error -loop 1 -framerate $FPS -i "$png" -f lavfi -i anullsrc=r=48000:cl=stereo -t $dur \
    -filter_complex "[0:v]scale=3840:-1,zoompan=z='1+0.00035*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=$FPS,fade=t=in:st=0:d=1.2:color=white,fade=t=out:st=$(python3 -c "print($dur-1.0)"):d=1.0:color=white,format=yuv420p[v]" \
    -map "[v]" -map 1:a -t $dur $enc "$out" </dev/null
}
clip () { # base.png src start end grade out
  local base=$1 src=$2 ss=$3 to=$4 grade=$5 out=$6
  ffmpeg -y -loglevel error -i "$base" -ss "$ss" -to "$to" -i "$src" -i design/top.png \
    -filter_complex "[1:v]${grade}scale=484:860:force_original_aspect_ratio=increase:flags=lanczos,crop=484:860,fps=$FPS,setsar=1[v];[0:v][v]overlay=330:110:format=auto[b];[b][2:v]overlay=0:0:format=auto,format=yuv420p[out];[1:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000,aformat=channel_layouts=stereo[a]" \
    -map "[out]" -map "[a]" $enc "$out" </dev/null
}

# ---- grades (warm, bright, matched) ----
G1="eq=brightness=0.035:contrast=1.06:saturation=1.10,colortemperature=temperature=5600:mix=0.6,"           # iPhone indoor, a touch dim
G2="hqdn3d=3:2:4:4,eq=brightness=0.02:contrast=1.10:saturation=1.12,colortemperature=temperature=5900:mix=0.5,unsharp=5:5:0.5:5:5:0.0,"  # WhatsApp low-res, flat overcast
G3="colorbalance=rs=0.04:gs=0.0:bs=-0.07:rm=0.03:bm=-0.05,eq=brightness=0.02:contrast=1.05:saturation=1.05,colortemperature=temperature=5500:mix=0.6,"  # Samsung cool/blue

card design/card_open.png  $WK/s0.mp4 6
clip design/base_1.png src/IMG_1646.MOV        0.40 28.20 "$G1" $WK/s1.mp4
clip design/base_2.png src/VID_WA0000.mp4      0.00 55.00 "$G2" $WK/s2.mp4
clip design/base_3.png src/20260902_153652.mp4 0.40 67.60 "$G3" $WK/s3.mp4
card design/card_close.png $WK/s4.mp4 7

# ---- durations & xfade offsets ----
d () { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
D0=$(d $WK/s0.mp4); D1=$(d $WK/s1.mp4); D2=$(d $WK/s2.mp4); D3=$(d $WK/s3.mp4); D4=$(d $WK/s4.mp4)
read O1 O2 O3 O4 TOTAL <<< $(python3 - <<PY
d=[$D0,$D1,$D2,$D3,$D4]; x=$XF
o1=d[0]-x; o2=o1+d[1]-x; o3=o2+d[2]-x; o4=o3+d[3]-x; t=o4+d[4]
print(round(o1,3),round(o2,3),round(o3,3),round(o4,3),round(t,3))
PY
)
echo "durations $D0 $D1 $D2 $D3 $D4 -> total $TOTAL"

# ---- assemble picture + speech with crossfades ----
ffmpeg -y -loglevel error -i $WK/s0.mp4 -i $WK/s1.mp4 -i $WK/s2.mp4 -i $WK/s3.mp4 -i $WK/s4.mp4 \
  -filter_complex "\
[0:v][1:v]xfade=transition=fadewhite:duration=$XF:offset=$O1[v1];\
[v1][2:v]xfade=transition=fadewhite:duration=$XF:offset=$O2[v2];\
[v2][3:v]xfade=transition=fadewhite:duration=$XF:offset=$O3[v3];\
[v3][4:v]xfade=transition=fadewhite:duration=$XF:offset=$O4,format=yuv420p[v];\
[0:a][1:a]acrossfade=d=$XF[a1];[a1][2:a]acrossfade=d=$XF[a2];[a2][3:a]acrossfade=d=$XF[a3];[a3][4:a]acrossfade=d=$XF[a]" \
  -map "[v]" -map "[a]" $enc $WK/cut.mp4 </dev/null

# ---- music bed: Canon in D, normalized, ducked under speech ----
ffmpeg -y -loglevel error -i $WK/cut.mp4 -i assets/music/Canon_in_D_Major.mp3 \
  -filter_complex "\
[1:a]atrim=0:$TOTAL,asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-20:TP=-2:LRA=9,afade=t=in:st=0:d=2.5,afade=t=out:st=$(python3 -c "print($TOTAL-4)"):d=4[m];\
[0:a]asplit=2[sp][sc];\
[m][sc]sidechaincompress=threshold=0.015:ratio=8:attack=150:release=1400:makeup=1:level_sc=1.6[md];\
[md]volume=0.42[mv];\
[sp][mv]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart $OUT/Happy70th_Rev_Canon_Oguike_v1.mp4 </dev/null

# ---- previews for review ----
ffmpeg -y -loglevel error -i $OUT/Happy70th_Rev_Canon_Oguike_v1.mp4 -vf "fps=1/5,scale=384:-2,tile=5x7" -frames:v 1 $OUT/_sheet_v1.jpg </dev/null
ffmpeg -y -loglevel error -i $OUT/Happy70th_Rev_Canon_Oguike_v1.mp4 -vf "scale=854:480" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k $OUT/_preview480_v1.mp4 </dev/null
ffmpeg -i $OUT/Happy70th_Rev_Canon_Oguike_v1.mp4 -af loudnorm=print_format=summary -f null - 2>&1 </dev/null | grep -E "Input Integrated|Input True Peak" > $OUT/_loudness_v1.txt
ls -la $OUT
