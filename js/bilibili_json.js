let url = $request.url,
  body = null;
if (url.includes("app.bilibili.com/x/v2/splash/")) {
  let i = JSON.parse($response.body);
  i.data?.show && (i.data.show = []), (body = JSON.stringify(i));
} else if (url.includes("app.bilibili.com/x/v2/feed/index?")) {
  let i = JSON.parse($response.body);
  i.data?.items &&
    ((i.data.items = i.data.items.filter(
      (i) =>
        !i.banner_item &&
        !i.ad_info &&
        -1 === i.card_goto?.indexOf("ad") &&
        ["small_cover_v2", "large_cover_v1", "large_cover_single_v9"].includes(
          i.card_type,
        ),
    )),
    (body = JSON.stringify(i)));
} else if (url.includes("app.bilibili.com/x/v2/feed/index/story?")) {
  let i = JSON.parse($response.body);
  i.data?.items &&
    ((i.data.items = i.data.items.filter(
      (i) => !i.ad_info && -1 === i.card_goto?.indexOf("ad"),
    )),
    (body = JSON.stringify(i)));
} else if (url.includes("app.bilibili.com/x/resource/show/tab")) {
  let i = JSON.parse($response.body);
  if (
    ((i.data.tab = [
      {
        id: 731,
        name: "直播",
        uri: "bilibili://live/home",
        tab_id: "直播tab",
        pos: 1,
      },
      {
        id: 477,
        name: "推荐",
        uri: "bilibili://pegasus/promo",
        tab_id: "推荐tab",
        pos: 2,
        default_selected: 1,
      },
      {
        id: 478,
        name: "热门",
        uri: "bilibili://pegasus/hottopic",
        tab_id: "热门tab",
        pos: 3,
      },
    ]),
    i.data?.bottom?.length > 3)
  ) {
    const e = [177, 179, 181];
    (i.data.tab[4] = {
      id: 151,
      name: "影视",
      uri: "bilibili://pgc/cinema-tab",
      tab_id: "film",
      pos: 5,
    }),
      (i.data.top = [
        {
          id: 176,
          icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
          tab_id: "消息Top",
          name: "消息",
          uri: "bilibili://link/im_home",
          pos: 1,
        },
      ]),
      (i.data.bottom = i.data.bottom.filter((i) => e.includes(i.id)));
  }
  body = JSON.stringify(i);
} else if (url.includes("app.bilibili.com/x/v2/account/mine")) {
  let i = JSON.parse($response.body);
  if (i.data?.sections_v2) {
    const e = [
      "离线缓存",
      "历史记录",
      "我的收藏",
      "稍后再看",
      "个性装扮",
      "我的钱包",
      "联系客服",
      "设置",
    ];
    i.data.sections_v2.forEach((i) => {
      ["创作中心", "創作中心"].includes(i.title) &&
        ((i.title = void 0), (i.type = void 0)),
        (i.items = i.items.filter((i) => e.includes(i.title))),
        (i.button = {}),
        (i.be_up_title = void 0),
        (i.tip_icon = void 0),
        (i.tip_title = void 0);
    }),
      i.data?.live_tip && (i.data.live_tip = {}),
      i.data?.answer && (i.data.answer = {}),
      (i.data.vip_section = void 0),
      (i.data.vip_section_v2 = void 0),
      i.data.vip.status ||
        ((i.data.vip_type = 2),
        (i.data.vip.type = 2),
        (i.data.vip.status = 1),
        (i.data.vip.vip_pay_type = 1),
        (i.data.vip.due_date = 466982416e4)),
      (body = JSON.stringify(i));
  }
} else if (url.includes("app.bilibili.com/x/v2/account/myinfo?")) {
  let i = JSON.parse($response.body);
  i.data?.vip &&
    !i.data.vip.status &&
    ((i.data.vip.type = 2),
    (i.data.vip.status = 1),
    (i.data.vip.vip_pay_type = 1),
    (i.data.vip.due_date = 466982416e4),
    (body = JSON.stringify(i)));
} else if (url.includes("app.bilibili.com/x/v2/search/square")) {
  let i = JSON.parse($response.body);
  (i.data = [{ type: "history", title: "搜索历史" }]),
    (body = JSON.stringify(i));
} else if (
  url.includes("api.live.bilibili.com/xlive/app-room/v1/index/getInfoByRoom")
) {
  let i = JSON.parse($response.body);
  i.data &&
    ((i.data.activity_banner_info = void 0),
    (i.data.shopping_info = { is_show: 0 }),
    (body = JSON.stringify(i)));
} else if (
  url.includes("pgc/page/bangumi") ||
  url.includes("pgc/page/cinema/tab?")
) {
  let i = JSON.parse($response.body);
  i.result?.modules &&
    (i.result.modules.forEach((i) => {
      i.style.startsWith("tip") || [1283, 241, 1441, 1284].includes(i.module_id)
        ? (i.items = [])
        : i.style.startsWith("banner")
          ? (i.items = i.items.filter((i) => i.link.includes("play")))
          : i.style.startsWith("function") &&
            (i.items = i.items.filter((i) => i.blink.startsWith("bilibili")));
    }),
    (body = JSON.stringify(i)));
}
body ? $done({ body: body }) : $done({});
