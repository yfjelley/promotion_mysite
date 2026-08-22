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

// 严格保留名单/关键词 (Whitelist)
const PROTECTED_KEYWORDS = [
  'nautilus', 'quantconnect', 'hyperliquid', 'binance', 'okx', 'bybit', 'coinbase',
  'interactivebrokers', 'ibkr', 'tradingview', 'rust', 'python', 'golang', 'quant',
  'systematic', 'backtest', 'hft', 'algo', 'infrastructure', 'market maker', 'prop trading',
  'paradigm', 'a16z', 'vitalik', 'cz_binance', 'charlie', 'orderbook', 'derivatives',
  'arbitrage', 'defi', 'ethereum', 'solana', 'chainlink', 'uniswap', 'bloomberg', 'microstrategy'
];

function isProtected(handle, name, bio) {
  const text = (handle + ' ' + name + ' ' + bio).toLowerCase();
  for (const kw of PROTECTED_KEYWORDS) {
    if (text.includes(kw)) {
      if (text.includes('返佣') || text.includes('代理') || text.includes('返点') || text.includes('吃喝玩乐') || text.includes('松弛感')) {
        return false;
      }
      return true;
    }
  }
  return false;
}

async function main() {
  console.log('=== 继续执行剩余 23 个无效关注账号的安全清理 ===');
  
  let unfollowedCount = 0;
  const targetBatch = 23; // 本次再清理 23 个，凑满 40 个
  const processedHandles = new Set();
  const unfollowedList = [];

  let attemptsWithoutAction = 0;

  while (unfollowedCount < targetBatch && attemptsWithoutAction < 15) {
    // 1. 获取当前页面可见且处于 Following 状态的账号
    const rawData = runChromeJS(`
      (function() {
        const cells = Array.from(document.querySelectorAll('[data-testid="UserCell"]'));
        return JSON.stringify(cells.map((c, index) => {
          const link = c.querySelector('a[href^="/"]');
          const handle = link ? link.getAttribute('href').replace('/', '') : '';
          const text = c.innerText || '';
          const lines = text.split('\\n').map(s => s.trim()).filter(Boolean);
          const name = lines[0] || '';
          const bio = lines.slice(2).join(' ');
          
          const buttons = Array.from(c.querySelectorAll('[role="button"]'));
          const isFollowing = buttons.some(b => {
            const t = b.innerText || '';
            return t.includes('Following') || t.includes('正在关注');
          });
          return { index, handle, name, bio, isFollowing };
        }));
      })()
    `);

    let users = [];
    try {
      users = JSON.parse(rawData);
    } catch (e) {
      console.error('解析页面数据失败，重试...', e);
      await sleep(1500);
      continue;
    }

    let foundTargetThisRound = false;

    for (const u of users) {
      if (!u.handle || !u.isFollowing || processedHandles.has(u.handle)) continue;
      processedHandles.add(u.handle);

      if (isProtected(u.handle, u.name, u.bio)) {
        console.log(`[保留保护] @${u.handle} (${u.name}) - 核心技术/量化/机构`);
        continue;
      }

      console.log(`\n👉 [取关中 ${17 + unfollowedCount + 1}/40] @${u.handle} (${u.name})`);
      console.log(`   简介: ${u.bio.slice(0, 60)}...`);

      // 点击取关按钮
      const clickRes = runChromeJS(`
        (function() {
          const cells = Array.from(document.querySelectorAll('[data-testid="UserCell"]'));
          for (const c of cells) {
            const link = c.querySelector('a[href="/${u.handle}"]');
            if (link) {
              const buttons = Array.from(c.querySelectorAll('[role="button"]'));
              const followBtn = buttons.find(b => {
                const t = b.innerText || '';
                return t.includes('Following') || t.includes('正在关注');
              });
              if (followBtn) {
                followBtn.click();
                return "CLICKED_FOLLOW_BTN";
              }
            }
          }
          return "NOT_FOUND";
        })()
      `);

      if (clickRes.includes("CLICKED_FOLLOW_BTN")) {
        await sleep(500);
        const confirmRes = runChromeJS(`
          (function() {
            const confirmBtn = document.querySelector('[data-testid="confirmationSheetConfirm"]');
            if (confirmBtn) {
              confirmBtn.click();
              return "CONFIRMED";
            }
            return "NO_CONFIRM_DIALOG";
          })()
        `);

        if (confirmRes.includes("CONFIRMED")) {
          unfollowedCount++;
          foundTargetThisRound = true;
          attemptsWithoutAction = 0;
          unfollowedList.push({ handle: u.handle, name: u.name, bio: u.bio });
          console.log(`   ✅ 成功取关 @${u.handle} (累计已清理: ${17 + unfollowedCount}/40)`);
          
          const delay = 2000 + Math.floor(Math.random() * 1200);
          await sleep(delay);

          if (unfollowedCount >= targetBatch) break;
        }
      }
    }

    if (!foundTargetThisRound) {
      attemptsWithoutAction++;
    }

    // 强制下滚加载新的一批
    console.log(`\n⬇️ 滚动加载新关注列表 (当前已清理: ${17 + unfollowedCount}/40)...`);
    runChromeJS(`window.scrollBy(0, 1800);`);
    await sleep(2500);
  }

  console.log(`\n🎉 批量清理完成！本次成功取关 ${unfollowedCount} 个，总计清理 ${17 + unfollowedCount} 个。`);
}

main().catch(err => {
  console.error('执行出错:', err);
});
