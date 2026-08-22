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

// 核心保留名单 (绝对不删)
const CORE_PROTECTED = [
  'wublockchain', 'colinwu', 'nautilustrader', 'quantconnect', 'bitwux',
  'microstrategy', 'serenity', 'aleabitoreddit', 'binance', 'okx', 'bybit',
  'hyperliquid', 'tradingview', 'interactivebrokers', 'ibkr', 'vitalik', 'cz_binance'
];

function isProtected(handle, name, bio) {
  const text = (handle + ' ' + name + ' ' + bio).toLowerCase();
  for (const kw of CORE_PROTECTED) {
    if (text.includes(kw)) return true;
  }
  return false;
}

async function main() {
  console.log('=== 开始第二批安全清理（目标：完成剩余 23 个，累计达 40 个）===');

  let unfollowedInThisRun = 0;
  const targetBatch = 23;
  const unfollowedList = [];

  while (unfollowedInThisRun < targetBatch) {
    // 获取当前页面所有的 UserCell
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
        console.log(`[保留保护] @${u.handle} (${u.name}) - 核心圈子`);
        continue;
      }

      console.log(`\n👉 [取关 ${17 + unfollowedInThisRun + 1}/40] @${u.handle} (${u.name})`);
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
          unfollowedInThisRun++;
          performedAction = true;
          unfollowedList.push({ handle: u.handle, name: u.name });
          console.log(`   ✅ 成功取关 @${u.handle} (累计已清理: ${17 + unfollowedInThisRun}/40)`);

          // 安全延迟 2.3 ~ 3.5 秒
          const delay = 2300 + Math.floor(Math.random() * 1200);
          await sleep(delay);

          if (unfollowedInThisRun >= targetBatch) break;
        }
      }
    }

    if (!performedAction) {
      console.log('\n当前视窗没有更多待取关账号，刷新页面载入下一批...');
      runChromeJS('location.reload();');
      await sleep(3500);
    }
  }

  console.log(`\n🎉🎉 恭喜！已精确完成 40 个无效/低质账号的安全清理！`);
}

main().catch(console.error);
