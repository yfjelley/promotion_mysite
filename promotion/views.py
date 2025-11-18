import json

from django.shortcuts import render
from django.conf import settings
from django.utils import translation
from django.utils.translation import gettext as _

# Create your views here.
from django.http import HttpResponse


def index(request):
    canonical_url = request.build_absolute_uri(request.path)
    page_meta = {
        "title": _("AlphaQuant Lab | 量化策略开发 · 交易系统 · TradingView 指标"),
        "description": _("AlphaQuant Lab 专注量化策略研发、自动化交易系统、TradingView 指标与金融网站开发，覆盖 Binance / OKX / Gateio 等主流交易所，提供交付闭环与长期运维。"),
        "keywords": _("量化交易, 策略开发, 量化开发, 交易工具, 网站开发, Binance, 币安, OKX, Gateio, VNPY, TradingView 策略, TradingView 指标, 资管系统, 交易机器人"),
    }

    nav_links = [
        {"href": "#services", "label": _("策略开发"), "target": "services"},
        {"href": "/tidal/", "label": _("策略信号"), "target": None},
        {"href": "#capabilities", "label": _("能力矩阵"), "target": "capabilities"},
        {"href": "#contact", "label": _("联系方式"), "target": "contact"},
    ]

    hero = {
        "eyebrow": _("策略研发 · 自动化执行 · 风控中台"),
        "title": _("重新定义您的交易体验"),
        "description": _("我们为交易团队与机构提供的指标开发、策略定制、自动化执行、监控风控覆盖 Binance / OKX / Gateio / Bybit 等主流场景。"),
        "visual_title": _("策略组合健康度 · 实时监控"),
    }

    hero_highlights = [
        _("15+ 主流交易所 API 与撮合经验"),
        _("7×24 云端部署 + 实盘运维"),
        _("TradingView / Python 双栈策略"),
    ]

    hero_metrics = [
        {"value": "100%", "label": _("策略稳定上线率")},
        {"value": "<200ms", "label": _("订单响应延迟")},
    ]

    business_metrics = {
        "title": _("快速交付 · 可量化的业务指标"),
        "items": [
            {"value": "300+", "label": _("策略/工具交付")},
            {"value": _("2-7 天"), "label": _("小型项目落地周期")},
            {"value": _("灵活报价"), "label": _("策略定制 1,000 USD 起")},
            {"value": _("终生"), "label": _("策略维护保障")},
        ],
    }

    services_section = {
        "title": _("核心服务矩阵"),
        "cards": [
            {
                "title": _("全品类量化策略"),
                "description": _("中心化 / 去中心化交易所、期货、股票、外汇，按品种与周期定制自动化执行策略。"),
            },
            {
                "title": _("系统与中台搭建"),
                "description": _("量化系统、资管系统、风控系统、APP / 小程序，全栈落地，支持多账户调度与可观测性。"),
            },
            {
                "title": _("Web3 自动化能力"),
                "description": _("链游、NFT、抢购、打金等自动化策略引擎，覆盖多链交互与事件监听。"),
            },
            {
                "title": _("基础设施与运维"),
                "description": _("Windows 机器人、Linux 服务端部署、监控预警、日志链路与灾备方案。"),
            },
        ],
    }

    capabilities_section = {
        "title": _("技术能力 & 生态支持"),
        "cards": [
            {"title": _("语言开发栈"), "description": _("Python ")},
            {
                "title": _("交易所支持"),
                "description": _("Binance、OKX、Gate.io、Bybit、Huobi、Bitget 等。"),
            },
            {
                "title": _("部署形态"),
                "description": _("云端（AWS、阿里云、华为云）、本地机房"),
            },
            {
                "title": _("观测与风控"),
                "description": _("钉钉/Telegram 通知通道。"),
            },
        ],
    }

    partners_section = {
        "title": _("合作伙伴 · 友情链接"),
        "intro": _("使用下方专属链接注册 IC Markets，可获赠价值 1,000 USD 的EA。"),
        "links": [
            {
                "label": _("IC Markets 官网（中文）"),
                "url": "https://www.icmarkets-zcl.com/?camp=7052",
                "description": _("IC Markets 提供高达 1,000 倍杠杆，适合虚拟货币与外汇高频交易。杠杆可以放大收益，也可能放大损失，请务必谨慎控制仓位。"),
            },
        ],
    }


    organization_schema = json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AlphaQuant Lab",
            "url": canonical_url,
            "description": page_meta["description"],
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "contactType": "business",
                    "email": "yfjelley@gmail.com",
                    "availableLanguage": ["zh-CN", "en"],
                }
            ],
        },
        ensure_ascii=False,
    )

    context = {
        "page_meta": page_meta,
        "nav_links": nav_links,
        "hero": hero,
        "hero_highlights": hero_highlights,
        "hero_metrics": hero_metrics,
        "business_metrics": business_metrics,
        "services_section": services_section,
        "capabilities_section": capabilities_section,
        "partners_section": partners_section,
        "languages": settings.LANGUAGES,
        "language_code": translation.get_language() or settings.LANGUAGE_CODE,
        "contact_source": _("Google"),
        "footer_copy": _("© 2024 AlphaQuant Lab · 量化策略开发与优化服务"),
        "canonical_url": canonical_url,
        "structured_data": organization_schema,
    }
    return render(request, "promotion/index.html", context)


def tidal(request):
    canonical_url = request.build_absolute_uri(request.path)
    modules = [
        {
            "title": _("GMMA 趋势结构"),
            "description": _("短中长期 EMA 组构成 GMMA 结构，实时呈现线束收敛 / 发散，让「趋势方向 + 趋势强度」一眼可见，而不是只看单根 K 线的情绪波动。"),
        },
        {
            "title": _("趋势 + 动量双重过滤"),
            "description": _("结合 Supertrend、ADX+DI、多周期动量与偏移分布等信号，主动回避震荡区间，尽量减少无效开仓和频繁“打脸”的来回反向。"),
        },
        {
            "title": _("波动与成交量控制"),
            "description": _("利用 ATR 比例、波动率上限与成交量过滤，识别极端波动与流动性陷阱，为实盘中的滑点、爆针和假突破预留安全缓冲。"),
        },
        {
            "title": _("多层级入场逻辑"),
            "description": _("从 NEW-TREND（新趋势起爆）、GMMA-CROSS（多均线成束突破），到 TREND-RET（趋势回踩二次进场），分层布局，而不是“一脚踩死”。"),
        },
        {
            "title": _("实盘级出场与风控"),
            "description": _("ATR 动态止损 + ATR 尾随止盈，配合 Supertrend 反转、布林极端与持仓时效管理，在「保住盈利」和「让利润奔跑」之间做平衡，而不是只盯单一止损价位。"),
        },
        {
            "title": _("DynamicStakeController"),
            "description": _("根据行情状态与风险评分，动态调整仓位和子账户权重，控制同向暴露，让策略不仅“看得对”，还“下得稳”，避免一波行情把账户拖垮。"),
        },
    ]

    service_modules = [
        {
            "index": "01",
            "title": _("突破监控（Breakout Radar）"),
            "description": _("针对主流 USDT 永续合约，持续监控关键区间的向上 / 向下突破："),
            "bullets": [
                _("多周期窗口（如 24 根 K 线）突破检测"),
                _("BREAKOUT_UP / BREAKOUT_DOWN 精简列表输出"),
                _("配合 GMMA 结构过滤假突破、追高与砸盘"),
            ],
            "footer": _("适合用来做候选标的池、重点关注列表以及盘中机会雷达。"),
        },
        {
            "index": "02",
            "title": _("市场评分（Market Scoring）"),
            "description": _("将行情“压缩”为可读的多空评分，而不是一堆杂乱的 K 线："),
            "bullets": [
                _("2h / 4h / 12h 多周期组合多头 / 空头得分"),
                _("给出一句话级别建议：偏多 / 偏空 / 中性观望"),
                _("支持接入交易系统作为仓位权重与方向参考"),
            ],
            "footer": _("先看市场整体体温，再决定个别币种如何出手。"),
        },
        {
            "index": "03",
            "title": _("策略信号（Strategy Signals）"),
            "description": _("基于 TIDAL 的多因子引擎输出可直接执行的策略信号："),
            "bullets": [
                _("GMMA-BULL / GMMA-BEAR 结构变化提示"),
                _("EL / ES / TREND-RET 等入场级别多空信号"),
                _("配合 ATR 止损、尾随止盈与趋势反转型出场提醒"),
            ],
            "footer": _("从“看懂趋势”到“下得出手”，把方向判断和执行动作统一在一套逻辑里。"),
        },
    ]

    telegram_groups = [
        {
            "title": _("1️⃣ A-Signals Quant Lab"),
            "description": _("免费的量化学习与资源分享社区，交流行情、策略思路与交易理念。"),
            "link": "https://t.me/+uCIJX_VRxfpmNzg9",
            "link_label": _("加入 Telegram 群"),
            "color": "#74f9d8",
        },
        {
            "title": _("2️⃣ TrendX / TIDAL Signals Pro"),
            "description": _("收费提供即时 TIDAL 趋势信号与风险播报，结合多周期评分与 GMMA 结构提示。"),
            "link": "https://t.me/+_hgYwo1Wm4tjNzY9",
            "link_label": _("申请加入订阅群"),
            "color": "#a8b7ff",
        },
    ]

    contact_cards = [
        {
            "eyebrow": _("即时沟通"),
            "items": [
                {
                    "label": _("微信"),
                    "value": "btc1688",
                    "copyable": True,
                    "method": "wechat",
                },
                {
                    "label": _("Telegram"),
                    "value": "@yf16881",
                    "href": "https://t.me/yf16881",
                    "copyable": False,
                    "method": "telegram",
                },
            ],
        },
        {
            "eyebrow": _("邮件咨询"),
            "note": _("请附带需求描述、预算与交付时间。"),
            "items": [
                {
                    "label": _("邮箱"),
                    "value": "yfjelley@gmail.com",
                    "href": "mailto:yfjelley@gmail.com",
                    "copyable": False,
                    "method": "email",
                },
            ],
        },
    ]

    context = {
        "language_code": translation.get_language() or settings.LANGUAGE_CODE,
        "page_meta": {
            "title": _("TIDAL 策略信号与量化资源服务 - AlphaQuant Lab"),
            "description": _("TIDAL 是 A-Signals 团队打造的 4 小时周期多因子趋势引擎，专注顺势波段与回撤控制，并提供信号服务、策略资源与定制化支持。"),
        },
        "hero_intro": _("TIDAL 是 A-Signals 团队面向合约实盘打造的多因子趋势引擎，专注趋势交易。目标很简单：顺势吃波段，让回撤在可控范围内。"),
        "modules": modules,
        "service_modules": service_modules,
        "telegram_groups": telegram_groups,
        "contact_cards": contact_cards,
        "partner_title": _("三、Telegram 社群矩阵"),
        "section_titles": {
            "highlights": _("一、策略亮点：为实盘设计的多因子顺势框架"),
            "services": _("二、三大服务模块：突破监控 · 市场评分 · 策略信号"),
            "contact": _("四、联系我们"),
        },
        "cta_back_home": _("返回首页"),
        "cta_contact": _("联系咨询"),
        "contact_hint": _("联系时请备注“来自官网 / Google”，我们会在 12 小时内回复并安排初步沟通。"),
        "copy_default": _("复制 ID"),
        "copy_success": _("已复制"),
        "copy_error": _("复制失败，请手动复制"),
        "footer_copy": _("© 2024 AlphaQuant Lab · TIDAL Strategy Desk"),
        "languages": settings.LANGUAGES,
        "canonical_url": canonical_url,
        "structured_data": json.dumps(
            {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "TIDAL Strategy Signals",
                "description": _("TIDAL 是 A-Signals 团队打造的 4 小时周期多因子趋势引擎，专注顺势波段与回撤控制，并提供信号服务、策略资源与定制化支持。"),
                "brand": {
                    "@type": "Organization",
                    "name": "AlphaQuant Lab",
                },
                "url": canonical_url,
            },
            ensure_ascii=False,
        ),
    }
    return render(request, "promotion/tidal.html", context)


from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import Message


@csrf_exempt
@require_POST
def save_message(request):
    try:
        name = request.POST.get('name')
        email = request.POST.get('email')
        message_content = request.POST.get('message')

        message = Message(name=name, email=email, content=message_content)
        message.save()

        return JsonResponse({'status': 'success'}, status=201)
    except Exception as e:
        return JsonResponse({'status': 'error', 'error': str(e)}, status=400)
