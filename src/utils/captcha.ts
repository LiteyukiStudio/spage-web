import { CaptchaProvider } from '../const';

// createCaptchaWidget function
export const createCaptchaWidget = (provider: string, siteKey: string, url: string): {div: string, js: string} => {
    switch (provider) {
        case CaptchaProvider.Disable:
            return {div: '', js: ''};
        case CaptchaProvider.Turnstile:
            return {
                div: `<div class="cf-turnstile" data-sitekey="${siteKey}" data-callback="onCaptchaSuccess"></div>`,
                js: `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>`
            }
        case CaptchaProvider.reCaptcha:
            return {
                div: `<div class="g-recaptcha" data-sitekey="${siteKey}" data-callback="onCaptchaSuccess"></div>`,
                js: `<script src="https://www.google.com/recaptcha/api.js" async defer></script>`
            }
        case CaptchaProvider.hCaptcha:
            return {
                div: `<div class="h-captcha" data-sitekey="${siteKey}" data-callback="onCaptchaSuccess"></div>`,
                js: `<script src="https://js.hcaptcha.com/1/api.js" async defer></script>`
            }
        case CaptchaProvider.mCaptcha:
            return {
                div: `<div class="m-captcha" data-sitekey="${siteKey}" data-callback="onCaptchaSuccess"></div>`,
                js: `<script src="${url}" async defer></script>`
            }
        default:
            return {div: '', js: ''};
    }
}
