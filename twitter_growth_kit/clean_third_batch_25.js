const { execSync } = require('child_process');

function runChromeJS(code) {
  const jsonStr = JSON.stringify(code);
  const appleScript = `tell application "Google Chrome" to execute front window's active tab javascript ${jsonStr}`;
  const res = execSync(`osascript -e ${JSON.stringify(appleScript)}`, { encoding: 'utf-8' });
  return res.trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 严格保留白名单
const PROTECTED_HANDLES = new Set([
  'nautilustrader', 'quantconnect', 'bitwux', 'microstrategy', 'wublockchain',
  'colinwu', 'serenity', 'aleabitoreddit', 'chameleon_jeff', 'hyperliquidx',
  'hyperliquid', 'sama', 'noamshazeer', 'openclaw', 'moltbook', 'blockbeatsasia',
  'binance', 'okx', 'bybit', 'coinbase', 'interactivebrokers', 'ibkr', 'tradingview',
  'vitalikbuterin', 'cz_binance', 'brian_armstrong', 'myx_finance', 'shoucccc',
  'philhchen', 'culperresearch', 'weixin_wechat', 'monkeyjiang', 'ventures_htx',
  'okx_ventures', 'blockma', 'yuyue_chris'
]);

const PROTECTED_KEYWORDS = [
  'hyperliquid', 'tradingview', 'quantconnect', 'nautilus', 'interactive brokers',
  'ibkr', 'binance', 'okx', 'bybit', 'coinbase', 'rust-native', 'trading engine',
  'openclaw', 'moltbook', 'vitalik', 'solidity & python'
];

function isProtected(handle, name, bio) {
  const h = handle.toLowerCase();
  if (PROTECTED_HANDLES.has(h)) return true;

  const text = (handle + ' ' + name + ' ' + bio).toLowerCase();
  for (const kw of PROTECTED_KEYWORDS) {
    if (text.includes(kw)) {
      if (text.includes('返佣') || text.includes('代理') || text.includes('空投') || text.includes('airdrop') || text.includes('带单')) {
        return false;
      }
      return true;
    }
  }
  return false;
}

async function main() {
  console.log('=== 开始第三批安全清理（目标：再清理 25 个，将关注数降至 ~417）===');

  let unfollowedCount = 0;
  const targetBatch = 25;
  const unfollowedList = [];

  while (unfollowedCount < targetBatch) {
    const raw = runChromeJS(`
      (function() {
        const cells = Array.from(document.querySelectorAll('[data-testid="UserCell"]'));
        return JSON.stringify(cells.map(c => {
          const link = c.querySelector('a[href^="/"]');
          const handle = link ? link.getAttribute('href').replace('/', '') : '';
          const lines = (c.innerText || '').split('\\n').map(s => s.trim()).filter(Boolean);
          const name = lines[0] || '';
          const bio = lines.slice(2).join(' ');
          const buttons = Array.from(c.querySelectorAll('[role="button"]'));
          const isFollowing = buttons.some(b => (b.innerText || '').includes('Following') || (b.innerText || '').includes('正在关注'));
          return { handle, name, bio, isFollowing };
        }));
      })()
    `);

    let users = [];
    try {
      users = JSON.parse(raw);
    } catch (e) {
      console.error('解析失败，重试...', e);
      await sleep(1000);
      continue;
    }

    let performedAction = false;

    for (const u of users) {
      if (!u.handle || !u.isFollowing) continue;

      if (isProtected(u.handle, u.name, u.bio)) {
        console.log(`[保留保护] @${u.handle} (${u.name}) - 核心技术/生态/基础设施`);
        continue;
      }

      console.log(`\n👉 [取关 ${unfollowedCount + 1}/${targetBatch}] @${u.handle} (${u.name})`);
      console.log(`   简介: ${u.bio.slice(0, 50)}...`);

      // 执行点击
      const clickRes = runChromeJS(`
        (function() {
          const cells = Array.from(document.querySelectorAll('[data-testid="UserCell"]'));
          for (const c of cells) {
            const link = c.querySelector('a[href="/${u.handle}"]');
            if (link) {
              const buttons = Array.from(c.querySelectorAll('[role="button"]'));
              const followBtn = buttons.find(b => (b.innerText || '').includes('Following') || (b.innerText || '').includes('正在关注'));
              if (followBtn) {
                followBtn.click();
                return "CLICKED";
              }
            }
          }
          return "NOT_FOUND";
        })()
      `);

      if (clickRes.includes("CLICKED")) {
        await sleep(500);
        const confirmRes = runChromeJS(`
          (function() {
            const confirmBtn = document.querySelector('[data-testid="confirmationSheetConfirm"]');
            if (confirmBtn) {
              confirmBtn.click();
              return "CONFIRMED";
            }
            return "NO_MODAL";
          })()
        `);

        if (confirmRes.includes("CONFIRMED")) {
          unfollowedCount++;
          performedAction = true;
          unfollowedList.push({ handle: u.handle, name: u.name });
          console.log(`   ✅ 成功取关 @${u.handle} (${unfollowedCount}/${targetBatch})`);

          // 安全延迟 2.2 ~ 3.4 秒
          const delay = 2200 + Math.floor(Math.random() * 1200);
          await sleep(delay);

          if (unfollowedCount >= targetBatch) break;
        }
      }
    }

    if (!performedAction) {
      console.log('\n当前视窗没有更多待取关账号，刷新页面载入下一批...');
      runChromeJS('location.reload();');
      await sleep(3500);
    }
  }

  console.log(`\n🎉 第三批清理完成！本次成功取关 ${unfollowedCount} 个。`);
}

main().catch(console.error);
