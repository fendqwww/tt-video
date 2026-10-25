# tt-video

контент для тиктока nova_vpn_: ролики и фото-карусели, которые публикуются через metricool.
файлы отсюда metricool забирает по ссылке raw.githubusercontent.com.

- `posts/<дата>-<тема>/` — один пост: `spec.json` (текст, подпись) и готовые `1.jpg…` или `video.mp4`
- `tools/carousel.js` — рендер карусели из `spec.json`: `node tools/carousel.js posts/<папка>/spec.json`
