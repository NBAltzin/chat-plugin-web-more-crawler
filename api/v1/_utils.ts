import { JSDOM } from 'jsdom';

const BASE_URL = process.env.BROWSERLESS_URL ?? 'https://chrome.browserless.io';
const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN;

const runner = async ({ url }: { url: string }) => {
  const input = {
    gotoOptions: { 
      waitUntil: 'networkidle2',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
    },
    url,
  };

  try {
    const res = await fetch(`${BASE_URL}/content?token=${BROWSERLESS_TOKEN}`, {
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const html = await res.text();

    // 直接返回抓取的HTML内容
    return { content: html, url };
  } catch (error) {
    console.error(error);
    return { content: '抓取失败', errorMessage: (error as any).message, url };
  }
};

export default runner;
