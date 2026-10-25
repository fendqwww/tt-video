import asyncio, json, subprocess, edge_tts
LINES = ["Я запустил свой VPN за один вечер.",
 "И он работает там, где остальные отваливаются.",
 "Шаг первый. Берёшь сервер за границей.",
 "Шаг второй. Ставишь протокол VLESS с Reality.",
 "Он притворяется обычным сайтом, и блокировщик его просто не видит.",
 "Шаг третий. Пишешь телеграм-бота,",
 "который сам выдаёт ключи и принимает оплату.",
 "Всё. Ты владелец VPN-сервиса.",
 "А если лень, мой уже работает. Бот в профиле.",
 "На каком шаге ты бы застрял?"]
async def one(i, text):
    import os
    if os.path.exists(f"l{i}.mp3"): return
    for k in range(20):
        try:
            c = edge_tts.Communicate(text, "ru-RU-DmitryNeural", rate="+8%")
            data = b""
            async for ch in c.stream():
                if ch["type"] == "audio": data += ch["data"]
            if data:
                open(f"l{i}.mp3", "wb").write(data); return
        except Exception as e:
            pass
        await asyncio.sleep(3 + k)
    raise SystemExit(f"fail {i}")
async def main():
    for i, t in enumerate(LINES): await one(i, t)
asyncio.run(main())
segs=[]; t=0.25
for i, text in enumerate(LINES):
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",f"l{i}.mp3","-af","silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse","-ar","48000","-ac","1",f"l{i}.wav"],check=True)
    d=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"l{i}.wav"]))
    segs.append({"t":round(t,3),"d":round(d,3),"text":text}); t+=d+0.18
json.dump(segs,open("segs.json","w"),ensure_ascii=False,indent=1)
print(segs[-1], t)
