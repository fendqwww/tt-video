import json, subprocess, numpy as np
segs=json.load(open("segs.json")); fps=30
# склейка голоса с паузами
sr=48000; end=segs[-1]["t"]+segs[-1]["d"]+1.0
audio=np.zeros(int(end*sr),dtype=np.float32)
for i,s in enumerate(segs):
    raw=subprocess.check_output(["ffmpeg","-loglevel","error","-i",f"l{i}.wav","-f","f32le","-ac","1","-ar",str(sr),"-"])
    a=np.frombuffer(raw,dtype=np.float32); st=int(s["t"]*sr); audio[st:st+len(a)]+=a
audio.tofile("voice.f32")
subprocess.run(["ffmpeg","-loglevel","error","-y","-f","f32le","-ar",str(sr),"-ac","1","-i","voice.f32","-af","loudnorm=I=-14:TP=-1.5","voice.wav"],check=True)
hop=sr//fps; n=int(end*fps); amp=[]
for f in range(n):
    w=audio[f*hop:(f+1)*hop]; amp.append(float(np.sqrt((w**2).mean())) if len(w) else 0)
amp=np.array(amp); amp=np.clip(amp/ (np.percentile(amp,95)+1e-6),0,1)
amp=np.convolve(amp,[.25,.5,.25],mode="same")
json.dump({"segs":segs,"amp":[round(x,3) for x in amp],"fps":fps,"dur":end},open("data.json","w"),ensure_ascii=False)
print("dur",end,"frames",n)
