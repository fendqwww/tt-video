# видео с 3d-персонажем (седой бизнесмен в костюме)

1. `tts2.py` — озвучка edge-tts ru-RU-DmitryNeural по строкам (сервис сбоит, скрипт ретраит и пропускает готовые строки). нужен certifi с /root/.ccr/ca-bundle.crt.
2. `mkdata.py` — склейка голоса в voice.wav, амплитуда для рта → data.json.
3. `npm i three@0.170.0`, `python3 -m http.server 8765` в папке со scene.html.
4. `node render.js <from> <to> frames` — кадры 1080×1920 30 fps (4 процесса параллельно ≈ 5 мин на 30 с).
5. ffmpeg: кадры + voice.wav → mp4.
хук, карточки шагов и плашка с ботом рисуются в scene.html (drawOverlay), планы камеры — `shots`.
