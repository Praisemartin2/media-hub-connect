#!/bin/bash
# Render Happy 70th Birthday message video. Run from bday/ with sources in src/.
set -euo pipefail
OUT=out; WK=work; mkdir -p $OUT $WK
VER=v3
XF=0.8; FPS=30
enc="-c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -r $FPS -c:a aac -b:a 192k -ar 48000 -ac 2"

card () { # png out dur
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
# Audio message + photo beats with slow push-in, crossfading inside the frame.
photoclip () { # base.png src start end out
  local base=$1 src=$2 ss=$3 to=$4 out=$5
  local DUR; DUR=$(python3 -c "print($to-$ss)")
  local T1=19 T2=38   # beat boundaries (s)
  ffmpeg -y -loglevel error -loop 1 -framerate $FPS -i "$base" -loop 1 -framerate $FPS -i design/card_p1.png -loop 1 -framerate $FPS -i design/card_p2.png -loop 1 -framerate $FPS -i design/card_p1c.png -ss "$ss" -to "$to" -i "$src" \
    -filter_complex "\
[1:v]zoompan=z='1+0.00012*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=760x570:fps=$FPS,format=rgba,fade=t=in:st=0:d=0.8:alpha=1,fade=t=out:st=$((T1)).4:d=1:alpha=1[p1];\
[2:v]zoompan=z='1+0.00012*max(0,on-$((T1*FPS)))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=560x747:fps=$FPS,format=rgba,fade=t=in:st=$T1:d=1:alpha=1,fade=t=out:st=$((T2)).4:d=1:alpha=1[p2];\
[3:v]zoompan=z='1+0.00012*max(0,on-$((T2*FPS)))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=700x656:fps=$FPS,format=rgba,fade=t=in:st=$T2:d=1:alpha=1[p3];\
[0:v][p1]overlay=120:285:format=auto[a];[a][p2]overlay=220:166:format=auto[b];[b][p3]overlay=150:212:format=auto,format=yuv420p[out];\
[4:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000,aformat=channel_layouts=stereo[aud]" \
    -map "[out]" -map "[aud]" -t "$DUR" $enc "$out" </dev/null
}

G1="eq=brightness=0.055:contrast=1.06:saturation=1.10,colortemperature=temperature=5600:mix=0.6,"
G2="hqdn3d=3:2:4:4,eq=brightness=0.02:contrast=1.10:saturation=1.12,colortemperature=temperature=5900:mix=0.5,unsharp=5:5:0.5:5:5:0.0,"
G3="colorbalance=rs=0.04:gs=0.0:bs=-0.07:rm=0.03:bm=-0.05,eq=brightness=0.02:contrast=1.05:saturation=1.05,colortemperature=temperature=5500:mix=0.6,"

card      design/card_open.png  $WK/s0.mp4 6
clip      design/base_1.png src/IMG_1646.MOV        0.40 28.20 "$G1" $WK/s1.mp4
clip      design/base_2.png src/VID_WA0000.mp4      0.00 55.00 "$G2" $WK/s2.mp4
photoclip design/base_4.png src/IHEANYA.mp4         0.00 56.60      $WK/s3.mp4
clip      design/base_3.png src/20260902_153652.mp4 0.40 67.60 "$G3" $WK/s4.mp4
card      design/card_close.png $WK/s5.mp4 7

SEGS=($WK/s0.mp4 $WK/s1.mp4 $WK/s2.mp4 $WK/s3.mp4 $WK/s4.mp4 $WK/s5.mp4)
d () { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
DUR=(); for s in "${SEGS[@]}"; do DUR+=($(d $s)); done
echo "durations ${DUR[*]}"
# build xfade/acrossfade chains
N=${#SEGS[@]}; INPUTS=""; for s in "${SEGS[@]}"; do INPUTS+=" -i $s"; done
FC=$(python3 - <<PY
d=[$(IFS=,; echo "${DUR[*]}")]; x=$XF; n=len(d)
v="[0:v]"; a="[0:a]"; off=0; vf=""; af=""
for i in range(1,n):
    off=off+d[i-1]-x
    vo="[v]" if i==n-1 else f"[v{i}]"; ao="[a]" if i==n-1 else f"[a{i}]"
    vf+=f"{v}[{i}:v]xfade=transition=fadewhite:duration={x}:offset={off:.3f}{vo};"
    af+=f"{a}[{i}:a]acrossfade=d={x}{ao};"
    v=vo; a=ao
total=off+d[-1]
print(vf+af.rstrip(';')); print(f"{total:.3f}")
PY
)
FILTER=$(echo "$FC" | sed -n 1p); TOTAL=$(echo "$FC" | sed -n 2p)
echo "total $TOTAL"
ffmpeg -y -loglevel error $INPUTS -filter_complex "$FILTER" -map "[v]" -map "[a]" $enc $WK/cut.mp4 </dev/null

ffmpeg -y -loglevel error -i $WK/cut.mp4 -i assets/music/Canon_in_D_Major.mp3 \
  -filter_complex "\
[1:a]atrim=0:$TOTAL,asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-20:TP=-2:LRA=9,afade=t=in:st=0:d=2.5,afade=t=out:st=$(python3 -c "print($TOTAL-4)"):d=4[m];\
[0:a]asplit=2[sp][sc];\
[m][sc]sidechaincompress=threshold=0.015:ratio=8:attack=150:release=1400:makeup=1:level_sc=1.6[md];\
[md]volume=0.42[mv];\
[sp][mv]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart $OUT/Happy70th_Rev_Canon_Oguike_$VER.mp4 </dev/null

ffmpeg -y -loglevel error -i $OUT/Happy70th_Rev_Canon_Oguike_$VER.mp4 -vf "fps=1/5,scale=384:-2,tile=5x8" -frames:v 1 $OUT/_sheet_$VER.jpg </dev/null
ffmpeg -y -loglevel error -i $OUT/Happy70th_Rev_Canon_Oguike_$VER.mp4 -vf "scale=854:480" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k $OUT/_preview480_$VER.mp4 </dev/null
ffmpeg -i $OUT/Happy70th_Rev_Canon_Oguike_$VER.mp4 -af loudnorm=print_format=summary -f null - 2>&1 </dev/null | grep -E "Input Integrated|Input True Peak" > $OUT/_loudness_$VER.txt
ls -la $OUT
