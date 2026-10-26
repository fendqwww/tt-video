# видео из html-сцен (без 3d, быстро: ~35 с рендера на 1000 кадров)

- `hosting.html` — пример: 6 сцен, сцена на каждую фразу (`MAP` сегмент → сцена), субтитры из `data.json`.
- озвучка: `python3 tts_piece.py "фраза" lN.mp3` — edge-tts часто отдаёт NoAudioReceived, скрипт долбит до успеха; длинные фразы лучше резать на части и запускать 3–4 штуки параллельно.
- рендер: сервер `python3 -m http.server` в папке со сценой и data.json, затем `node render.js http://localhost:PORT/scene.html from to frames` в 4 процесса.
