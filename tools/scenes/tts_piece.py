import asyncio, sys, edge_tts
text, out = sys.argv[1], sys.argv[2]
async def main():
    for k in range(200):
        try:
            c = edge_tts.Communicate(text, "ru-RU-DmitryNeural", rate="+8%"); data=b""
            async for ch in c.stream():
                if ch["type"]=="audio": data+=ch["data"]
            if data: open(out,"wb").write(data); print("ok", out, k, flush=True); return
        except Exception: pass
        await asyncio.sleep(.5)
asyncio.run(main())
