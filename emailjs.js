// emailjs.js
// Minimal wrapper for EmailJS (client-side).
// Uses EmailJS public key you provided.
// Service ID: service_bw58d2g
// Template ID: template_oj6reh7
// Public Key: IvSeQMpfSU_RcesQb

// EmailJS CDN (to include in HTML): <script src="https://cdn.emailjs.com/sdk/3.2.0/email.min.js"></script>
// or you can import via modules if you prefer a bundler.

const EMAILJS_SERVICE = "service_bw58d2g";
const EMAILJS_TEMPLATE = "template_oj6reh7";
const EMAILJS_PUBLIC_KEY = "IvSeQMpfSU_RcesQb";

/**
 * Initialize emailjs - call once before sending
 * If you're including the email.min.js in <script> tag, you can call emailjs.init(PUBLIC_KEY)
 * If you use bundler, import emailjs accordingly.
 */
export function initEmailJS() {
  if (typeof emailjs === "undefined") {
    console.warn("EmailJS SDK not found. Add <script src=\"https://cdn.emailjs.com/sdk/3.2.0/email.min.js\"></script> to your HTML.");
    return;
  }
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/**
 * sendWelcomeEmail(params)
 * params: {
 *   to_name: string,
 *   to_email: string,
 *   uid: string,            // optional: user uid
 *   appPass: string|null    // optional: ONLY if you really want to include an app password (not recommended)
 * }
 *
 * NOTE: By default this function will NOT include the raw password in the email.
 * If you want to include appPass, pass appPass and uncomment the template param below that injects it.
 */
export async function sendWelcomeEmail(params) {
  if (typeof emailjs === "undefined") {
    throw new Error("EmailJS SDK not loaded. Add the CDN script to your page.");
  }

  const templateParams = {
    to_name: params.to_name || "Student",
    to_email: params.to_email,
    user_uid: params.uid || "",
    // safe approach: don't send password. If you must include an app password, include it explicitly:
    // app_pass: params.appPass || ''
    // Make sure your EmailJS template uses the correct variable names (e.g. {{to_name}}, {{to_email}}, {{user_uid}}, {{app_pass}})
  };

  // If you deliberately want to send appPass, the template must include {{app_pass}} and you must include this:
  // if (params.appPass) templateParams.app_pass = params.appPass;

  return emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams);
}
